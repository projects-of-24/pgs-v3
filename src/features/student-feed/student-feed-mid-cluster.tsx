/**
 * Mid feed cluster — Quick Dashboard + Notes + aspirant/actions.
 * Arrangement authority: owner screenshots + Figma (same blocks, different order).
 *
 * Desktop: QD → Notes | aspirant+actions (side column)
 * Mobile:  aspirant → actions → QD → Notes
 */
import { StudentFeedQuickDashboard } from "./student-feed-quick-dashboard";
import {
  StudentFeedActionLinks,
  StudentFeedAspirantPills,
  StudentFeedNotesCard
} from "./student-feed-notes-actions";
import "./student-feed-mid-cluster.css";

type Props = {
  premiumActive?: boolean;
};

export function StudentFeedMidCluster({ premiumActive = false }: Props) {
  return (
    <div
      className="student-feed-mid-cluster"
      data-pgs-module="student-feed-mid-cluster"
      data-arrangement="desktop-qd-notes-side__mobile-aspirant-actions-qd-notes"
    >
      <div className="student-feed-mid-cluster__dashboard">
        <StudentFeedQuickDashboard unlocked={premiumActive} />
      </div>

      <div className="student-feed-mid-cluster__side">
        <div className="student-feed-mid-cluster__aspirant">
          <StudentFeedAspirantPills />
        </div>
        <div className="student-feed-mid-cluster__actions">
          <StudentFeedActionLinks />
        </div>
      </div>

      <div className="student-feed-mid-cluster__notes">
        <StudentFeedNotesCard />
      </div>
    </div>
  );
}
