/**
 * Purple Events — E8 Upcoming sessions rail.
 * Pattern = modular highlights photo strip: horizontal track, no scrollbar,
 * face cards instead of photos. Desk Figma `17071:13481` · mob `1248:7623`.
 * Fixtures only — no database. B* links real rows later.
 */
"use client";

import { useRef } from "react";
import { PurpleEventsFaceCard } from "../face-card/purple-events-face-card";
import { UPCOMING_FACE_RAIL, UPCOMING_HEADING } from "./content";
import "./purple-events-upcoming.css";

const ARROW_LEFT = "/assets/img/purple-events/arrow-left-circle.svg";
const ARROW_RIGHT = "/assets/img/purple-events/arrow-right-circle.svg";

/** Desk card 383 + gap 43 = 426; mob 176 + 8. */
const STEP_DESK = 426;
const STEP_MOB = 184;

export function PurpleEventsUpcoming() {
  const trackRef = useRef<HTMLUListElement>(null);

  function scrollBy(delta: number) {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: delta, behavior: "smooth" });
  }

  return (
    <section
      id="pe-e8"
      className="pe-up"
      data-pgs-module="purple-events-upcoming"
      data-block-gate="e8"
      data-figma-desktop="17071:13481"
      data-figma-mobile="1248:7623"
      aria-labelledby="pe-e8-heading"
    >
      <h2 id="pe-e8-heading" className="pe-up__heading">
        {UPCOMING_HEADING}
      </h2>

      <div className="pe-up__row">
        <div className="pe-up__nav pe-up__nav--desk" role="group" aria-label="Browse upcoming sessions">
          <button
            type="button"
            className="pe-up__arrow"
            aria-label="Previous sessions"
            onClick={() => scrollBy(-STEP_DESK)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ARROW_LEFT} alt="" width={48} height={48} />
          </button>
          <button
            type="button"
            className="pe-up__arrow"
            aria-label="Next sessions"
            onClick={() => scrollBy(STEP_DESK)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={ARROW_RIGHT} alt="" width={48} height={48} />
          </button>
        </div>

        <ul
          ref={trackRef}
          className="pe-up__track"
          data-upcoming-count={UPCOMING_FACE_RAIL.length}
          tabIndex={0}
          aria-label="Upcoming session cards"
        >
          {UPCOMING_FACE_RAIL.map((card) => (
            <li key={card.id} className="pe-up__item">
              <PurpleEventsFaceCard card={card} />
            </li>
          ))}
        </ul>
      </div>

      <div className="pe-up__nav pe-up__nav--mob" role="group" aria-label="Browse upcoming sessions">
        <button
          type="button"
          className="pe-up__arrow pe-up__arrow--mob"
          aria-label="Previous sessions"
          onClick={() => scrollBy(-STEP_MOB)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ARROW_LEFT} alt="" width={28} height={28} />
        </button>
        <button
          type="button"
          className="pe-up__arrow pe-up__arrow--mob"
          aria-label="Next sessions"
          onClick={() => scrollBy(STEP_MOB)}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={ARROW_RIGHT} alt="" width={28} height={28} />
        </button>
      </div>
    </section>
  );
}
