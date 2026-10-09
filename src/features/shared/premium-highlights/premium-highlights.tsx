/**
 * Shared highlights block. One component. Pages import this. Do not rebuild it.
 * Desktop: copy left · photo row — wheel + drag scroll · no focus ring.
 * Phone: copy centered · sideways strip — drag / swipe · no focus ring.
 * Importers: PLAB · AMC · USMLE · Nonmedical · Events E10 · Courses C10 · Uni UT4.
 */
"use client";

import { useEffect, useRef } from "react";
import { PREMIUM_HIGHLIGHTS } from "./content";
import "./premium-highlights.css";

function clampScrollLeft(el: HTMLElement, next: number) {
  const max = el.scrollWidth - el.clientWidth;
  return Math.min(max, Math.max(0, next));
}

/** Wheel → horizontal pan while pointer is over the rail (desk + phone). */
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

    /*
     * Trackpads send deltaX for sideways swipes and deltaY for vertical.
     * While over the photo rail, both should pan the strip — not the page.
     */
    const delta =
      Math.abs(event.deltaX) >= Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;
    if (delta === 0) return;

    const next = clampScrollLeft(el, el.scrollLeft + delta);
    if (next === el.scrollLeft) return;

    event.preventDefault();
    event.stopPropagation();
    el.scrollLeft = next;
  }

  el.addEventListener("pointerenter", onEnter);
  el.addEventListener("pointerleave", onLeave);
  /*
   * Capture on document so parent overflow-x:clip / page scroll cannot
   * swallow horizontal trackpad gestures before the rail sees them.
   */
  document.addEventListener("wheel", onWheel, { passive: false, capture: true });

  return () => {
    hovering = false;
    el.removeEventListener("pointerenter", onEnter);
    el.removeEventListener("pointerleave", onLeave);
    document.removeEventListener("wheel", onWheel, { capture: true });
  };
}

/**
 * Pointer drag → horizontal scroll (mouse + touch).
 * Ignores non-primary mouse buttons; releases on pointerup/cancel.
 */
function bindDragPanX(el: HTMLElement) {
  let pointerId: number | null = null;
  let startX = 0;
  let startScroll = 0;
  let dragged = false;

  function onPointerDown(event: PointerEvent) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (el.scrollWidth <= el.clientWidth + 1) return;

    /* Mouse/touch drag must not leave a focus ring on the rail. */
    if (event.pointerType !== "keyboard") {
      event.preventDefault();
    }

    pointerId = event.pointerId;
    startX = event.clientX;
    startScroll = el.scrollLeft;
    dragged = false;
    el.classList.add("is-dragging");
    el.setPointerCapture(event.pointerId);
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
    pointerId = null;
    el.classList.remove("is-dragging");
    try {
      el.releasePointerCapture(event.pointerId);
    } catch {
      /* already released */
    }
  }

  el.addEventListener("pointerdown", onPointerDown);
  el.addEventListener("pointermove", onPointerMove);
  el.addEventListener("pointerup", endDrag);
  el.addEventListener("pointercancel", endDrag);

  return () => {
    el.removeEventListener("pointerdown", onPointerDown);
    el.removeEventListener("pointermove", onPointerMove);
    el.removeEventListener("pointerup", endDrag);
    el.removeEventListener("pointercancel", endDrag);
    el.classList.remove("is-dragging");
  };
}

export function PremiumHighlights() {
  const c = PREMIUM_HIGHLIGHTS;
  const deskRailRef = useRef<HTMLUListElement>(null);
  const phoneScrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const desk = deskRailRef.current;
    const phone = phoneScrollerRef.current;
    const cleanups: Array<() => void> = [];

    if (desk) {
      cleanups.push(bindWheelPanX(desk), bindDragPanX(desk));
    }
    if (phone) {
      cleanups.push(bindWheelPanX(phone), bindDragPanX(phone));
    }

    return () => {
      for (const stop of cleanups) stop();
    };
  }, []);

  return (
    <section className="premium-highlights" data-pgs-module="premium-highlights" data-block-gate="u24">
      <div className="premium-highlights__row">
        <div className="premium-highlights__copy">
          <h2 className="premium-highlights__title">{c.title}</h2>
          <p className="premium-highlights__lead">
            {c.lead[0]}
            <br />
            {c.lead[1]}
            <br />
            {c.lead[2]}
            <br />
            {c.lead[3]}
          </p>
          <p className="premium-highlights__place">
            <img className="premium-highlights__pin" src={c.pinSrc} alt="" width={12} height={16} />
            {c.place}
          </p>
          <p className="premium-highlights__note">{c.note}</p>
        </div>
        <ul
          ref={deskRailRef}
          className="premium-highlights__photos premium-highlights__photos--desk"
          tabIndex={0}
          aria-label="Conference photos"
        >
          {c.photos.map((photo, index) => (
            <li key={`desk-${index}`} className={`premium-highlights__photo premium-highlights__photo--${photo.crop}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} alt={photo.alt} draggable={false} />
            </li>
          ))}
        </ul>
      </div>
      <div
        ref={phoneScrollerRef}
        className="premium-highlights__scroller"
        tabIndex={0}
        aria-label="Conference photos"
      >
        <ul className="premium-highlights__photos premium-highlights__photos--phone">
          {c.photos.map((photo, index) => (
            <li key={`phone-${index}`} className={`premium-highlights__photo premium-highlights__photo--${photo.crop}`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={photo.src} alt={photo.alt} draggable={false} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
