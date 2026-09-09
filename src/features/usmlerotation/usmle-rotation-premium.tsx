/**
 * Elevate Your Rotation with #PurplePremium.
 * Desktop Figma 18760:12771 · mobile 18760:11600+.
 * Chart = fresh Figma export (owner B). Spelling fixed per owner.
 */
import { USMLE_ROTATION_PREMIUM } from "./content";
import "./usmle-rotation-premium.css";

const LIBERTY = "/assets/img/usmlerotation/premium-liberty.jpg";
const CHECK = "/assets/img/usmlerotation/premium-check.svg";
const CURSOR = "/assets/img/usmlerotation/premium-cursor.svg";
const CALLOUT_BOX = "/assets/img/usmlerotation/premium-callout-box.svg";
const JOURNEY_DESKTOP = "/assets/img/usmlerotation/premium-journey-desktop.png";
const JOURNEY_MOBILE = "/assets/img/usmlerotation/premium-journey-mobile.png";
const HEART = "/assets/img/heart.gif";

export function UsmleRotationPremium() {
  const c = USMLE_ROTATION_PREMIUM;

  return (
    <section
      className="usmle-premium"
      data-pgs-module="usmle-rotation-premium"
      aria-labelledby="usmle-premium-title"
    >
      <div className="usmle-premium__inner">
        <header className="usmle-premium__head">
          <div className="usmle-premium__titles">
            <p className="usmle-premium__eyebrow">{c.eyebrow}</p>
            <div className="usmle-premium__title-row">
              <h2 id="usmle-premium-title" className="usmle-premium__title">
                {c.title}
              </h2>
              <p className="usmle-premium__optional">{c.optional}</p>
            </div>
          </div>
        </header>

        <div className="usmle-premium__grid">
          <p className="usmle-premium__slogan usmle-premium__slogan--desktop">
            {c.slogan}
          </p>

          <div className="usmle-premium__intro-block">
            <div className="usmle-premium__liberty-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="usmle-premium__liberty"
                src={LIBERTY}
                alt={c.libertyAlt}
                width={110}
                height={100}
              />
            </div>
            <div className="usmle-premium__intro-copy">
              <p className="usmle-premium__intro-heading">{c.introHeading}</p>
              <p className="usmle-premium__intro-body">{c.introBody}</p>
            </div>
          </div>

          <aside className="usmle-premium__callout" aria-label="Premium callout">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="usmle-premium__callout-frame"
              src={CALLOUT_BOX}
              alt=""
              width={351}
              height={99}
            />
            <div className="usmle-premium__callout-inner">
              <p className="usmle-premium__callout-text">{c.callout}</p>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="usmle-premium__callout-cursor"
                src={CURSOR}
                alt=""
                width={19}
                height={19}
              />
            </div>
          </aside>

          <p className="usmle-premium__slogan usmle-premium__slogan--mobile">
            {c.slogan}
          </p>

          <ul className="usmle-premium__checks">
            {c.checks.map((item) => (
              <li key={item} className="usmle-premium__check">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="usmle-premium__check-icon"
                  src={CHECK}
                  alt=""
                  width={24}
                  height={24}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="usmle-premium__online">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="usmle-premium__heart"
              src={HEART}
              alt=""
              width={33}
              height={37}
            />
            <div className="usmle-premium__online-copy">
              <p className="usmle-premium__online-lead">{c.onlineLead}</p>
              <p className="usmle-premium__online-support">{c.onlineSupport}</p>
            </div>
          </div>

          <figure className="usmle-premium__journey">
            <picture>
              <source
                media="(max-width: 600px)"
                srcSet={JOURNEY_MOBILE}
                width={335}
                height={314}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="usmle-premium__journey-img"
                src={JOURNEY_DESKTOP}
                alt={c.journeyAlt}
                width={418}
                height={392}
              />
            </picture>
          </figure>
        </div>
      </div>
    </section>
  );
}
