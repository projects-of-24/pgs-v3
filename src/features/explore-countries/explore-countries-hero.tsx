/**
 * explore Countries hero headline — E1.
 * Desktop `17056:19552` · Mobile `466:7910`.
 * Owned CSS only. Bands >1366 desk · ≤600 phone · iPad deferred.
 * CTA is visual only — popup deferred.
 */
import { EXPLORE_COUNTRIES_HERO } from "./content";
import "./explore-countries-hero.css";

export function ExploreCountriesHero() {
  const c = EXPLORE_COUNTRIES_HERO;

  return (
    <section
      className="explore-countries-hero"
      data-pgs-module="explore-countries-hero"
      data-block-gate="e1"
      data-popup-deferred="explore-countries-call"
      aria-labelledby="explore-countries-hero-title"
    >
      <div className="explore-countries-hero__inner">
        <div className="explore-countries-hero__headline">
          <h1
            id="explore-countries-hero-title"
            className="explore-countries-hero__title"
          >
            {c.title}
          </h1>
          <p className="explore-countries-hero__lead">{c.lead}</p>
          <p className="explore-countries-hero__subtitle">{c.subtitle}</p>
          <div className="explore-countries-hero__cta-block">
            <button type="button" className="explore-countries-hero__cta">
              {c.ctaLabel}
            </button>
            <p className="explore-countries-hero__cta-hint">{c.ctaHint}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
