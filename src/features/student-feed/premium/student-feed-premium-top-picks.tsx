/**
 * Family B Pass 5 — Top picks.
 * Ports Family A `StudentFeedTopPicks` (fixture; CMS pathway tags = B1 later).
 * Position owned by preview-shell mid-band (same as locked feed).
 */
import { StudentFeedTopPicks } from "../student-feed-top-picks";

export function StudentFeedPremiumTopPicks() {
  return (
    <div
      data-pgs-module="student-feed-premium-top-picks"
      data-feed-family="premium"
      data-premium-pass="5-top-picks"
      data-figma-desktop="18375:10739"
      data-figma-mobile="206:5883"
      data-cms="fixture-B1-pending"
    >
      <StudentFeedTopPicks />
    </div>
  );
}
