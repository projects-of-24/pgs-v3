/**
 * Family B — Premium student #feed body shell.
 * UI LOCKED (desktop + mobile). Live cutover on `/student/dashboard` Step 3.
 * Passes 1–8 complete. CMS/Ops + iPad + aesthetic pass deferred.
 */
import type { FeedQuickDashboardMetrics } from "../load-feed-quick-dashboard";
import type { FeedUpcomingEvent } from "../feed-upcoming-event";
import "../student-feed-preview-shell.css";
import { StudentFeedPremiumComments } from "./student-feed-premium-comments";
import {
  StudentFeedPremiumIdentity,
  type StudentFeedPremiumIdentityProps
} from "./student-feed-premium-identity";
import { StudentFeedPremiumMidCluster } from "./student-feed-premium-mid-cluster";
import { StudentFeedPremiumTopPicks } from "./student-feed-premium-top-picks";
import { StudentFeedPremiumUpcomingEvents } from "./student-feed-premium-upcoming-events";
import { StudentFeedPremiumWhereYouStand } from "./student-feed-premium-where-you-stand";

type Props = {
  quickDashboard?: FeedQuickDashboardMetrics;
  notesBody?: string;
  upcomingEvents?: FeedUpcomingEvent[];
  identity?: StudentFeedPremiumIdentityProps;
};

export function StudentFeedPremiumShell({
  quickDashboard,
  notesBody,
  upcomingEvents,
  identity
}: Props) {
  return (
    <div
      className="student-feed-preview-shell"
      data-pgs-module="student-feed-premium-preview"
      data-feed-family="premium"
      data-feed-state="authenticated_premium"
      data-figma-desktop="17041:10191"
      data-figma-mobile="206:6666"
      data-premium-pass="locked-complete"
      data-feed-lock="LOCKED"
      data-cutover="LIVE"
      data-deferred="cms-ops,ipad,aesthetic-pass"
      data-notes-cms="wired"
    >
      <div className="student-feed-preview-shell__body">
        <StudentFeedPremiumIdentity {...identity} />
        <div
          className="student-feed-preview-shell__mid-band"
          data-pgs-layout="desktop-cluster-left__picks-right"
        >
          {/* DOM order = Family A: cluster first (left desktop) · picks second (right). */}
          <div className="student-feed-preview-shell__mid-band-cluster">
            <StudentFeedPremiumMidCluster
              quickDashboard={quickDashboard}
              notesBody={notesBody}
            />
          </div>
          <div className="student-feed-preview-shell__mid-band-picks">
            <StudentFeedPremiumTopPicks />
          </div>
        </div>
        <StudentFeedPremiumWhereYouStand />
        <StudentFeedPremiumComments />
        <StudentFeedPremiumUpcomingEvents events={upcomingEvents} />
      </div>
    </div>
  );
}
