/**
 * Dashboard unlock. Next Figma block after the expense card.
 * Desktop `17084:12099` · phone `433:5203`.
 * Phone uses the same five labels. Arrows step one photo at a time.
 * Phone photos are separate from desktop. No motion.
 */
import { PremiumPlabDashboardDesk } from "./premium-plab-dashboard-desk";
import { PremiumPlabDashboardPhone } from "./premium-plab-dashboard-phone";
import "./premium-plab-dashboard.css";

export function PremiumPlabDashboard() {
  return (
    <section className="premium-plab-dashboard" data-pgs-module="premium-plab-dashboard" data-block-gate="u26">
      <h2 className="premium-plab-dashboard__title">
        Unlock the full power of your personalized dashboard with Purple Premium
      </h2>
      <PremiumPlabDashboardDesk />
      <PremiumPlabDashboardPhone />
    </section>
  );
}
