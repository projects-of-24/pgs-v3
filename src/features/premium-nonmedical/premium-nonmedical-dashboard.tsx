/**
 * #premiumNonMedical dashboard — N10.
 * Desktop `17055:10896` · phone `379:4573` + points/arrows.
 * Same point/meter/arrow pattern as medical. Photos reuse medical assets for now.
 * CMS later swaps this page’s fixture. Do not import medical TSX.
 */
"use client";

import { useState } from "react";
import { PREMIUM_NONMEDICAL_DASHBOARD } from "./content";
import "./premium-nonmedical-dashboard.css";

export function PremiumNonmedicalDashboard() {
  const c = PREMIUM_NONMEDICAL_DASHBOARD;
  const [index, setIndex] = useState(0);
  const fill = `${((index + 1) / c.points.length) * 100}%`;
  const point = c.points[index];
  const last = c.points.length - 1;

  return (
    <section
      className="premium-nonmedical-dashboard"
      data-pgs-module="premium-nonmedical-dashboard"
      data-block-gate="n10"
      aria-labelledby="premium-nonmedical-dashboard-title"
    >
      <h2 id="premium-nonmedical-dashboard-title" className="premium-nonmedical-dashboard__title">
        {c.title}
      </h2>

      <figure className="premium-nonmedical-dashboard__photo">
        <img src={point.desk.src} alt={point.desk.alt} />
      </figure>
      <div className="premium-nonmedical-dashboard__meter" aria-hidden="true">
        <span className="premium-nonmedical-dashboard__meter-fill" style={{ width: fill }} />
      </div>
      <ul className="premium-nonmedical-dashboard__points">
        {c.points.map((item, pointIndex) => {
          const selected = pointIndex === index;
          return (
            <li key={item.label}>
              <button
                type="button"
                className="premium-nonmedical-dashboard__point"
                aria-pressed={selected}
                onClick={() => setIndex(pointIndex)}
              >
                <span className="premium-nonmedical-dashboard__icon">
                  <img className="premium-nonmedical-dashboard__mark" src={c.markSrc} alt="" width={38} height={38} />
                  <img className="premium-nonmedical-dashboard__asterisk" src={c.asteriskSrc} alt="" />
                </span>
                <span>
                  {item.lines.map((line, lineIndex) => (
                    <span key={line}>
                      {lineIndex > 0 ? <br /> : null}
                      {line}
                    </span>
                  ))}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="premium-nonmedical-dashboard__phone">
        <div className="premium-nonmedical-dashboard__slide">
          <img src={point.phone.src} alt={point.phone.alt} />
        </div>
        <div className="premium-nonmedical-dashboard__phone-row">
          <span className="premium-nonmedical-dashboard__phone-line" aria-hidden="true">
            <span className="premium-nonmedical-dashboard__phone-line-fill" style={{ width: fill }} />
          </span>
          <p className="premium-nonmedical-dashboard__phone-point" aria-live="polite">
            <span className="premium-nonmedical-dashboard__icon">
              <img src={c.markSrc} alt="" width={38} height={38} />
              <img className="premium-nonmedical-dashboard__asterisk" src={c.asteriskSrc} alt="" />
            </span>
            <span className="premium-nonmedical-dashboard__phone-copy">
              {point.lines.map((line, lineIndex) => (
                <span key={line}>
                  {lineIndex > 0 ? <br /> : null}
                  {line}
                </span>
              ))}
            </span>
          </p>
          <div className="premium-nonmedical-dashboard__arrows">
            <button
              type="button"
              className="premium-nonmedical-dashboard__arrow"
              aria-label="Previous dashboard photo"
              aria-disabled={index === 0}
              onClick={() => {
                if (index === 0) return;
                setIndex((current) => Math.max(0, current - 1));
              }}
            >
              <img src={c.arrowSrc} alt="" width={48} height={48} />
            </button>
            <button
              type="button"
              className="premium-nonmedical-dashboard__arrow premium-nonmedical-dashboard__arrow--next"
              aria-label="Next dashboard photo"
              aria-disabled={index === last}
              onClick={() => {
                if (index === last) return;
                setIndex((current) => Math.min(last, current + 1));
              }}
            >
              <img src={c.arrowSrc} alt="" width={48} height={48} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
