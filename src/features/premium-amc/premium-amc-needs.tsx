/**
 * #premiumUSMLE needs mosaic — U6.
 * Desktop: Figma mosaic. Phone: 85% rail, 2×2. iPad: padded 2×2. No overlap.
 */
import { PREMIUM_AMC_NEEDS } from "./content";
import "./premium-amc-needs.css";

export function PremiumAmcNeeds() {
  const c = PREMIUM_AMC_NEEDS;

  return (
    <section
      className="premium-amc-needs"
      data-pgs-module="premium-amc-needs"
      data-block-gate="u6"
      aria-labelledby="premium-amc-needs-title"
    >
      <div className="premium-amc-needs__inner">
        <h2 id="premium-amc-needs-title" className="premium-amc-needs__lead">
          {c.leadStart}
          <span className="premium-amc-needs__lead-end">{c.leadEnd}</span>
        </h2>
        <div className="premium-amc-needs__board">
          <article className="premium-amc-needs__card premium-amc-needs__card--profile">
            <img src={c.icons.shortlist} alt="" />
            <p className="premium-amc-needs__pill">
              <span>{c.profile[0]}</span>
              <span>{c.profile[1]}</span>
              <span>{c.profile[2]}</span>
            </p>
          </article>
          <article className="premium-amc-needs__card premium-amc-needs__card--observe">
            <img src={c.icons.registration} alt="" />
            <p className="premium-amc-needs__pill">{c.observation}</p>
          </article>
          <article className="premium-amc-needs__card premium-amc-needs__card--clinical">
            <p className="premium-amc-needs__marks" aria-hidden="true">
              <img src={c.icons.visa} alt="" />
              <span>+</span>
            </p>
            <div className="premium-amc-needs__stack">
              <img src={c.icons.scholarship} alt="" />
              <p className="premium-amc-needs__pill">
                <span>{c.clinical[0]}</span>
                <span className="premium-amc-needs__aside">{c.clinical[1]}</span>
              </p>
              <p className="premium-amc-needs__plus" aria-hidden="true">
                +
              </p>
              <p className="premium-amc-needs__pill">{c.courses}</p>
            </div>
          </article>
          <article className="premium-amc-needs__card premium-amc-needs__card--time">
            <img className="premium-amc-needs__heart" src={c.icons.heart} alt="" />
            <p>{c.timeline}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
