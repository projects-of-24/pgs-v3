/**
 * B2 — #draftMeter for Track Progress Premium.
 * Same truth as Desk Documents: `student_document_requirements`.
 * Rows = not approved (≤3) · completed = approved count · empty = honest empty.
 * Gauge SVGs stay decorative (owner option A).
 */
import "server-only";

import { previewAwareSupabaseClient } from "@/lib/staff-preview-server";

const METER_SRCS = [
  "/assets/img/figma-progress/meter-a.svg",
  "/assets/img/figma-progress/meter-b.svg",
  "/assets/img/figma-progress/meter-c.svg"
] as const;

export type ProgressDraftMeterRow = {
  id: string;
  label: string;
  meterSrc: string;
  status: string;
};

export type ProgressDraftMeterLoad = {
  rows: ProgressDraftMeterRow[];
  completed: number;
  wired: boolean;
};

function statusLabel(status: string): string {
  return status.replaceAll("_", " ");
}

/**
 * Load draft-meter rows for one student (View-as aware).
 */
export async function loadProgressDraftMeter(
  studentId: string | null | undefined
): Promise<ProgressDraftMeterLoad> {
  if (!studentId) {
    return { rows: [], completed: 0, wired: false };
  }

  const client = await previewAwareSupabaseClient(studentId);

  const { data, error } = await client
    .from("student_document_requirements")
    .select("id,document_type,status,sort_order")
    .eq("student_id", studentId)
    .order("sort_order")
    .order("created_at");

  if (error || !data) {
    return { rows: [], completed: 0, wired: true };
  }

  const completed = data.filter((row) => row.status === "approved").length;

  const pending = data.filter(
    (row) => row.status !== "approved" && row.status !== "waived"
  );

  const rows: ProgressDraftMeterRow[] = pending.slice(0, 3).map((row, index) => {
    const type = typeof row.document_type === "string" ? row.document_type.trim() : "";
    const status = typeof row.status === "string" ? row.status : "missing";
    return {
      id: row.id as string,
      label: type ? `${type} · ${statusLabel(status)}` : statusLabel(status),
      meterSrc: METER_SRCS[index % METER_SRCS.length],
      status
    };
  });

  return { rows, completed, wired: true };
}
