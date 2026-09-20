/**
 * explore Countries bento — E3 + E3b.
 * E3 desktop `17056:19564` · E3 mob `470:4751`.
 * E3b desktop `17056:19720` · E3 mob `471:4781` — same core, no lilac explore strip.
 */
import { EXPLORE_COUNTRIES_BENTO } from "./content";
import "./explore-countries-bento.css";

function BentoChip({
  line1,
  plusDesk,
  plusMob,
  line2
}: {
  line1: string;
  plusDesk: string;
  plusMob: string;
  line2: string;
}) {
  return (
    <div className="explore-countries-bento__chip">
      <p className="explore-countries-bento__chip-line">{line1}</p>
      <p className="explore-countries-bento__chip-plus explore-countries-bento__chip-plus--desk">
        {plusDesk}
      </p>
      <p className="explore-countries-bento__chip-plus explore-countries-bento__chip-plus--mob">
        {plusMob}
      </p>
      <p className="explore-countries-bento__chip-line">{line2}</p>
    </div>
  );
}

function BentoChecks({
  items,
  band
}: {
  items: readonly string[];
  band: "desk" | "mob";
}) {
  return (
    <ul
      className={`explore-countries-bento__checks explore-countries-bento__checks--${band}`}
    >
      {items.map((item) => (
        <li key={`${band}-${item}`} className="explore-countries-bento__check">
          <span
            className="explore-countries-bento__check-mark"
            aria-hidden="true"
          />
          <span className="explore-countries-bento__check-text">{item}</span>
        </li>
      ))}
    </ul>
  );
}

type BentoVariant = "e3" | "e3b";

function ExploreCountriesBentoBlock({
  variant,
  gate,
  moduleName,
  titleId,
  figmaDesktop,
  figmaMobile
}: {
  variant: BentoVariant;
  gate: string;
  moduleName: string;
  titleId: string;
  figmaDesktop: string;
  figmaMobile: string;
}) {
  const b = EXPLORE_COUNTRIES_BENTO;
  const showExplore = variant === "e3";

  return (
    <section
      className={
        variant === "e3b"
          ? "explore-countries-bento explore-countries-bento--e3b"
          : "explore-countries-bento"
      }
      data-pgs-module={moduleName}
      data-block-gate={gate}
      data-figma-desktop={figmaDesktop}
      data-figma-mobile={figmaMobile}
      aria-labelledby={titleId}
    >
      <div className="explore-countries-bento__stage">
        <div className="explore-countries-bento__panel" aria-hidden="true" />

        <div className="explore-countries-bento__col explore-countries-bento__col--cards">
          <article className="explore-countries-bento__card explore-countries-bento__card--shortlist">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="explore-countries-bento__card-icon"
              src={b.shortlist.iconSrc}
              alt={b.shortlist.iconAlt}
              aria-hidden="true"
            />
            <BentoChip
              line1={b.shortlist.line1}
              plusDesk={b.shortlist.plusDesk}
              plusMob={b.shortlist.plusMob}
              line2={b.shortlist.line2}
            />
          </article>

          <article className="explore-countries-bento__card explore-countries-bento__card--apps">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="explore-countries-bento__card-icon"
              src={b.applications.iconSrc}
              alt={b.applications.iconAlt}
              aria-hidden="true"
            />
            <BentoChip
              line1={b.applications.line1}
              plusDesk={b.applications.plusDesk}
              plusMob={b.applications.plusMob}
              line2={b.applications.line2}
            />
          </article>
        </div>

        <div className="explore-countries-bento__col explore-countries-bento__col--right">
          <div className="explore-countries-bento__copy">
            <h2 id={titleId} className="explore-countries-bento__title">
              {b.title}
            </h2>
            <p className="explore-countries-bento__body">{b.body}</p>
          </div>

          <BentoChecks items={b.checksDesk} band="desk" />
          <BentoChecks items={b.checksMob} band="mob" />
        </div>

        {showExplore ? (
          <>
            <div className="explore-countries-bento__explore-cluster">
              <div
                className="explore-countries-bento__explore"
                aria-hidden="true"
              >
                <div className="explore-countries-bento__explore-photo">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={b.gradSrc} alt="" />
                </div>
              </div>
              <p className="explore-countries-bento__explore-label">
                {b.exploreLines.map((line) => (
                  <span
                    key={line}
                    className="explore-countries-bento__explore-line"
                  >
                    {line}
                  </span>
                ))}
              </p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="explore-countries-bento__explore-arrow"
                src={b.arrowSrc}
                alt=""
                aria-hidden="true"
              />
            </div>
            <span className="explore-countries-bento__explore-sr">
              Explore more below. {b.gradAlt}
            </span>
          </>
        ) : null}
      </div>
    </section>
  );
}

export function ExploreCountriesBento() {
  return (
    <ExploreCountriesBentoBlock
      variant="e3"
      gate="e3"
      moduleName="explore-countries-bento"
      titleId="explore-countries-bento-title"
      figmaDesktop="17056:19564"
      figmaMobile="470:4751"
    />
  );
}

/** Second bento after Mauritius stack — no explore-more lilac column. */
export function ExploreCountriesBentoSecondary() {
  return (
    <ExploreCountriesBentoBlock
      variant="e3b"
      gate="e3b"
      moduleName="explore-countries-bento-secondary"
      titleId="explore-countries-bento-secondary-title"
      figmaDesktop="17056:19720"
      figmaMobile="471:4781"
    />
  );
}
