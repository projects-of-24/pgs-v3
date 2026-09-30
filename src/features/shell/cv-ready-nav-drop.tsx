"use client";

/** H2 — #cvReadyPrograms desk dropdown */
import { HEADER_NAV } from "@/features/shell/header-nav";
import { HeaderTabDrop } from "@/features/shell/header-tab-drop";

export function CvReadyNavDrop() {
  return (
    <HeaderTabDrop
      label={HEADER_NAV.cvReady.label}
      items={HEADER_NAV.cvReady.items}
      liClassName="tab-cv"
      variant="premium"
    />
  );
}
