"use client";

import { useState } from "react";
import { PREMIUM_AMC_DASHBOARD_POINTS } from "./premium-amc-dashboard-points";

export function PremiumAmcDashboardDesk() {
  const [index, setIndex] = useState(0);
  const fill = `${((index + 1) / PREMIUM_AMC_DASHBOARD_POINTS.length) * 100}%`;
  const photo = PREMIUM_AMC_DASHBOARD_POINTS[index].desk;

  return (
    <>
      <figure className="premium-amc-dashboard__photo">
        <img src={photo.src} alt={photo.alt} />
      </figure>
      <div className="premium-amc-dashboard__meter" aria-hidden="true">
        <span className="premium-amc-dashboard__meter-fill" style={{ width: fill }} />
      </div>
      <ul className="premium-amc-dashboard__points">
        {PREMIUM_AMC_DASHBOARD_POINTS.map((point, pointIndex) => {
          const selected = pointIndex === index;
          return (
            <li key={point.label}>
              <button
                type="button"
                className="premium-amc-dashboard__point"
                aria-pressed={selected}
                onClick={() => setIndex(pointIndex)}
              >
                <span className="premium-amc-dashboard__icon">
                  <img className="premium-amc-dashboard__mark" src="/assets/img/premium-usmle/dashboard-mark.svg" alt="" width={38} height={38} />
                  <img className="premium-amc-dashboard__asterisk" src="/assets/img/premium-usmle/dashboard-asterisk.svg" alt="" />
                </span>
                <span>
                  {point.lines.map((line, lineIndex) => (
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
    </>
  );
}
