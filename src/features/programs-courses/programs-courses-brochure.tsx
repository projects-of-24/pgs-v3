/**
 * Courses template — C6 brochure download plate.
 * Desk `17072:11029` · Mob `551:10282` (stacked badge under CTA).
 * Owned CSS. Fixtures only. iPad 601–1366 deferred.
 */
import type { ProgramsCoursesView } from "./courses-template-view";
import "./programs-courses-brochure.css";

type ProgramsCoursesBrochureProps = {
  data: ProgramsCoursesView["brochure"];
};

export function ProgramsCoursesBrochure({
  data: b
}: ProgramsCoursesBrochureProps) {  const hasUrl = Boolean(b.downloadUrl);

  return (
    <section
      id="pc-c6"
      className="pc-brochure"
      data-block-gate="c6"
      data-figma-desktop="17072:11029"
      data-figma-mobile="551:10282"
      aria-labelledby="pc-c6-title"
    >
      <div className="pc-brochure__plate">
        <div className="pc-brochure__row">
          <div className="pc-brochure__copy">
            <div className="pc-brochure__titles">
              <h2 id="pc-c6-title" className="pc-brochure__title">
                {b.title}
              </h2>
              <p className="pc-brochure__subtitle">{b.subtitle}</p>
            </div>
            {hasUrl ? (
              <a className="pc-brochure__cta" href={b.downloadUrl}>
                {b.ctaLabel}
              </a>
            ) : (
              <button type="button" className="pc-brochure__cta" disabled>
                {b.ctaLabel}
              </button>
            )}
          </div>
          <div className="pc-brochure__badge" aria-hidden="true">
            <span className="pc-brochure__badge-icon">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={b.translateIcon}
                alt=""
                width={22}
                height={22}
                decoding="async"
              />
            </span>
            <span className="pc-brochure__badge-label">{b.badgeLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
