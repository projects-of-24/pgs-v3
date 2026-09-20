/**
 * Scholarship intro — S2.
 * Desktop: copy `17041:18758` · examples `17041:18761` · myth/truth `17041:18770`.
 * Mobile: `325:3468` / `325:3471` / `325:3501`.
 * Owned CSS. Bands >1366 · ≤600; iPad deferred.
 */
import { SCHOLARSHIP_INTRO } from "./content";
import "./scholarship-intro.css";

export function ScholarshipIntro() {
  const c = SCHOLARSHIP_INTRO;

  return (
    <section
      className="scholarship-intro"
      data-pgs-module="scholarship-intro"
      data-block-gate="s2"
      aria-labelledby="scholarship-intro-heading"
    >
      <div className="scholarship-intro__inner">
        <h2 id="scholarship-intro-heading" className="scholarship-intro__sr-only">
          About scholarships
        </h2>

        <div className="scholarship-intro__copy">
          {c.paragraphs.map((para, i) => (
            <p key={i} className="scholarship-intro__p">
              {para.parts.map((part, j) =>
                part.emphasis ? (
                  <em key={j} className="scholarship-intro__em">
                    {part.text}
                  </em>
                ) : (
                  <span key={j}>{part.text}</span>
                )
              )}
            </p>
          ))}
        </div>

        <div className="scholarship-intro__examples">
          <h3 className="scholarship-intro__examples-title">{c.examplesHeading}</h3>
          <ul className="scholarship-intro__examples-list">
            {c.examples.map((ex) => (
              <li key={ex.label} className="scholarship-intro__example">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="scholarship-intro__check"
                  src={c.checkIconSrc}
                  alt=""
                  width={29}
                  height={29}
                />
                <span className="scholarship-intro__example-text">
                  <strong className="scholarship-intro__example-label">
                    {ex.label}
                  </strong>
                  {ex.detail}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="scholarship-intro__myth-truth">
          <h3 className="scholarship-intro__myth-truth-title">
            {c.mythTruthHeading}
          </h3>
          <ul className="scholarship-intro__cards">
            <li className="scholarship-intro__card">
              <span className="scholarship-intro__mark" aria-label={c.myth.markLabel}>
                {c.myth.mark}
              </span>
              <div className="scholarship-intro__card-body">
                <span className="scholarship-intro__badge">{c.myth.badge}</span>
                <p className="scholarship-intro__card-text">{c.myth.text}</p>
              </div>
            </li>
            <li className="scholarship-intro__card">
              <span
                className="scholarship-intro__mark"
                aria-label={c.truth.markLabel}
              >
                {c.truth.mark}
              </span>
              <div className="scholarship-intro__card-body">
                <span className="scholarship-intro__badge">{c.truth.badge}</span>
                <p className="scholarship-intro__card-text">{c.truth.text}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
