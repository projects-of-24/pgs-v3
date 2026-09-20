/**
 * purplePREMIUM HOME hero headline — H1.
 * Desktop `17052:8154` · Mobile `366:4076`.
 * Mauve panel is H2 — not this gate.
 * Owned CSS only. Bands >1366 desk · ≤600 phone · iPad deferred.
 * CTA is visual only — popup deferred.
 */
import { PREMIUM_HOME_HERO } from "./content";
import "./premium-home-hero.css";

export function PremiumHomeHero() {
  const c = PREMIUM_HOME_HERO;

  return (
    <section
      className="premium-home-hero"
      data-pgs-module="premium-home-hero"
      data-block-gate="h1"
      data-popup-deferred="premium-home-call"
      aria-labelledby="premium-home-hero-title"
    >
      <div className="premium-home-hero__inner">
        <div className="premium-home-hero__headline">
          <h1 id="premium-home-hero-title" className="premium-home-hero__title">
            {c.title}
          </h1>
          <p className="premium-home-hero__lead">{c.lead}</p>
          <p className="premium-home-hero__subtitle">{c.subtitle}</p>
          <div className="premium-home-hero__cta-block">
            <button type="button" className="premium-home-hero__cta">
              {c.ctaLabel}
            </button>
            <p className="premium-home-hero__cta-hint">{c.ctaHint}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
