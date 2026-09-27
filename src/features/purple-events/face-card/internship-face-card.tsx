/**
 * Internship face — Pair 4 desk+mob · Figma courses short.
 * Desk pair `18:319` · open `18:320` · closed `18:342` · ~224×371
 * Mob pair `1:3183` · open `1:3068` · closed `1:3094` · ~175×290
 * No drop shadow (owner). Heart = cvready filled (save deferred).
 * Rating label desk 22px (owner) · mob Figma 19px.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: desk #inCampus ~8.62px · mob ~2.54px · body/chips ~11.4px
 * ISSUE: below readable floor
 * PGS: photo tag 12px · title/blurb/chips/CTA ≥14px · right-inset
 */
import type { InternshipFaceCard } from "./internship-content";
import "./internship-face-card.css";

type Props = {
  card: InternshipFaceCard;
};

function FacePanels({
  card,
  slot
}: {
  card: InternshipFaceCard;
  slot: "desk" | "mob";
}) {
  const closed = card.status === "closed";
  const prefix = "internship-face";
  const iconSize = slot === "desk" ? 19 : 15;
  const heartSize = slot === "desk" ? 24 : 20;

  return (
    <>
      <div className={`${prefix}__media`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={`${prefix}__photo`}
          src={card.photo}
          alt={card.photoAlt}
        />
        <span className={`${prefix}__photo-tag`}>{card.photoTag}</span>
      </div>

      <div className={`${prefix}__body`}>
        <div className={`${prefix}__copy`}>
          <p className={`${prefix}__title`}>{card.title}</p>
          <p className={`${prefix}__blurb`}>{card.blurb}</p>
        </div>

        <div className={`${prefix}__meta`}>
          <span className={`${prefix}__tag`}>{card.tag}</span>
          <div className={`${prefix}__rating`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={`${prefix}__rating-icon`}
              src={card.ratedIcon}
              alt=""
              width={iconSize}
              height={iconSize}
            />
            <p className={`${prefix}__rating-label`}>{card.ratingLabel}</p>
          </div>
          {closed ? (
            <span className={`${prefix}__cta`} aria-disabled="true">
              {card.cta}
            </span>
          ) : (
            <a className={`${prefix}__cta`} href={card.href}>
              {card.cta}
            </a>
          )}
        </div>
      </div>

      <span className={`${prefix}__heart`} aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={card.heartIcon}
          alt=""
          width={heartSize}
          height={heartSize}
        />
      </span>

      {closed && card.closedLabel ? (
        <>
          <div className={`${prefix}__wash`} aria-hidden="true" />
          <div className={`${prefix}__closed`} aria-hidden="true">
            <p className={`${prefix}__closed-text`}>{card.closedLabel}</p>
          </div>
        </>
      ) : null}
    </>
  );
}

export function InternshipFaceCard({ card }: Props) {
  const titleId = `internship-face-title-${card.id}`;
  const closed = card.status === "closed";

  return (
    <article
      className="internship-face"
      data-pgs-module="internship-face-card"
      data-face-layout="internship"
      data-face-status={card.status}
      data-figma-file="reEbIrfkffyoIzXQyVm09z"
      data-figma-desktop={closed ? "18:342" : "18:320"}
      data-figma-mobile={closed ? "1:3094" : "1:3068"}
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="internship-face__sr-title">
        {card.title}
        {closed && card.closedLabel ? ` — ${card.closedLabel}` : ""}
      </h2>

      <p className="internship-face__band-note" role="status">
        Pair 4 <code>internship</code>: <strong>phone ≤600</strong> shows mob ·{" "}
        <strong>desktop &gt;1367</strong> shows desk. iPad (601–1366) deferred.
      </p>

      <div className="internship-face__mob">
        <FacePanels card={card} slot="mob" />
      </div>

      <div className="internship-face__desk">
        <FacePanels card={card} slot="desk" />
      </div>
    </article>
  );
}
