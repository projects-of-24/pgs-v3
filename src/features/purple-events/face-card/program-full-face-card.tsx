/**
 * Program (full) face — Pair 3.
 * Desk open `1:1830` · closed `1:1882` · ~366×727 · >1367
 * Mob open cas-v6 `91:2908` · ~283×389 @ 80% shell · type full size (≥14) · ≤600
 * 601–1366 deferred · Mob closed deferred (open node only)
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: desk Filling Fast / mode / time ~9.6–11.2px · note ~9.6px · CTA ~11.2px
 *           mob time 12px
 * ISSUE: below readable floor
 * PGS IMPLEMENTATION: badges/body/CTA/time ≥14–16px; layout stays Figma
 */
import type { ProgramFullFaceCard } from "./program-full-content";
import "./program-full-face-card.css";

type Props = {
  card: ProgramFullFaceCard;
};

export function ProgramFullFaceCard({ card }: Props) {
  const titleId = `program-full-face-title-${card.id}`;
  const closed = card.status === "closed";

  return (
    <article
      className="program-full-face"
      data-pgs-module="program-full-face-card"
      data-face-layout="program_full"
      data-face-status={card.status}
      data-figma-desktop={closed ? "1:1882" : "1:1830"}
      data-figma-mobile="91:2908"
      data-figma-mobile-file="pKzGmxz05A72dRJFkJT0d2"
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="program-full-face__sr-title">
        {card.headlineLines.join(" ")}
        {closed && card.closedLabel ? ` — ${card.closedLabel}` : ""}
      </h2>

      <p className="program-full-face__band-note" role="status">
        Pair 3 mid-band (601–1366) deferred. Resize to ≤600 for mob open (
        cas-v6 <code>91:2908</code>) or &gt;1367 for desk.
      </p>

      {/* ≤600 — cas-v6 mobile open `91:2908` */}
      <div className="program-full-face__mob">
        <div className="program-full-face__mob-plate" aria-hidden="true" />

        <div className="program-full-face__mob-photo" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="program-full-face__mob-photo-img"
            src={card.photo}
            alt=""
            width={1091}
            height={728}
          />
        </div>

        <div className="program-full-face__mob-headline">
          <p className="program-full-face__mob-title" aria-hidden="true">
            {card.headlineLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <span className="program-full-face__mob-corner" aria-hidden="true" />
        </div>

        <span className="program-full-face__mob-heart" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.heartIcon} alt="" width={20} height={20} />
        </span>

        <div className="program-full-face__mob-body">
          <div className="program-full-face__mob-dates">
            <div className="program-full-face__mob-date-pair">
              <div className="program-full-face__mob-date" aria-hidden="true">
                <span className="program-full-face__mob-date-day">
                  {card.start.day}
                </span>
                <span className="program-full-face__mob-date-meta">
                  {card.start.month}&nbsp;{card.start.year}
                </span>
              </div>
              <div className="program-full-face__mob-date" aria-hidden="true">
                <span className="program-full-face__mob-date-day">
                  {card.end.day}
                </span>
                <span className="program-full-face__mob-date-meta">
                  {card.end.month}&nbsp;{card.end.year}
                </span>
              </div>
            </div>
            <div className="program-full-face__mob-times">
              <p className="program-full-face__mob-time">{card.start.time}</p>
              <p className="program-full-face__mob-time">{card.end.time}</p>
            </div>
          </div>

          <div className="program-full-face__mob-copy">
            <div className="program-full-face__mob-who">
              <h3 className="program-full-face__mob-who-heading">
                {card.whoHeading}
              </h3>
              {card.whoLines.map((line) => (
                <p key={line} className="program-full-face__mob-who-line">
                  {line}
                </p>
              ))}
            </div>

            <div className="program-full-face__mob-topics">
              <h3 className="program-full-face__mob-topics-heading">
                {card.topicsHeading}
              </h3>
              <ul className="program-full-face__mob-topics-list">
                <li className="program-full-face__mob-topics-row">
                  <span>{card.topics[0]}</span>
                  <span>{card.topics[1]}</span>
                </li>
                {card.topics.slice(2).map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>

          {closed ? (
            <span className="program-full-face__mob-cta" aria-disabled="true">
              {card.cta}
            </span>
          ) : (
            <a className="program-full-face__mob-cta" href={card.href}>
              {card.cta}
            </a>
          )}
        </div>
      </div>

      <div className="program-full-face__desk">
        <div className="program-full-face__media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="program-full-face__photo"
            src={card.photo}
            alt={card.photoAlt}
          />
        </div>

        <div className="program-full-face__filling" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.fillingIcon} alt="" width={10} height={13} />
          <span>{card.fillingBadge}</span>
        </div>

        <span className="program-full-face__mode">{card.modeLabel}</span>

        <button
          type="button"
          className="program-full-face__share"
          aria-label={card.shareLabel}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.shareIcon} alt="" width={26} height={26} />
        </button>

        <span className="program-full-face__heart" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.heartIcon} alt="" width={26} height={26} />
        </span>

        <div className="program-full-face__speaker">
          <p className="program-full-face__speaker-name">{card.speakerName}</p>
          <div className="program-full-face__speaker-bio">
            {card.speakerBioLines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        </div>

        <div className="program-full-face__dates">
          <div className="program-full-face__date-pair">
            <div className="program-full-face__date" aria-hidden="true">
              <span className="program-full-face__date-day">{card.start.day}</span>
              <span className="program-full-face__date-meta">
                <span className="program-full-face__date-month">
                  {card.start.month}&nbsp;
                </span>
                <span className="program-full-face__date-year">
                  {card.start.year}
                </span>
              </span>
            </div>
            <div className="program-full-face__date" aria-hidden="true">
              <span className="program-full-face__date-day">{card.end.day}</span>
              <span className="program-full-face__date-meta">
                <span className="program-full-face__date-month">
                  {card.end.month}&nbsp;
                </span>
                <span className="program-full-face__date-year">
                  {card.end.year}
                </span>
              </span>
            </div>
          </div>
          <div className="program-full-face__times">
            <p className="program-full-face__time">{card.start.time}</p>
            <p className="program-full-face__time">{card.end.time}</p>
          </div>
        </div>

        <div className="program-full-face__headline">
          <p className="program-full-face__title" aria-hidden="true">
            {card.headlineLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
          </p>
          <span className="program-full-face__corner" aria-hidden="true" />
        </div>

        <ul className="program-full-face__tags">
          {card.tags.map((tag) => (
            <li key={tag}>
              <span className="program-full-face__tag">{tag}</span>
            </li>
          ))}
        </ul>

        <div className="program-full-face__designed">
          <p className="program-full-face__designed-title">
            {card.designedForLines.map((line) => (
              <span key={line}>
                {line}
                <br />
              </span>
            ))}
          </p>
          <p className="program-full-face__designed-note">{card.designedNote}</p>
        </div>

        {closed ? (
          <span className="program-full-face__cta" aria-disabled="true">
            {card.cta}
          </span>
        ) : (
          <a className="program-full-face__cta" href={card.href}>
            {card.cta}
          </a>
        )}

        {closed && card.closedLabel ? (
          <>
            <div className="program-full-face__wash" aria-hidden="true" />
            <div className="program-full-face__closed" aria-hidden="true" />
            <p
              className="program-full-face__closed-text"
              aria-label={card.closedLabel}
            >
              {card.closedLabel}
            </p>
          </>
        ) : null}
      </div>
    </article>
  );
}
