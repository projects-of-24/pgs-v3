/**
 * #premiumUSMLE hero — U1.
 * Desktop headline `17055:12406` · mauve card `17055:12414`.
 * Mobile headline `433:4391` · card `433:4402`.
 * Owned CSS only. Bands >1366 desk · ≤600 phone · 601–1366 iPad saved card.
 * CTA is visual only — popup deferred.
 */
import { PREMIUM_AMC_HERO } from "./content";
import "./premium-amc-hero.css";

export function PremiumAmcHero() {
  const c = PREMIUM_AMC_HERO;

  return (
    <section
      className="premium-amc-hero"
      data-pgs-module="premium-amc-hero"
      data-block-gate="u1"
      data-popup-deferred="premium-amc-call"
      aria-labelledby="premium-amc-hero-title"
    >
      <div className="premium-amc-hero__inner">
        <div className="premium-amc-hero__headline">
          <h1 id="premium-amc-hero-title" className="premium-amc-hero__title">
            {c.title}
          </h1>
          <p className="premium-amc-hero__lead">{c.lead}</p>
          <p className="premium-amc-hero__subtitle">{c.subtitle}</p>
          <div className="premium-amc-hero__cta-block">
            <button type="button" className="premium-amc-hero__cta">
              {c.ctaLabel}
            </button>
            <p className="premium-amc-hero__cta-hint">{c.ctaHint}</p>
          </div>
        </div>

        <div className="premium-amc-hero__panel-wrap">
          <div className="premium-amc-hero__panel">
            <div className="premium-amc-hero__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="premium-amc-hero__img"
                src={c.heroImageSrc}
                alt={c.heroImageAlt}
                width={629}
                height={343}
              />
            </div>
            <div className="premium-amc-hero__panel-copy">
              <p className="premium-amc-hero__panel-brand">
                <span className="premium-amc-hero__panel-brand-line">{c.panelBrandLine1}</span>
                <span className="premium-amc-hero__panel-brand-line">{c.panelBrandLine2}</span>
              </p>
              <p className="premium-amc-hero__panel-tag">{c.panelTag}</p>
            </div>
          </div>
          <p className="premium-amc-hero__trust">{c.trustLine}</p>
        </div>
      </div>
    </section>
  );
}
