/**
 * Where You Stand — default Prep labels (Figma fixture) + tracker partition.
 * Shortlist count rows live in the same `documents_tracker` jsonb (WS-FILL-4 · 1A).
 */

export const WYS_DEFAULT_ONBOARDING = [
  "Profile Setup Complete",
  "University Shortlist Discussed",
  "SOP Discussion Done",
  "IELTS/GRE Status Confirmed",
  "Resume Uploaded",
  "LOR Briefed",
  "Loan & Finance Discussed"
] as const;

export const WYS_DEFAULT_FEEDBACK_TITLE = "June feedback session";
export const WYS_DEFAULT_FEEDBACK_ITEMS = ["One-on-One Session Booked"] as const;

export const WYS_DEFAULT_DOCUMENT_LABELS = [
  "SOP Drafts Uploaded",
  "LORs Uploaded",
  "Degree Certificate Uploaded",
  "Graduation Transcript",
  "Passport Front/Back",
  "Loan Documents If Applied",
  "Other Documents",
  "Pending Documents*"
] as const;

/** Mentor-filled Uni Shortlist count labels (stored in documents_tracker). */
export const WYS_DEFAULT_SHORTLIST_LABELS = [
  "USA - Stream Choice 1",
  "USA- Stream Choice 3"
] as const;

export const WYS_UNI_IMAGE = "/assets/img/figma-feed/wys-uni-campus.png";

const SHORTLIST_SET = new Set<string>(WYS_DEFAULT_SHORTLIST_LABELS);

export function isWysShortlistLabel(label: string): boolean {
  if (SHORTLIST_SET.has(label)) return true;
  const lower = label.toLowerCase();
  return lower.includes("stream choice") || lower.startsWith("usa -") || lower.startsWith("usa-");
}

export function countToDigitPair(count: number): { left: string; right: string } {
  const n = Number.isFinite(count) && count >= 0 ? Math.trunc(count) : 0;
  const padded = String(Math.min(n, 99)).padStart(2, "0");
  return { left: padded[0] ?? "0", right: padded[1] ?? "0" };
}

export type WysTrackerRow = { label: string; count: number; pending?: boolean };

export function partitionDocumentsTracker(
  tracker: Record<string, { count: number; is_red?: boolean }> | null | undefined
): { documents: WysTrackerRow[]; shortlist: WysTrackerRow[] } {
  const documents: WysTrackerRow[] = [];
  const shortlist: WysTrackerRow[] = [];
  for (const [label, item] of Object.entries(tracker ?? {})) {
    const count = typeof item?.count === "number" ? item.count : Number(item?.count) || 0;
    const row: WysTrackerRow = {
      label,
      count,
      pending: item?.is_red === true
    };
    if (isWysShortlistLabel(label)) shortlist.push(row);
    else documents.push(row);
  }
  return { documents, shortlist };
}

export function mergeDocumentsTracker(
  documents: Array<{ label: string; count: number; pending?: boolean }>,
  shortlist: Array<{ label: string; count: number }>
): Record<string, { count: number; is_red: boolean }> {
  const out: Record<string, { count: number; is_red: boolean }> = {};
  for (const row of documents) {
    const label = row.label.trim();
    if (!label) continue;
    out[label] = { count: Math.max(0, Math.trunc(Number(row.count) || 0)), is_red: row.pending === true };
  }
  for (const row of shortlist) {
    const label = row.label.trim();
    if (!label) continue;
    out[label] = { count: Math.max(0, Math.trunc(Number(row.count) || 0)), is_red: false };
  }
  return out;
}
