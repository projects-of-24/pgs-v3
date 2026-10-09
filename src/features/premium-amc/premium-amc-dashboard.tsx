/**
 * Dashboard unlock. Next Figma block after the expense card.
 * Desktop `17084:12099` · phone `433:5203`.
 * Shared index so iPad can show desk photo + points + phone arrows together.
 */
"use client";

import { useState } from "react";
import { PremiumAmcDashboardDesk } from "./premium-amc-dashboard-desk";
import { PremiumAmcDashboardPhone } from "./premium-amc-dashboard-phone";
import { PREMIUM_AMC_DASHBOARD_POINTS } from "./premium-amc-dashboard-points";
import "./premium-amc-dashboard.css";

export function PremiumAmcDashboard() {
  const [index, setIndex] = useState(0);
  const last = PREMIUM_AMC_DASHBOARD_POINTS.length - 1;

  return (
    <section className="premium-amc-dashboard" data-pgs-module="premium-amc-dashboard" data-block-gate="u26">
      <h2 className="premium-amc-dashboard__title">
        Unlock the full power of your personalized dashboard with Purple Premium
      </h2>
      <PremiumAmcDashboardDesk index={index} onIndexChange={setIndex} />
      <PremiumAmcDashboardPhone
        index={index}
        onPrev={() => setIndex((current) => Math.max(0, current - 1))}
        onNext={() => setIndex((current) => Math.min(last, current + 1))}
      />
    </section>
  );
}
