/**
 * #premiumNonMedical path — N4.
 * Same block as medical path. Headline is this page's Figma.
 * Desktop `17055:10618` + card `17055:10619` · phone `375:4198` + `375:4229`.
 */
import { PREMIUM_NONMEDICAL_PATH } from "./content";
import "./premium-nonmedical-path.css";

export function PremiumNonmedicalPath() {
  const c = PREMIUM_NONMEDICAL_PATH;

  return (
    <section
      className="premium-nonmedical-path"
      data-pgs-module="premium-nonmedical-path"
      data-block-gate="n4"
      aria-labelledby="premium-nonmedical-path-title"
    >
      <div className="premium-nonmedical-path__inner">
        <p className="premium-nonmedical-path__cue">
          <img className="premium-nonmedical-path__arrow" src={c.arrowSrc} alt="" />
          <span className="premium-nonmedical-path__cue-lines">
            <span>{c.pathLine1}</span>
            <span>{c.pathLine2}</span>
          </span>
        </p>
        <div className="premium-nonmedical-path__stage">
          <div className="premium-nonmedical-path__copy">
            <h2 id="premium-nonmedical-path-title" className="premium-nonmedical-path__headline">
              {c.headline}
            </h2>
            <p className="premium-nonmedical-path__body">{c.body}</p>
            <h3 className="premium-nonmedical-path__recruiter">{c.recruiter}</h3>
            <p className="premium-nonmedical-path__question">{c.recruiterQuestion}</p>
            <div className="premium-nonmedical-path__stack">
              <p className="premium-nonmedical-path__stack-lead">{c.stackLead}</p>
              <ul className="premium-nonmedical-path__points">
                {c.points.map((point) => (
                  <li key={point.label}>
                    <span
                      className="premium-nonmedical-path__swatch"
                      style={{ background: point.color }}
                      aria-hidden="true"
                    />
                    {point.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <article className="premium-nonmedical-path__card" aria-label="Study Abroad Pathway">
            <p className="premium-nonmedical-path__card-title">
              {c.cardTitle.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </p>
            <p className="premium-nonmedical-path__crossed">{c.crossed}</p>
            <p className="premium-nonmedical-path__chosen">{c.chosen}</p>
            <p className="premium-nonmedical-path__hands" aria-hidden="true">
              🙌
            </p>
            <p className="premium-nonmedical-path__note">
              {c.note} <span className="premium-nonmedical-path__mark">{c.mark}</span>
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
