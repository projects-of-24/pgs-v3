/**
 * Promo face — Pair 5 desk+mob open+closed.
 * Desk `1:1067` / `1:1206` · ~996×300 · >1367
 * Mob `1:2372` / `1:3119` · ~177×530 · ≤600
 * Pair `1:1589` / `1:2371`. Heart = filled (save deferred).
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: desk Filling Fast ~11.2px · tags ~12.8px · note ~9.6px ·
 *   mob title ~12px · tags ~9.5px · CTA ~10px · note ~10px · rail ~11.4px
 * ISSUE: below readable floor
 * PGS: desk Filling Fast / tags / rail ≥14px · note 12px ·
 *   mob title 14px · body/tags/CTA/rail/deadline 12px · note 12px ·
 *   Filling Fast badge keeps Figma ~11.4
 */
import type { PromoFaceCard } from "./promo-content";
import "./promo-face-card.css";

type Props = {
  card: PromoFaceCard;
};

function FacePanels({
  card,
  slot
}: {
  card: PromoFaceCard;
  slot: "desk" | "mob";
}) {
  const closed = card.status === "closed";
  const prefix = "promo-face";
  const isMob = slot === "mob";

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
          <img src={card.fillingIcon} alt="" width={11} height={13} />
          <span>{card.fillingBadge}</span>
        </div>
        <div className={`${prefix}__logo-wrap`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className={`${prefix}__logo`}
            src={card.logo}
            alt={card.logoAlt}
          />
        </div>
      </div>

      <div className={`${prefix}__body`}>
        <div className={`${prefix}__body-inner`}>
          <div className={`${prefix}__stack`}>
            <div className={`${prefix}__title-wrap`}>
              <p className={`${prefix}__title`}>
                {card.titleLines.map((line) => (
                  <span
                    key={`${slot}-${line}`}
                    className={`${prefix}__title-line`}
                  >
                    {line}
                  </span>
                ))}
              </p>
            </div>
            <div className={`${prefix}__duration`}>
              <p className={`${prefix}__duration-label`}>{card.durationLabel}</p>
              <p className={`${prefix}__duration-value`}>{card.durationValue}</p>
            </div>
          </div>

          <div className={`${prefix}__perks`}>
            <p className={`${prefix}__perks-label`}>{card.perksLabel}</p>
            <div className={`${prefix}__perk`}>
              <p className={`${prefix}__perk-title`}>{card.perkTitle}</p>
              <p className={`${prefix}__perk-value`}>{card.perkValue}</p>
            </div>
            <ul className={`${prefix}__tags`}>
              {card.tags.map((tag) => (
                <li key={`${slot}-${tag}`}>
                  <span className={`${prefix}__pill`}>{tag}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={`${prefix}__action`}>
        <span className={`${prefix}__accent`} aria-hidden="true" />
        <p className={`${prefix}__dates-rail`} aria-hidden="true">
          {card.datesRail}
        </p>

        <span className={`${prefix}__heart`} aria-hidden="true">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={card.heartIcon}
            alt=""
            width={isMob ? 16 : 26}
            height={isMob ? 16 : 26}
          />
        </span>

        <div className={`${prefix}__action-row`}>
          <div className={`${prefix}__deadline-col`}>
            <div className={`${prefix}__deadline`}>
              {isMob ? (
                <p className={`${prefix}__deadline-label`}>
                  {card.mobDeadlineLabelLines.map((line) => (
                    <span
                      key={line}
                      className={`${prefix}__deadline-label-line`}
                    >
                      {line}
                    </span>
                  ))}
                </p>
              ) : (
                <p className={`${prefix}__deadline-label`}>
                  {card.deadlineLabel}
                </p>
              )}
              <div className={`${prefix}__deadline-box`}>
                {isMob ? (
                  card.mobDeadlineBoxLines.map((line, i) => (
                    <p
                      key={line}
                      className={
                        i === 0
                          ? `${prefix}__deadline-days`
                          : `${prefix}__deadline-unit`
                      }
                    >
                      {line}
                    </p>
                  ))
                ) : (
                  <>
                    <p className={`${prefix}__deadline-days`}>
                      {card.deadlineDays}
                    </p>
                    <p className={`${prefix}__deadline-unit`}>
                      {card.deadlineUnit}
                    </p>
                  </>
                )}
              </div>
            </div>
            <p className={`${prefix}__deadline-note`}>{card.deadlineNote}</p>
          </div>

          <div className={`${prefix}__qr-col`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className={`${prefix}__qr`}
              src={card.qr}
              alt=""
              width={isMob ? 57 : 64}
              height={isMob ? 57 : 64}
            />
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

        <button
          type="button"
          className={`${prefix}__download`}
          aria-label="Download"
          disabled={closed}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/assets/img/purple-events/face/promo/download.svg"
            alt=""
            width={isMob ? 10 : 20}
            height={isMob ? 10 : 20}
          />
        </button>
      </div>
    </>
  );
}

export function PromoFaceCard({ card }: Props) {
  const titleId = `promo-face-title-${card.id}`;
  const closed = card.status === "closed";

  return (
    <article
      className="promo-face"
      data-pgs-module="promo-face-card"
      data-face-layout="promo"
      data-face-status={card.status}
      data-figma-file="reEbIrfkffyoIzXQyVm09z"
      data-figma-desktop={closed ? "1:1206" : "1:1067"}
      data-figma-mobile={closed ? "1:3119" : "1:2372"}
      aria-labelledby={titleId}
    >
      <h2 id={titleId} className="promo-face__sr-title">
        {card.titleLines.join("").trim()}
        {closed && card.closedLabel ? ` — ${card.closedLabel}` : ""}
      </h2>

      <p className="promo-face__band-note" role="status">
        Pair 5 <code>promo</code>: <strong>phone ≤600</strong> shows mob ·{" "}
        <strong>desktop &gt;1367</strong> shows desk. iPad (601–1366) deferred.
      </p>

      <div className="promo-face__mob">
        <FacePanels card={card} slot="mob" />
        {closed && card.closedLabel ? (
          <>
            <div className="promo-face__wash" aria-hidden="true" />
            <div className="promo-face__closed" aria-hidden="true">
              <p className="promo-face__closed-text">{card.closedLabel}</p>
            </div>
          </>
        ) : null}
      </div>

      <div className="promo-face__desk">
        <FacePanels card={card} slot="desk" />
        {closed && card.closedLabel ? (
          <>
            <div className="promo-face__wash" aria-hidden="true" />
            <div className="promo-face__closed" aria-hidden="true">
              <p className="promo-face__closed-text">{card.closedLabel}</p>
            </div>
          </>
        ) : null}
      </div>
    </article>
  );
}
