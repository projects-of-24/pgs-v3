/**
 * Purple Events — E5 Session perks.
 * Desktop Figma `17072:10998` · Mobile `528:7682`.
 * Owned CSS only. Bands >1366 · ≤600; iPad deferred.
 */
import { EVENT_SESSION_FIXTURE } from "./content";
import "./purple-events-perks.css";

const CHECK_ICON = "/assets/img/purple-events/check.svg";

export function PurpleEventsPerks() {
  const c = EVENT_SESSION_FIXTURE;

  return (
    <section
      id="pe-e5"
      className="pe-perks"
      data-pgs-module="purple-events-perks"
      data-block-gate="e5"
      data-figma-desktop="17072:10998"
      data-figma-mobile="528:7682"
      aria-labelledby="pe-perks-title"
    >
      <h2 id="pe-perks-title" className="pe-perks__heading">
        {c.perksHeading}
      </h2>
      <ul className="pe-perks__list">
        {c.perks.map((perk) => (
          <li key={perk} className="pe-perks__item">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="pe-perks__check"
              src={CHECK_ICON}
              alt=""
              width={24}
              height={24}
            />
            <span className="pe-perks__label">{perk}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
