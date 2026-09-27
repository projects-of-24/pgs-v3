/**
 * CV Ready OutroCta — CR11.
 * Desk `19050:12174` · Mob `1312:8032`.
 * Reuses shared OutroCta (same family as `17120:10437`).
 * Visual button only — no destination (shared lock).
 */
import { OutroCta } from "@/features/shared/outro-cta/outro-cta";
import "./cvready-program-outro.css";

export function CvreadyProgramOutro() {
  return (
    <div
      className="cvready-program-outro"
      data-pgs-module="cvready-program-outro"
      data-block-gate="cr11"
      data-figma-desktop="19050:12174"
      data-figma-mobile="1312:8032"
    >
      <OutroCta />
    </div>
  );
}
