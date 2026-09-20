/**
 * Purple Events — E3 Who / topics green blocks.
 * Desktop Figma `17071:12273` · Mobile `528:7261`.
 * Owned CSS only. Bands >1366 · ≤600; iPad deferred.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: mobile body chips ~14px
 * ISSUE: below readable floor for normal text
 * PGS IMPLEMENTATION: chip body ≥16px; keep Figma colors/layout
 */
import { EVENT_SESSION_FIXTURE } from "./content";
import "./purple-events-who-topics.css";

export function PurpleEventsWhoTopics() {
  const c = EVENT_SESSION_FIXTURE;

  return (
    <section
      id="pe-e3"
      className="pe-who"
      data-pgs-module="purple-events-who-topics"
      data-block-gate="e3"
      data-figma-desktop="17071:12273"
      data-figma-mobile="528:7261"
      aria-label="Who this session is for and topics"
    >
      <div className="pe-who__col pe-who__col--audience">
        <h2 className="pe-who__heading">{c.whoBlockHeading}</h2>
        <div className="pe-who__chips">
          <p className="pe-who__chip pe-who__chip--audience">{c.whoAudience}</p>
          <p className="pe-who__chip">{c.whoCloser}</p>
        </div>
      </div>

      <div className="pe-who__col pe-who__col--topics">
        <h2 className="pe-who__heading">{c.topicsHeading}</h2>
        <ul className="pe-who__chips pe-who__topics">
          {c.topics.map((topic) => (
            <li key={topic} className="pe-who__chip">
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
