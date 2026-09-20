/**
 * Finance funding story — F3.
 * Desktop Figma `17041:17738` · Mobile `217:5315`.
 * Owned CSS only. Bands >1366 · ≤600; iPad deferred. Motion deferred.
 */
import { FINANCE_FUNDING, FINANCE_HERO } from "./content";
import "./finance-funding.css";

export function FinanceFunding() {
  const c = FINANCE_FUNDING;

  return (
    <section
      className="finance-funding"
      data-pgs-module="finance-funding"
      data-block-gate="f3"
      aria-labelledby="finance-funding-title"
    >
      <div className="finance-funding__inner">
        <div className="finance-funding__story">
          <h2 id="finance-funding-title" className="finance-funding__title">
            <span className="finance-funding__title-line">{c.titleLine1}</span>
            <span className="finance-funding__title-line">{c.titleLine2}</span>
          </h2>

          <div className="finance-funding__body">
            {c.paragraphs.map((p) => (
              <p key={p} className="finance-funding__p">
                {p}
              </p>
            ))}
          </div>

          <p className="finance-funding__lead">{c.checklistLead}</p>

          <ul className="finance-funding__checks">
            {c.checklist.map((item) => (
              <li key={item} className="finance-funding__check">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="finance-funding__check-icon"
                  src={FINANCE_HERO.checkIconSrc}
                  alt=""
                  width={29}
                  height={29}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="finance-funding__stats" role="group" aria-label={c.statsHeading}>
          <p className="finance-funding__stats-heading">{c.statsHeading}</p>
          <div className="finance-funding__stats-row">
            {c.stats.map((stat) => (
              <div key={stat.value} className="finance-funding__stat">
                <p className="finance-funding__stat-value">{stat.value}</p>
                <p className="finance-funding__stat-label">{stat.label}</p>
                <p className="finance-funding__stat-sub">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
