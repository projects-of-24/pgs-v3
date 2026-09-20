"use client";

/**
 * Scholarship batch tips carousel — S7 + SM.
 * Desktop `17041:18860` · Mobile `331:3275`.
 * Owned CSS. Arrows + dots work; CSS fade/slide. Reduced-motion = instant.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: mob badge ~9px
 * ISSUE: below readable floor
 * PGS IMPLEMENTATION: badge ≥12px via --sch-batch-* vars
 */
import { useCallback, useEffect, useId, useState } from "react";
import { SCHOLARSHIP_BATCH } from "./content";
import "./scholarship-batch.css";

type Dir = "next" | "prev" | "dot";

export function ScholarshipBatch() {
  const c = SCHOLARSHIP_BATCH;
  const baseId = useId();
  const total = c.slides.length;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<Dir>("next");
  const [animKey, setAnimKey] = useState(0);

  const go = useCallback(
    (next: number, direction: Dir) => {
      const wrapped = ((next % total) + total) % total;
      if (wrapped === index) return;
      setDir(direction);
      setIndex(wrapped);
      setAnimKey((k) => k + 1);
    },
    [index, total]
  );

  const slide = c.slides[index];
  const panelId = `${baseId}-panel`;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const root = document.getElementById(`${baseId}-root`);
      if (!root?.contains(document.activeElement)) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(index - 1, "prev");
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        go(index + 1, "next");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [baseId, go, index]);

  return (
    <section
      id={`${baseId}-root`}
      className="scholarship-batch"
      data-pgs-module="scholarship-batch"
      data-block-gate="sm"
      aria-roledescription="carousel"
      aria-labelledby="scholarship-batch-heading"
    >
      <div className="scholarship-batch__inner">
        <h2 id="scholarship-batch-heading" className="scholarship-batch__title">
          {c.headingMobile}
        </h2>

        <div className="scholarship-batch__row">
          <button
            type="button"
            className="scholarship-batch__nav"
            aria-label="Previous tip"
            aria-controls={panelId}
            onClick={() => go(index - 1, "prev")}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="scholarship-batch__arrow scholarship-batch__arrow--prev"
              src={c.arrowLeftSrc}
              alt=""
              width={19}
              height={19}
            />
          </button>

          <div
            id={panelId}
            className="scholarship-batch__viewport"
            aria-live="polite"
            aria-atomic="true"
          >
            <div
              key={animKey}
              className={`scholarship-batch__card scholarship-batch__card--${dir}`}
              data-slide={index + 1}
            >
              <p className="scholarship-batch__badge">{slide.badge}</p>
              <p className="scholarship-batch__slide">{slide.text}</p>
            </div>
          </div>

          <button
            type="button"
            className="scholarship-batch__nav"
            aria-label="Next tip"
            aria-controls={panelId}
            onClick={() => go(index + 1, "next")}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="scholarship-batch__arrow scholarship-batch__arrow--next"
              src={c.arrowRightSrc}
              alt=""
              width={19}
              height={19}
            />
          </button>
        </div>

        <div
          className="scholarship-batch__dots"
          role="tablist"
          aria-label="Tip slides"
        >
          {c.slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              className={`scholarship-batch__dot${i === index ? " is-active" : ""}`}
              aria-selected={i === index}
              aria-label={`Tip ${i + 1} of ${total}`}
              aria-controls={panelId}
              tabIndex={i === index ? 0 : -1}
              onClick={() =>
                go(i, i > index ? "next" : i < index ? "prev" : "dot")
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
