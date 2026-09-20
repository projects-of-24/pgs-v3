/**
 * #premiumUSMLE hero — U1.
 * Desktop headline `17055:12406` · mauve card `17055:12414`.
 * Mobile headline `433:4391` · card `433:4402`.
 * Owned CSS only. Bands >1366 desk · ≤600 phone · 601–1366 iPad saved card.
 * CTA is visual only — popup deferred.
 */
import { PREMIUM_PLAB_HERO } from "./content";
import "./premium-plab-hero.css";

export function PremiumPlabHero() {
  const c = PREMIUM_PLAB_HERO;

  return (
    <section
      className="premium-plab-hero"
      data-pgs-module="premium-plab-hero"
      data-block-gate="u1"
      data-popup-deferred="premium-plab-call"
      aria-labelledby="premium-plab-hero-title"
    >
      <div className="premium-plab-hero__inner">
        <div className="premium-plab-hero__headline">
          <h1 id="premium-plab-hero-title" className="premium-plab-hero__title">
            {c.title}
          </h1>
          <p className="premium-plab-hero__lead">{c.lead}</p>
          <p className="premium-plab-hero__subtitle">{c.subtitle}</p>
          <div className="premium-plab-hero__cta-block">
            <button type="button" className="premium-plab-hero__cta">
              {c.ctaLabel}
            </button>
            <p className="premium-plab-hero__cta-hint">{c.ctaHint}</p>
          </div>
        </div>

        <div className="premium-plab-hero__panel-wrap">
          <div className="premium-plab-hero__panel">
            <div className="premium-plab-hero__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="premium-plab-hero__img"
                src={c.heroImageSrc}
                alt={c.heroImageAlt}
                width={629}
                height={343}
              />
            </div>
            <div className="premium-plab-hero__panel-copy">
              <p className="premium-plab-hero__panel-brand">
                <span className="premium-plab-hero__panel-brand-line">{c.panelBrandLine1}</span>
                <span className="premium-plab-hero__panel-brand-line">{c.panelBrandLine2}</span>
              </p>
              <p className="premium-plab-hero__panel-tag">{c.panelTag}</p>
            </div>
          </div>
          <p className="premium-plab-hero__trust">{c.trustLine}</p>
        </div>
      </div>
    </section>
  );
}
