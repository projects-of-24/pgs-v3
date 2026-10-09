/**
 * Courses template — C1 Program hero.
 * Desk Figma `17072:10543` · Mob `551:9021` (+ title `551:9038`).
 * Owned CSS. Fixtures only. Book CTA visual when bookingUrl empty.
 * Mob: shell pull aligns photo top with closed #toggleBtn (Lite pattern).
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: meta #666 · partnership/note ~12–14px · date times ~11–12px
 * ISSUE: muted gray borderline AA; type below readable floor
 * PGS IMPLEMENTATION: muted #555 · body/meta ≥15px where practical
 */
import type { ProgramsCoursesHeroData } from "./courses-template-view";
import "./programs-courses-hero.css";

type ProgramsCoursesHeroProps = {
  data: ProgramsCoursesHeroData;
};

export function ProgramsCoursesHero({ data: c }: ProgramsCoursesHeroProps) {
  const bookingHref = c.bookingUrl.trim();

  return (
    <section
      id="pc-c1"
      className="pc-hero"
      data-pgs-module="programs-courses-hero"
      data-block-gate="c1"
      data-figma-desktop="17072:10543"
      data-figma-mobile="551:9021"
      aria-labelledby="pc-hero-title"
    >
      <div className="pc-hero__panel">
        <div className="pc-hero__media-col">
          <div className="pc-hero__media">
            <div className="pc-hero__img-clip">
              {c.heroImage.trim() ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  className="pc-hero__img"
                  src={c.heroImage}
                  alt={c.heroImageAlt || c.titleLines.join(" ")}
                  width={337}
                  height={512}
                />
              ) : (
                <div
                  className="pc-hero__img pc-hero__img--empty"
                  role="img"
                  aria-label={c.heroImageAlt || "No course image uploaded yet"}
                />
              )}
            </div>
            <div className="pc-hero__media-badges">
              <div className="pc-hero__badge-stack">
                {c.fillingBadge.trim() ? (
                  <span className="pc-hero__filling">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      className="pc-hero__filling-icon"
                      src={c.fillingIcon}
                      alt=""
                      width={13}
                      height={16}
                    />
                    {c.fillingBadge}
                  </span>
                ) : null}
                {c.modeLabel.trim() ? (
                  <span className="pc-hero__mode pc-hero__mode--on-media">
                    {c.modeLabel}
                  </span>
                ) : null}
              </div>
              <button
                type="button"
                className="pc-hero__share pc-hero__share--on-media"
                aria-label="Share this program"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.shareIcon} alt="" width={26} height={26} />
              </button>
            </div>
            <div className="pc-hero__partner">
              {c.partnerLogo.trim() ? (
                <div className="pc-hero__logo-plate">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="pc-hero__logo"
                    src={c.partnerLogo}
                    alt={c.heroImageAlt || "Partner logo"}
                    width={149}
                    height={61}
                  />
                </div>
              ) : null}
              <dl className="pc-hero__meta">
                <div className="pc-hero__meta-item">
                  <dt>{c.typeLabel}</dt>
                  <dd>{c.typeValue || "—"}</dd>
                </div>
                <div className="pc-hero__meta-item">
                  <dt>{c.durationLabel}</dt>
                  <dd>{c.durationValue || "—"}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="pc-hero__top-row">
          {c.modeLabel.trim() ? (
            <span className="pc-hero__mode pc-hero__mode--desk">{c.modeLabel}</span>
          ) : (
            <span className="pc-hero__mode pc-hero__mode--desk" aria-hidden="true" />
          )}
          <button
            type="button"
            className="pc-hero__share pc-hero__share--desk"
            aria-label="Share this program"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.shareIcon} alt="" width={26} height={26} />
          </button>
        </div>

        <div className="pc-hero__content">
          <div className="pc-hero__headline">
            <h1 id="pc-hero-title" className="pc-hero__title">
              {c.titleLines.map((line) => (
                <span key={line} className="pc-hero__title-line">
                  {line}
                </span>
              ))}
            </h1>
          </div>

          <p className="pc-hero__partnership">{c.partnership}</p>

          <div className="pc-hero__mid">
            <div className="pc-hero__dates" aria-label="Program dates">
              <div className="pc-hero__date-col">
                <div className="pc-hero__date-box">
                  <span className="pc-hero__date-day">{c.start.day}</span>
                  <span className="pc-hero__date-month">
                    <span>{c.start.month}</span>
                    <span>{c.start.year}</span>
                  </span>
                </div>
                <p className="pc-hero__date-time">{c.start.time}</p>
              </div>
              <div className="pc-hero__date-col">
                <div className="pc-hero__date-box">
                  <span className="pc-hero__date-day">{c.end.day}</span>
                  <span className="pc-hero__date-month">
                    <span>{c.end.month}</span>
                    <span>{c.end.year}</span>
                  </span>
                </div>
                <p className="pc-hero__date-time">{c.end.time}</p>
              </div>
            </div>

            <div className="pc-hero__who">
              <p className="pc-hero__who-title">{c.whoIsItFor}</p>
              <p className="pc-hero__who-note">{c.whoForNote}</p>
            </div>

            <ul className="pc-hero__tags">
              {c.tags.map((tag) => (
                <li key={tag} className="pc-hero__tag">
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          {bookingHref ? (
            <a className="pc-hero__cta" href={bookingHref}>
              {c.bookingCta}
            </a>
          ) : (
            <button type="button" className="pc-hero__cta">
              {c.bookingCta}
            </button>
          )}

          {c.locationNote.trim() ? (
            <p className="pc-hero__location">
              <span aria-hidden="true">📍 </span>
              {c.locationNote}
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}
