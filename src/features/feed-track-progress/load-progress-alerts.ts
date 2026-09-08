/**
 * B1 — Important Alerts for Track Progress Premium preview.
 * Same truth as live: `student_alerts` (active, sort_order, ≤3).
 * Empty → honest empty (no fixture invent). Live cutover not this gate.
 */
import "server-only";

import { getActiveStudentPreviewTargetId } from "@/lib/staff-preview-server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ProgressAlertsLoad = {
  items: string[];
  /** true when a student subject was queried (even if zero rows). */
  wired: boolean;
};

/**
 * Load active alerts for one student. Scope: studentId only (URL/session subject).
 * View-as-Student: admin client when preview target matches (same as loadPremiumWorkspace).
 */
export async function loadProgressAlerts(
  studentId: string | null | undefined
): Promise<ProgressAlertsLoad> {
  if (!studentId) {
    return { items: [], wired: false };
  }

  const previewTarget = await getActiveStudentPreviewTargetId();
  const previewing = previewTarget === studentId;
  const client = previewing
    ? createSupabaseAdminClient()
    : await createSupabaseServerClient();

  const { data, error } = await client
    .from("student_alerts")
    .select("id,alert_text")
    .eq("student_id", studentId)
    .eq("active", true)
    .order("sort_order")
    .limit(3);

  if (error || !data) {
    return { items: [], wired: true };
  }

  const items = data
    .map((row) => (typeof row.alert_text === "string" ? row.alert_text.trim() : ""))
    .filter(Boolean);

  return { items, wired: true };
}
