/**
 * Live Activity — social-proof strip (who got in / matched).
 * Figma V6 desktop 18760:12380 · mobile 18760:11390. Not a feed.
 */
import { USMLE_ROTATION_LIVE_ACTIVITY } from "./content";
import "./usmle-rotation-live-activity.css";

const DOT = "/assets/img/usmlerotation/live-dot.svg";
const CHECK = "/assets/img/usmlerotation/live-check.svg";

export function UsmleRotationLiveActivity() {
  const c = USMLE_ROTATION_LIVE_ACTIVITY;

  return (
    <div
      className="usmle-live"
      data-pgs-module="usmle-rotation-live-activity"
      role="region"
      aria-label={c.heading}
    >
      <div className="usmle-live__inner">
        <div className="usmle-live__heading">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={DOT} alt="" width={16} height={16} />
          <p className="usmle-live__heading-text">
            <span>Live</span>
            <span>Activity</span>
          </p>
        </div>
        <ul className="usmle-live__list">
          {c.items.map((item, i) => (
            <li key={`${item.achievement}-${i}`} className="usmle-live__item">
              <div className="usmle-live__item-top">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={CHECK} alt="" width={16} height={16} />
                <p className="usmle-live__name">{item.name}</p>
                <p className="usmle-live__achievement">{item.achievement}</p>
              </div>
              <p className="usmle-live__meta">{item.meta}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
