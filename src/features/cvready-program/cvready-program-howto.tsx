/**
 * CV Ready howto — CR10.
 * Desk `19050:12221` · Mob `1312:8007`.
 * 4 bar tabs swap tip title + bullets + image.
 * Slide 1 = Figma. Slides 2–4 = lorem fixtures (owner).
 * Body height locked to tallest slide (stack all tips/imgs) — no footer jump.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: eyebrow / tip body 14.4
 * ISSUE: below floor
 * PGS: ≥16px
 */
"use client";

import { useState } from "react";
import { CVREADY_PROGRAM_HOWTO } from "./content";
import "./cvready-program-howto.css";

export function CvreadyProgramHowto() {
  const c = CVREADY_PROGRAM_HOWTO;
  const [index, setIndex] = useState(0);

  return (
    <section
      className="cvready-program-howto"
      data-pgs-module="cvready-program-howto"
      data-block-gate="cr10"
      data-figma-desktop="19050:12221"
      data-figma-mobile="1312:8007"
      aria-labelledby="cvready-program-howto-title"
    >
      <div className="cvready-program-howto__inner">
        <header className="cvready-program-howto__header">
          <p className="cvready-program-howto__eyebrow">
            {c.eyebrowLead}
            <strong>{c.eyebrowHash}</strong>
            {c.eyebrowTail}
          </p>
          <h2
            id="cvready-program-howto-title"
            className="cvready-program-howto__title"
          >
            {c.title}
          </h2>
          <div
            className="cvready-program-howto__tabs"
            role="tablist"
            aria-label="Howto slides"
          >
            {c.slides.map((s, i) => {
              const selected = i === index;
              return (
                <button
                  key={s.id}
                  type="button"
                  role="tab"
                  id={`cvready-howto-tab-${s.id}`}
                  className={
                    selected
                      ? "cvready-program-howto__tab is-active"
                      : "cvready-program-howto__tab"
                  }
                  aria-selected={selected}
                  aria-controls={`cvready-howto-panel-${s.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setIndex(i)}
                >
                  <span className="cvready-program-howto__tab-bar" aria-hidden="true" />
                  <span className="cvready-program-howto__sr">{s.tabLabel}</span>
                </button>
              );
            })}
          </div>
        </header>

        <div className="cvready-program-howto__body" aria-live="polite">
          {/*
           * Stack every tip panel so column height = tallest slide.
           * Only the active panel is visible — footer stays put.
           */}
          <div className="cvready-program-howto__tips-stack">
            {c.slides.map((s, i) => {
              const active = i === index;
              return (
                <div
                  key={s.id}
                  id={`cvready-howto-panel-${s.id}`}
                  role="tabpanel"
                  aria-labelledby={`cvready-howto-tab-${s.id}`}
                  className={
                    active
                      ? "cvready-program-howto__tips is-active"
                      : "cvready-program-howto__tips"
                  }
                  aria-hidden={active ? undefined : true}
                >
                  <h3 className="cvready-program-howto__tip-title">{s.tipTitle}</h3>
                  <ul className="cvready-program-howto__tip-list">
                    {s.tips.map((tip) => (
                      <li key={tip.lead} className="cvready-program-howto__tip">
                        <span
                          className="cvready-program-howto__dot"
                          aria-hidden="true"
                        />
                        <p className="cvready-program-howto__tip-text">
                          {tip.lead}
                          {tip.bold ? <strong>{tip.bold}</strong> : null}
                        </p>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div className="cvready-program-howto__media">
            {c.slides.map((s, i) => {
              const active = i === index;
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={s.id}
                  className={
                    active
                      ? "cvready-program-howto__img is-active"
                      : "cvready-program-howto__img"
                  }
                  src={s.imageSrc}
                  alt={active ? s.imageAlt : ""}
                  width={400}
                  height={299}
                  aria-hidden={active ? undefined : true}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
