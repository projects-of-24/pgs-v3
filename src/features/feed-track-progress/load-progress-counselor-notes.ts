/**
 * B4 — #counselorNotes for Track Progress Premium.
 * Same truth as Desk Notes: `counselor_notes` (student_visible only).
 * Empty → honest empty (no fixture invent). ≠ feed purple `notes_html`.
 */
import "server-only";

import { previewAwareSupabaseClient } from "@/lib/staff-preview-server";

export type ProgressCounselorNoteRow = {
  id: string;
  n: number;
  body: string;
};

export type ProgressCounselorNotesLoad = {
  rows: ProgressCounselorNoteRow[];
  windowSize: number;
  wired: boolean;
};

const WINDOW_SIZE = 4;

/**
 * Load student-visible counselor notes for one student (View-as aware).
 */
export async function loadProgressCounselorNotes(
  studentId: string | null | undefined
): Promise<ProgressCounselorNotesLoad> {
  if (!studentId) {
    return { rows: [], windowSize: WINDOW_SIZE, wired: false };
  }

  const client = await previewAwareSupabaseClient(studentId);

  const { data, error } = await client
    .from("counselor_notes")
    .select("id,body,visibility,created_at")
    .eq("student_id", studentId)
    .eq("visibility", "student_visible")
    .order("created_at", { ascending: true });

  if (error || !data) {
    return { rows: [], windowSize: WINDOW_SIZE, wired: true };
  }

  const rows: ProgressCounselorNoteRow[] = data
    .map((row, index) => {
      const body = typeof row.body === "string" ? row.body.trim() : "";
      if (!body) return null;
      return {
        id: row.id as string,
        n: index + 1,
        body
      };
    })
    .filter((row): row is ProgressCounselorNoteRow => Boolean(row));

  return { rows, windowSize: WINDOW_SIZE, wired: true };
}
