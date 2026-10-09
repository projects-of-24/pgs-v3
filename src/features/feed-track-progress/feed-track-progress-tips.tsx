/**
 * Block 8 — Useful Tips.
 * Premium: live `progress_tips` when `slides` passed (FTP-B7c).
 * Family A / omit props → Figma fixtures (W0).
 * Desktop Figma `17041:14174` · Mobile `210:3629`
 */
"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { FEED_TRACK_PROGRESS_TIPS } from "./content";
import type { ProgressTipSlide } from "./load-progress-tips-resources";
import "./feed-track-progress-tips.css";

const ARROW_SRC = "/assets/img/figma-progress/tips-arrow.svg";

type SlideDir = "next" | "prev";

type FeedTrackProgressTipsProps = {
  /** FTP-B7c live store; omit → fixtures. */
  slides?: readonly ProgressTipSlide[];
};

export function FeedTrackProgressTips({ slides: liveSlides }: FeedTrackProgressTipsProps) {
  const wired = liveSlides !== undefined;
  const slides = useMemo(() => {
    if (wired) return [...liveSlides];
    return FEED_TRACK_PROGRESS_TIPS.slides.map((slide, index) => ({
      id: `fixture-tip-${index}`,
      label: slide.label,
      body: slide.body
    }));
  }, [wired, liveSlides]);

  const title = FEED_TRACK_PROGRESS_TIPS.title;
  const len = slides.length;
  const [index, setIndex] = useState(0);
  const [anim, setAnim] = useState<{ key: number; dir: SlideDir } | null>(null);
  const safeIndex = len ? Math.min(index, len - 1) : 0;
  const tip = slides[safeIndex];

  const goTo = (nextIndex: number, dir: SlideDir) => {
    if (nextIndex === safeIndex || len < 2) return;
    setAnim({ key: (anim?.key ?? 0) + 1, dir });
    setIndex(nextIndex);
  };

  const goPrev = () => goTo((safeIndex - 1 + len) % len, "prev");
  const goNext = () => goTo((safeIndex + 1) % len, "next");
  const goDot = (slideIndex: number) => {
    if (slideIndex === safeIndex) return;
    goTo(slideIndex, slideIndex > safeIndex ? "next" : "prev");
  };

  const cardClass =
    anim == null ? "ftp-tips__card" : `ftp-tips__card ftp-tips__card--in-${anim.dir}`;

  return (
    <section
      className="ftp-tips"
      data-pgs-module="feed-track-progress-tips"
      data-figma-desktop="17041:14174"
      data-figma-mobile="210:3629"
      data-tips-source={wired ? "progress_tips" : "fixture"}
      data-tips-gate={wired ? "b7c" : "w0-fixture"}
      aria-labelledby="ftp-tips-title"
    >
      <h2 className="ftp-tips__title" id="ftp-tips-title">
        {title}
      </h2>

      {wired && !slides.length ? (
        <p className="ftp-tips__empty" role="status">
          No tips yet. Your mentor will publish tips here.
        </p>
      ) : tip ? (
        <>
          <div className="ftp-tips__carousel">
            <button
              type="button"
              className="ftp-tips__arrow ftp-tips__arrow--prev"
              aria-label="Previous tip"
              onClick={goPrev}
              disabled={len < 2}
            >
              <Image src={ARROW_SRC} alt="" width={20} height={20} unoptimized />
            </button>

            <div className="ftp-tips__stage">
              <article
                key={anim?.key ?? tip.id}
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
              disabled={len < 2}
            >
              <Image src={ARROW_SRC} alt="" width={20} height={20} unoptimized />
            </button>
          </div>

          {len > 1 ? (
            <div className="ftp-tips__dots" role="tablist" aria-label="Tip slides">
              {slides.map((slide, slideIndex) => (
                <button
                  key={slide.id}
                  type="button"
                  role="tab"
                  className={`ftp-tips__dot${slideIndex === safeIndex ? " is-active" : ""}`}
                  aria-label={`Go to tip ${slideIndex + 1}`}
                  aria-selected={slideIndex === safeIndex}
                  onClick={() => goDot(slideIndex)}
                />
              ))}
            </div>
          ) : null}
        </>
      ) : null}
    </section>
  );
}
