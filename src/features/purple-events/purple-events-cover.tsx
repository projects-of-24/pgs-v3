/**
 * Purple Events — E4 What we’ll cover.
 * Desktop Figma `17071:12028` · Mobile `528:7370`.
 * Owned CSS only. Bands >1366 · ≤600; iPad deferred.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: cover item body ~14px
 * ISSUE: below readable floor for normal text
 * PGS IMPLEMENTATION: item body ≥16px; keep Figma layout/colors
 */
import { EVENT_SESSION_FIXTURE } from "./content";
import "./purple-events-cover.css";

const COVER_ICON = "/assets/img/purple-events/cover/icon.svg";

export function PurpleEventsCover() {
  const c = EVENT_SESSION_FIXTURE;

  return (
    <section
      id="pe-e4"
      className="pe-cover"
      data-pgs-module="purple-events-cover"
      data-block-gate="e4"
      data-figma-desktop="17071:12028"
      data-figma-mobile="528:7370"
      aria-labelledby="pe-cover-title"
    >
      <h2 id="pe-cover-title" className="pe-cover__title">
        {c.coverHeading}
      </h2>
      <ol className="pe-cover__grid">
        {c.coverItems.map((item, i) => {
          const n = String(i + 1).padStart(2, "0");
          const icon = item.image?.trim() || COVER_ICON;
          return (
            <li key={`${n}-${item.label}`} className="pe-cover__item">
              <div className="pe-cover__head">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="pe-cover__icon"
                  src={icon}
                  alt=""
                  width={48}
                  height={48}
                />
                <span className="pe-cover__num" aria-hidden="true">
                  {n}
                </span>
              </div>
              <p className="pe-cover__label">{item.label}</p>
            </li>
          );
        })}
      </ol>
    </section>
  );
}
