/**
 * Calendar session + photo face — Pair 11 desk+mob · calendar surface.
 * Desk open `42:290` · closed `42:311` · ~308.7×344 · >1367
 * Mob open `42:328` · closed `42:340` · ~197.6×220 · ≤600
 * Photo holder FIXED — desk 270.3×126 · mob 173×80.64 · object-fit cover
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: desk title/chips 26.4 · blurb 21 · mob title 16.9 · blurb 13.44
 * ISSUE: mob blurb below floor
 * PGS: mob blurb ≥14px; layout stays Figma
 */
import type { CalendarSessionPhotoFaceCard } from "./calendar-session-photo-content";
import "./calendar-session-photo-face-card.css";

type Props = {
  card: CalendarSessionPhotoFaceCard;
};

function FacePanels({
  card,
  slot
}: {
  card: CalendarSessionPhotoFaceCard;
  slot: "desk" | "mob";
}) {
  const closed = card.status === "closed";
  const prefix = "calendar-session-photo-face";
  const photoW = slot === "desk" ? 270 : 173;
  const photoH = slot === "desk" ? 126 : 81;

  return (
    <>
      <div className={`${prefix}__media`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={`${prefix}__photo`}
          src={card.photo}
          alt={card.photoAlt}
          width={photoW}
          height={photoH}
        />
      </div>

      <div className={`${prefix}__title`}>
        {card.titleLines.map((line) => (
          <span key={line} className={`${prefix}__title-line`}>
            {line}
          </span>
        ))}
      </div>

      <div className={`${prefix}__chips`}>
        <span className={`${prefix}__chip`}>{card.dateChip}</span>
        <span className={`${prefix}__chip`}>{card.timeChip}</span>
      </div>

      <p className={`${prefix}__blurb`}>
        {card.blurbLines.map((line) => (
          <span key={line} className={`${prefix}__blurb-line`}>
            {line}
          </span>
        ))}
      </p>

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

export function CalendarSessionPhotoFaceCard({ card }: Props) {
  const titleId = `calendar-session-photo-face-title-${card.id}`;
  const closed = card.status === "closed";
  const prefix = "calendar-session-photo-face";

  return (
    <article
      className={prefix}
      data-pgs-module="calendar-session-photo-face-card"
      data-face-layout="calendar_session_photo"
      data-face-status={card.status}
      data-face-surface="calendar"
      data-figma-file="reEbIrfkffyoIzXQyVm09z"
      data-figma-desktop={closed ? "42:311" : "42:290"}
      data-figma-mobile={closed ? "42:340" : "42:328"}
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className={`${prefix}__sr-title`}>
        {card.titleLines.join(" ").trim()}
        {closed && card.closedLabel ? ` — ${card.closedLabel}` : ""}
      </h2>

      <p className={`${prefix}__band-note`} role="status">
        Pair 11 <code>calendar_session_photo</code>:{" "}
        <strong>phone ≤600</strong> shows mob ·{" "}
        <strong>desktop &gt;1367</strong> shows desk. iPad (601–1366) deferred.
        Photo frame fixed — swap src only.
      </p>

      <div className={`${prefix}__mob`}>
        <FacePanels card={card} slot="mob" />
      </div>

      <div className={`${prefix}__desk`}>
        <FacePanels card={card} slot="desk" />
      </div>
    </article>
  );
}
