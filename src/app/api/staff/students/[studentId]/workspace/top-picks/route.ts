import { NextResponse } from "next/server";
import { jsonError, readJsonObject, validUuid } from "@/lib/http";
import { requirePremiumActor, WorkspaceAccessError } from "@/lib/premium-workspace";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type Context = { params: Promise<{ studentId: string }> };

const MAX_PICKS = 40;

function courseId(value: unknown): number {
  const n = Number(value);
  if (!Number.isSafeInteger(n) || n <= 0) throw new Error("Choose a valid course.");
  return n;
}

function sortOrder(value: unknown): number {
  if (value === undefined) return 0;
  const n = Number(value);
  if (!Number.isSafeInteger(n) || n < 0 || n > 1_000_000) throw new Error("Invalid sort order.");
  return n;
}

function pickStatus(value: unknown): "InProgress" | "FileldUp" {
  return value === "FileldUp" ? "FileldUp" : "InProgress";
}

async function staffContext(studentIdRaw: string) {
  if (!validUuid(studentIdRaw)) throw new Error("Invalid student.");
  const actor = await requirePremiumActor(studentIdRaw, "manage");
  if (actor.kind === "student") throw new WorkspaceAccessError(403, "Staff access is required.");
  return actor;
}

/** GET — assigned picks + published course catalog for Desk assign. */
export async function GET(_request: Request, route: Context) {
  try {
    const { studentId } = await route.params;
    const actor = await staffContext(studentId);
    const supabase = await createSupabaseServerClient();

    const [picksResult, catalogResult] = await Promise.all([
      supabase
        .from("student_feed_top_picks")
        .select("id,course_id,sort_order,status,created_at,courses(id,title,published)")
        .eq("student_id", actor.studentId)
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false })
        .limit(MAX_PICKS),
      supabase
        .from("courses")
        .select("id,title")
        .eq("published", true)
        .order("title", { ascending: true })
        .limit(200)
    ]);

    if (picksResult.error) {
      const detail = `${picksResult.error.message}`.toLowerCase();
      if (detail.includes("student_feed_top_picks") || detail.includes("schema cache")) {
        return jsonError(
          "Top picks table is missing. Apply migration 20261008140000_ws_fill3_student_feed_top_picks.sql, then retry.",
          503
        );
      }
      return jsonError("Unable to load Top picks.", 400);
    }

    const picks = (picksResult.data ?? []).map((row) => {
      const raw = row.courses as unknown;
      const course = (Array.isArray(raw) ? raw[0] : raw) as
        | { id: number; title: string; published: boolean }
        | null
        | undefined;
      return {
        id: row.id as string,
        course_id: row.course_id as number,
        title: course?.title ?? `Course #${row.course_id}`,
        sort_order: row.sort_order as number,
        status: row.status as string,
        created_at: row.created_at as string
      };
    });

    return NextResponse.json({
      ok: true,
      picks,
      catalog: catalogResult.data ?? []
    });
  } catch (error) {
    if (error instanceof WorkspaceAccessError) return jsonError(error.message, error.status);
    return jsonError(error instanceof Error ? error.message : "Unable to load Top picks.", 400);
  }
}

/** POST — assign a published course to this student. */
export async function POST(request: Request, route: Context) {
  try {
    const { studentId } = await route.params;
    const actor = await staffContext(studentId);
    const input = await readJsonObject(request);
    const targetCourse = courseId(input.course_id);
    const status = pickStatus(input.status);
    const supabase = await createSupabaseServerClient();

    const { count } = await supabase
      .from("student_feed_top_picks")
      .select("id", { count: "exact", head: true })
      .eq("student_id", actor.studentId);
    if ((count ?? 0) >= MAX_PICKS) {
      return jsonError(`At most ${MAX_PICKS} Top picks per student.`, 400);
    }

    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("id")
      .eq("id", targetCourse)
      .eq("published", true)
      .maybeSingle();
    if (courseError || !course) return jsonError("Choose a published course.", 400);

    const nextOrder = sortOrder(input.sort_order ?? count ?? 0);
    const { data, error } = await supabase
      .from("student_feed_top_picks")
      .insert({
        student_id: actor.studentId,
        course_id: targetCourse,
        sort_order: nextOrder,
        status,
        assigned_by: actor.user.id
      })
      .select("id")
      .single();

    if (error) {
      if (error.code === "23505") return jsonError("That course is already assigned.", 409);
      const detail = `${error.message}`.toLowerCase();
      if (detail.includes("student_feed_top_picks") || detail.includes("schema cache")) {
        return jsonError(
          "Top picks table is missing. Apply migration 20261008140000_ws_fill3_student_feed_top_picks.sql, then retry.",
          503
        );
      }
      return jsonError("Unable to assign Top pick.", 400);
    }

    return NextResponse.json({ ok: true, id: data.id });
  } catch (error) {
    if (error instanceof WorkspaceAccessError) return jsonError(error.message, error.status);
    return jsonError(error instanceof Error ? error.message : "Unable to assign Top pick.", 400);
  }
}

/** PATCH — update status / sort_order for one assignment. */
export async function PATCH(request: Request, route: Context) {
  try {
    const { studentId } = await route.params;
    const actor = await staffContext(studentId);
    const input = await readJsonObject(request);
    if (!validUuid(input.id)) return jsonError("Choose a valid Top pick.", 400);

    const values: Record<string, unknown> = { updated_at: new Date().toISOString() };
    if (Object.prototype.hasOwnProperty.call(input, "status")) values.status = pickStatus(input.status);
    if (Object.prototype.hasOwnProperty.call(input, "sort_order")) values.sort_order = sortOrder(input.sort_order);
    if (Object.keys(values).length <= 1) return jsonError("No Top pick fields supplied.", 400);

    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("student_feed_top_picks")
      .update(values)
      .eq("id", input.id)
      .eq("student_id", actor.studentId)
      .select("id")
      .maybeSingle();

    if (error) return jsonError("Unable to update Top pick.", 400);
    if (!data) return jsonError("Top pick not found.", 404);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof WorkspaceAccessError) return jsonError(error.message, error.status);
    return jsonError(error instanceof Error ? error.message : "Unable to update Top pick.", 400);
  }
}

/** DELETE — unassign. */
export async function DELETE(request: Request, route: Context) {
  try {
    const { studentId } = await route.params;
    const actor = await staffContext(studentId);
    const input = await readJsonObject(request);
    if (!validUuid(input.id)) return jsonError("Choose a valid Top pick.", 400);

    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase
      .from("student_feed_top_picks")
      .delete()
      .eq("id", input.id)
      .eq("student_id", actor.studentId)
      .select("id")
      .maybeSingle();

    if (error) return jsonError("Unable to remove Top pick.", 400);
    if (!data) return jsonError("Top pick not found.", 404);
    return NextResponse.json({ ok: true });
  } catch (error) {
    if (error instanceof WorkspaceAccessError) return jsonError(error.message, error.status);
    return jsonError(error instanceof Error ? error.message : "Unable to remove Top pick.", 400);
  }
}
