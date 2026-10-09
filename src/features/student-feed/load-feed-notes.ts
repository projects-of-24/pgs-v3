/**
 * Purple #feed Notes — Junior `notes_html` ADAPT onto `premium_workspace_profiles`.
 * SECURITY: plain text · strip tags on write/read · React text render (no dangerouslySetInnerHTML).
 */
import "server-only";

import { sanitizeFeedNotesBody } from "@/lib/sanitize-feed-notes";
import { previewAwareSupabaseClient } from "@/lib/staff-preview-server";
import { STUDENT_FEED_NOTES_BODY } from "./feed-notes-default";

export type FeedNotesBody = {
  body: string;
  isDefault: boolean;
};

export { FEED_NOTES_MAX_LENGTH, sanitizeFeedNotesBody } from "@/lib/sanitize-feed-notes";

export async function loadFeedNotesBody(
  studentId: string | null | undefined
): Promise<FeedNotesBody> {
  if (!studentId) {
    return { body: STUDENT_FEED_NOTES_BODY, isDefault: true };
  }

  const supabase = await previewAwareSupabaseClient(studentId);
  const { data, error } = await supabase
    .from("premium_workspace_profiles")
    .select("notes_html")
    .eq("student_id", studentId)
    .maybeSingle();

  if (error || !data) {
    return { body: STUDENT_FEED_NOTES_BODY, isDefault: true };
  }

  const stored = typeof data.notes_html === "string" ? data.notes_html.trim() : "";
  if (!stored) {
    return { body: STUDENT_FEED_NOTES_BODY, isDefault: true };
  }

  const body = sanitizeFeedNotesBody(stored);
  if (!body) {
    return { body: STUDENT_FEED_NOTES_BODY, isDefault: true };
  }
  return { body, isDefault: false };
}
