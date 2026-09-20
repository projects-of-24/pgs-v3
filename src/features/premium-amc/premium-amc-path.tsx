/**
 * #premiumUSMLE pathway — U4.
 * Desktop card `17055:12456` · mobile copy `433:4439`.
 * Card is real text, not the Figma render. Sub-16 illustration type sits on the floor.
 */
import { PREMIUM_AMC_PATH } from "./content";
import "./premium-amc-path.css";

export function PremiumAmcPath() {
  const c = PREMIUM_AMC_PATH;

  return (
    <section
      className="premium-amc-path"
      data-pgs-module="premium-amc-path"
      data-block-gate="u4"
      aria-labelledby="premium-amc-path-title"
    >
      <div className="premium-amc-path__inner">
        <p className="premium-amc-path__cue">
          <img className="premium-amc-path__arrow" src={c.arrowSrc} alt="" />
          <span className="premium-amc-path__cue-lines">
            <span>{c.pathLine1}</span>
            <span>{c.pathLine2}</span>
          </span>
        </p>
        <div className="premium-amc-path__stage">
          <div className="premium-amc-path__copy">
            <h2 id="premium-amc-path-title" className="premium-amc-path__headline">
              <span>{c.headlineLine1}</span>
              <span>{c.headlineLine2}</span>
            </h2>
            <p className="premium-amc-path__body">{c.body}</p>
            <h3 className="premium-amc-path__recruiter">{c.recruiter}</h3>
            <p className="premium-amc-path__question">{c.recruiterQuestion}</p>
            <div className="premium-amc-path__stack">
              <p className="premium-amc-path__stack-lead">{c.stackLead}</p>
              <ul className="premium-amc-path__points">
                {c.points.map((point) => (
                  <li key={point.label}>
                    <span
                      className="premium-amc-path__swatch"
                      style={{ background: point.color }}
                      aria-hidden="true"
                    />
                    {point.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <article className="premium-amc-path__card" aria-label="Study Abroad Pathway">
            <p className="premium-amc-path__card-title">
              {c.cardTitle.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <p className="premium-amc-path__crossed">{c.crossed}</p>
            <p className="premium-amc-path__chosen">
              {c.chosen}
              <span aria-hidden="true"> 🙌</span>
            </p>
            <p className="premium-amc-path__note">
              {c.note} <span className="premium-amc-path__mark">{c.mark}</span>
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
