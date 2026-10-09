/**
 * Courses template — C4 explore Program Highlights.
 * Desk `17072:10698` · Mob `551:9095` (2×2).
 * Owned CSS. Fixtures only. iPad 601–1366 deferred.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: body #3c4043 at 14px
 * ISSUE: near readable floor
 * PGS IMPLEMENTATION: keep Figma 14 for desk QC; floor sweep later
 */
import type { ProgramsCoursesView } from "./courses-template-view";
import "./programs-courses-highlights.css";

type ProgramsCoursesHighlightsProps = {
  data: ProgramsCoursesView["highlights"];
};

export function ProgramsCoursesHighlights({
  data: { title, items, icon }
}: ProgramsCoursesHighlightsProps) {
  return (
    <section
      id="pc-c4"
      className="pc-hl"
      data-block-gate="c4"
      data-figma-desktop="17072:10698"
      data-figma-mobile="551:9095"
      aria-labelledby="pc-c4-title"
    >
      <h2 id="pc-c4-title" className="pc-hl__title">
        {title}
      </h2>
      <ul className="pc-hl__grid">
        {items.map((item) => (
          <li key={item.num} className="pc-hl__item">
            <div className="pc-hl__head">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="pc-hl__icon"
                src={icon}
                alt=""
                width={48}
                height={48}
                decoding="async"
              />
              <span className="pc-hl__num">{item.num}</span>
            </div>
            <p className="pc-hl__body">{item.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
