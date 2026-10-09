/**
 * Family B Pass 5 — Top picks.
 * WS-FILL-3: live mentor assignments when `picks` provided; else fixture (preview labs).
 */
import { StudentFeedTopPicks, type StudentFeedTopPick } from "../student-feed-top-picks";

type Props = {
  picks?: StudentFeedTopPick[];
};

export function StudentFeedPremiumTopPicks({ picks }: Props = {} as Props) {
  // undefined = preview labs keep fixture; [] = live with no mentor assignments.
  const useFixture = picks === undefined;
  return (
    <div
      data-pgs-module="student-feed-premium-top-picks"
      data-feed-family="premium"
      data-premium-pass="5-top-picks"
      data-figma-desktop="18375:10739"
      data-figma-mobile="206:5883"
      data-cms={useFixture ? "fixture-B1-pending" : "ws-fill-3-assigned"}
    >
      <StudentFeedTopPicks picks={useFixture ? undefined : picks} />
    </div>
  );
}
