/**
 * CV Ready #by target — CR8.
 * Desk `19053:14303` · intro `19053:14304` · arrows `19054:15100`.
 * Mob `1312:8500` · arrows `1318:8862`.
 * Cards = Pair 11 `calendar_session_photo` FACE-FIXTURES (ignore Figma Visa art).
 * Rail: continuous strip · highlights-style drag + hover-wheel pan · arrow buttons.
 * Field chips: visual `aria-pressed` only.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: mob body 14 · chip 14/12 · face blurb 13.44 (face CSS already ≥14)
 * ISSUE: body/chips below floor
 * PGS: body + chip labels ≥16px; layout stays Figma
 */
"use client";

import { useEffect, useRef, useState } from "react";
import { listFaceFixtures } from "@/features/purple-events/face-card/face-fixtures";
import { CalendarSessionPhotoFaceCard } from "@/features/purple-events/face-card/calendar-session-photo-face-card";
import type { CalendarSessionPhotoFaceCard as Pair11Card } from "@/features/purple-events/face-card/calendar-session-photo-content";
import { CVREADY_PROGRAM_BY_TARGET } from "./content";
import "./cvready-program-by-target.css";

function byTargetCards(): Pair11Card[] {
  const rows = listFaceFixtures({
    face_layout: "calendar_session_photo"
  });
  const open = rows.flatMap((row) =>
    row.face_layout === "calendar_session_photo" && row.card.status === "open"
      ? [row.card]
      : []
  );
  const closed = rows.flatMap((row) =>
    row.face_layout === "calendar_session_photo" && row.card.status === "closed"
      ? [row.card]
      : []
  );
  const c = CVREADY_PROGRAM_BY_TARGET;
  const opens = open.slice(0, c.cardCountOpen);
  const closedPick = closed.slice(0, c.cardCountClosed);
  /* Figma sample: open, open, closed, then more for scroll */
  if (opens.length >= 2 && closedPick[0]) {
    return [opens[0]!, opens[1]!, closedPick[0], ...opens.slice(2)];
  }
  return [...opens, ...closedPick];
}

function clampScrollLeft(el: HTMLElement, next: number) {
  const max = el.scrollWidth - el.clientWidth;
  return Math.min(max, Math.max(0, next));
}

/** Wheel → horizontal pan while pointer is over the rail (highlights pattern). */
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

/** Pointer drag → horizontal scroll (mouse + touch). */
function bindDragPanX(el: HTMLElement) {
  let pointerId: number | null = null;
  let startX = 0;
  let startScroll = 0;
  let dragged = false;

  function onPointerDown(event: PointerEvent) {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    if (el.scrollWidth <= el.clientWidth + 1) return;

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

function arrowStepPx(rail: HTMLElement): number {
  const cell = rail.querySelector(
    ".cvready-program-by-target__cell"
  ) as HTMLElement | null;
  const cellW = cell?.getBoundingClientRect().width ?? 200;
  const styles = getComputedStyle(rail.querySelector("ul") ?? rail);
  const gap = Number.parseFloat(styles.columnGap || styles.gap || "0") || 0;
  const n =
    window.innerWidth >= 1367
      ? CVREADY_PROGRAM_BY_TARGET.pageSizeDesk
      : CVREADY_PROGRAM_BY_TARGET.pageSizeMob;
  return n * cellW + Math.max(0, n - 1) * gap;
}

export function CvreadyProgramByTarget() {
  const c = CVREADY_PROGRAM_BY_TARGET;
  const [selected, setSelected] = useState<string>(c.defaultChip);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const cards = byTargetCards();

  function syncArrowState() {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(max <= 1 || el.scrollLeft >= max - 1);
  }

  useEffect(() => {
    const el = railRef.current;
    if (!el) return;
    const cleanups = [bindWheelPanX(el), bindDragPanX(el)];
    el.addEventListener("scroll", syncArrowState, { passive: true });
    syncArrowState();

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => {
            syncArrowState();
          })
        : null;
    ro?.observe(el);
    window.addEventListener("resize", syncArrowState);

    return () => {
      for (const stop of cleanups) stop();
      el.removeEventListener("scroll", syncArrowState);
      ro?.disconnect();
      window.removeEventListener("resize", syncArrowState);
    };
  }, [cards.length]);

  function go(delta: number) {
    const el = railRef.current;
    if (!el) return;
    const step = arrowStepPx(el);
    el.scrollLeft = clampScrollLeft(el, el.scrollLeft + delta * step);
    syncArrowState();
  }

  return (
    <section
      className="cvready-program-by-target"
      data-pgs-module="cvready-program-by-target"
      data-block-gate="cr8"
      data-face-layout="calendar_session_photo"
      data-figma-desktop="19053:14303"
      data-figma-mobile="1312:8500"
      aria-labelledby="cvready-program-by-target-title"
    >
      <div className="cvready-program-by-target__intro">
        <div className="cvready-program-by-target__copy">
          <h2
            id="cvready-program-by-target-title"
            className="cvready-program-by-target__title"
          >
            {c.title}
          </h2>
          <p className="cvready-program-by-target__body">
            {c.bodyLines.map((line) => (
              <span key={line} className="cvready-program-by-target__body-line">
                {line}
              </span>
            ))}
          </p>
        </div>
        <div
          className="cvready-program-by-target__chips"
          role="group"
          aria-label="Field filters"
        >
          {c.chips.map((chip) => {
            const isSelected = chip === selected;
            return (
              <button
                key={chip}
                type="button"
                className={
                  isSelected
                    ? "cvready-program-by-target__chip cvready-program-by-target__chip--selected"
                    : "cvready-program-by-target__chip"
                }
                aria-pressed={isSelected}
                onClick={() => setSelected(chip)}
              >
                {chip}
              </button>
            );
          })}
        </div>
      </div>

      <div className="cvready-program-by-target__stack">
        <div
          ref={railRef}
          className="cvready-program-by-target__rail"
          tabIndex={0}
          aria-label="Sessions by target"
        >
          <ul className="cvready-program-by-target__list">
            {cards.map((card) => (
              <li key={card.id} className="cvready-program-by-target__cell">
                <CalendarSessionPhotoFaceCard card={card} />
              </li>
            ))}
          </ul>
        </div>

        <div
          className="cvready-program-by-target__nav"
          role="group"
          aria-label="Browse sections"
        >
          <div className="cvready-program-by-target__arrows">
            <button
              type="button"
              className="cvready-program-by-target__arrow"
              aria-label={c.prevLabel}
              aria-disabled={atStart}
              disabled={atStart}
              onClick={() => go(-1)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.arrowLeftSrc} alt="" width={48} height={48} />
            </button>
            <button
              type="button"
              className="cvready-program-by-target__arrow"
              aria-label={c.nextLabel}
              aria-disabled={atEnd}
              disabled={atEnd}
              onClick={() => go(1)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.arrowRightSrc} alt="" width={48} height={48} />
            </button>
          </div>
          <p className="cvready-program-by-target__section-label">{c.sectionLabel}</p>
        </div>
      </div>
    </section>
  );
}
