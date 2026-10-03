"use client";

import { PREMIUM_PLAB_DASHBOARD_POINTS } from "./premium-plab-dashboard-points";

type PremiumPlabDashboardDeskProps = {
  index: number;
  onIndexChange: (index: number) => void;
};

export function PremiumPlabDashboardDesk({ index, onIndexChange }: PremiumPlabDashboardDeskProps) {
  const fill = `${((index + 1) / PREMIUM_PLAB_DASHBOARD_POINTS.length) * 100}%`;
  const photo = PREMIUM_PLAB_DASHBOARD_POINTS[index].desk;

  return (
    <>
      <figure className="premium-plab-dashboard__photo">
        <img src={photo.src} alt={photo.alt} />
      </figure>
      <div className="premium-plab-dashboard__meter" aria-hidden="true">
        <span className="premium-plab-dashboard__meter-fill" style={{ width: fill }} />
      </div>
      <ul className="premium-plab-dashboard__points">
        {PREMIUM_PLAB_DASHBOARD_POINTS.map((point, pointIndex) => {
          const selected = pointIndex === index;
          return (
            <li key={point.label}>
              <button
                type="button"
                className="premium-plab-dashboard__point"
                aria-pressed={selected}
                onClick={() => onIndexChange(pointIndex)}
              >
                <span className="premium-plab-dashboard__icon">
                  <img className="premium-plab-dashboard__mark" src="/assets/img/premium-usmle/dashboard-mark.svg" alt="" width={38} height={38} />
                  <img className="premium-plab-dashboard__asterisk" src="/assets/img/premium-usmle/dashboard-asterisk.svg" alt="" />
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
