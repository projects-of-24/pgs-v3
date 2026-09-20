/**
 * Scholarship steps path — S5.
 * Desktop steps `17041:18807` · testimonial placed `17041:18836` (~253, not master 395)
 * · Find CTA `17041:18804`.
 * Mobile `328:3201` / `331:3250` / `331:3262`.
 * Owned CSS. Find CTA + pager visual-only (popup / carousel deferred).
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: desk step bullets ~8.6–14.4px · mob bullets ~12px · placed quote ~10px scale
 * ISSUE: below WCAG readable floor / owner reading locks
 * PGS IMPLEMENTATION: desk bullets ≥14px · mobile body ≥14px · quote/name ≥14px via --sch-steps-* vars
 */
import { SCHOLARSHIP_STEPS } from "./content";
import "./scholarship-steps.css";

export function ScholarshipSteps() {
  const c = SCHOLARSHIP_STEPS;
  const t = c.testimonial;

  return (
    <section
      className="scholarship-steps"
      data-pgs-module="scholarship-steps"
      data-block-gate="s5"
      aria-labelledby="scholarship-steps-heading"
    >
      <div className="scholarship-steps__inner">
        <div className="scholarship-steps__process">
          <h2
            id="scholarship-steps-heading"
            className="scholarship-steps__heading"
          >
            {c.heading}
          </h2>

          <div className="scholarship-steps__cards-scroll">
            <ul className="scholarship-steps__cards">
              {c.steps.map((step) => (
                <li key={step.label} className="scholarship-steps__card">
                  <p className="scholarship-steps__label">{step.label}</p>
                  <h3 className="scholarship-steps__title">{step.title}</h3>
                  <ul className="scholarship-steps__bullets">
                    {step.bullets.map((bullet) => (
                      <li key={bullet} className="scholarship-steps__bullet">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="scholarship-steps__tick"
                          src={c.tickIconSrc}
                          alt=""
                          width={17}
                          height={17}
                        />
                        <span className="scholarship-steps__bullet-text">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="scholarship-steps__story">
          <figure className="scholarship-steps__testimonial">
            <div className="scholarship-steps__photo-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="scholarship-steps__photo"
                src={t.photoSrc}
                alt={t.photoAlt}
                width={395}
                height={396}
              />
            </div>
            <figcaption className="scholarship-steps__quote-panel">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="scholarship-steps__quote-mark"
                src={t.quoteIconSrc}
                alt=""
                width={32}
                height={32}
              />
              <blockquote className="scholarship-steps__quote">
                <p>{t.quote}</p>
              </blockquote>
              <p className="scholarship-steps__name">{t.name}</p>
              <p className="scholarship-steps__role">
                {t.role}
                <br />
                {t.location}
              </p>
            </figcaption>
          </figure>

          {/* Visual-only pager — carousel wire deferred */}
          <div className="scholarship-steps__pager" aria-hidden="true">
            <div className="scholarship-steps__pager-arrows">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="scholarship-steps__pager-arrow"
                src={t.arrowLeftSrc}
                alt=""
                width={48}
                height={48}
              />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="scholarship-steps__pager-arrow"
                src={t.arrowRightSrc}
                alt=""
                width={48}
                height={48}
              />
            </div>
            <p className="scholarship-steps__page-label">{t.pageLabel}</p>
          </div>
        </div>

        <div className="scholarship-steps__find">
          <p className="scholarship-steps__find-support">{c.find.support}</p>
          <div className="scholarship-steps__find-actions">
            <button type="button" className="scholarship-steps__find-cta">
              {c.find.ctaLabel}
            </button>
            <aside className="scholarship-steps__find-note">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                className="scholarship-steps__find-arrow"
                src={c.find.arrowSrc}
                alt=""
                width={99}
                height={99}
              />
              <p className="scholarship-steps__find-disclaimer">
                {c.find.disclaimer}
              </p>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
