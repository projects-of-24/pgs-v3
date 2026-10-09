import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { resolvePremiumValidity, type PremiumEntitlementRecord } from "@/lib/premium-entitlement";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import {
  can,
  getStaffContext,
  type StaffContext,
  type StaffRoleKey
} from "@/lib/staff-auth";
import {
  createStaffPreviewToken,
  isAssignableHandlerRole,
  staffPreviewCookieName,
  staffPreviewCookieOptions,
  verifyStaffPreviewToken,
  type StaffPreviewMode
} from "@/lib/staff-preview";

/**
 * @deprecated VAS1-WRITE — do not throw this from `/api/staff/*` or desk manage.
 * Student-surface read-only is enforced in `proxy.ts` (non-staff mutating APIs only).
 */
export class StaffPreviewReadOnlyError extends Error {
  readonly status = 403 as const;
  constructor(message = "Preview is read-only. Exit preview to make changes.") {
    super(message);
  }
}

export type StaffPreviewContext = {
  mode: StaffPreviewMode;
  actorId: string;
  actorName: string;
  targetId: string;
  targetName: string;
  targetRole: StaffRoleKey | null;
};

/**
 * View as Student capability (FEED-VAS).
 * Admin/SA: any student. Mentor (or assigned-scope permission): assigned students only (checked separately).
 * View as Mentor stays Admin/SA — see `canStartMentorPreview`.
 */
export function canUseStaffPreview(
  context: Pick<StaffContext, "roles" | "permissions">
): boolean {
  if (context.roles.includes("admin") || context.roles.includes("super_admin")) return true;
  if (context.roles.includes("mentor")) return true;
  return (
    context.permissions.has("student_workspace.read_all")
    || context.permissions.has("student_workspace.read")
  );
}

/** View as Mentor (impersonate another mentor in Ops) — Admin/SA only. */
export function canStartMentorPreview(
  context: Pick<StaffContext, "roles">
): boolean {
  return context.roles.includes("admin") || context.roles.includes("super_admin");
}

export function canStartStaffPreview(
  context: Pick<StaffContext, "roles" | "permissions">
): boolean {
  // VAS1: View as Student opens a new tab; Ops must keep actions while the preview cookie is live.
  // Preview cookie is intentionally not part of this gate.
  return canUseStaffPreview(context);
}

export type StudentPreviewScopeResult = "ok" | "out_of_scope" | "not_found";

/**
 * Record-scope for View as Student: org-wide (`read_all` / Admin/SA) or active `mentor_assignments`.
 * Does not require Premium — preview shows Family A or B as the student actually sees.
 */
export async function canPreviewStudentTarget(
  actor: StaffContext,
  studentId: string
): Promise<StudentPreviewScopeResult> {
  if (!canUseStaffPreview(actor)) return "out_of_scope";

  const supabase = await createSupabaseServerClient();
  const { data: profile } = await supabase.from("profiles").select("id").eq("id", studentId).maybeSingle();
  if (!profile) return "not_found";

  if (
    actor.roles.includes("admin")
    || actor.roles.includes("super_admin")
    || can(actor, "student_workspace.read_all")
  ) {
    return "ok";
  }

  const { data: assignment } = await supabase
    .from("mentor_assignments")
    .select("id,status")
    .eq("student_id", studentId)
    .eq("mentor_id", actor.user.id)
    .eq("status", "active")
    .maybeSingle();

  return assignment ? "ok" : "out_of_scope";
}

export { isAssignableHandlerRole };

export async function readStaffPreviewCookie() {
  return (await cookies()).get(staffPreviewCookieName)?.value;
}

export async function getStaffPreviewContext(actor?: StaffContext | null): Promise<StaffPreviewContext | null> {
  const claims = verifyStaffPreviewToken(await readStaffPreviewCookie());
  if (!claims) return null;
  if (!actor) return null;
  if (actor.user.id !== claims.actorId) return null;

  const supabase = await createSupabaseServerClient();
  if (claims.mode === "student") {
    if (!canUseStaffPreview(actor)) return null;
    // FEED-VAS: revoke mid-session if assignment ends or mentor loses scope.
    const scope = await canPreviewStudentTarget(actor, claims.targetId);
    if (scope !== "ok") return null;
    const { data } = await supabase.from("profiles").select("id,full_name").eq("id", claims.targetId).maybeSingle();
    if (!data) return null;
    return {
      mode: "student",
      actorId: actor.user.id,
      actorName: actor.displayName,
      targetId: data.id,
      targetName: data.full_name || "Student",
      targetRole: null
    };
  }

  // View as Mentor: Admin/SA only.
  if (!canStartMentorPreview(actor)) return null;

  const { data } = await supabase
    .from("staff_profiles")
    .select("user_id,display_name,status,role")
    .eq("user_id", claims.targetId)
    .maybeSingle();
  if (!data || data.status !== "active" || !isAssignableHandlerRole(data.role)) return null;
  return {
    mode: "mentor",
    actorId: actor.user.id,
    actorName: actor.displayName,
    targetId: data.user_id,
    targetName: data.display_name || "Staff",
    targetRole: data.role as StaffRoleKey
  };
}

/**
 * VAS1-WRITE: no-op. View as Student cookie must never freeze Ops/Workspace staff writes.
 * Student mutations stay blocked in `proxy.ts` outside `/api/staff/` and `/api/auth/`.
 * Kept so old call sites fail closed toward writable (not frozen) if reintroduced briefly.
 */
