/**
 * Family B Pass 3 — Notes.
 * Body: `premium_workspace_profiles.notes_html` via loadFeedNotesBody (B3).
 * Render: plain text only (React children) — no HTML injection.
 */
import { StudentFeedNotesCard } from "../student-feed-notes-actions";
import "./student-feed-premium-notes.css";

type Props = {
  body?: string;
};

export function StudentFeedPremiumNotes({ body }: Props) {
  return (
    <div
      className="student-feed-premium-notes"
      data-pgs-module="student-feed-premium-notes"
      data-figma-desktop="17120:12136"
      data-feed-family="premium"
      data-premium-pass="3-notes"
      data-notes-cms="premium_workspace_profiles.notes_html"
    >
      <StudentFeedNotesCard body={body} />
    </div>
  );
}
