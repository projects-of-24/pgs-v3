/**
 * Family B Pass 2 — Quick Dashboard (always unlocked).
 * Figma premium node `17041:10282`.
 * Metrics: `premium_workspace_profiles` (Junior overview ADAPT). Empty → 00 / off.
 */
import { StudentFeedQuickDashboard } from "../student-feed-quick-dashboard";
import type { FeedQuickDashboardMetrics } from "../load-feed-quick-dashboard";
import "./student-feed-premium-quick-dashboard.css";

export type StudentFeedPremiumQuickDashboardProps = {
  metrics?: FeedQuickDashboardMetrics;
};

export function StudentFeedPremiumQuickDashboard({
  metrics
}: StudentFeedPremiumQuickDashboardProps) {
  return (
    <div
      className="student-feed-premium-qd"
      data-pgs-module="student-feed-premium-quick-dashboard"
      data-figma-desktop="17041:10282"
      data-feed-family="premium"
      data-premium-pass="2-quick-dashboard"
      data-metrics={metrics ? "workspace" : "empty"}
    >
      <StudentFeedQuickDashboard
        unlocked
        uniApplied={metrics?.uniApplied ?? "00"}
        offersReceived={metrics?.offersReceived ?? "00"}
        tuitionUploaded={metrics?.tuitionUploaded ?? false}
        visaApplied={metrics?.visaApplied ?? false}
      />
    </div>
  );
}
