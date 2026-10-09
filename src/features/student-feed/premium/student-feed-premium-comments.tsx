/**
 * Family B Pass 7 — Comments unlocked.
 * WS-COMMENTS-2: live `workspace_comments` when `live` passed; else fixture (preview labs).
 */
import type { FeedCommentsData } from "../load-feed-comments";
import { StudentFeedComments } from "../student-feed-comments";

export function StudentFeedPremiumComments({
  live = null,
  readOnly = false,
  studentDisplayName
}: {
  live?: FeedCommentsData | null;
  readOnly?: boolean;
  studentDisplayName?: string;
}) {
  return (
    <div
      data-pgs-module="student-feed-premium-comments"
      data-feed-family="premium"
      data-premium-pass="7-comments"
      data-comments-state="unlocked"
      data-cms={live?.fromStore ? "wired-ws-comments-2" : "fixture-preview"}
    >
      <StudentFeedComments
        premiumActive
        live={live}
        readOnly={readOnly}
        studentDisplayName={studentDisplayName}
      />
    </div>
  );
}
