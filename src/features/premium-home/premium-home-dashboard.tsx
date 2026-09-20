/**
 * purplePREMIUM HOME dashboard unlock — H5.
 * Desktop `17052:8230` · Mobile `366:4322`.
 * Desk and phone use separate shot blocks / assets — never mixed.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: desk advantage body 14.4 · mobile advantage/unlock 14
 * ISSUE: below --pgs-type-floor 16px
 * PGS IMPLEMENTATION: body copy uses max(16px, Figma). Look unchanged.
 */
import { PREMIUM_HOME_DASHBOARD } from "./content";
import "./premium-home-dashboard.css";

export function PremiumHomeDashboard() {
  const c = PREMIUM_HOME_DASHBOARD;

  return (
    <section
      className="premium-home-dashboard"
      data-pgs-module="premium-home-dashboard"
      data-block-gate="h5"
      data-figma-desktop="17052:8230"
      data-figma-mobile="366:4322"
      aria-labelledby="premium-home-dashboard-title"
    >
      <h2 id="premium-home-dashboard-title" className="premium-home-dashboard__title">
        <span className="premium-home-dashboard__title-desk">{c.titleDesk}</span>
        <span className="premium-home-dashboard__title-mob">
          <span className="premium-home-dashboard__title-line">{c.titleMobLine1}</span>
          <span className="premium-home-dashboard__title-line">{c.titleMobLine2}</span>
        </span>
      </h2>

      <div className="premium-home-dashboard__stage">
        {/* Desk only — grey window + hanging still `17052:8233`/`8235`. */}
        <div className="premium-home-dashboard__shot-desk" aria-hidden="false">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="premium-home-dashboard__img-desk"
            src={c.imageDeskSrc}
            alt={c.imageAlt}
            width={630}
            height={504}
          />
        </div>

        {/* Phone only — full framed export of grey window `366:4325`. */}
        <div className="premium-home-dashboard__shot-mob">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="premium-home-dashboard__img-mob"
            src={c.imageShotMobSrc}
            alt={c.imageAlt}
            width={331}
            height={324}
          />
        </div>

        <div className="premium-home-dashboard__advantage">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="premium-home-dashboard__stripe"
            src={c.stripeSrc}
            alt=""
            width={13}
            height={74}
            aria-hidden="true"
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="premium-home-dashboard__check"
            src={c.checkSrc}
            alt=""
            width={19}
            height={19}
            aria-hidden="true"
          />
          <p className="premium-home-dashboard__advantage-title">{c.advantageTitle}</p>
          <p className="premium-home-dashboard__advantage-body">{c.advantageBody}</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="premium-home-dashboard__heart"
            src={c.heartSrc}
            alt=""
            width={33}
            height={37}
            aria-hidden="true"
          />
        </div>

        <div className="premium-home-dashboard__unlock">
          <p className="premium-home-dashboard__unlock-desk">
            <span className="premium-home-dashboard__unlock-line">{c.unlockDeskLine1}</span>
            <span className="premium-home-dashboard__unlock-line">{c.unlockDeskLine2}</span>
          </p>
          <div className="premium-home-dashboard__unlock-mob">
            <p className="premium-home-dashboard__unlock-body">{c.unlockMobBody}</p>
            <p className="premium-home-dashboard__unlock-closer">{c.unlockMobCloser}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
