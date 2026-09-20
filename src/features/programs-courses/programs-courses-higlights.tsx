/**
 * Courses template — C10 #higlights.
 * Reuses shared PremiumHighlights (same Figma family / spelling as E10).
 * Desk `17072:11338` · Mob group `551:9553` (copy `551:9562` · photos `551:9554`).
 */
import { PremiumHighlights } from "../shared/premium-highlights/premium-highlights";
import "./programs-courses-higlights.css";

export function ProgramsCoursesHiglights() {
  return (
    <section
      id="pc-c10"
      className="pc-hl"
      data-pgs-module="programs-courses-higlights"
      data-block-gate="c10"
      data-figma-desktop="17072:11338"
      data-figma-mobile="551:9553"
      aria-label="Highlights"
    >
      <PremiumHighlights />
    </section>
  );
}
