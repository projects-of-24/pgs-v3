/**
 * #premiumUSMLE needs mosaic — U6.
 * Desktop: Figma mosaic. Phone: 85% rail, 2×2. iPad: padded 2×2. No overlap.
 */
import { PREMIUM_USMLE_NEEDS } from "./content";
import "./premium-usmle-needs.css";

export function PremiumUsmleNeeds() {
  const c = PREMIUM_USMLE_NEEDS;

  return (
    <section
      className="premium-usmle-needs"
      data-pgs-module="premium-usmle-needs"
      data-block-gate="u6"
      aria-labelledby="premium-usmle-needs-title"
    >
      <div className="premium-usmle-needs__inner">
        <h2 id="premium-usmle-needs-title" className="premium-usmle-needs__lead">
          {c.leadStart}
          <span className="premium-usmle-needs__lead-end">{c.leadEnd}</span>
        </h2>
        <div className="premium-usmle-needs__board">
          <article className="premium-usmle-needs__card premium-usmle-needs__card--profile">
            <img src={c.icons.shortlist} alt="" />
            <p className="premium-usmle-needs__pill">
              <span>{c.profile[0]}</span>
              <span>{c.profile[1]}</span>
              <span>{c.profile[2]}</span>
            </p>
          </article>
          <article className="premium-usmle-needs__card premium-usmle-needs__card--observe">
            <img src={c.icons.registration} alt="" />
            <p className="premium-usmle-needs__pill">{c.observation}</p>
          </article>
          <article className="premium-usmle-needs__card premium-usmle-needs__card--clinical">
            <p className="premium-usmle-needs__marks" aria-hidden="true">
              <img src={c.icons.visa} alt="" />
              <span>+</span>
            </p>
            <div className="premium-usmle-needs__stack">
              <img src={c.icons.scholarship} alt="" />
              <p className="premium-usmle-needs__pill">
                <span>{c.clinical[0]}</span>
                <span className="premium-usmle-needs__aside">{c.clinical[1]}</span>
              </p>
              <p className="premium-usmle-needs__plus" aria-hidden="true">
                +
              </p>
              <p className="premium-usmle-needs__pill">{c.courses}</p>
            </div>
          </article>
          <article className="premium-usmle-needs__card premium-usmle-needs__card--time">
            <img className="premium-usmle-needs__heart" src={c.icons.heart} alt="" />
            <p>{c.timeline}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
