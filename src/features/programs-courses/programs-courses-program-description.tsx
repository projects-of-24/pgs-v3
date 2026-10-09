/**
 * Courses template — C3 Program Description card.
 * Desk `17072:10678` · Mob `551:10175`.
 * Owned CSS. Fixtures only. iPad 601–1366 deferred.
 */
import type { ProgramsCoursesView } from "./courses-template-view";
import "./programs-courses-program-description.css";

type ProgramsCoursesProgramDescriptionProps = {
  data: ProgramsCoursesView["programDescription"];
};

export function ProgramsCoursesProgramDescription({
  data: c
}: ProgramsCoursesProgramDescriptionProps) {
  return (
    <section
      id="pc-c3"
      className="pc-prog-desc"
      data-block-gate="c3"
      data-figma-desktop="17072:10678"
      data-figma-mobile="551:10175"
      aria-labelledby="pc-c3-title"
    >
      <div className="pc-prog-desc__card">
        <div className="pc-prog-desc__row">
          <div className="pc-prog-desc__heading">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="pc-prog-desc__icon"
              src={c.icon}
              alt=""
              width={48}
              height={48}
              decoding="async"
            />
            <h2 id="pc-c3-title" className="pc-prog-desc__title">
              {c.titleLines.map((line) => (
                <span key={line} className="pc-prog-desc__title-line">
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <p className="pc-prog-desc__body">{c.body}</p>
        </div>
      </div>
    </section>
  );
}
