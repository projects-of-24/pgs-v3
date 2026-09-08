/**
 * Block 8 — Useful Tips W0 (fixture carousel).
 * Desktop Figma `17041:14174` · Mobile `210:3629`
 * Arrows/dots scroll fixture slides + CSS click slide (countries pack: CSS click).
 * No CMS/DB — backend pass later. No Motion scroll on this block.
 */
"use client";

import Image from "next/image";
import { useState } from "react";
import { FEED_TRACK_PROGRESS_TIPS } from "./content";
import "./feed-track-progress-tips.css";

const ARROW_SRC = "/assets/img/figma-progress/tips-arrow.svg";

type SlideDir = "next" | "prev";

export function FeedTrackProgressTips() {
  const { title, slides } = FEED_TRACK_PROGRESS_TIPS;
  const len = slides.length;
  const [index, setIndex] = useState(0);
  const [anim, setAnim] = useState<{ key: number; dir: SlideDir } | null>(null);
  const tip = slides[index] ?? slides[0];

  const goTo = (nextIndex: number, dir: SlideDir) => {
    if (nextIndex === index || len < 2) return;
    setAnim({ key: (anim?.key ?? 0) + 1, dir });
    setIndex(nextIndex);
  };

  const goPrev = () => goTo((index - 1 + len) % len, "prev");
  const goNext = () => goTo((index + 1) % len, "next");
  const goDot = (slideIndex: number) => {
    if (slideIndex === index) return;
    goTo(slideIndex, slideIndex > index ? "next" : "prev");
  };

  const cardClass =
    anim == null
      ? "ftp-tips__card"
      : `ftp-tips__card ftp-tips__card--in-${anim.dir}`;

  return (
    <section
      className="ftp-tips"
      data-pgs-module="feed-track-progress-tips"
      data-figma-desktop="17041:14174"
      data-figma-mobile="210:3629"
      data-tips-gate="w0-fixture"
      aria-labelledby="ftp-tips-title"
    >
      <h2 className="ftp-tips__title" id="ftp-tips-title">
        {title}
      </h2>

      <div className="ftp-tips__carousel">
        <button
          type="button"
          className="ftp-tips__arrow ftp-tips__arrow--prev"
          aria-label="Previous tip"
          onClick={goPrev}
        >
          <Image src={ARROW_SRC} alt="" width={20} height={20} unoptimized />
        </button>

        <div className="ftp-tips__stage">
          <article
            key={anim?.key ?? "tip-static"}
            className={cardClass}
            aria-live="polite"
            aria-atomic="true"
          >
            <p className="ftp-tips__label">{tip.label}</p>
            <p className="ftp-tips__body">{tip.body}</p>
          </article>
        </div>

        <button
          type="button"
          className="ftp-tips__arrow ftp-tips__arrow--next"
          aria-label="Next tip"
          onClick={goNext}
        >
          <Image src={ARROW_SRC} alt="" width={20} height={20} unoptimized />
        </button>
      </div>

      <div className="ftp-tips__dots" role="tablist" aria-label="Tip slides">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            type="button"
            role="tab"
            className={`ftp-tips__dot${slideIndex === index ? " is-active" : ""}`}
            aria-label={`Go to tip ${slideIndex + 1}`}
            aria-selected={slideIndex === index}
            onClick={() => goDot(slideIndex)}
          />
        ))}
      </div>
    </section>
  );
}
