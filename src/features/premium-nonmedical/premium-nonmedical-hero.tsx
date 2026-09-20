/**
 * #premiumNonMedical hero — N1 desktop only.
 * Desktop headline `17055:10568` · mauve card `17055:11122`.
 * Phone headline `375:4093` · mauve card `375:4103`.
 * Owned CSS only. Later blocks are not this gate.
 * CTA is visual only — popup deferred.
 */
import { PREMIUM_NONMEDICAL_HERO } from "./content";
import "./premium-nonmedical-hero.css";

export function PremiumNonmedicalHero() {
  const c = PREMIUM_NONMEDICAL_HERO;

  return (
    <section
      className="premium-nonmedical-hero"
      data-pgs-module="premium-nonmedical-hero"
      data-block-gate="n1"
      data-popup-deferred="premium-nonmedical-call"
      aria-labelledby="premium-nonmedical-hero-title"
    >
      <div className="premium-nonmedical-hero__inner">
        <div className="premium-nonmedical-hero__headline">
          <h1 id="premium-nonmedical-hero-title" className="premium-nonmedical-hero__title">
            <span className="premium-nonmedical-hero__title-line">{c.titleLine1}</span>
            <span className="premium-nonmedical-hero__title-line">{c.titleLine2}</span>
          </h1>
          <p className="premium-nonmedical-hero__lead">{c.lead}</p>
          <p className="premium-nonmedical-hero__subtitle">{c.subtitle}</p>
          <div className="premium-nonmedical-hero__cta-block">
            <button type="button" className="premium-nonmedical-hero__cta">
              {c.ctaLabel}
            </button>
            <p className="premium-nonmedical-hero__cta-hint">{c.ctaHint}</p>
          </div>
        </div>

        <div className="premium-nonmedical-hero__panel-wrap">
          <div className="premium-nonmedical-hero__panel">
            <div className="premium-nonmedical-hero__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="premium-nonmedical-hero__img"
                src={c.heroImageSrc}
                alt={c.heroImageAlt}
                width={629}
                height={343}
              />
            </div>
            <div className="premium-nonmedical-hero__panel-copy">
              <p className="premium-nonmedical-hero__panel-brand">
                <span className="premium-nonmedical-hero__panel-brand-line">{c.panelBrandLine1}</span>
                <span className="premium-nonmedical-hero__panel-brand-line">{c.panelBrandLine2}</span>
              </p>
              <p className="premium-nonmedical-hero__panel-tag">
                <span className="premium-nonmedical-hero__panel-tag-desk">
                  <span className="premium-nonmedical-hero__panel-tag-line">{c.panelTagLine1}</span>
                  <span className="premium-nonmedical-hero__panel-tag-line">{c.panelTagLine2}</span>
                </span>
                <span className="premium-nonmedical-hero__panel-tag-phone">{c.panelTagPhone}</span>
              </p>
            </div>
          </div>
          <p className="premium-nonmedical-hero__trust">{c.trustLine}</p>
        </div>
      </div>
    </section>
  );
}
