/**
 * Family B Pass 6 — Where You Stand unlocked (6A–6E).
 * Ports Family A `StudentFeedWhereYouStand` with forlocked off.
 * Fixture UI; workspace CMS = B5 later.
 */
import { StudentFeedWhereYouStand } from "../student-feed-where-you-stand";

export function StudentFeedPremiumWhereYouStand() {
  return (
    <div
      data-pgs-module="student-feed-premium-where-you-stand"
      data-feed-family="premium"
      data-premium-pass="6-wys"
      data-wys-state="unlocked"
      data-cms="fixture-B5-pending"
    >
      <StudentFeedWhereYouStand premiumActive />
    </div>
  );
}
