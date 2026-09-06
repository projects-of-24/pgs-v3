/**
 * A word from Our learners.
 * Desktop Figma 18760:12855 · mobile 18760:11795 (horizontal snap-scroll).
 */
import { USMLE_ROTATION_TESTIMONIALS } from "./content";
import "./usmle-rotation-testimonials.css";

const PHOTO = "/assets/img/selfe.jpg";
const QUOTE = "/assets/img/usmlerotation/quote.svg";

export function UsmleRotationTestimonials() {
  const c = USMLE_ROTATION_TESTIMONIALS;

  return (
    <section
      className="usmle-words"
      data-pgs-module="usmle-rotation-testimonials"
      aria-labelledby="usmle-words-heading"
    >
      <div className="usmle-words__head">
        <div className="usmle-words__title-row">
          <h2 id="usmle-words-heading" className="usmle-words__lead">
            {c.lead}
          </h2>
          <span className="usmle-words__badge">{c.badge}</span>
        </div>
        <p className="usmle-words__intro">
          {c.bodyBefore}
          <strong>{c.bodyBoldPgs}</strong>
          {c.bodyMid}
          <strong>{c.bodyBold3x}</strong>
          {c.bodyAnd}
          <strong>{c.bodyBoldSkills}</strong>
          {c.bodyAfter}
        </p>
      </div>

      <ul className="usmle-words__track" aria-label="Learner testimonials">
        {c.cards.map((card, i) => (
          <li key={`testimonial-${i}`} className="usmle-words__card">
            <div className="usmle-words__photo-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="usmle-words__photo"
                src={PHOTO}
                alt={i === 0 ? c.photoAlt : ""}
                width={316}
                height={317}
              />
            </div>
            <div className="usmle-words__body">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="usmle-words__quote"
                src={QUOTE}
                alt=""
                width={26}
                height={26}
              />
              <p className="usmle-words__quote-text usmle-words__quote-text--desktop">
                {card.quoteDesktop}
              </p>
              <p className="usmle-words__quote-text usmle-words__quote-text--mobile">
                {card.quote}
              </p>
              <div className="usmle-words__author">
                <p className="usmle-words__name">{card.name}</p>
                <p className="usmle-words__meta">
                  {card.role}
                  <br />
                  {card.location}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
