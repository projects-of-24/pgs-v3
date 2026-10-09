/**
 * Calendar session face — Pair 7 desk+mob · Figma calendar / dashboard chip · LOCKED.
 * Desk pair `4:376` · open `4:377` · closed `4:387` · ~309×240
 * Mob pair `4:375` · open `4:305` · closed `4:364` · ~206×160
 * Calendar / feed-beside-calendar only — not listing grids.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: desk title/chips 26.4 · body 21 · mob title 17.6 · body 14
 * PGS: keep Figma type (already ≥ readable floor on desk; mob artboard keeps 14)
 */
import type { CalendarSessionFaceCard } from "./calendar-session-content";
import "./calendar-session-face-card.css";

type Props = {
  card: CalendarSessionFaceCard;
};

function FacePanels({ card }: { card: CalendarSessionFaceCard }) {
  const closed = card.status === "closed";
  const prefix = "calendar-session-face";

  return (
    <>
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

      <p className={`${prefix}__mode`}>
        <span className={`${prefix}__mode-label`}>{card.modeLabel}</span>
        <span className={`${prefix}__mode-value`}>{card.modeValue}</span>
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

export function CalendarSessionFaceCard({ card }: Props) {
  const titleId = `calendar-session-face-title-${card.id}`;
  const closed = card.status === "closed";
  const prefix = "calendar-session-face";

  return (
    <article
      className={prefix}
      data-pgs-module="calendar-session-face-card"
      data-face-layout="calendar_session"
      data-face-status={card.status}
      data-face-surface="calendar"
      data-figma-file="reEbIrfkffyoIzXQyVm09z"
      data-figma-desktop={closed ? "4:387" : "4:377"}
      data-figma-mobile={closed ? "4:364" : "4:305"}
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className={`${prefix}__sr-title`}>
        {card.titleLines.join(" ").trim()}
        {closed && card.closedLabel ? ` — ${card.closedLabel}` : ""}
      </h2>

      <p className={`${prefix}__band-note`} role="status">
        Pair 7 <code>calendar_session</code>: <strong>phone ≤600</strong> shows
        mob · <strong>desktop &gt;1367</strong> shows desk. iPad (601–1366)
        deferred. Calendar / feed lists only.
      </p>

      <div className={`${prefix}__mob`}>
        <FacePanels card={card} />
      </div>

      <div className={`${prefix}__desk`}>
        <FacePanels card={card} />
      </div>
    </article>
  );
}
