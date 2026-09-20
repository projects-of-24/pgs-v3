"use client";

import Link from "next/link";
import { HeartToggle } from "@/components/cards/HeartToggle";
import type { UsmleExploreCardModel } from "./usmle-explore-types";

type Props = {
  data: UsmleExploreCardModel;
  onToggleSave?: () => void | boolean | Promise<void | boolean>;
};

/** Figma desktop explore card 18760:12484 */
export function UsmleExploreDesktopCard({ data, onToggleSave }: Props) {
  return (
    <article className="usmle-card usmle-card--desktop">
      <div className="usmle-card__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="usmle-card__photo" src={data.image} alt="" />
        <div className="usmle-card__badge">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.badgeIcon} alt="" width={10} height={13} />
          <span>{data.badge}</span>
        </div>
        {data.imageTag ? (
          <div className="usmle-card__image-tag-wrap">
            <span className="usmle-card__image-tag">{data.imageTag}</span>
          </div>
        ) : null}
      </div>

      <div className="usmle-card__info">
        <h3 className="usmle-card__title">{data.title}</h3>
        <div className="usmle-card__loc">
          <span className="usmle-card__loc-label">Location</span>
          <span className="usmle-card__loc-value">{data.location}</span>
        </div>
        <div className="usmle-card__spec">
          <span className="usmle-card__spec-label">Speciality</span>
          <span className="usmle-card__spec-value">{data.speciality}</span>
        </div>
        {data.tags.length ? (
          <ul className="usmle-card__tags">
            {data.tags.slice(0, 4).map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="usmle-card__cta">
        <span className="usmle-card__cta-rail" aria-hidden="true" />
        <HeartToggle
          className="usmle-card__heart"
          saved={data.saved}
          initialSaved={data.saved}
          onToggle={onToggleSave}
        />
        <Link href={data.href} className="usmle-card__learn">
          {data.ctaLabel}
        </Link>
      </div>
    </article>
  );
}

/** Figma mobile explore card 18760:11469 — three stacked 171 squares */
export function UsmleExploreMobileCard({ data, onToggleSave }: Props) {
  const promoTitle = data.promoTitle.split("\n");
  const promoSub = data.promoSubtitle.split("\n");

  return (
    <article className="usmle-card usmle-card--mobile">
      <div className="usmle-card__media">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="usmle-card__photo" src={data.image} alt="" />
        <div className="usmle-card__badge">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={data.badgeIcon} alt="" width={6} height={8} />
          <span>{data.badge}</span>
        </div>
        {data.logo ? (
          <div className="usmle-card__logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.logo} alt={data.logoAlt ?? ""} />
          </div>
        ) : null}
      </div>

      <div className="usmle-card__info">
        <h3 className="usmle-card__title">{data.title}</h3>
        <div className="usmle-card__duration">
          <span className="usmle-card__duration-label">Duration:</span>
          <span className="usmle-card__duration-value">{data.duration}</span>
        </div>
        <div className="usmle-card__perks">
          <span className="usmle-card__perks-label">Perks</span>
          <div className="usmle-card__perks-body">
            <span className="usmle-card__perks-title">{data.perksTitle}</span>
            {data.perksBody ? (
              <span className="usmle-card__perks-sub">{data.perksBody}</span>
            ) : null}
          </div>
        </div>
        {data.tags.length ? (
          <ul className="usmle-card__tags">
            {data.tags.slice(0, 3).map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="usmle-card__actions">
        <span className="usmle-card__dates-rail" aria-hidden="true">
          {data.datesRail}
        </span>
        <HeartToggle
          className="usmle-card__heart"
          saved={data.saved}
          initialSaved={data.saved}
          onToggle={onToggleSave}
        />
        <div className="usmle-card__promo">
          <div className="usmle-card__promo-box">
            <p className="usmle-card__promo-title">
              {promoTitle.map((line, i) => (
                <span key={`${line}-${i}`}>
                  {i > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </p>
            <div className="usmle-card__promo-btn" aria-hidden="true">
              {promoSub.map((line, i) => (
                <span key={`${line}-${i}`}>{line}</span>
              ))}
            </div>
          </div>
          <p className="usmle-card__promo-date">{data.promoDate}</p>
        </div>
        <div className="usmle-card__qr-col">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="usmle-card__qr" src={data.qrSrc} alt="" />
          <Link href={data.href} className="usmle-card__learn">
            {data.ctaLabel}
          </Link>
        </div>
        {data.showDownload ? (
          <button type="button" className="usmle-card__download" aria-label="Download">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.downloadIcon} alt="" />
          </button>
        ) : null}
      </div>
    </article>
  );
}
