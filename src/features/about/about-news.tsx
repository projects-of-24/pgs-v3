/**
 * About Us — #PGS in the news — A10.
 * Desktop `17057:14089` — static 3-up.
 * Mobile `517:5942` — one card + side arrows (Figma carousel).
 */
"use client";

import { useState } from "react";
import { ABOUT_NEWS } from "./content";
import "./about-news.css";

function NewsCard({ item }: { item: (typeof ABOUT_NEWS.items)[number] }) {
  return (
    <article
      className={`about-news__card about-news__card--${item.headerTone}`}
    >
      <div className="about-news__card-head">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="about-news__logo"
          src={item.logoSrc}
          alt={item.outlet}
          width={item.logoWidth}
          height={item.logoHeight}
        />
      </div>
      <p className="about-news__quote">{item.quote}</p>
    </article>
  );
}

export function AboutNews() {
  const c = ABOUT_NEWS;
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<"next" | "prev">("next");
  const count = c.items.length;
  const active = c.items[index] ?? c.items[0];

  const goPrev = () => {
    setDir("prev");
    setIndex((i) => (i - 1 + count) % count);
  };

  const goNext = () => {
    setDir("next");
    setIndex((i) => (i + 1) % count);
  };

  return (
    <section
      className="about-news"
      data-pgs-module="about-news"
      data-block-gate="a10"
      data-figma-desktop="17057:14089"
      data-figma-mobile="517:5942"
      aria-labelledby="about-news-title"
    >
      <div className="about-news__inner">
        <h2 id="about-news-title" className="about-news__title">
          {c.title}
        </h2>

        {/* Desktop: all three cards */}
        <ul className="about-news__grid about-news__grid--desk">
          {c.items.map((item) => (
            <li key={item.id}>
              <NewsCard item={item} />
            </li>
          ))}
        </ul>

        {/* Mobile: one card + chevrons (Figma) */}
        <div className="about-news__carousel">
          <button
            type="button"
            className="about-news__nav about-news__nav--prev"
            onClick={goPrev}
            aria-label="Previous news card"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/img/about/news-arrow.svg"
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
            />
          </button>

          <div
            className="about-news__carousel-stage"
            data-dir={dir}
            aria-live="polite"
            aria-atomic="true"
          >
            <NewsCard key={`${active.id}-${index}-${dir}`} item={active} />
          </div>

          <button
            type="button"
            className="about-news__nav about-news__nav--next"
            onClick={goNext}
            aria-label="Next news card"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/assets/img/about/news-arrow.svg"
              alt=""
              width={20}
              height={20}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
    </section>
  );
}
