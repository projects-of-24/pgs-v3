/**
 * Purple Events — E11 Testimonials (student feed back).
 * Desk Figma `17071:14485` · Mob `551:8249` (E11b polish).
 * Fixtures only — no DB.
 * Photo plate stays fixed; only quote body swaps. Quote height = tallest slide.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: desk quote 14px
 * ISSUE: below PGS readable floor / WCAG normal text
 * PGS IMPLEMENTATION: quote 15px (same floor as LearnerWords)
 */
"use client";

import { useState } from "react";
import { EVENT_SESSION_FIXTURE } from "./content";
import "./purple-events-testimonials.css";

const ARROW_LEFT = "/assets/img/purple-events/arrow-left-circle.svg";
const ARROW_RIGHT = "/assets/img/purple-events/arrow-right-circle.svg";

export function PurpleEventsTestimonials() {
  const slides = EVENT_SESSION_FIXTURE.testimonials;
  const [index, setIndex] = useState(0);
  const total = slides.length;
  const slide = slides[index];

  if (!slide || total === 0) return null;

  function go(delta: number) {
    setIndex((i) => (i + delta + total) % total);
  }

  return (
    <section
      id="pe-e11"
      className="pe-tm"
      data-pgs-module="purple-events-testimonials"
      data-block-gate="e11a"
      data-figma-desktop="17071:14485"
      data-figma-mobile="551:8249"
      aria-roledescription="carousel"
      aria-label="Student feedback"
    >
      <div className="pe-tm__inner">
        <div
          className="pe-tm__nav pe-tm__nav--desk"
          role="group"
          aria-label="Browse testimonials"
        >
          <button
            type="button"
            className="pe-tm__arrow"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ARROW_LEFT} alt="" width={48} height={48} />
          </button>
          <button
            type="button"
            className="pe-tm__arrow"
            aria-label="Next testimonial"
            onClick={() => go(1)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ARROW_RIGHT} alt="" width={48} height={48} />
          </button>
        </div>

        <div className="pe-tm__stage" data-active={slide.id}>
          <figure className="pe-tm__quote">
            <span className="pe-tm__qmark pe-tm__qmark--open" aria-hidden="true">
              “
            </span>
            {/* Stack every quote so height = tallest; only active text is visible */}
            <div className="pe-tm__texts" aria-live="polite" aria-atomic="true">
              {slides.map((s, i) => (
                <blockquote
                  key={s.id}
                  className={`pe-tm__text${i === index ? " is-active" : ""}`}
                  aria-hidden={i === index ? undefined : true}
                >
                  {s.quote}
                </blockquote>
              ))}
            </div>
            <span className="pe-tm__qmark pe-tm__qmark--close" aria-hidden="true">
              ”
            </span>
          </figure>

          <div className="pe-tm__photo">
            {/* Stack imgs so plate size never jumps; only active pic shows */}
            <div className="pe-tm__imgs">
              {slides.map((s, i) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={s.id}
                  className={`pe-tm__img${i === index ? " is-active" : ""}`}
                  src={s.image}
                  alt={i === index ? s.imageAlt : ""}
                  width={403}
                  height={423}
                  aria-hidden={i === index ? undefined : true}
                />
              ))}
            </div>
            <div className="pe-tm__program" aria-hidden="true">
              <span className="pe-tm__program-label">{slide.programLabel}</span>
              <span className="pe-tm__path">{slide.pathLabel}</span>
            </div>
            <div className="pe-tm__meta">
              <p className="pe-tm__name">{slide.name}</p>
              <p className="pe-tm__premium">{slide.premiumLabel}</p>
            </div>
            <p className="pe-tm__path pe-tm__path--desk" aria-hidden="true">
              {slide.pathLabel}
            </p>
          </div>
        </div>

        <div
          className="pe-tm__nav pe-tm__nav--mob"
          role="group"
          aria-label="Browse testimonials"
        >
          <button
            type="button"
            className="pe-tm__arrow pe-tm__arrow--mob"
            aria-label="Previous testimonial"
            onClick={() => go(-1)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ARROW_LEFT} alt="" width={29} height={29} />
          </button>
          <button
            type="button"
            className="pe-tm__arrow pe-tm__arrow--mob"
            aria-label="Next testimonial"
            onClick={() => go(1)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ARROW_RIGHT} alt="" width={29} height={29} />
          </button>
        </div>
      </div>
    </section>
  );
}
