/**
 * CV Ready / clinical wide face — Pair 1 desk + mob open+closed.
 * Desk open `1:169` · closed `1:1532` · 996×300 · >1367
 * Mob open `1:3184` · closed `1:3246` · ~177×530 · ≤600 (pair `1:3403`)
 * 601–1366 iPad deferred. Heart = visual only (save deferred).
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: mob type ~7.7–12px · desk Filling Fast ~11.2px · photo tag ~12.8px
 * ISSUE: below readable floor
 * PGS IMPLEMENTATION: title/body/CTA ≥14px; Filling Fast badge keeps Figma 11.4
 */
import type { CvreadyFaceCard } from "./cvready-content";
import "./cvready-face-card.css";

type Props = {
  card: CvreadyFaceCard;
};

function FacePanels({ card, slot }: { card: CvreadyFaceCard; slot: "desk" | "mob" }) {
  const closed = card.status === "closed";
  const prefix = `cvready-face`;

  return (
    <>
      <div className={`${prefix}__media`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={`${prefix}__photo`}
          src={card.photo}
          alt={card.photoAlt}
        />
        <div className={`${prefix}__filling`} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.fillingIcon} alt="" width={13} height={16} />
          <span>{card.fillingBadge}</span>
        </div>
        <div className={`${prefix}__photo-tag`}>
          <span className={`${prefix}__pill ${prefix}__pill--green`}>
            {card.photoTag}
          </span>
        </div>
      </div>

      <div className={`${prefix}__body`}>
        <div className={`${prefix}__body-inner`}>
          <div className={`${prefix}__stack`}>
            <div className={`${prefix}__title-wrap`}>
              <p className={`${prefix}__title`}>
                {card.titleLines.map((line) => (
                  <span key={`${slot}-${line}`} className={`${prefix}__title-line`}>
                    {line}
                  </span>
                ))}
              </p>
            </div>

            <div className={`${prefix}__location`}>
              <p className={`${prefix}__location-label`}>{card.locationLabel}</p>
              <p className={`${prefix}__location-value`}>{card.locationValue}</p>
            </div>
          </div>

          <div className={`${prefix}__specialty-block`}>
            <div className={`${prefix}__specialty`}>
              <p className={`${prefix}__specialty-label`}>{card.specialtyLabel}</p>
              <p className={`${prefix}__specialty-value`}>{card.specialtyValue}</p>
            </div>

            <ul className={`${prefix}__tags`}>
              {card.tags.map((tag) => (
                <li key={`${slot}-${tag}`}>
                  <span className={`${prefix}__pill ${prefix}__pill--black`}>
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={`${prefix}__action`}>
        {slot === "desk" ? (
          <span className={`${prefix}__accent`} aria-hidden="true" />
        ) : null}
        {/* Heart: Figma filled red visual — saved boolean / outline later */}
        <span className={`${prefix}__heart`} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={card.heartIcon} alt="" width={24} height={24} />
        </span>
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
    </>
  );
}

export function CvreadyFaceCard({ card }: Props) {
  const titleId = `cvready-face-title-${card.id}`;
  const closed = card.status === "closed";

  return (
    <article
      className="cvready-face"
      data-pgs-module="cvready-face-card"
      data-face-layout="cvready"
      data-face-status={card.status}
      data-figma-file="reEbIrfkffyoIzXQyVm09z"
      data-figma-desktop={closed ? "1:1532" : "1:169"}
      data-figma-mobile={closed ? "1:3246" : "1:3184"}
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="cvready-face__sr-title">
        {card.titleLines.join(" ")}
        {closed && card.closedLabel ? ` — ${card.closedLabel}` : ""}
      </h2>

      <p className="cvready-face__band-note" role="status">
        Pair 1 cvready: <strong>phone ≤600</strong> shows mob ·{" "}
        <strong>desktop &gt;1367</strong> shows desk. iPad (601–1366) deferred —
        no scaled artboard.
      </p>

      <div className="cvready-face__mob">
        <FacePanels card={card} slot="mob" />
        {closed && card.closedLabel ? (
          <>
            <div className="cvready-face__wash" aria-hidden="true" />
            <div
              className="cvready-face__closed"
              aria-label={card.closedLabel}
            >
              <p className="cvready-face__closed-text">{card.closedLabel}</p>
            </div>
          </>
        ) : null}
      </div>

      <div className="cvready-face__desk">
        <FacePanels card={card} slot="desk" />
        {closed && card.closedLabel ? (
          <>
            <div className="cvready-face__wash" aria-hidden="true" />
            <div
              className="cvready-face__closed"
              aria-label={card.closedLabel}
            >
              <p className="cvready-face__closed-text">{card.closedLabel}</p>
            </div>
          </>
        ) : null}
      </div>
    </article>
  );
}
