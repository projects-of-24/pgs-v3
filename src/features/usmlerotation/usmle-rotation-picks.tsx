/**
 * #Pgs picks — CMS `pgs_picks` courses.
 * Desktop: as many full cards as fit the width; arrows advance one card.
 * Mobile ≤600: one card. No clipped peek behind the title.
 */
"use client";

import { useEffect, useRef } from "react";
import { USMLE_ROTATION_PICKS } from "./content";
import type { UsmlePicksCourseCard } from "./usmle-picks-types";
import "./usmle-rotation-picks.css";

function readGap(track: HTMLElement) {
  return Number.parseFloat(getComputedStyle(track).gap || "0") || 16;
}

/** Layout width — ignore ancestor transform/scale (getBoundingClientRect is scaled). */
function layoutWidth(el: HTMLElement) {
  return el.offsetWidth;
}

type Props = {
  courses?: UsmlePicksCourseCard[];
};

export function UsmleRotationPicks({ courses = [] }: Props) {
  const c = USMLE_ROTATION_PICKS;
  const railRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);
  const cards = courses.map((row) => row.card);

  useEffect(() => {
    const rail = railRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!rail || !viewport || !track || cards.length === 0) return;

    function fitFullCards() {
      if (!rail || !viewport || !track) return;
      const card = track.querySelector<HTMLElement>(".usmle-picks__card");
      if (!card) return;

      const isMobile = window.matchMedia("(max-width: 600px)").matches;
      if (isMobile) {
        viewport.style.flex = "";
        viewport.style.width = "";
        viewport.style.maxWidth = "";
        viewport.style.flexBasis = "";
        return;
      }

      const side = rail.querySelector<HTMLElement>(".usmle-picks__side");
      const railGap =
        Number.parseFloat(getComputedStyle(rail).gap || "0") || 24;
      const sideW = side ? layoutWidth(side) : 0;
      const available = Math.max(0, layoutWidth(rail) - sideW - railGap);

      const cardW = layoutWidth(card);
      const gap = readGap(track);
      const step = cardW + gap;
      const count = Math.max(1, Math.floor((available + gap) / step));
      const width = count * cardW + (count - 1) * gap;

      viewport.style.flex = `0 0 ${width}px`;
      viewport.style.width = `${width}px`;
      viewport.style.maxWidth = `${width}px`;
    }

    fitFullCards();
    const ro = new ResizeObserver(() => fitFullCards());
    ro.observe(rail);
    window.addEventListener("resize", fitFullCards);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", fitFullCards);
      viewport.style.flex = "";
      viewport.style.width = "";
      viewport.style.maxWidth = "";
      viewport.style.flexBasis = "";
    };
  }, [cards.length]);

  function scrollByCard(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const els = [
      ...track.querySelectorAll<HTMLElement>(".usmle-picks__card"),
    ];
    if (els.length === 0) return;

    const cardW = layoutWidth(els[0]);
    const gap = readGap(track);
    const step = cardW + gap;
    const index = Math.round(track.scrollLeft / step);
    const next = Math.max(0, Math.min(els.length - 1, index + direction));
    track.scrollTo({ left: next * step, behavior: "smooth" });
  }

  return (
    <section
      className="usmle-picks"
      data-pgs-module="usmle-rotation-picks"
      aria-labelledby="usmle-picks-heading"
    >
      <div className="usmle-picks__inner">
        {cards.length === 0 ? (
          <div className="usmle-picks__empty-wrap">
            <h2 id="usmle-picks-heading" className="usmle-picks__title">
              {c.heading}
            </h2>
            <p className="usmle-picks__empty" role="status">
              {c.emptyMessage}
            </p>
          </div>
        ) : (
          <div ref={railRef} className="usmle-picks__rail">
            <div className="usmle-picks__side">
              <h2 id="usmle-picks-heading" className="usmle-picks__title">
                {c.heading}
              </h2>
              <div
                className="usmle-picks__nav"
                role="group"
                aria-label="Picks carousel"
              >
                <button
                  type="button"
                  className="usmle-picks__arrow"
                  aria-label="Previous pick"
                  onClick={() => scrollByCard(-1)}
                >
                  <span aria-hidden="true">←</span>
                </button>
                <button
                  type="button"
                  className="usmle-picks__arrow"
                  aria-label="Next pick"
                  onClick={() => scrollByCard(1)}
                >
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>

            <div ref={viewportRef} className="usmle-picks__viewport">
              <ul ref={trackRef} className="usmle-picks__track">
                {cards.map((card) => (
                  <li key={card.id} className="usmle-picks__card">
                    <a className="usmle-picks__card-link" href={card.href}>
                      <div className="usmle-picks__photo-wrap">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          className="usmle-picks__photo"
                          src={card.imageSrc}
                          alt={card.imageAlt}
                          width={180}
                          height={233}
                        />
                      </div>
                      <div className="usmle-picks__copy">
                        <span className="usmle-picks__cta">{card.cta}</span>
                        <p className="usmle-picks__blurb usmle-picks__blurb--desktop">
                          {card.blurbDesktop}
                        </p>
                        <p className="usmle-picks__blurb usmle-picks__blurb--mobile">
                          {card.blurbMobile}
                        </p>
                      </div>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
