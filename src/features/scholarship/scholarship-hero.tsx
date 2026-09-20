/**
 * Scholarship hero — S1.
 * Desktop: headline `17041:18728` · purple side `17041:19030`.
 * Mobile: headline `323:3413` · card `325:3467`.
 * Owned CSS only. Bands >1366 · ≤600; iPad deferred.
 * Book CTA is visual only — popup deferred to **popup pass**.
 */
import { SCHOLARSHIP_HERO } from "./content";
import "./scholarship-hero.css";

export function ScholarshipHero() {
  const c = SCHOLARSHIP_HERO;

  return (
    <section
      className="scholarship-hero"
      data-pgs-module="scholarship-hero"
      data-block-gate="s1"
      data-popup-deferred="scholarship-book"
      aria-labelledby="scholarship-hero-title"
    >
      <div className="scholarship-hero__inner">
        <div className="scholarship-hero__headline">
          <h1 id="scholarship-hero-title" className="scholarship-hero__title">
            {c.title}
          </h1>
          <p className="scholarship-hero__lead">{c.lead}</p>
          <p className="scholarship-hero__subtitle scholarship-hero__subtitle--desktop">
            {c.subtitleDesktop}
          </p>
          <p className="scholarship-hero__subtitle scholarship-hero__subtitle--mobile">
            {c.subtitleMobile}
          </p>
          <div className="scholarship-hero__cta-block">
            <button type="button" className="scholarship-hero__cta">
              {c.ctaLabel}
            </button>
            <p className="scholarship-hero__cta-hint">{c.ctaHint}</p>
          </div>
        </div>

        <div className="scholarship-hero__panel-wrap">
          <div className="scholarship-hero__panel">
            <div className="scholarship-hero__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="scholarship-hero__img"
                src={c.heroImageSrc}
                alt={c.heroImageAlt}
                width={629}
                height={343}
              />
            </div>
            <div className="scholarship-hero__panel-copy">
              <p className="scholarship-hero__panel-brand">
                <span className="scholarship-hero__panel-brand-line">
                  {c.panelBrandLine1}
                </span>
                <span className="scholarship-hero__panel-brand-line">
                  {c.panelBrandLine2}
                </span>
              </p>
              <p className="scholarship-hero__panel-tag">{c.panelTag}</p>
            </div>
          </div>
          <p className="scholarship-hero__trust">{c.trustLine}</p>
        </div>
      </div>
    </section>
  );
}
