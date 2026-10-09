/**
 * B3 — #reviewQueue for Track Progress Premium.
 * Same truth as Desk Reviews: `review_queue_items` (student_visible, sort_order).
 * Empty → honest empty (no fixture invent).
 */
import "server-only";

import { previewAwareSupabaseClient } from "@/lib/staff-preview-server";

export type ProgressReviewRow = {
  id: string;
  label: string;
  done: boolean;
};

export type ProgressReviewsLoad = {
  rows: ProgressReviewRow[];
  completed: number;
  /** true when a student subject was queried (even if zero rows). */
  wired: boolean;
};

/**
 * Load student-visible review queue items for one student.
 * View-as-Student: admin client when preview target matches.
 */
export async function loadProgressReviews(
  studentId: string | null | undefined
): Promise<ProgressReviewsLoad> {
  if (!studentId) {
    return { rows: [], completed: 0, wired: false };
  }

  const client = await previewAwareSupabaseClient(studentId);

  const { data, error } = await client
    .from("review_queue_items")
    .select("id,title,status,student_visible,sort_order")
    .eq("student_id", studentId)
    .eq("student_visible", true)
    .order("sort_order")
    .order("created_at");

  if (error || !data) {
    return { rows: [], completed: 0, wired: true };
  }

  const rows: ProgressReviewRow[] = data
    .map((row) => {
      const label = typeof row.title === "string" ? row.title.trim() : "";
      if (!label) return null;
      return {
        id: row.id as string,
        label,
        done: row.status === "completed"
      };
    })
    .filter((row): row is ProgressReviewRow => Boolean(row));

  const completed = rows.filter((row) => row.done).length;

  return { rows, completed, wired: true };
}
