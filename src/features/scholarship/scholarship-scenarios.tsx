/**
 * Scholarship scenarios — S3.
 * Desktop heading `17041:18767` · cards `17041:19044`.
 * Mobile frame `328:3149`.
 * Owned CSS. Bands >1366 · ≤600; iPad deferred.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: tip ~12–13px · mobile lead 14px
 * ISSUE: below readable floor / owner 16px body lock
 * PGS IMPLEMENTATION: tip ≥14px · mobile lead/question 16px via --sch-scen-* vars
 */
import { SCHOLARSHIP_SCENARIOS } from "./content";
import "./scholarship-scenarios.css";

export function ScholarshipScenarios() {
  const c = SCHOLARSHIP_SCENARIOS;

  return (
    <section
      className="scholarship-scenarios"
      data-pgs-module="scholarship-scenarios"
      data-block-gate="s3"
      aria-labelledby="scholarship-scenarios-heading"
    >
      <div className="scholarship-scenarios__inner">
        <header className="scholarship-scenarios__header">
          <h2
            id="scholarship-scenarios-heading"
            className="scholarship-scenarios__title"
          >
            {c.heading}
          </h2>
          <p className="scholarship-scenarios__lead">{c.lead}</p>
        </header>

        <div className="scholarship-scenarios__body">
          <div className="scholarship-scenarios__note-row">
            <p className="scholarship-scenarios__note">{c.note}</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="scholarship-scenarios__arrow"
              src={c.arrowSrc}
              alt=""
              width={80}
              height={80}
            />
          </div>

          <ul className="scholarship-scenarios__grid">
            {c.cards.map((card) => (
              <li key={card.n} className="scholarship-scenarios__card">
                <div className="scholarship-scenarios__card-top">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="scholarship-scenarios__grading"
                    src={c.gradingIconSrc}
                    alt=""
                    width={72}
                    height={72}
                  />
                  <span className="scholarship-scenarios__num" aria-hidden="true">
                    {card.n}
                  </span>
                </div>
                <p className="scholarship-scenarios__question">{card.question}</p>
                <div className="scholarship-scenarios__tip">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="scholarship-scenarios__check"
                    src={c.checkIconSrc}
                    alt=""
                    width={22}
                    height={22}
                  />
                  <p className="scholarship-scenarios__tip-text">{card.tip}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
