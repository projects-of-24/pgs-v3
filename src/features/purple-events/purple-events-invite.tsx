/**
 * Purple Events invite / hero — E1.
 * Desktop Figma `invite` 17071:12186 · Mobile group 551:9013.
 * Owned CSS only. Bands >1366 · ≤600; iPad deferred.
 * Book CTA visual only when bookingUrl empty (backend / booking later).
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: host/note/times ~11–12px; who-for note 12px desk
 * ISSUE: below readable floor for normal text
 * PGS IMPLEMENTATION: body/meta ≥16px; keep Figma colors/layout intent
 */
import { EVENT_SESSION_FIXTURE } from "./content";
import "./purple-events-invite.css";

export function PurpleEventsInvite() {
  const c = EVENT_SESSION_FIXTURE;
  const bookingHref = c.bookingUrl.trim();

  return (
    <section
      id="pe-e1"
      className="pe-invite"
      data-pgs-module="purple-events-invite"
      data-block-gate="e1"
      data-figma-desktop="17071:12186"
      data-figma-mobile="551:9013"
      data-figma-mobile-plate="551:9014"
      data-figma-mobile-page="524:8535"
      aria-labelledby="pe-invite-title"
    >
      <div className="pe-invite__panel">
        <div className="pe-invite__media-col">
          <div className="pe-invite__media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="pe-invite__img"
              src={c.heroImage}
              alt={c.heroImageAlt}
              width={337}
              height={512}
            />
            <div className="pe-invite__media-badges">
              <div className="pe-invite__badge-stack">
                <span className="pe-invite__filling">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="pe-invite__filling-icon"
                    src={c.fillingIcon}
                    alt=""
                    width={13}
                    height={16}
                  />
                  {c.fillingBadge}
                </span>
                <span className="pe-invite__mode pe-invite__mode--on-media">
                  {c.topLabel}
                </span>
              </div>
              <button
                type="button"
                className="pe-invite__share pe-invite__share--on-media"
                aria-label="Share this event"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.shareIcon} alt="" width={26} height={26} />
              </button>
            </div>
            <div className="pe-invite__speaker">
              <p className="pe-invite__speaker-name">{c.speakerName}</p>
              <p className="pe-invite__speaker-bio">{c.speakerBio}</p>
            </div>
          </div>
        </div>

        <div className="pe-invite__content">
          <div className="pe-invite__top-row">
            <span className="pe-invite__mode pe-invite__mode--desk">
              {c.topLabel}
            </span>
            <button
              type="button"
              className="pe-invite__share pe-invite__share--desk"
              aria-label="Share this event"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.shareIcon} alt="" width={26} height={26} />
            </button>
          </div>

          <div className="pe-invite__headline">
            <h1 id="pe-invite-title" className="pe-invite__title">
              {c.headline}
            </h1>
          </div>

          <p className="pe-invite__host">
            <span className="pe-invite__host-label">Host:</span>{" "}
            <span className="pe-invite__host-value">{c.host}</span>
          </p>

          <div className="pe-invite__mid">
            <div className="pe-invite__dates" aria-label="Session dates">
              <div className="pe-invite__date-col">
                <div className="pe-invite__date-box">
                  <span className="pe-invite__date-day">{c.start.day}</span>
                  <span className="pe-invite__date-month">
                    {c.start.month} {c.start.year}
                  </span>
                </div>
                <p className="pe-invite__date-time">{c.start.time}</p>
              </div>
              <div className="pe-invite__date-col">
                <div className="pe-invite__date-box">
                  <span className="pe-invite__date-day">{c.end.day}</span>
                  <span className="pe-invite__date-month">
                    {c.end.month} {c.end.year}
                  </span>
                </div>
                <p className="pe-invite__date-time">{c.end.time}</p>
              </div>
            </div>

            <div className="pe-invite__who">
              <p className="pe-invite__who-title">{c.whoIsItFor}</p>
              <p className="pe-invite__who-note">{c.whoForNote}</p>
            </div>
          </div>

          <ul className="pe-invite__tags">
            {c.tags.map((tag) => (
              <li key={tag} className="pe-invite__tag">
                {tag}
              </li>
            ))}
          </ul>

          {bookingHref ? (
            <a className="pe-invite__cta" href={bookingHref}>
              {c.bookingCta}
            </a>
          ) : (
            <button type="button" className="pe-invite__cta">
              {c.bookingCta}
            </button>
          )}

          <p className="pe-invite__location">
            <span aria-hidden="true">📍 </span>
            {c.locationNote}
          </p>
        </div>
      </div>
    </section>
  );
}
