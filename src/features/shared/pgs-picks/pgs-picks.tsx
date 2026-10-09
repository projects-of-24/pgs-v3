/**
 * Shared #Pgs picks. Desktop Figma `17055:12930`. Phone Figma `433:4740`.
 * Each card links to that course. Arrows move one card.
 * Rail: wheel + pointer drag (same pattern as premium-highlights). No scrollbar.
 */
"use client";

import { useEffect, useRef } from "react";
import { PGS_PICKS, PGS_PICKS_FIXTURE, type PgsPicksCard } from "./content";
import "./pgs-picks.css";

export type { PgsPicksCard };

type Props = {
  courses?: PgsPicksCard[];
};

function CardFace({ card }: { card: PgsPicksCard }) {
  const face = (
    <>
      <img
        className="pgs-picks__photo"
        src={card.imageSrc}
        alt={card.imageAlt}
        width={180}
        height={233}
        draggable={false}
      />
      <span className="pgs-picks__copy">
        <span className="pgs-picks__cta">{card.cta}</span>
        <span className="pgs-picks__blurb pgs-picks__blurb--desk">{card.blurb}</span>
        <span className="pgs-picks__blurb pgs-picks__blurb--phone">{card.blurbMobile || card.blurb}</span>
      </span>
    </>
  );

  if (!card.href) {
    return <div className="pgs-picks__link">{face}</div>;
  }

  return (
    <a className="pgs-picks__link" href={card.href}>
      {face}
    </a>
  );
}

function readGap(track: HTMLElement) {
  return Number.parseFloat(getComputedStyle(track).columnGap || getComputedStyle(track).gap || "0") || 16;
}

function clampScrollLeft(el: HTMLElement, next: number) {
  const max = el.scrollWidth - el.clientWidth;
  return Math.min(max, Math.max(0, next));
}

/** Wheel → horizontal pan while pointer is over the track. */
function bindWheelPanX(el: HTMLElement) {
  let hovering = false;

  function onEnter() {
    hovering = true;
  }

  function onLeave() {
    hovering = false;
  }

  function onWheel(event: WheelEvent) {
    if (!hovering) return;
    if (el.scrollWidth <= el.clientWidth + 1) return;

    const delta =
      Math.abs(event.deltaX) >= Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
    if (delta === 0) return;

    const next = clampScrollLeft(el, el.scrollLeft + delta);
    if (next === el.scrollLeft) return;

    event.preventDefault();
    event.stopPropagation();
    el.scrollLeft = next;
  }

  el.addEventListener("pointerenter", onEnter);
  el.addEventListener("pointerleave", onLeave);
  document.addEventListener("wheel", onWheel, { passive: false, capture: true });

  return () => {
    hovering = false;
    el.removeEventListener("pointerenter", onEnter);
    el.removeEventListener("pointerleave", onLeave);
    document.removeEventListener("wheel", onWheel, { capture: true });
  };
}

/**
 * Pointer drag → horizontal scroll.
 * Suppresses card link click after a real drag (threshold 4px).
 */
function bindDragPanX(el: HTMLElement) {
  let pointerId: number | null = null;
  let startX = 0;
  let startScroll = 0;
  let dragged = false;
  let suppressClick = false;

  function onPointerDown(event: PointerEvent) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (el.scrollWidth <= el.clientWidth + 1) return;

    pointerId = event.pointerId;
    startX = event.clientX;
    startScroll = el.scrollLeft;
    dragged = false;
    el.classList.add("is-dragging");
    try {
      el.setPointerCapture(event.pointerId);
    } catch {
      /* synthetic / already captured */
    }
  }

  function onPointerMove(event: PointerEvent) {
    if (pointerId === null || event.pointerId !== pointerId) return;

    const dx = event.clientX - startX;
    if (!dragged && Math.abs(dx) < 4) return;
    dragged = true;

    el.scrollLeft = clampScrollLeft(el, startScroll - dx);
    event.preventDefault();
  }

  function endDrag(event: PointerEvent) {
    if (pointerId === null || event.pointerId !== pointerId) return;
    if (dragged) suppressClick = true;
    pointerId = null;
    el.classList.remove("is-dragging");
    try {
      el.releasePointerCapture(event.pointerId);
    } catch {
      /* already released */
    }
  }

  function onClickCapture(event: MouseEvent) {
    if (!suppressClick) return;
    event.preventDefault();
    event.stopPropagation();
    suppressClick = false;
  }

  el.addEventListener("pointerdown", onPointerDown);
  el.addEventListener("pointermove", onPointerMove);
  el.addEventListener("pointerup", endDrag);
  el.addEventListener("pointercancel", endDrag);
  el.addEventListener("click", onClickCapture, true);

  return () => {
    el.removeEventListener("pointerdown", onPointerDown);
    el.removeEventListener("pointermove", onPointerMove);
    el.removeEventListener("pointerup", endDrag);
    el.removeEventListener("pointercancel", endDrag);
    el.removeEventListener("click", onClickCapture, true);
    el.classList.remove("is-dragging");
  };
}

export function PgsPicks({ courses = [] }: Props) {
  const c = PGS_PICKS;
  const trackRef = useRef<HTMLUListElement>(null);
  const cards = courses.length > 0 ? courses : PGS_PICKS_FIXTURE;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const stopWheel = bindWheelPanX(track);
    const stopDrag = bindDragPanX(track);
    return () => {
      stopWheel();
      stopDrag();
    };
  }, []);

  function scrollByCard(direction: -1 | 1) {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLElement>(".pgs-picks__card");
    if (!card) return;
    const step = card.offsetWidth + readGap(track);
    const index = Math.round(track.scrollLeft / step);
    const next = Math.max(0, index + direction);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: next * step, behavior: reduce ? "auto" : "smooth" });
  }

  return (
    <section className="pgs-picks" data-pgs-module="pgs-picks" data-block-gate="u32" aria-labelledby="pgs-picks-title">
      <div className="pgs-picks__row">
        <h2 className="pgs-picks__title" id="pgs-picks-title">
          {c.heading}
        </h2>
        <div className="pgs-picks__rail">
          <div className="pgs-picks__nav" role="group" aria-label="Picks carousel">
            <button type="button" className="pgs-picks__arrow" aria-label={c.prevLabel} onClick={() => scrollByCard(-1)}>
              <img src={c.prevIconSrc} alt="" width={48} height={48} draggable={false} />
            </button>
            <button type="button" className="pgs-picks__arrow" aria-label={c.nextLabel} onClick={() => scrollByCard(1)}>
              <img src={c.nextIconSrc} alt="" width={48} height={48} draggable={false} />
            </button>
          </div>
          <div className="pgs-picks__viewport">
            <ul ref={trackRef} className="pgs-picks__track">
              {cards.map((card) => (
                <li key={card.id} className="pgs-picks__card">
                  <CardFace card={card} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
