/**
 * Purple Events face card — desk + mob, open | closed.
 * Desk open `18961:12995` · closed `18961:13038` · 383×592.
 * Mob open `1242:7586` · closed `1242:7587` · 176×761.
 * Bands ≤600 mob · >1367 desk · no transform scale.
 * Heart = filled visual only (save deferred B*).
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: mob bio/time/note ~12px; desk who/topics ~14px; CTA desk ~11px
 * ISSUE: below readable floor
 * PGS IMPLEMENTATION: body/meta ≥14–16px; CTA 16px; layout stays Figma
 */
import type { PurpleEventFaceCard } from "./content";
import "./purple-events-face-card.css";

type Props = {
  card: PurpleEventFaceCard;
};

function Cta({ card, slot }: { card: PurpleEventFaceCard; slot: "desk" | "mob" }) {
  const closed = card.status === "closed";
  const href = card.href.trim();
  const className = [
    "pe-face__cta",
    `pe-face__cta--${slot}`,
    closed ? "pe-face__cta--closed" : ""
  ]
    .filter(Boolean)
    .join(" ");

  if (closed) {
    return (
      <span className={className} aria-disabled="true">
        {card.cta}
      </span>
    );
  }
  if (href) {
    return (
      <a className={className} href={href}>
        {card.cta}
      </a>
    );
  }
  return <span className={className}>{card.cta}</span>;
}

function formatMobTime(time: string) {
  const m = time.match(/^(.+?)\s+to\s+(.+)$/i);
  if (!m) return <span>{time}</span>;
  return (
    <>
      <span>{m[1]}</span>
      <span>to {m[2]}</span>
    </>
  );
}

