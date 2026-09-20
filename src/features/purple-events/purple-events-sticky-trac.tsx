/**
 * Purple Events — E7 Sticky note + trac.
 * Desktop Figma `17071:12377` · Mobile sticky `528:7767` · trac `528:7817`.
 * Owned CSS only. Bands >1366 · ≤600; iPad deferred.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: mob trac / seat note ~14px
 * ISSUE: below readable floor for normal text
 * PGS IMPLEMENTATION: body ≥16px; keep Figma layout/colors
 */
import { EVENT_SESSION_FIXTURE } from "./content";
import "./purple-events-sticky-trac.css";

const DOT_CLOSE = "/assets/img/purple-events/sticky/dot-close.svg";
const DOT_HIDE = "/assets/img/purple-events/sticky/dot-hide.svg";
const DOC_ICON = "/assets/img/purple-events/sticky/doc.svg";

export function PurpleEventsStickyTrac() {
  const c = EVENT_SESSION_FIXTURE;

  return (
    <section
      id="pe-e7"
      className="pe-st"
      data-pgs-module="purple-events-sticky-trac"
      data-block-gate="e7"
      data-figma-desktop="17071:12377"
      data-figma-mobile-sticky="528:7767"
      data-figma-mobile-trac="528:7817"
      aria-label="Session note and takeaways"
    >
      <div className="pe-st__row">
        <aside className="pe-st__sticky" aria-label="Note">
          <div className="pe-st__chrome" aria-hidden="true">
            <span className="pe-st__dots">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={DOT_CLOSE} alt="" width={12} height={12} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={DOT_HIDE} alt="" width={12} height={12} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={DOT_HIDE} alt="" width={12} height={12} />
            </span>
            <span className="pe-st__chrome-title">note</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="pe-st__doc"
              src={DOC_ICON}
              alt=""
              width={20}
              height={20}
            />
          </div>
          <p className="pe-st__sticky-body">{c.stickyBody}</p>
        </aside>

        <div className="pe-st__trac">
          <p className="pe-st__trac-headline">{c.tracHeadline}</p>
          <p className="pe-st__trac-body">{c.tracBody}</p>
        </div>
      </div>

      <p className="pe-st__more">
        <span className="pe-st__more-lead">{c.moreSessionsLead}</span>
        <strong className="pe-st__more-bold">{c.moreSessionsBold}</strong>
      </p>
    </section>
  );
}
