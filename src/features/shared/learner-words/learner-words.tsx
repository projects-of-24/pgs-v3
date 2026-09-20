/**
 * Shared learner testimonials. Pages import this — do not rebuild per page.
 * Desktop Figma `17052:8738` · Mobile `366:4375`.
 *
 * Fixed shells (owner lock):
 * - whole card height
 * - dark quote block height
 * - bio block height (independent of quote length)
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: desk quote 12.8 · mob quote 14 · name/meta smaller
 * ISSUE: below type floor; long quote clipped in fixed black shell
 * PGS IMPLEMENTATION: quote 15px (owner). Black body grows to fit full
 * quote — no overflow clip. Bio height stays fixed.
 */
import { LEARNER_WORDS } from "./content";
import "./learner-words.css";

export function LearnerWords() {
  const c = LEARNER_WORDS;

  return (
    <section
      className="learner-words"
      data-pgs-module="learner-words"
      data-block-gate="h6"
      data-figma-desktop="17052:8738"
      data-figma-mobile="366:4375"
      aria-labelledby="learner-words-heading"
    >
      <div className="learner-words__head">
        <div className="learner-words__title-row">
          <h2 id="learner-words-heading" className="learner-words__lead">
            {c.lead}
          </h2>
          <span className="learner-words__badge">{c.badge}</span>
        </div>
        <p className="learner-words__intro">
          {c.bodyBefore}
          <strong>{c.bodyBoldPgs}</strong>
          {c.bodyMid}
          <strong>{c.bodyBold3x}</strong>
          {c.bodyAnd}
          <strong>{c.bodyBoldSkills}</strong>
          {c.bodyAfter}
        </p>
      </div>

      <ul className="learner-words__track" aria-label="Learner testimonials">
        {c.cards.map((card, i) => (
          <li key={`learner-words-${i}`} className="learner-words__card">
            <div className="learner-words__photo-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="learner-words__photo"
                src={c.photoSrc}
                alt={i === 0 ? c.photoAlt : ""}
                width={316}
                height={317}
              />
            </div>
            <div className="learner-words__body">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="learner-words__quote-mark"
                src={c.quoteSrc}
                alt=""
                width={26}
                height={26}
                aria-hidden="true"
              />
              <p className="learner-words__quote learner-words__quote--desk">{card.quoteDesk}</p>
              <p className="learner-words__quote learner-words__quote--mob">{c.quoteMob}</p>
              <div className="learner-words__bio">
                <p className="learner-words__name">{c.bio.name}</p>
                <p className="learner-words__meta">
                  {c.bio.role}
                  <br />
                  {c.bio.location}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
