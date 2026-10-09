/**
 * Dashboard unlock. Next Figma block after the expense card.
 * Desktop `17084:12099` · phone `433:5203`.
 * Shared index so iPad can show desk photo + points + phone arrows together.
 */
"use client";

import { useState } from "react";
import { PremiumPlabDashboardDesk } from "./premium-plab-dashboard-desk";
import { PremiumPlabDashboardPhone } from "./premium-plab-dashboard-phone";
import { PREMIUM_PLAB_DASHBOARD_POINTS } from "./premium-plab-dashboard-points";
import "./premium-plab-dashboard.css";

export function PremiumPlabDashboard() {
  const [index, setIndex] = useState(0);
  const last = PREMIUM_PLAB_DASHBOARD_POINTS.length - 1;

  return (
    <section className="premium-plab-dashboard" data-pgs-module="premium-plab-dashboard" data-block-gate="u26">
      <h2 className="premium-plab-dashboard__title">
        Unlock the full power of your personalized dashboard with Purple Premium
      </h2>
      <PremiumPlabDashboardDesk index={index} onIndexChange={setIndex} />
      <PremiumPlabDashboardPhone
        index={index}
        onPrev={() => setIndex((current) => Math.max(0, current - 1))}
        onNext={() => setIndex((current) => Math.min(last, current + 1))}
      />
    </section>
  );
}
