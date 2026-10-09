import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { adminApiError } from "@/lib/admin-api";
import { jsonError } from "@/lib/http";
import { requireStaffPermission } from "@/lib/staff-auth";
import { consumeRateLimit, logServerError } from "@/lib/server-security";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const types: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp"
};

const META_AVATAR_KEY = "pgs_staff_avatar_path";

function validImageSignature(bytes: Uint8Array, type: string): boolean {
  if (type === "image/jpeg") return bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  if (type === "image/png") {
    return bytes.slice(0, 8).every(
      (value, index) => value === [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a][index]
    );
  }
  if (type === "image/webp") {
    return (
      new TextDecoder().decode(bytes.slice(0, 4)) === "RIFF" &&
      new TextDecoder().decode(bytes.slice(8, 12)) === "WEBP"
    );
  }
  return false;
}

function metaAvatarPath(user: { user_metadata?: Record<string, unknown> } | null | undefined): string | null {
  const value = user?.user_metadata?.[META_AVATAR_KEY];
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

export async function POST(request: Request) {
  try {
    const context = await requireStaffPermission("overview.read");
    const limit = await consumeRateLimit(request, "upload.avatar", context.user.id);
    if (!limit.allowed) {
      return jsonError(
        limit.configured
          ? "Too many image uploads. Please wait and try again."
          : "Image uploads are temporarily unavailable.",
        limit.configured ? 429 : 503
      );
    }

    const declaredLength = Number(request.headers.get("content-length") ?? 0);
    if (declaredLength > 5_600_000) {
      return jsonError("Use a JPG, PNG, or WebP image up to 5 MB.", 413);
    }

    const form = await request.formData();
    const file = form.get("avatar");
    if (!(file instanceof File)) return jsonError("Choose an image to upload.", 400);

    const extension = types[file.type];
    if (!extension || file.size < 1 || file.size > 5_242_880) {
      return jsonError("Use a JPG, PNG, or WebP image up to 5 MB.", 400);
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    if (!validImageSignature(bytes, file.type)) {
      return jsonError("The uploaded file is not a valid image.", 400);
    }

    const supabase = await createSupabaseServerClient();
    const { data: profile } = await supabase
      .from("staff_profiles")
      .select("avatar_path")
      .eq("user_id", context.user.id)
      .maybeSingle();

    const previousPath =
      (typeof profile?.avatar_path === "string" && profile.avatar_path.trim()) ||
      metaAvatarPath(context.user);

    const path = `${context.user.id}/${randomUUID()}.${extension}`;
    let admin: ReturnType<typeof createSupabaseAdminClient>;
    try {
      admin = createSupabaseAdminClient();
    } catch (error) {
      logServerError("staff_avatar_storage_unavailable", error, { user_id: context.user.id });
      return jsonError("Image uploads are temporarily unavailable.", 503);
    }

    const { error: uploadError } = await admin.storage.from("staff-avatars").upload(path, bytes, {
      upsert: false,
      contentType: file.type,
      cacheControl: "3600"
    });
    if (uploadError) {
      logServerError("staff_avatar_upload_failed", uploadError, { user_id: context.user.id });
      return jsonError("Unable to upload image.", 400);
    }

    const { error: rpcError } = await supabase.rpc("update_staff_avatar_path", {
      target_avatar_path: path
    });

    if (rpcError) {
      // Durable contract is the migration RPC; until applied, keep path in Auth metadata.
      logServerError("staff_avatar_path_rpc_unavailable", rpcError, { user_id: context.user.id });
      const { data: authUser, error: getUserError } = await admin.auth.admin.getUserById(context.user.id);
      if (getUserError || !authUser.user) {
        await admin.storage.from("staff-avatars").remove([path]);
        return jsonError("Unable to upload image.", 400);
      }
      const { error: metaError } = await admin.auth.admin.updateUserById(context.user.id, {
        user_metadata: {
          ...(authUser.user.user_metadata ?? {}),
          [META_AVATAR_KEY]: path
        }
      });
      if (metaError) {
        await admin.storage.from("staff-avatars").remove([path]);
        logServerError("staff_avatar_metadata_update_failed", metaError, { user_id: context.user.id });
        return jsonError("Unable to upload image.", 400);
      }
    }

    if (previousPath && previousPath !== path) {
      const removed = await admin.storage.from("staff-avatars").remove([previousPath]);
      if (removed.error) {
        logServerError("staff_avatar_old_object_cleanup_failed", removed.error, {
          user_id: context.user.id
        });
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return adminApiError(error);
  }
}
