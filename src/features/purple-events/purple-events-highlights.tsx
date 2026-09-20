/**
 * Purple Events — E10 #higlights.
 * Reuses shared PremiumHighlights (same Figma family / spelling).
 * Desk cluster `17071:14467` · mob `551:8135`.
 */
import { PremiumHighlights } from "../shared/premium-highlights/premium-highlights";
import "./purple-events-highlights.css";

export function PurpleEventsHighlights() {
  return (
    <section
      id="pe-e10"
      className="pe-hl"
      data-pgs-module="purple-events-highlights"
      data-block-gate="e10"
      data-figma-desktop="17071:14467"
      data-figma-mobile="551:8135"
      aria-label="Highlights"
    >
      <PremiumHighlights />
    </section>
  );
}
