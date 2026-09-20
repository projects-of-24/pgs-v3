/**
 * Dashboard unlock. Next Figma block after the expense card.
 * Desktop `17084:12099` · phone `433:5203`.
 * Phone uses the same five labels. Arrows step one photo at a time.
 * Phone photos are separate from desktop. No motion.
 */
import { PremiumUsmleDashboardDesk } from "./premium-usmle-dashboard-desk";
import { PremiumUsmleDashboardPhone } from "./premium-usmle-dashboard-phone";
import "./premium-usmle-dashboard.css";

export function PremiumUsmleDashboard() {
  return (
    <section className="premium-usmle-dashboard" data-pgs-module="premium-usmle-dashboard" data-block-gate="u26">
      <h2 className="premium-usmle-dashboard__title">
        Unlock the full power of your personalized dashboard with Purple Premium
      </h2>
      <PremiumUsmleDashboardDesk />
      <PremiumUsmleDashboardPhone />
    </section>
  );
}