export async function assertStaffPreviewWritable(): Promise<void> {
  return;
}

export async function writeStaffPreviewCookie(mode: StaffPreviewMode, actorId: string, targetId: string) {
  const token = createStaffPreviewToken(mode, actorId, targetId);
  if (!token) throw new Error("Staff preview is not configured.");
  (await cookies()).set(staffPreviewCookieName, token, staffPreviewCookieOptions);
}

export async function clearStaffPreviewCookie() {
  (await cookies()).set(staffPreviewCookieName, "", { ...staffPreviewCookieOptions, maxAge: 0 });
}

export async function getActiveStudentPreviewTargetId(): Promise<string | null> {
  const claims = verifyStaffPreviewToken(await readStaffPreviewCookie());
  if (!claims || claims.mode !== "student") return null;
  const context = await getStaffContext();
  if (!context || context.user.id !== claims.actorId || !canUseStaffPreview(context)) return null;
  const scope = await canPreviewStudentTarget(context, claims.targetId);
  if (scope !== "ok") return null;
  return claims.targetId;
}

/**
 * Prefer admin client while View as Student is active for this student
 * (staff session RLS alone is not enough for subject reads).
 */
export async function previewAwareSupabaseClient(studentId: string) {
  const previewTarget = await getActiveStudentPreviewTargetId();
  if (previewTarget === studentId) return createSupabaseAdminClient();
  return createSupabaseServerClient();
}

export async function loadPreviewStudentProfile(studentId: string) {
  const admin = createSupabaseAdminClient();
  const { data: profile } = await admin
    .from("profiles")
    .select("id,full_name,dial_code,phone,whatsapp,citizenship_country,preferred_study_country,study_level,crm_stream,crm_target_year,field_interest,work_experience,referral_code,avatar_path,profile_completed_at")
    .eq("id", studentId)
    .maybeSingle();
  if (!profile) return null;
  const { data: auth } = await admin.auth.admin.getUserById(studentId);
  return {
    profile,
    email: auth.user?.email ?? ""
  };
}

export async function loadPreviewStudentAvatarUrl(path: string | null): Promise<string> {
  if (!path) return "/assets/img/default-avatar.png";
  const { data } = await createSupabaseAdminClient().storage.from("student-avatars").createSignedUrl(path, 300);
  return data?.signedUrl ?? "/assets/img/default-avatar.png";
}

export async function loadPreviewStudentNotifications(studentId: string) {
  const admin = createSupabaseAdminClient();
  const [items, unread] = await Promise.all([
    admin.from("notifications").select("id,title,body,section,destination_path,read_at,created_at").eq("recipient_kind", "student").eq("student_id", studentId).order("created_at", { ascending: false }).limit(100),
    admin.from("notifications").select("id", { count: "exact", head: true }).eq("recipient_kind", "student").eq("student_id", studentId).is("read_at", null)
  ]);
  return { items: items.data ?? [], unreadCount: unread.count ?? 0 };
}

export async function loadPreviewSavedItems(studentId: string) {
  const admin = createSupabaseAdminClient();
  const [programs, courses] = await Promise.all([
    admin.from("saved_programs").select("program_id,programs(id,title,slug,short_description,image_asset_id,media_assets!programs_image_asset_id_fkey(bucket,path,alt_text),program_tags(catalog_tags(name)))").eq("student_id", studentId).order("saved_at", { ascending: false }),
    admin.from("saved_courses").select("course_id,courses(id,title,slug,short_description,image_asset_id,media_assets!courses_image_asset_id_fkey(bucket,path,alt_text),course_tags(catalog_tags(name)))").eq("student_id", studentId).order("saved_at", { ascending: false })
  ]);
  return { programs: programs.data ?? [], courses: courses.data ?? [] };
}

export async function loadPreviewStudentEntitlements(studentId: string) {
  const { data } = await createSupabaseAdminClient()
    .from("premium_entitlements")
    .select("id,status,source,plan_code,duration_months,approved_at,starts_at,ends_at,revoked_at,premium_plans(label)")
    .eq("student_id", studentId)
    .order("ends_at", { ascending: false })
    .limit(20);
  return resolvePremiumValidity((data ?? []) as unknown as PremiumEntitlementRecord[]);
}

export function mentorPreviewBlocksPath(pathname: string): boolean {
  return (
    pathname === "/ops/team"
    || pathname.startsWith("/ops/team/")
    || pathname === "/ops/activity"
    || pathname.startsWith("/admin/access")
    || pathname.startsWith("/admin/staff")
    || pathname.startsWith("/admin/catalog")
    || pathname.startsWith("/admin/content")
    || pathname.startsWith("/admin/settings")
    || pathname.startsWith("/admin/leads")
    || pathname.startsWith("/admin/media")
    || pathname.startsWith("/cms")
  );
}

export function canAssignStudents(context: StaffContext): boolean {
  // VAS1: do not hide Assign/Change mentor on Ops when a student preview cookie is active.
  return can(context, "mentor_assignments.manage");
}

export async function redirectMentorPreviewAwayFromPrivilegedPages() {
  const context = await getStaffContext();
  const preview = await getStaffPreviewContext(context);
  if (preview?.mode === "mentor") redirect("/ops/students");
}
