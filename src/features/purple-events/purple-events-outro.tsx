/**
 * Purple Events — E12 Outro CTA.
 * Reuses shared OutroCta (same Figma family as `17120:10437`).
 * Desk `17120:10445` · mob `551:8155`.
 * Visual button only — no destination (shared lock).
 */
import { OutroCta } from "../shared/outro-cta/outro-cta";
import "./purple-events-outro.css";

export function PurpleEventsOutro() {
  return (
    <div
      id="pe-e12"
      className="pe-outro"
      data-pgs-module="purple-events-outro"
      data-block-gate="e12"
      data-figma-desktop="17120:10445"
      data-figma-mobile="551:8155"
    >
      <OutroCta />
    </div>
  );
}
