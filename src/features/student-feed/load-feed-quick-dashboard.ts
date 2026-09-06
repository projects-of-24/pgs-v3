/**
 * Quick Dashboard metrics from V3 `premium_workspace_profiles`
 * (Junior overview contract ADAPT — same staff-edited scalars).
 * Empty default: 00 / 00 / toggles off when no row or not signed in.
 */
import "server-only";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type FeedQuickDashboardMetrics = {
  uniApplied: string;
  offersReceived: string;
  tuitionUploaded: boolean;
  visaApplied: boolean;
};

/** Empty / not-yet-set — staff fill later via Ops workspace Quick Dashboard. */
export const FEED_QUICK_DASHBOARD_EMPTY: FeedQuickDashboardMetrics = {
  uniApplied: "00",
  offersReceived: "00",
  tuitionUploaded: false,
  visaApplied: false
};

function padCount(value: unknown): string {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n) || n < 0) return "00";
  return String(Math.trunc(n)).padStart(2, "0");
}

export async function loadFeedQuickDashboardMetrics(
  studentId: string | null | undefined
): Promise<FeedQuickDashboardMetrics> {
  if (!studentId) return FEED_QUICK_DASHBOARD_EMPTY;

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("premium_workspace_profiles")
    .select("universities_applied, offers_received, tuition_receipt_uploaded, visa_status")
    .eq("student_id", studentId)
    .maybeSingle();

  if (error || !data) return FEED_QUICK_DASHBOARD_EMPTY;

  return {
    uniApplied: padCount(data.universities_applied),
    offersReceived: padCount(data.offers_received),
    tuitionUploaded: data.tuition_receipt_uploaded === true,
    visaApplied: data.visa_status === "applied"
  };
}
