"use client";

/** H2 — #cvForMedical desk dropdown */
import { HEADER_NAV } from "@/features/shell/header-nav";
import { HeaderTabDrop } from "@/features/shell/header-tab-drop";

export function CvMedicalNavDrop() {
  return (
    <HeaderTabDrop
      label={HEADER_NAV.cvMedical.label}
      items={HEADER_NAV.cvMedical.items}
      liClassName="tab-cv-medical"
      variant="premium"
    />
  );
}
