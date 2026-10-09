/**
 * Courses template — C10 #higlights.
 * Reuses shared PremiumHighlights (same Figma family / spelling as E10).
 * Desk `17072:11338` · Mob group `551:9553` (copy `551:9562` · photos `551:9554`).
 * COURSE2d-D3: prop-driven from course.higlights (CMS editable photos).
 */
import { PremiumHighlights } from "../shared/premium-highlights/premium-highlights";
import type { PremiumHighlightsData } from "../shared/premium-highlights/content";
import "./programs-courses-higlights.css";

type ProgramsCoursesHiglightsProps = {
  data: PremiumHighlightsData;
};

export function ProgramsCoursesHiglights({ data }: ProgramsCoursesHiglightsProps) {
  const photoCount = data.photos.filter((photo) => photo.src.trim()).length;

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
      <PremiumHighlights data={data} />
      {photoCount > 4 ? (
        <p className="pc-hl__scroll-hint">
          Scroll the photo row right to see all {photoCount} photos
        </p>
      ) : null}
    </section>
  );
}
