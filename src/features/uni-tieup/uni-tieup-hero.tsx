/**
 * Uni Tie-up hero — UT2 (Partnership Impact panel).
 * Desk panel `17067:12096` · Mob stack `524:6689` + panel fill `524:6690`.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: desk CTA ~11.2px · mob body/stat copy 14px
 * ISSUE: below PGS type floor
 * PGS IMPLEMENTATION: CTA/body/stat labels ≥16px on both bands; layout stays Figma
 */
import { UNI_TIEUP_HERO } from "./content";
import "./uni-tieup-hero.css";

export function UniTieupHero() {
  const c = UNI_TIEUP_HERO;

  return (
    <section
      className="uni-tieup-hero"
      data-pgs-module="uni-tieup-hero"
      data-block-gate="ut2"
      data-figma-desktop="17067:12096"
      data-figma-mobile="524:6689"
      aria-labelledby="uni-tieup-hero-title"
    >
      <div className="uni-tieup-hero__panel">
        <div className="uni-tieup-hero__inner">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="uni-tieup-hero__icon"
            src={c.iconSrc}
            alt={c.iconAlt}
            width={44}
            height={43}
            decoding="async"
            aria-hidden="true"
          />

          <div className="uni-tieup-hero__copy">
            <h2 id="uni-tieup-hero-title" className="uni-tieup-hero__title">
              {c.titleLines.map((line) => (
                <span key={line} className="uni-tieup-hero__title-line">
                  {line}
                </span>
              ))}
            </h2>
            <p className="uni-tieup-hero__body">{c.body}</p>
            <a className="uni-tieup-hero__cta" href={c.ctaHref}>
              {c.cta}
            </a>
          </div>

          <div className="uni-tieup-hero__impact">
            <p className="uni-tieup-hero__impact-heading">{c.impactHeading}</p>
            <ul className="uni-tieup-hero__stats">
              {c.stats.map((stat) => (
                <li key={stat.value} className="uni-tieup-hero__stat">
                  <p className="uni-tieup-hero__stat-value">{stat.value}</p>
                  <p className="uni-tieup-hero__stat-label">
                    {stat.lines.map((line) => (
                      <span key={line}>{line}</span>
                    ))}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
