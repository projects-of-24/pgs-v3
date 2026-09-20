/**
 * #premiumUSMLE hero — U1.
 * Desktop headline `17055:12406` · mauve card `17055:12414`.
 * Mobile headline `433:4391` · card `433:4402`.
 * Owned CSS only. Bands >1366 desk · ≤600 phone · 601–1366 iPad saved card.
 * CTA is visual only — popup deferred.
 */
import { PREMIUM_USMLE_HERO } from "./content";
import "./premium-usmle-hero.css";

export function PremiumUsmleHero() {
  const c = PREMIUM_USMLE_HERO;

  return (
    <section
      className="premium-usmle-hero"
      data-pgs-module="premium-usmle-hero"
      data-block-gate="u1"
      data-popup-deferred="premium-usmle-call"
      aria-labelledby="premium-usmle-hero-title"
    >
      <div className="premium-usmle-hero__inner">
        <div className="premium-usmle-hero__headline">
          <h1 id="premium-usmle-hero-title" className="premium-usmle-hero__title">
            {c.title}
          </h1>
          <p className="premium-usmle-hero__lead">{c.lead}</p>
          <p className="premium-usmle-hero__subtitle">{c.subtitle}</p>
          <div className="premium-usmle-hero__cta-block">
            <button type="button" className="premium-usmle-hero__cta">
              {c.ctaLabel}
            </button>
            <p className="premium-usmle-hero__cta-hint">{c.ctaHint}</p>
          </div>
        </div>

        <div className="premium-usmle-hero__panel-wrap">
          <div className="premium-usmle-hero__panel">
            <div className="premium-usmle-hero__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="premium-usmle-hero__img"
                src={c.heroImageSrc}
                alt={c.heroImageAlt}
                width={629}
                height={343}
              />
            </div>
            <div className="premium-usmle-hero__panel-copy">
              <p className="premium-usmle-hero__panel-brand">
                <span className="premium-usmle-hero__panel-brand-line">{c.panelBrandLine1}</span>
                <span className="premium-usmle-hero__panel-brand-line">{c.panelBrandLine2}</span>
              </p>
              <p className="premium-usmle-hero__panel-tag">{c.panelTag}</p>
            </div>
          </div>
          <p className="premium-usmle-hero__trust">{c.trustLine}</p>
        </div>
      </div>
    </section>
  );
}
