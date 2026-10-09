"use client";

import { PREMIUM_USMLE_DASHBOARD_POINTS } from "./premium-usmle-dashboard-points";

type PremiumUsmleDashboardPhoneProps = {
  index: number;
  onPrev: () => void;
  onNext: () => void;
};

export function PremiumUsmleDashboardPhone({ index, onPrev, onNext }: PremiumUsmleDashboardPhoneProps) {
  const point = PREMIUM_USMLE_DASHBOARD_POINTS[index];
  const fill = `${((index + 1) / PREMIUM_USMLE_DASHBOARD_POINTS.length) * 100}%`;
  const last = PREMIUM_USMLE_DASHBOARD_POINTS.length - 1;

  return (
    <div className="premium-usmle-dashboard__phone">
      <div className="premium-usmle-dashboard__slide">
        <img src={point.phone.src} alt={point.phone.alt} />
      </div>
      <div className="premium-usmle-dashboard__phone-row">
        <span className="premium-usmle-dashboard__phone-line" aria-hidden="true">
          <span className="premium-usmle-dashboard__phone-line-fill" style={{ width: fill }} />
        </span>
        <p className="premium-usmle-dashboard__phone-point" aria-live="polite">
          <span className="premium-usmle-dashboard__icon">
            <img src="/assets/img/premium-usmle/dashboard-mark.svg" alt="" width={38} height={38} />
            <img className="premium-usmle-dashboard__asterisk" src="/assets/img/premium-usmle/dashboard-asterisk.svg" alt="" />
          </span>
          <span className="premium-usmle-dashboard__phone-copy">
            {point.lines.map((line, lineIndex) => (
              <span key={line}>
                {lineIndex > 0 ? <br /> : null}
                {line}
              </span>
            ))}
          </span>
        </p>
        <div className="premium-usmle-dashboard__arrows">
          <button
            type="button"
            className="premium-usmle-dashboard__arrow"
            aria-label="Previous dashboard photo"
            disabled={index === 0}
            onClick={onPrev}
          >
            <img src="/assets/img/premium-usmle/dashboard-arrow.svg" alt="" width={48} height={48} />
          </button>
          <button
            type="button"
            className="premium-usmle-dashboard__arrow premium-usmle-dashboard__arrow--next"
            aria-label="Next dashboard photo"
            disabled={index === last}
            onClick={onNext}
          >
            <img src="/assets/img/premium-usmle/dashboard-arrow.svg" alt="" width={48} height={48} />
          </button>
        </div>
      </div>
    </div>
  );
}
