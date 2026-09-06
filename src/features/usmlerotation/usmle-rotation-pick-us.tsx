/**
 * Grey student hero + Why Medical Students & Doctors Pick Us.
 * Desktop Figma 18760:12434 · mobile 18766:11912.
 * Photo/heart = UI placeholders (CMS later).
 */
import { USMLE_ROTATION_PICK_US } from "./content";
import "./usmle-rotation-pick-us.css";

const PHOTO = "/assets/img/USMLErotation1.png";
const HEART = "/assets/img/heart.gif";

export function UsmleRotationPickUs() {
  const c = USMLE_ROTATION_PICK_US;

  return (
    <div
      className="usmle-pick"
      data-pgs-module="usmle-rotation-pick-us"
      role="region"
      aria-label={c.whyHeading}
    >
      <div className="usmle-pick__inner">
        <div className="usmle-pick__hero">
          <div className="usmle-pick__photo-wrap">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="usmle-pick__photo"
              src={PHOTO}
              alt={c.photoAlt}
              width={671}
              height={160}
            />
          </div>
          <h2 className="usmle-pick__title">
            {c.titleLines.map((line) => (
              <span key={line} className="usmle-pick__title-line">
                {line}
              </span>
            ))}
          </h2>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="usmle-pick__heart"
            src={HEART}
            alt=""
            width={33}
            height={37}
          />
        </div>

        <div className="usmle-pick__grid">
          <p className="usmle-pick__why">{c.whyHeading}</p>
          {c.cards.map((card) => (
            <article key={card.title} className="usmle-pick__card">
              <h3 className="usmle-pick__card-title">{card.title}</h3>
              <p className="usmle-pick__card-body">{card.body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
