/**
 * purplePREMIUM HOME university discovery — H7.
 * Desktop `17052:8319` · Mobile `473:5530`.
 * Logos: CMS-ready props (+ fixture). Table wire = separate W1.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: journey / bullets / connect mob type below 16px
 * ISSUE: below --pgs-type-floor 16px
 * PGS IMPLEMENTATION: text uses max(16px, Figma). Look unchanged.
 * Collage is a framed Figma export (complex absolute stack).
 */
import { PREMIUM_HOME_UNIV } from "./content";
import type { PremiumHomeUnivLogo } from "./get-premium-home-univ-logos";
import "./premium-home-univ.css";

type PremiumHomeUnivProps = {
  logos?: readonly PremiumHomeUnivLogo[];
};

export function PremiumHomeUniv({ logos }: PremiumHomeUnivProps) {
  const c = PREMIUM_HOME_UNIV;
  const list =
    logos && logos.length > 0
      ? logos
      : c.logos.map((logo) => ({ name: logo.alt, src: logo.src }));
  const rows = Array.from({ length: c.logoRowCount }, (_, i) => i);

  return (
    <section
      className="premium-home-univ"
      data-pgs-module="premium-home-univ"
      data-block-gate="h7"
      data-figma-desktop="17052:8319"
      data-figma-mobile="473:5530"
      aria-labelledby="premium-home-univ-title"
    >
      <div className="premium-home-univ__panel">
        <div className="premium-home-univ__intro">
          <h2 id="premium-home-univ-title" className="premium-home-univ__title">
            {c.title}
          </h2>
          <p className="premium-home-univ__lead">{c.lead}</p>
          <p className="premium-home-univ__journey">{c.journey}</p>
          <ul className="premium-home-univ__bullets">
            {c.bullets.map((b) => (
              <li key={b}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="premium-home-univ__bullet-check"
                  src={c.bulletCheckSrc}
                  alt=""
                  width={14}
                  height={14}
                  aria-hidden="true"
                />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="premium-home-univ__logos" aria-label="Partner universities">
          {rows.map((row) => (
            <ul key={`univ-row-${row}`} className="premium-home-univ__logo-row">
              {list.map((logo) => (
                <li
                  key={`${row}-${logo.name}`}
                  className="premium-home-univ__logo-item"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="premium-home-univ__logo"
                    src={logo.src}
                    alt={row === 0 ? logo.name : ""}
                    width={28}
                    height={28}
                  />
                </li>
              ))}
            </ul>
          ))}
        </div>

        <p className="premium-home-univ__paths">{c.paths}</p>

        <div className="premium-home-univ__connect">
          <p className="premium-home-univ__connect-copy premium-home-univ__connect-copy--desk">
            {c.connectLines.map((line) => (
              <span key={line} className="premium-home-univ__connect-line">
                {line}
              </span>
            ))}
          </p>
          <p className="premium-home-univ__connect-copy premium-home-univ__connect-copy--mob">
            {c.connectMob}
          </p>
          <picture>
            <source media="(max-width: 600px)" srcSet={c.collageMobSrc} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="premium-home-univ__collage"
              src={c.collageSrc}
              alt={c.collageAlt}
              width={470}
              height={282}
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
