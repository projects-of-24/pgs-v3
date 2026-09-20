/**
 * #premiumUSMLE pathway — U4.
 * Desktop card `17055:12456` · mobile copy `433:4439`.
 * Card is real text, not the Figma render. Sub-16 illustration type sits on the floor.
 */
import { PREMIUM_PLAB_PATH } from "./content";
import "./premium-plab-path.css";

export function PremiumPlabPath() {
  const c = PREMIUM_PLAB_PATH;

  return (
    <section
      className="premium-plab-path"
      data-pgs-module="premium-plab-path"
      data-block-gate="u4"
      aria-labelledby="premium-plab-path-title"
    >
      <div className="premium-plab-path__inner">
        <p className="premium-plab-path__cue">
          <img className="premium-plab-path__arrow" src={c.arrowSrc} alt="" />
          <span className="premium-plab-path__cue-lines">
            <span>{c.pathLine1}</span>
            <span>{c.pathLine2}</span>
          </span>
        </p>
        <div className="premium-plab-path__stage">
          <div className="premium-plab-path__copy">
            <h2 id="premium-plab-path-title" className="premium-plab-path__headline">
              <span>{c.headlineLine1}</span>
              <span>{c.headlineLine2}</span>
            </h2>
            <p className="premium-plab-path__body">{c.body}</p>
            <h3 className="premium-plab-path__recruiter">{c.recruiter}</h3>
            <p className="premium-plab-path__question">{c.recruiterQuestion}</p>
            <div className="premium-plab-path__stack">
              <p className="premium-plab-path__stack-lead">{c.stackLead}</p>
              <ul className="premium-plab-path__points">
                {c.points.map((point) => (
                  <li key={point.label}>
                    <span
                      className="premium-plab-path__swatch"
                      style={{ background: point.color }}
                      aria-hidden="true"
                    />
                    {point.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <article className="premium-plab-path__card" aria-label="Study Abroad Pathway">
            <p className="premium-plab-path__card-title">
              {c.cardTitle.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <p className="premium-plab-path__crossed">{c.crossed}</p>
            <p className="premium-plab-path__chosen">
              {c.chosen}
              <span aria-hidden="true"> 🙌</span>
            </p>
            <p className="premium-plab-path__note">
              {c.note} <span className="premium-plab-path__mark">{c.mark}</span>
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
