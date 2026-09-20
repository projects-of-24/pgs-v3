/**
 * #premiumNonMedical explanation — N8.
 * Desktop `17055:10657` · phone black sheet `379:4374`.
 * Join is visual only.
 */
import { PREMIUM_NONMEDICAL_EXPLAIN } from "./content";
import "./premium-nonmedical-explain.css";

export function PremiumNonmedicalExplain() {
  const c = PREMIUM_NONMEDICAL_EXPLAIN;

  return (
    <section
      className="premium-nonmedical-explain"
      data-pgs-module="premium-nonmedical-explain"
      data-block-gate="n8"
      aria-labelledby="premium-nonmedical-explain-title"
    >
      <div className="premium-nonmedical-explain__stage">
        <div className="premium-nonmedical-explain__panel">
          <h2 id="premium-nonmedical-explain-title" className="premium-nonmedical-explain__title">
            <span className="premium-nonmedical-explain__title-lead">What Is</span>{" "}
            <span className="premium-nonmedical-explain__title-mark">#purplePremium?</span>
          </h2>
          <p className="premium-nonmedical-explain__family">{c.family}</p>

          <div className="premium-nonmedical-explain__answers">
            <p className="premium-nonmedical-explain__short">
              <strong>{c.shortLabel}</strong>
              <span>{c.shortAnswer}</span>
            </p>
            <p className="premium-nonmedical-explain__real">
              <strong>{c.realLabel}</strong>
              <span>{c.realAnswer}</span>
            </p>
          </div>

          <p className="premium-nonmedical-explain__standout">
            <span>{c.standoutLine1}</span>
            <span>{c.standoutLine2}</span>
          </p>
          <img className="premium-nonmedical-explain__arrow" src={c.arrowSrc} alt="" />

          <div className="premium-nonmedical-explain__point premium-nonmedical-explain__point--ai">
            <h3>{c.point1Title}</h3>
            <p>{c.point1Body}</p>
          </div>

          <div className="premium-nonmedical-explain__ai">
            <img className="premium-nonmedical-explain__ai-box" src={c.boxSrc} alt="" />
            <p>{c.aiNote}</p>
            <img className="premium-nonmedical-explain__cursor" src={c.cursorSrc} alt="" />
          </div>

          <ul className="premium-nonmedical-explain__stats">
            {c.stats.map((stat) => (
              <li key={stat.value}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
                <img src={stat.underline} alt="" />
              </li>
            ))}
          </ul>

          <div className="premium-nonmedical-explain__point premium-nonmedical-explain__point--path">
            <h3>{c.point2Title}</h3>
            <p className="premium-nonmedical-explain__sub">{c.point2Sub}</p>
            <p>{c.point2Body}</p>
          </div>

          <div className="premium-nonmedical-explain__card">
            <div className="premium-nonmedical-explain__card-shell">
              <h3>{c.point3Title}</h3>
              <img className="premium-nonmedical-explain__uni" src={c.universitySrc} alt="" />
              <button type="button" className="premium-nonmedical-explain__join">
                {c.joinLabel}
              </button>
            </div>
            <p>{c.point3Body}</p>
          </div>

          <div className="premium-nonmedical-explain__point premium-nonmedical-explain__point--community">
            <h3>{c.point4Title}</h3>
            <p>{c.point4Body}</p>
          </div>

          <div className="premium-nonmedical-explain__launchpad">
            <figure className="premium-nonmedical-explain__photo">
              <img src={c.photoSrc} alt={c.photoAlt} />
            </figure>
            <p className="premium-nonmedical-explain__launch">
              <span>{c.launchpadLine1}</span>
              <span>{c.launchpadLine2}</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
