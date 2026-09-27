/**
 * CV Ready #StudentSupportHub — CR12.
 * Desk `19050:12181` · Mob `1312:8039`.
 * Reuses shared SupportHub (same family as `17056:21414` / phone `433:4717`).
 * Call + email are real links (shared lock).
 */
import { SupportHub } from "@/features/shared/support-hub/support-hub";
import "./cvready-program-support-hub.css";

export function CvreadyProgramSupportHub() {
  return (
    <div
      className="cvready-program-support-hub"
      data-pgs-module="cvready-program-support-hub"
      data-block-gate="cr12"
      data-figma-desktop="19050:12181"
      data-figma-mobile="1312:8039"
    >
      <SupportHub />
    </div>
  );
}
