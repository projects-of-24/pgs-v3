/**
 * USMLE Rotation hero — Figma V6 Section 1.
 * Desktop: 18760:12302 · Mobile title: 18760:11359 · Mobile stats: 18760:11363
 * Scoped CSS bands: >1366 · 601–1366 · ≤600. Live /usmlerotation untouched.
 */
import { USMLE_ROTATION_HERO } from "./content";
import "./usmle-rotation-hero.css";

const CHECK = "/assets/img/usmlerotation/check-green.svg";
const LIGHTNING = "/assets/img/usmlerotation/lightning.svg";

export function UsmleRotationHero() {
  const c = USMLE_ROTATION_HERO;

  return (
    <div
      className="usmle-hero"
      data-pgs-module="usmle-rotation-hero"
      role="region"
      aria-label="USA Clinical Rotations"
    >
      <div className="usmle-hero__card">
        <div className="usmle-hero__lead">
          <div className="usmle-hero__title-block">
            <div className="usmle-hero__title-row">
              <h1 className="usmle-hero__title">{c.title}</h1>
              <p className="usmle-hero__with">{c.withPgs}</p>
            </div>
            <p className="usmle-hero__subtitle">{c.subtitle}</p>
          </div>

          <div className="usmle-hero__stats" role="group" aria-label={c.joinHeading}>
            <p className="usmle-hero__stats-heading">{c.joinHeading}</p>
            <div className="usmle-hero__stats-row">
              {c.stats.map((stat) => (
                <div key={stat.label} className="usmle-hero__stat">
                  <p className="usmle-hero__stat-value">{stat.value}</p>
                  <p className="usmle-hero__stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="usmle-hero__cta-block">
            <button type="button" className="usmle-hero__cta">
              {c.ctaLabel}
            </button>
            <ul className="usmle-hero__guarantees">
              {c.guarantees.map((item) => (
                <li key={item} className="usmle-hero__guarantee">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={CHECK} alt="" width={14} height={14} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="usmle-hero__stories" aria-label={c.storiesHeading}>
          <p className="usmle-hero__stories-heading">{c.storiesHeading}</p>
          <ul className="usmle-hero__story-list">
            {c.stories.map((story, i) => (
              <li
                key={`${story.name}-${i}`}
                className="usmle-hero__story"
              >
                <p className="usmle-hero__story-name">{story.name}</p>
                <p className="usmle-hero__story-meta">
                  <span>{story.specialty}</span>
                  <span className="usmle-hero__story-arrow" aria-hidden="true">
                    →
                  </span>
                  <span>{story.institution}</span>
                </p>
              </li>
            ))}
          </ul>
          <p className="usmle-hero__ticker">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="usmle-hero__ticker-icon"
              src={LIGHTNING}
              alt=""
              width={14}
              height={14}
            />
            <span className="usmle-hero__ticker-text usmle-hero__ticker-text--split">
              <span>{c.tickerLine1}</span>
              <span>{c.tickerLine2}</span>
            </span>
            <span className="usmle-hero__ticker-text usmle-hero__ticker-text--combined">
              {c.tickerCombined}
            </span>
          </p>
        </aside>
      </div>
    </div>
  );
}
