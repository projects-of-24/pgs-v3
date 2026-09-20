/**
 * Family B Pass 4 — Aspirant pills + Track / #purpleBoard.
 * Ports Family A `StudentFeedAspirantPills` + `StudentFeedActionLinks`.
 * Position: same mid-cluster grid as locked feed (Notes | side on desktop).
 */
import {
  StudentFeedActionLinks,
  StudentFeedAspirantPills
} from "../student-feed-notes-actions";

export function StudentFeedPremiumAspirantActions() {
  return (
    <>
      <div
        className="student-feed-mid-cluster__aspirant"
        data-pgs-module="student-feed-premium-aspirant"
        data-figma-desktop="17120:12094"
        data-premium-pass="4-aspirant-actions"
      >
        <StudentFeedAspirantPills />
      </div>
      <div
        className="student-feed-mid-cluster__actions"
        data-pgs-module="student-feed-premium-actions"
        data-premium-pass="4-aspirant-actions"
      >
        <StudentFeedActionLinks />
      </div>
    </>
  );
}
