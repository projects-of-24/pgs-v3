/**
 * About Us hero — A1.
 * Desktop purple side `17057:13526` · #PGS note `17057:12439`.
 * Mobile opening `508:8366` · panel wrap `508:8376`.
 * Owned CSS only. Bands >1366 desk · ≤600 mob · 601–1366 iPad saved card (not a live ×1.4).
 * Reuses premium-panel size tokens (mauve panel family).
 */
import { ABOUT_HERO } from "./content";
import "./about-hero.css";

export function AboutHero() {
  const c = ABOUT_HERO;

  return (
    <section
      className="about-hero"
      data-pgs-module="about-hero"
      data-block-gate="a1"
      aria-labelledby="about-hero-title"
    >
      <div className="about-hero__inner">
        <p className="about-hero__opening">{c.opening}</p>

        <div className="about-hero__stage">
          <div className="about-hero__panel-wrap">
            <div className="about-hero__panel">
              <div className="about-hero__media">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="about-hero__img"
                  src={c.heroImageSrc}
                  alt={c.heroImageAlt}
                  width={629}
                  height={343}
                />
              </div>
              <div className="about-hero__panel-copy">
                <h1 id="about-hero-title" className="about-hero__panel-brand">
                  <span className="about-hero__panel-brand-line">
                    {c.panelBrandLine1}
                  </span>
                  <span className="about-hero__panel-brand-line">
                    {c.panelBrandLine2}
                  </span>
                </h1>
                <p className="about-hero__panel-tag">{c.panelTag}</p>
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="about-hero__arrow about-hero__arrow--desk"
                src={c.arrowSrc}
                alt=""
                width={153}
                height={153}
                aria-hidden="true"
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="about-hero__arrow about-hero__arrow--mob"
                src={c.arrowSrc}
                alt=""
                width={61}
                height={61}
                aria-hidden="true"
              />
              <p className="about-hero__pgs-note">{c.pgsNote}</p>
            </div>
            <p className="about-hero__trust">{c.trustLine}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
