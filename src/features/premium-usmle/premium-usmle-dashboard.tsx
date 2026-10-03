/**
 * Dashboard unlock. Next Figma block after the expense card.
 * Desktop `17084:12099` · phone `433:5203`.
 * Phone uses the same five labels. Arrows step one photo at a time.
 * Phone photos are separate from desktop. No motion.
 * Shared index so iPad can show desk photo + points + phone arrows together.
 */
"use client";

import { useState } from "react";
import { PremiumUsmleDashboardDesk } from "./premium-usmle-dashboard-desk";
import { PremiumUsmleDashboardPhone } from "./premium-usmle-dashboard-phone";
import { PREMIUM_USMLE_DASHBOARD_POINTS } from "./premium-usmle-dashboard-points";
import "./premium-usmle-dashboard.css";

export function PremiumUsmleDashboard() {
  const [index, setIndex] = useState(0);
  const last = PREMIUM_USMLE_DASHBOARD_POINTS.length - 1;

  return (
    <section className="premium-usmle-dashboard" data-pgs-module="premium-usmle-dashboard" data-block-gate="u26">
      <h2 className="premium-usmle-dashboard__title">
        Unlock the full power of your personalized dashboard with Purple Premium
      </h2>
      <PremiumUsmleDashboardDesk index={index} onIndexChange={setIndex} />
      <PremiumUsmleDashboardPhone
        index={index}
        onPrev={() => setIndex((current) => Math.max(0, current - 1))}
        onNext={() => setIndex((current) => Math.min(last, current + 1))}
      />
    </section>
  );
}
