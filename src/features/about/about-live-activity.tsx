/**
 * About Us Live Activity — A2 + autoscroll marquee.
 * Desktop `17057:13584` · Mobile `508:8768`.
 * Owned CSS marquee (Finance logos pattern). Respects prefers-reduced-motion.
 */
import { ABOUT_LIVE_ACTIVITY } from "./content";
import "./about-live-activity.css";

function LiveSet({
  items,
  checkIconSrc,
  decorative = false
}: {
  items: (typeof ABOUT_LIVE_ACTIVITY)["items"];
  checkIconSrc: string;
  decorative?: boolean;
}) {
  /** Triple so each half stays wider than typical viewports. */
  const half = [...items, ...items, ...items];

  return (
    <ul
      className="about-live__set"
      aria-hidden={decorative ? true : undefined}
    >
      {half.map((item, i) => (
        <li
          key={`${decorative ? "d" : "a"}-${i}`}
          className="about-live__item"
        >
          <div className="about-live__item-top">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={checkIconSrc}
              alt=""
              width={16}
              height={16}
              aria-hidden="true"
            />
            <p className="about-live__name">{item.name}</p>
            <p className="about-live__achievement">{item.achievement}</p>
          </div>
          <p className="about-live__meta">{item.meta}</p>
        </li>
      ))}
    </ul>
  );
}

export function AboutLiveActivity() {
  const c = ABOUT_LIVE_ACTIVITY;

  return (
    <div
      className="about-live"
      data-pgs-module="about-live-activity"
      data-block-gate="a2"
      data-motion="marquee"
      role="region"
      aria-label={c.heading}
    >
      <div className="about-live__inner">
        <div className="about-live__heading">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={c.dotIconSrc}
            alt=""
            width={16}
            height={16}
            aria-hidden="true"
          />
          <p className="about-live__heading-text">
            <span className="about-live__heading-line">Live</span>
            <span className="about-live__heading-line">Activity</span>
            <span className="about-live__heading-inline">{c.heading}</span>
          </p>
        </div>
        <div className="about-live__viewport">
          <div className="about-live__track">
            <LiveSet items={c.items} checkIconSrc={c.checkIconSrc} />
            <LiveSet
              items={c.items}
              checkIconSrc={c.checkIconSrc}
              decorative
            />
          </div>
        </div>
      </div>
    </div>
  );
}
