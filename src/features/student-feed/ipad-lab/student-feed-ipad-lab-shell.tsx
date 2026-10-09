/**
 * iPad A/B lab — body only. Chrome stays on the preview page string shell.
 * Does NOT edit locked Family B shell. Arrangement from Figma+Paper MCP (same design):
 * identity → aspirant/actions → notes → top picks → quick dashboard →
 * where you stand → comments → upcoming events.
 *
 * Blocks are <div> landmarks-as-divs for the stacked body rail.
 */
import type { FeedQuickDashboardMetrics } from "../load-feed-quick-dashboard";
import type { FeedUpcomingEvent } from "../feed-upcoming-event";
import {
  StudentFeedPremiumIdentity,
  type StudentFeedPremiumIdentityProps
} from "../premium/student-feed-premium-identity";
import { StudentFeedPremiumAspirantActions } from "../premium/student-feed-premium-aspirant-actions";
import { StudentFeedPremiumNotes } from "../premium/student-feed-premium-notes";
import { StudentFeedPremiumTopPicks } from "../premium/student-feed-premium-top-picks";
import { StudentFeedPremiumQuickDashboard } from "../premium/student-feed-premium-quick-dashboard";
import { StudentFeedPremiumWhereYouStand } from "../premium/student-feed-premium-where-you-stand";
import { StudentFeedPremiumComments } from "../premium/student-feed-premium-comments";
import { StudentFeedPremiumUpcomingEvents } from "../premium/student-feed-premium-upcoming-events";
import "../student-feed-mid-cluster.css";
import "../student-feed-notes-actions.css";
import "./student-feed-ipad-lab.css";

export type StudentFeedIpadLabSource = "figma" | "paper";

type Props = {
  source: StudentFeedIpadLabSource;
  quickDashboard?: FeedQuickDashboardMetrics;
  notesBody?: string;
  upcomingEvents?: FeedUpcomingEvent[];
  identity?: StudentFeedPremiumIdentityProps;
};

export function StudentFeedIpadLabShell({
  source,
  quickDashboard,
  notesBody,
  upcomingEvents,
  identity
}: Props) {
  return (
    <div
      className="student-feed-ipad-lab"
      data-pgs-module="student-feed-ipad-lab"
      data-ipad-source={source}
      data-feed-family="premium"
      data-lab="preview-only"
      data-live="untouched"
    >
      <p className="student-feed-ipad-lab__badge" aria-label="design source">
        iPad body lab · source={source} · preview only · live untouched
      </p>
      <div className="student-feed-ipad-lab__body">
        <div className="student-feed-ipad-lab__block" data-block="identity">
          <StudentFeedPremiumIdentity {...identity} />
        </div>
        <div className="student-feed-ipad-lab__block" data-block="aspirant-actions">
          <StudentFeedPremiumAspirantActions />
        </div>
        <div className="student-feed-ipad-lab__block" data-block="notes">
          <StudentFeedPremiumNotes body={notesBody} />
        </div>
        <div className="student-feed-ipad-lab__block" data-block="top-picks">
          <StudentFeedPremiumTopPicks />
        </div>
        <div className="student-feed-ipad-lab__block" data-block="quick-dashboard">
          <StudentFeedPremiumQuickDashboard metrics={quickDashboard} />
        </div>
        <div className="student-feed-ipad-lab__block" data-block="where-you-stand">
          <StudentFeedPremiumWhereYouStand />
        </div>
        <div className="student-feed-ipad-lab__block" data-block="comments">
          <StudentFeedPremiumComments />
        </div>
        <div className="student-feed-ipad-lab__block" data-block="upcoming-events">
          <StudentFeedPremiumUpcomingEvents events={upcomingEvents} />
        </div>
      </div>
    </div>
  );
}
