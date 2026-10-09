/**
 * Shared learner testimonials. Pages import this — do not rebuild per page.
 * Desktop Figma `17052:8738` · Mobile `366:4375`.
 * Optional `data` lets Courses CMS override (COURSE2d-D4a).
 */
import { LEARNER_WORDS } from "./content";
import type { CoursesLearnersBody } from "../../programs-courses/courses-cms-shared-defaults";
import "./learner-words.css";

type LearnerWordsProps = {
  data?: CoursesLearnersBody;
};

export function LearnerWords({ data }: LearnerWordsProps = {}) {
  const c = data ?? {
    lead: LEARNER_WORDS.lead,
    badge: LEARNER_WORDS.badge,
    bodyBefore: LEARNER_WORDS.bodyBefore,
    bodyBoldPgs: LEARNER_WORDS.bodyBoldPgs,
    bodyMid: LEARNER_WORDS.bodyMid,
    bodyBold3x: LEARNER_WORDS.bodyBold3x,
    bodyAnd: LEARNER_WORDS.bodyAnd,
    bodyBoldSkills: LEARNER_WORDS.bodyBoldSkills,
    bodyAfter: LEARNER_WORDS.bodyAfter,
    photoSrc: LEARNER_WORDS.photoSrc,
    photoAlt: LEARNER_WORDS.photoAlt,
    quoteSrc: LEARNER_WORDS.quoteSrc,
    quoteMob: LEARNER_WORDS.quoteMob,
    cards: LEARNER_WORDS.cards.map((card) => ({ quoteDesk: card.quoteDesk })),
    bio: { ...LEARNER_WORDS.bio }
  };
  const cards = c.cards.filter((card) => card.quoteDesk.trim()).slice(0, 3);
  const photoSrc = c.photoSrc.trim();

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
          {c.badge.trim() ? <span className="learner-words__badge">{c.badge}</span> : null}
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

      {cards.length ? (
        <ul className="learner-words__track" aria-label="Learner testimonials">
          {cards.map((card, i) => (
            <li key={`learner-words-${i}`} className="learner-words__card">
              <div className="learner-words__photo-wrap">
                {photoSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    className="learner-words__photo"
                    src={photoSrc}
                    alt={i === 0 ? c.photoAlt : ""}
                    width={316}
                    height={317}
                  />
                ) : (
                  <div
                    className="learner-words__photo"
                    role="img"
                    aria-label={c.photoAlt || "No learner photo yet"}
                    style={{ background: "#e8e6ef" }}
                  />
                )}
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
                <p className="learner-words__quote learner-words__quote--mob">{c.quoteMob || card.quoteDesk}</p>
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
      ) : null}
    </section>
  );
}
