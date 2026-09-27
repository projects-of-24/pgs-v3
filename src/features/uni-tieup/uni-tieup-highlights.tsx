/**
 * Uni Tie-up — UT4 #higlights.
 * Reuses shared PremiumHighlights (same Figma family / spelling).
 * Desk `17071:9481` · Mob group `524:7304`.
 * Partner CTA removed from Figma (no mob equivalent) — skipped.
 */
import { PremiumHighlights } from "../shared/premium-highlights/premium-highlights";
import "./uni-tieup-highlights.css";

export function UniTieupHighlights() {
  return (
    <section
      id="uni-tieup-ut4"
      className="uni-tieup-hl"
      data-pgs-module="uni-tieup-highlights"
      data-block-gate="ut4"
      data-figma-desktop="17071:9481"
      data-figma-mobile="524:7304"
      aria-label="Highlights"
    >
      <PremiumHighlights />
    </section>
  );
}
