/**
 * Horizontal hang rail — same pattern as Premium Highlights / #PGS picks iPad bar.
 * Wheel-over + pointer drag · scrollbar hidden (CSS on className).
 */
"use client";

import { useEffect, useRef, type ReactNode } from "react";

function clampScrollLeft(el: HTMLElement, next: number) {
  const max = el.scrollWidth - el.clientWidth;
  return Math.min(max, Math.max(0, next));
}

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
  document.addEventListener("wheel", onWheel, { passive: false, capture: true });

  return () => {
    hovering = false;
    el.removeEventListener("pointerenter", onEnter);
    el.removeEventListener("pointerleave", onLeave);
    document.removeEventListener("wheel", onWheel, { capture: true });
  };
}

function bindDragPanX(el: HTMLElement) {
  let pointerId: number | null = null;
  let startX = 0;
  let startScroll = 0;
  let dragged = false;

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

type Props = {
  className: string;
  ariaLabel: string;
  children: ReactNode;
};

export function CountriesDestinationHRail({
  className,
  ariaLabel,
  children
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const stopWheel = bindWheelPanX(el);
    const stopDrag = bindDragPanX(el);
    return () => {
      stopWheel();
      stopDrag();
    };
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      tabIndex={0}
      aria-label={ariaLabel}
    >
      {children}
    </div>
  );
}
