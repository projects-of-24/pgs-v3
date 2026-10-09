import { NextResponse } from "next/server";
import { jsonError, readJsonObject } from "@/lib/http";
import { requireMentorAssignsEditor } from "@/lib/mentor-assigns-auth";
import { StaffAuthorizationError } from "@/lib/staff-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

function cleanLabel(value: unknown): string {
  if (typeof value !== "string") throw new Error("Each tip needs a label.");
  const cleaned = value.trim();
  if (!cleaned || cleaned.length > 80) throw new Error("Tip labels must be 1–80 characters.");
  return cleaned;
}

function cleanBody(value: unknown): string {
  if (typeof value !== "string") throw new Error("Each tip needs a body.");
  const cleaned = value.trim();
  if (!cleaned || cleaned.length > 2000) throw new Error("Tip body must be 1–2000 characters.");
  return cleaned;
}

export async function GET() {
  try {
    await requireMentorAssignsEditor();
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("progress_tips")
      .select("id,label,body,sort_order")
      .eq("active", true)
      .order("sort_order")
      .order("created_at");
    if (error) {
      return jsonError(
        "Unable to load tips. Apply migration 20261009120000_ftp_b7b_progress_tips_resources.sql if the table is missing.",
        503
      );
    }
    return NextResponse.json({
      ok: true,
      tips: (data ?? []).map((row) => ({
        id: row.id,
        label: row.label,
        body: row.body,
        sortOrder: row.sort_order
      }))
    });
  } catch (error) {
    if (error instanceof StaffAuthorizationError) return jsonError(error.message, error.status);
    return jsonError(error instanceof Error ? error.message : "Unable to load tips.", 400);
  }
}

/** Replace the full active tips list (shared pack). */
export async function PUT(request: Request) {
  try {
    const actor = await requireMentorAssignsEditor();
    const input = await readJsonObject(request, 48_000);
    if (!Array.isArray(input.tips)) return jsonError("Send a tips array.", 400);
    if (input.tips.length > 40) return jsonError("At most 40 tips.", 400);

    const tips = input.tips.map((raw, index) => {
      if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
        throw new Error("Invalid tip row.");
      }
      const row = raw as Record<string, unknown>;
      return {
        label: cleanLabel(row.label),
        body: cleanBody(row.body),
        sort_order: index,
        active: true,
        updated_by: actor.user.id
      };
    });

    const supabase = await createSupabaseServerClient();
    const { error: clearError } = await supabase.from("progress_tips").delete().not("id", "is", null);
    if (clearError) {
      return jsonError(
        "Unable to save tips. Apply migration 20261009120000_ftp_b7b_progress_tips_resources.sql if the table is missing.",
        503
      );
    }

    if (tips.length) {
      const { error: insertError } = await supabase.from("progress_tips").insert(tips);
      if (insertError) return jsonError("Unable to save tips.", 400);
    }

    return NextResponse.json({ ok: true, count: tips.length });
  } catch (error) {
    if (error instanceof StaffAuthorizationError) return jsonError(error.message, error.status);
    return jsonError(error instanceof Error ? error.message : "Unable to save tips.", 400);
  }
}
