"use client";

/** H2 — #purplePremium desk dropdown */
import { HEADER_NAV } from "@/features/shell/header-nav";
import { HeaderTabDrop } from "@/features/shell/header-tab-drop";

export function PremiumNavDrop() {
  return (
    <HeaderTabDrop
      label={HEADER_NAV.premium.label}
      items={HEADER_NAV.premium.items}
      liClassName="tab-premium"
      variant="premium"
    />
  );
}
