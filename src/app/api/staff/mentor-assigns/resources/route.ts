import { NextResponse } from "next/server";
import { jsonError, readJsonObject } from "@/lib/http";
import { requireMentorAssignsEditor } from "@/lib/mentor-assigns-auth";
import { StaffAuthorizationError } from "@/lib/staff-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function cleanLabel(value: unknown): string {
  if (typeof value !== "string") throw new Error("Each resource needs a label.");
  const cleaned = value.trim();
  if (!cleaned || cleaned.length > 160) throw new Error("Resource labels must be 1–160 characters.");
  return cleaned;
}

function cleanUrl(value: unknown): string {
  if (value === null || value === undefined) return "";
  if (typeof value !== "string") throw new Error("Invalid resource URL.");
  const cleaned = value.trim();
  if (cleaned.length > 2000) throw new Error("Resource URL is too long.");
  if (cleaned && !/^https?:\/\//i.test(cleaned)) {
    throw new Error("Resource URLs must start with http:// or https://");
  }
  return cleaned;
}

export async function GET() {
  try {
    await requireMentorAssignsEditor();
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("progress_resources")
      .select("id,label,url,sort_order")
      .eq("active", true)
      .order("sort_order")
      .order("created_at");
    if (error) {
      return jsonError(
        "Unable to load resources. Apply migration 20261009120000_ftp_b7b_progress_tips_resources.sql if the table is missing.",
        503
      );
    }
    return NextResponse.json({
      ok: true,
      resources: (data ?? []).map((row) => ({
        id: row.id,
        label: row.label,
        url: row.url,
        sortOrder: row.sort_order
      }))
    });
  } catch (error) {
    if (error instanceof StaffAuthorizationError) return jsonError(error.message, error.status);
    return jsonError(error instanceof Error ? error.message : "Unable to load resources.", 400);
  }
}

/** Replace the full active resources list (shared pack). */
export async function PUT(request: Request) {
  try {
    const actor = await requireMentorAssignsEditor();
    const input = await readJsonObject(request, 48_000);
    if (!Array.isArray(input.resources)) return jsonError("Send a resources array.", 400);
    if (input.resources.length > 40) return jsonError("At most 40 resources.", 400);

    const resources = input.resources.map((raw, index) => {
      if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
        throw new Error("Invalid resource row.");
      }
      const row = raw as Record<string, unknown>;
      return {
        label: cleanLabel(row.label),
        url: cleanUrl(row.url),
        sort_order: index,
        active: true,
        updated_by: actor.user.id
      };
    });

    const supabase = await createSupabaseServerClient();
    const { error: clearError } = await supabase.from("progress_resources").delete().not("id", "is", null);
    if (clearError) {
      return jsonError(
        "Unable to save resources. Apply migration 20261009120000_ftp_b7b_progress_tips_resources.sql if the table is missing.",
        503
      );
    }

    if (resources.length) {
      const { error: insertError } = await supabase.from("progress_resources").insert(resources);
      if (insertError) return jsonError("Unable to save resources.", 400);
    }

    return NextResponse.json({ ok: true, count: resources.length });
  } catch (error) {
    if (error instanceof StaffAuthorizationError) return jsonError(error.message, error.status);
    return jsonError(error instanceof Error ? error.message : "Unable to save resources.", 400);
  }
}
