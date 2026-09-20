/**
 * Purple Events — E6 Meet your facilitators.
 * Desktop Figma `17071:12326` · Mobile `528:7692`.
 * Owned CSS only. Bands >1366 · ≤600; iPad deferred.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: bio ~14px
 * ISSUE: below readable floor for normal text
 * PGS IMPLEMENTATION: bio ≥16px; keep Figma layout/colors
 */
import { EVENT_SESSION_FIXTURE } from "./content";
import "./purple-events-facilitators.css";

export function PurpleEventsFacilitators() {
  const c = EVENT_SESSION_FIXTURE;

  return (
    <section
      id="pe-e6"
      className="pe-fac"
      data-pgs-module="purple-events-facilitators"
      data-block-gate="e6"
      data-figma-desktop="17071:12326"
      data-figma-mobile="528:7692"
      aria-labelledby="pe-fac-title"
    >
      <h2 id="pe-fac-title" className="pe-fac__title">
        <span className="pe-fac__title-lead">Meet Your </span>
        <span className="pe-fac__title-em">Facilitators</span>
      </h2>

      <ul className="pe-fac__grid">
        {c.facilitators.map((f) => (
          <li key={f.name} className="pe-fac__card">
            <div className="pe-fac__photo-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="pe-fac__photo"
                src={f.image}
                alt=""
                width={312}
                height={312}
              />
            </div>
            <div className="pe-fac__meta">
              <h3 className="pe-fac__name">{f.name}</h3>
              <p className="pe-fac__role">{f.role}</p>
              <p className="pe-fac__bio">{f.biography}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
