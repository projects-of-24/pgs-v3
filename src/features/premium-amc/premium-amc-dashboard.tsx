/**
 * Dashboard unlock. Next Figma block after the expense card.
 * Desktop `17084:12099` · phone `433:5203`.
 * Phone uses the same five labels. Arrows step one photo at a time.
 * Phone photos are separate from desktop. No motion.
 */
import { PremiumAmcDashboardDesk } from "./premium-amc-dashboard-desk";
import { PremiumAmcDashboardPhone } from "./premium-amc-dashboard-phone";
import "./premium-amc-dashboard.css";

export function PremiumAmcDashboard() {
  return (
    <section className="premium-amc-dashboard" data-pgs-module="premium-amc-dashboard" data-block-gate="u26">
      <h2 className="premium-amc-dashboard__title">
        Unlock the full power of your personalized dashboard with Purple Premium
      </h2>
      <PremiumAmcDashboardDesk />
      <PremiumAmcDashboardPhone />
    </section>
  );
}
