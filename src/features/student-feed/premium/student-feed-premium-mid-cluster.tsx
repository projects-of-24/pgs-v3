/**
 * Family B mid-band — reuses Family A `student-feed-mid-cluster` arrangement.
 * Desktop: QD full width → Notes | aspirant+actions
 * Mobile: aspirant → actions → QD → Notes
 * Pass 4 adds aspirant+actions; QD + Notes already landed in earlier passes.
 */
import type { FeedQuickDashboardMetrics } from "../load-feed-quick-dashboard";
import "../student-feed-mid-cluster.css";
import { StudentFeedPremiumAspirantActions } from "./student-feed-premium-aspirant-actions";
import { StudentFeedPremiumNotes } from "./student-feed-premium-notes";
import { StudentFeedPremiumQuickDashboard } from "./student-feed-premium-quick-dashboard";
import "./student-feed-premium-mid-cluster.css";

type Props = {
  quickDashboard?: FeedQuickDashboardMetrics;
  notesBody?: string;
};

export function StudentFeedPremiumMidCluster({ quickDashboard, notesBody }: Props) {
  return (
    <div
      className="student-feed-mid-cluster student-feed-premium-mid"
      data-pgs-module="student-feed-premium-mid-cluster"
      data-feed-family="premium"
      data-arrangement="desktop-qd-notes-side__mobile-aspirant-actions-qd-notes"
      data-premium-pass="4-aspirant-actions"
    >
      <div className="student-feed-mid-cluster__dashboard">
        <StudentFeedPremiumQuickDashboard metrics={quickDashboard} />
      </div>

      <div className="student-feed-mid-cluster__side">
        <StudentFeedPremiumAspirantActions />
      </div>

      <div className="student-feed-mid-cluster__notes">
        <StudentFeedPremiumNotes body={notesBody} />
      </div>
    </div>
  );
}