export function PurpleEventsFaceCard({ card }: Props) {
  const closed = card.status === "closed";
  const titleId = `pe-face-title-${card.id}`;

  return (
    <article
      className="pe-face"
      data-pgs-module="purple-events-face-card"
      data-face-status={card.status}
      data-figma-desktop={closed ? "18961:13038" : "18961:12995"}
      data-figma-mobile={closed ? "1242:7587" : "1242:7586"}
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="pe-face__sr-title">
        {card.headlineLines[0]} {card.headlineLines[1]}
        {closed ? ` — ${card.closedLabel}` : ""}
      </h2>

      {/* —— Mobile portrait —— */}
      <div className="pe-face__mob">
        <div className="pe-face__mob-media">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="pe-face__mob-photo"
            src={card.photo}
            alt={card.photoAlt}
            width={161}
            height={215}
          />
          <div className="pe-face__speaker">
            <p className="pe-face__speaker-name">{card.speakerName}</p>
            {card.speakerBioLines.map((line) => (
              <p key={line} className="pe-face__speaker-bio">
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="pe-face__mob-badges">
          <span className="pe-face__filling">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="pe-face__filling-icon"
              src={card.fillingIcon}
              alt=""
              width={7}
              height={8}
            />
            {card.fillingBadge}
          </span>
          <span className="pe-face__mode">{card.modeLabel}</span>
        </div>

        <button
          type="button"
          className="pe-face__share"
          aria-label={card.shareLabel}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.shareIcon} alt="" width={20} height={20} />
        </button>

        <span className="pe-face__heart pe-face__heart--mob" aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.heartIcon} alt="" width={16} height={16} />
        </span>

        <div className="pe-face__mob-main">
          <div className="pe-face__headline pe-face__headline--mob">
            <p className="pe-face__title pe-face__title--mob" aria-hidden="true">
              <span>{card.headlineLines[0]}</span>
              <span>{card.headlineLines[1]}</span>
            </p>
            <span className="pe-face__corner pe-face__corner--mob" aria-hidden="true" />
          </div>

          <div className="pe-face__dates pe-face__dates--mob">
            <div className="pe-face__date-col">
              <div className="pe-face__date pe-face__date--mob" aria-hidden="true">
                <span className="pe-face__date-day">{card.start.day}</span>
                <span className="pe-face__date-meta">
                  {card.start.month}&nbsp;{card.start.year}
                </span>
              </div>
              <p className="pe-face__time pe-face__time--mob">
                {formatMobTime(card.start.time)}
              </p>
            </div>
            <div className="pe-face__date-col">
              <div className="pe-face__date pe-face__date--mob" aria-hidden="true">
                <span className="pe-face__date-day">{card.end.day}</span>
                <span className="pe-face__date-meta">
                  {card.end.month}&nbsp;{card.end.year}
                </span>
              </div>
              <p className="pe-face__time pe-face__time--mob">
                {formatMobTime(card.end.time)}
              </p>
            </div>
          </div>

          <ul className="pe-face__tags" aria-label="Tags">
            {card.tags.map((tag) => (
              <li key={tag} className="pe-face__tag">
                {tag}
              </li>
            ))}
          </ul>

          <div className="pe-face__designed">
            <p className="pe-face__designed-title">
              {card.designedForLines.map((line) => (
                <span key={line}>
                  {line}
                  <br />
                </span>
              ))}
            </p>
            <p className="pe-face__designed-note">{card.designedNote}</p>
          </div>
        </div>

        <Cta card={card} slot="mob" />

        {closed ? (
          <>
            <div className="pe-face__wash pe-face__wash--mob" aria-hidden="true" />
            <div className="pe-face__closed pe-face__closed--mob" aria-label={card.closedLabel}>
              <p className="pe-face__closed-text pe-face__closed-text--mob">
                {card.closedLabel}
              </p>
            </div>
          </>
        ) : null}
      </div>

      {/* —— Desktop side-photo —— */}
      <div className="pe-face__desk">
        <div className="pe-face__desk-shell">
          <div className="pe-face__desk-plate" aria-hidden="true" />

          <div className="pe-face__desk-photo" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="pe-face__desk-photo-img"
              src={card.photo}
              alt=""
              width={1455}
              height={970}
            />
          </div>

          <div className="pe-face__headline pe-face__headline--desk">
            <p className="pe-face__title pe-face__title--desk" aria-hidden="true">
              <span>{card.headlineLines[0]}</span>
              <span>{card.headlineLines[1]}</span>
            </p>
            <span className="pe-face__corner" aria-hidden="true" />
          </div>

          <span className="pe-face__heart pe-face__heart--desk" aria-hidden="true">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={card.heartIcon} alt="" width={26} height={26} />
          </span>

          <div className="pe-face__desk-body">
            <div className="pe-face__dates pe-face__dates--desk">
              <div className="pe-face__date-pair">
                <div className="pe-face__date pe-face__date--desk" aria-hidden="true">
                  <span className="pe-face__date-day">{card.start.day}</span>
                  <span className="pe-face__date-meta">
                    {card.start.month}&nbsp;{card.start.year}
                  </span>
                </div>
                <div className="pe-face__date pe-face__date--desk" aria-hidden="true">
                  <span className="pe-face__date-day">{card.end.day}</span>
                  <span className="pe-face__date-meta">
                    {card.end.month}&nbsp;{card.end.year}
                  </span>
                </div>
              </div>
              <div className="pe-face__times pe-face__times--desk">
                <p className="pe-face__time">{card.start.time}</p>
                <p className="pe-face__time">{card.end.time}</p>
              </div>
            </div>

            <div className="pe-face__copy">
              <div className="pe-face__who">
                <h3 className="pe-face__who-heading">{card.whoHeading}</h3>
                {card.whoLines.map((line) => (
                  <p key={line} className="pe-face__who-line">
                    {line}
                  </p>
                ))}
              </div>

              <div className="pe-face__topics">
                <h3 className="pe-face__topics-heading">{card.topicsHeading}</h3>
                <ul className="pe-face__topics-list">
                  <li className="pe-face__topics-row">
                    <span>{card.topics[0]}</span>
                    <span>{card.topics[1]}</span>
                  </li>
                  {card.topics.slice(2).map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pe-face__cta-slot">
              <Cta card={card} slot="desk" />
            </div>
          </div>

          {closed ? (
            <>
              <div className="pe-face__wash pe-face__wash--desk" aria-hidden="true" />
              <div className="pe-face__closed pe-face__closed--desk" aria-label={card.closedLabel}>
                <p className="pe-face__closed-text pe-face__closed-text--desk">
                  {card.closedLabel}
                </p>
              </div>
            </>
          ) : null}
        </div>
      </div>
    </article>
  );
}
