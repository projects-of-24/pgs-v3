/**
 * WS-OC-2 — Overall Comments inbox from `workspace_comments`.
 * Same truth as Desk Comments. Mentor = assigned students only (RLS + assignment list).
 */
import "server-only";

import { requireStaffPermission, type StaffContext } from "@/lib/staff-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type OverallCommentRow = {
  id: string;
  studentId: string;
  studentName: string;
  pgsId: string;
  comment: string;
  timing: string;
  createdAt: string;
};

type ProfileLite = {
  id: string;
  full_name: string | null;
  pgs_code: string | null;
};

function formatTiming(iso: string): string {
  return new Date(iso).toLocaleString("en-GB");
}

function hasBroadStudentScope(context: StaffContext): boolean {
  return (
    context.permissions.has("student_workspace.read_all") ||
    context.permissions.has("student_workspace.manage_all")
  );
}

async function loadAssignedStudentProfiles(
  mentorUserId: string
): Promise<Map<string, ProfileLite>> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("mentor_assignments")
    .select("student_id, profiles!mentor_assignments_student_id_fkey(id, full_name, pgs_code)")
    .eq("mentor_id", mentorUserId)
    .eq("status", "active");

  const map = new Map<string, ProfileLite>();
  if (error || !data) return map;

  for (const row of data) {
    const relation = row.profiles as ProfileLite | ProfileLite[] | null;
    const profile = Array.isArray(relation) ? relation[0] : relation;
    if (!profile?.id) continue;
    map.set(profile.id, profile);
  }
  return map;
}

async function loadProfilesByIds(ids: string[]): Promise<Map<string, ProfileLite>> {
  const map = new Map<string, ProfileLite>();
  if (!ids.length) return map;
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("profiles")
    .select("id, full_name, pgs_code")
    .in("id", ids);
  if (error || !data) return map;
  for (const row of data) {
    map.set(row.id, row as ProfileLite);
  }
  return map;
}

/**
 * Load comment rows for Overall Comments table (newest first).
 */
export async function loadOverallCommentsInbox(limit = 100): Promise<{
  rows: OverallCommentRow[];
  scope: "assigned" | "authorized";
  wired: boolean;
}> {
  const context = await requireStaffPermission("overview.read");
  const supabase = await createSupabaseServerClient();
  const broad = hasBroadStudentScope(context);

  let profileMap = new Map<string, ProfileLite>();
  let studentFilter: string[] | null = null;

  if (!broad) {
    profileMap = await loadAssignedStudentProfiles(context.user.id);
    studentFilter = [...profileMap.keys()];
    if (!studentFilter.length) {
      return { rows: [], scope: "assigned", wired: true };
    }
  }

  let query = supabase
    .from("workspace_comments")
    .select("id, student_id, body, created_at")
    .order("created_at", { ascending: false })
    .limit(Math.min(Math.max(limit, 1), 200));

  if (studentFilter) {
    query = query.in("student_id", studentFilter);
  }

  const { data, error } = await query;
  if (error || !data) {
    return { rows: [], scope: broad ? "authorized" : "assigned", wired: true };
  }

  if (broad) {
    const ids = [...new Set(data.map((row) => row.student_id as string))];
    profileMap = await loadProfilesByIds(ids);
  }

  const rows: OverallCommentRow[] = data.map((row) => {
    const profile = profileMap.get(row.student_id as string);
    const body = typeof row.body === "string" ? row.body.trim() : "";
    const createdAt = row.created_at as string;
    return {
      id: row.id as string,
      studentId: row.student_id as string,
      studentName: profile?.full_name?.trim() || "Student",
      pgsId: profile?.pgs_code?.trim() || "—",
      comment: body || "(empty)",
      timing: formatTiming(createdAt),
      createdAt
    };
  });

  return {
    rows,
    scope: broad ? "authorized" : "assigned",
    wired: true
  };
}
