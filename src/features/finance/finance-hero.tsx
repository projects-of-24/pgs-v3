/**
 * Finance hero — F1.
 * Desktop Figma card `17041:17699` · title `17041:17703` · bullets `17041:17704`.
 * Mobile stack: card → title + bullets (`217:5275` / `217:5296`).
 * Owned CSS only. Bands >1366 · ≤600; iPad deferred.
 * CTA is visual only — Eligibility popup deferred to **popup pass** (not W2a).
 */
import { FINANCE_HERO } from "./content";
import "./finance-hero.css";

export function FinanceHero() {
  const c = FINANCE_HERO;

  return (
    <div
      className="finance-hero"
      data-pgs-module="finance-hero"
      data-block-gate="f1"
      data-popup-deferred="eligibility"
      role="region"
      aria-labelledby="finance-hero-title"
    >
      <div className="finance-hero__inner">
        <aside className="finance-hero__card">
          <div className="finance-hero__card-media">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="finance-hero__card-img"
              src={c.heroImageSrc}
              alt={c.heroImageAlt}
              width={312}
              height={236}
            />
          </div>
          <p className="finance-hero__card-lead">{c.cardLead}</p>
          <button type="button" className="finance-hero__cta">
            {c.ctaLabel}
          </button>
        </aside>

        <div className="finance-hero__copy">
          <h1 id="finance-hero-title" className="finance-hero__title">
            <span className="finance-hero__title-line">{c.titleLine1}</span>
            <span className="finance-hero__title-line">{c.titleLine2}</span>
          </h1>
          <ul className="finance-hero__bullets">
            {c.bullets.map((item) => (
              <li key={item} className="finance-hero__bullet">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="finance-hero__check"
                  src={c.checkIconSrc}
                  alt=""
                  width={29}
                  height={29}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
