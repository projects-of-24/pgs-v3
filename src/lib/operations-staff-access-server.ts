import "server-only";
import { notFound } from "next/navigation";
import type { StaffPermission } from "@/lib/staff-auth";
import { can, type StaffContext } from "@/lib/staff-auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  isStaffRoleKey,
  type StaffAccessDetail,
  type StaffDirectoryRow,
  type StaffProfileStatus
} from "@/lib/operations-staff-access";

// OPS-09: Security Advisor 0029 flags public SECURITY DEFINER RPCs executable by `authenticated`.
// These four keep internal checks (staff.read / roles.manage). Do not treat the warning as an OPS-04 rewrite.

function asDirectoryRow(row: Record<string, unknown>): StaffDirectoryRow | null {
  if (!isStaffRoleKey(String(row.role_key ?? ""))) return null;
  const status = row.status;
  if (status !== "active" && status !== "suspended" && status !== "ended") return null;
  return {
    user_id: String(row.user_id),
    display_name: String(row.display_name || "Staff"),
    status: status as StaffProfileStatus,
    role_key: row.role_key as StaffDirectoryRow["role_key"],
    assigned_student_count: Number(row.assigned_student_count ?? 0),
    invite_pending: Boolean(row.invite_pending),
    has_student_profile: Boolean(row.has_student_profile),
    created_at: String(row.created_at ?? "")
  };
}

export async function loadStaffPeopleDirectory(): Promise<StaffDirectoryRow[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("staff_people_directory");
  if (error) throw error;
  return ((data ?? []) as unknown[])
    .map((row) => asDirectoryRow(row as Record<string, unknown>))
    .filter((row): row is StaffDirectoryRow => Boolean(row));
}

export async function loadStaffAccessDetail(userId: string): Promise<StaffAccessDetail | null> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("staff_access_detail", { target_user: userId });
  if (error) throw error;
  const row = Array.isArray(data) ? data[0] : data;
  if (!row) return null;
  const directory = asDirectoryRow(row as Record<string, unknown>);
  if (!directory) return null;
  const keys = Array.isArray((row as { permission_keys?: unknown }).permission_keys)
    ? (row as { permission_keys: string[] }).permission_keys.filter((key): key is StaffPermission => typeof key === "string")
    : [];
  return { ...directory, permission_keys: keys };
}

export async function loadStaffAuthEmail(context: StaffContext, userId: string): Promise<string | null> {
  if (!can(context, "roles.manage")) return null;
  const { data, error } = await createSupabaseAdminClient().auth.admin.getUserById(userId);
  if (error) return null;
  return data.user?.email ?? null;
}

/** UM1: enrich directory rows with Auth emails for Super Admin manage UI only. */
export async function loadStaffDirectoryEmails(
  context: StaffContext,
  userIds: string[]
): Promise<Record<string, string>> {
  if (!can(context, "roles.manage") || !userIds.length) return {};
  const admin = createSupabaseAdminClient();
  const entries = await Promise.all(
    userIds.map(async (userId) => {
      const { data, error } = await admin.auth.admin.getUserById(userId);
      if (error || !data.user?.email) return null;
      return [userId, data.user.email] as const;
    })
  );
  return Object.fromEntries(entries.filter((entry): entry is readonly [string, string] => Boolean(entry)));
}

export async function loadStaffAccessHistory(context: StaffContext, userId: string) {
  if (!can(context, "audit.read")) return [];
  const supabase = await createSupabaseServerClient();
  const { data } = await supabase
    .from("audit_events")
    .select("id,occurred_at,event_type,outcome,metadata")
    .eq("target_id", userId)
    .eq("source_subsystem", "staff")
    .order("occurred_at", { ascending: false })
    .limit(12);
  return (data ?? []) as Array<{
    id: string;
    occurred_at: string;
    event_type: string;
    outcome: string;
    metadata: Record<string, unknown> | null;
  }>;
}

export async function requireStaffAccessDetail(userId: string) {
  const detail = await loadStaffAccessDetail(userId);
  if (!detail) notFound();
  return detail;
}

/** UM2b: sidetab menu grants for one staff user. Empty = role-default menus (no custom filter). */
export async function loadStaffNavGrants(userId: string): Promise<string[]> {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.rpc("staff_nav_grants_list", { target_user: userId });
  if (error) {
    // Soft-fail when migration is not applied yet (PGRST202 / missing function).
    const message = `${error.message ?? ""} ${error.code ?? ""} ${error.details ?? ""}`;
    if (/staff_nav_grants_list|PGRST202|does not exist|schema cache|Could not find the function/i.test(message)) {
      return [];
    }
    throw error;
  }
  if (!Array.isArray(data)) return [];
  return data.filter((key): key is string => typeof key === "string");
}
