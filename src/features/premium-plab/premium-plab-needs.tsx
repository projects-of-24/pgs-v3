/**
 * #premiumUSMLE needs mosaic — U6.
 * Desktop: Figma mosaic. Phone: 85% rail, 2×2. iPad: padded 2×2. No overlap.
 */
import { PREMIUM_PLAB_NEEDS } from "./content";
import "./premium-plab-needs.css";

export function PremiumPlabNeeds() {
  const c = PREMIUM_PLAB_NEEDS;

  return (
    <section
      className="premium-plab-needs"
      data-pgs-module="premium-plab-needs"
      data-block-gate="u6"
      aria-labelledby="premium-plab-needs-title"
    >
      <div className="premium-plab-needs__inner">
        <h2 id="premium-plab-needs-title" className="premium-plab-needs__lead">
          {c.leadStart}
          <span className="premium-plab-needs__lead-end">{c.leadEnd}</span>
        </h2>
        <div className="premium-plab-needs__board">
          <article className="premium-plab-needs__card premium-plab-needs__card--profile">
            <img src={c.icons.shortlist} alt="" />
            <p className="premium-plab-needs__pill">
              <span>{c.profile[0]}</span>
              <span>{c.profile[1]}</span>
              <span>{c.profile[2]}</span>
            </p>
          </article>
          <article className="premium-plab-needs__card premium-plab-needs__card--observe">
            <img src={c.icons.registration} alt="" />
            <p className="premium-plab-needs__pill">{c.observation}</p>
          </article>
          <article className="premium-plab-needs__card premium-plab-needs__card--clinical">
            <p className="premium-plab-needs__marks" aria-hidden="true">
              <img src={c.icons.visa} alt="" />
              <span>+</span>
            </p>
            <div className="premium-plab-needs__stack">
              <img src={c.icons.scholarship} alt="" />
              <p className="premium-plab-needs__pill">
                <span>{c.clinical[0]}</span>
                <span className="premium-plab-needs__aside">{c.clinical[1]}</span>
              </p>
              <p className="premium-plab-needs__plus" aria-hidden="true">
                +
              </p>
              <p className="premium-plab-needs__pill">{c.courses}</p>
            </div>
          </article>
          <article className="premium-plab-needs__card premium-plab-needs__card--time">
            <img className="premium-plab-needs__heart" src={c.icons.heart} alt="" />
            <p>{c.timeline}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
