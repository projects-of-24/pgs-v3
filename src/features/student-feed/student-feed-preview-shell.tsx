/**
 * Preview body shell — Family A locked feed (standard + anonymous).
 * Premium = Family B `/preview/student-feed-premium` — do not toggle here.
 * Order: identity → mid-band → unlock → Help Hub → WYS → Comments → Upcoming.
 * Anonymous = same locked body; identity placebo only.
 */
import { StudentFeedComments } from "./student-feed-comments";
import type { FeedUpcomingEvent } from "./feed-upcoming-event";
import { StudentFeedHelpHub } from "./student-feed-help-hub";
import { StudentFeedIdentityCard } from "./student-feed-identity-card";
import { StudentFeedMidCluster } from "./student-feed-mid-cluster";
import { StudentFeedTopPicks } from "./student-feed-top-picks";
import { StudentFeedUnlockPitch } from "./student-feed-unlock-pitch";
import { StudentFeedUpcomingEvents } from "./student-feed-upcoming-events";
import { StudentFeedWhereYouStand } from "./student-feed-where-you-stand";
import "./student-feed-preview-shell.css";

type Props = {
  upcomingEvents?: FeedUpcomingEvent[];
  /** Anonymous preview — placebo identity; rest = standard locked. */
  anonymous?: boolean;
};

export function StudentFeedPreviewShell({
  upcomingEvents,
  anonymous = false
}: Props) {
  return (
    <div
      className="student-feed-preview-shell"
      data-pgs-module="student-feed-preview"
      data-feed-family="locked"
      data-feed-state={anonymous ? "anonymous" : "authenticated_standard"}
    >
      <div className="student-feed-preview-shell__body">
        <StudentFeedIdentityCard premiumActive={false} anonymous={anonymous} />
        <div
          className="student-feed-preview-shell__mid-band"
          data-pgs-layout="desktop-cluster-left__picks-right"
        >
          <div className="student-feed-preview-shell__mid-band-cluster">
            <StudentFeedMidCluster premiumActive={false} />
          </div>
          <div className="student-feed-preview-shell__mid-band-picks">
            <StudentFeedTopPicks />
          </div>
        </div>
        <StudentFeedUnlockPitch premiumActive={false} />
        <StudentFeedHelpHub premiumActive={false} />
        <StudentFeedWhereYouStand premiumActive={false} />
        <StudentFeedComments premiumActive={false} />
        <StudentFeedUpcomingEvents events={upcomingEvents} />
      </div>
    </div>
  );
}
