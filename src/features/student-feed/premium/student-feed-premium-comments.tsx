/**
 * Family B Pass 7 — Comments unlocked (no forlocked).
 * Ports Family A `StudentFeedComments` with locks off.
 * Fixture UI; comments domain = B6 later (clean CMS pass).
 */
import { StudentFeedComments } from "../student-feed-comments";

export function StudentFeedPremiumComments() {
  return (
    <div
      data-pgs-module="student-feed-premium-comments"
      data-feed-family="premium"
      data-premium-pass="7-comments"
      data-comments-state="unlocked"
      data-cms="fixture-B6-pending"
    >
      <StudentFeedComments premiumActive />
    </div>
  );
}
