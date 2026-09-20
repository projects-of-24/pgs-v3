/**
 * explore Countries university discovery — E4.
 * Desktop `17056:19761` · Mobile `473:4836` + logos/collage under `466:7315`.
 * Page-local fork of Premium Home H7; reuses `premium-home/univ` assets.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: journey / bullets / connect mob type below 16px
 * ISSUE: below --pgs-type-floor 16px
 * PGS IMPLEMENTATION: text uses max(16px, Figma). Look unchanged.
 * Collage is a framed Figma export (complex absolute stack).
 */
import { EXPLORE_COUNTRIES_UNIV } from "./content";
import "./explore-countries-univ.css";

export function ExploreCountriesUniv() {
  const c = EXPLORE_COUNTRIES_UNIV;
  const list = c.logos.map((logo) => ({ name: logo.alt, src: logo.src }));
  const rows = Array.from({ length: c.logoRowCount }, (_, i) => i);

  return (
    <section
      className="explore-countries-univ"
      data-pgs-module="explore-countries-univ"
      data-block-gate="e4"
      data-figma-desktop="17056:19761"
      data-figma-mobile="473:4836"
      aria-labelledby="explore-countries-univ-title"
    >
      <div className="explore-countries-univ__panel">
        <div className="explore-countries-univ__intro">
          <h2
            id="explore-countries-univ-title"
            className="explore-countries-univ__title"
          >
            {c.title}
          </h2>
          <p className="explore-countries-univ__lead">{c.lead}</p>
          <p className="explore-countries-univ__journey">{c.journey}</p>
          <ul className="explore-countries-univ__bullets">
            {c.bullets.map((b) => (
              <li key={b}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="explore-countries-univ__bullet-check"
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

        <div
          className="explore-countries-univ__logos"
          aria-label="Partner universities"
        >
          {rows.map((row) => (
            <ul
              key={`explore-univ-row-${row}`}
              className="explore-countries-univ__logo-row"
            >
              {list.map((logo) => (
                <li
                  key={`${row}-${logo.name}`}
                  className="explore-countries-univ__logo-item"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="explore-countries-univ__logo"
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

        <p className="explore-countries-univ__paths">{c.paths}</p>

        <div className="explore-countries-univ__connect">
          <p className="explore-countries-univ__connect-copy explore-countries-univ__connect-copy--desk">
            {c.connectLines.map((line) => (
              <span
                key={line}
                className="explore-countries-univ__connect-line"
              >
                {line}
              </span>
            ))}
          </p>
          <p className="explore-countries-univ__connect-copy explore-countries-univ__connect-copy--mob">
            {c.connectMob}
          </p>
          <picture>
            <source media="(max-width: 600px)" srcSet={c.collageMobSrc} />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="explore-countries-univ__collage"
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
