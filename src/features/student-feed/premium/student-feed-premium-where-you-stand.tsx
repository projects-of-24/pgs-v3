/**
 * Family B Pass 6 — Where You Stand unlocked (6A–6E).
 * Ports Family A `StudentFeedWhereYouStand` with forlocked off.
 * WS-FILL-4: live store when `data` passed from dashboard; preview keeps fixtures.
 */
import type { FeedWhereYouStandData } from "../load-feed-where-you-stand";
import { StudentFeedWhereYouStand } from "../student-feed-where-you-stand";

export function StudentFeedPremiumWhereYouStand({
  data
}: {
  data?: FeedWhereYouStandData;
}) {
  return (
    <div
      data-pgs-module="student-feed-premium-where-you-stand"
      data-feed-family="premium"
      data-premium-pass="6-wys"
      data-wys-state="unlocked"
      data-cms={data?.fromStore ? "wired-ws-fill-4" : "fixture-preview"}
    >
      <StudentFeedWhereYouStand premiumActive data={data} />
    </div>
  );
}
