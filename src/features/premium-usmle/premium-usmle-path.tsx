/**
 * #premiumUSMLE pathway — U4.
 * Desktop card `17055:12456` · mobile copy `433:4439`.
 * Card is real text, not the Figma render. Sub-16 illustration type sits on the floor.
 */
import { PREMIUM_USMLE_PATH } from "./content";
import "./premium-usmle-path.css";

export function PremiumUsmlePath() {
  const c = PREMIUM_USMLE_PATH;

  return (
    <section
      className="premium-usmle-path"
      data-pgs-module="premium-usmle-path"
      data-block-gate="u4"
      aria-labelledby="premium-usmle-path-title"
    >
      <div className="premium-usmle-path__inner">
        <p className="premium-usmle-path__cue">
          <img className="premium-usmle-path__arrow" src={c.arrowSrc} alt="" />
          <span className="premium-usmle-path__cue-lines">
            <span>{c.pathLine1}</span>
            <span>{c.pathLine2}</span>
          </span>
        </p>
        <div className="premium-usmle-path__stage">
          <div className="premium-usmle-path__copy">
            <h2 id="premium-usmle-path-title" className="premium-usmle-path__headline">
              <span>{c.headlineLine1}</span>
              <span>{c.headlineLine2}</span>
            </h2>
            <p className="premium-usmle-path__body">{c.body}</p>
            <h3 className="premium-usmle-path__recruiter">{c.recruiter}</h3>
            <p className="premium-usmle-path__question">{c.recruiterQuestion}</p>
            <div className="premium-usmle-path__stack">
              <p className="premium-usmle-path__stack-lead">{c.stackLead}</p>
              <ul className="premium-usmle-path__points">
                {c.points.map((point) => (
                  <li key={point.label}>
                    <span
                      className="premium-usmle-path__swatch"
                      style={{ background: point.color }}
                      aria-hidden="true"
                    />
                    {point.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <article className="premium-usmle-path__card" aria-label="Study Abroad Pathway">
            <p className="premium-usmle-path__card-title">
              {c.cardTitle.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <p className="premium-usmle-path__crossed">{c.crossed}</p>
            <p className="premium-usmle-path__chosen">
              {c.chosen}
              <span aria-hidden="true"> 🙌</span>
            </p>
            <p className="premium-usmle-path__note">
              {c.note} <span className="premium-usmle-path__mark">{c.mark}</span>
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
