"use client";

/**
 * TEMPORARY scout badge — REMOVE when breakpoint / chrome UI QC is done.
 * Owner: 2026-09-04 — via LegacyPage. Dev-only; live routes off (2026-09-10);
 * `/preview` labs only. Never ships meaningful prod UI.
 * Modular chrome bands: >1366 desktop · 601–1366 iPad · ≤600 mobile (not Hostinger 767).
 * Drag anywhere on the badge to reposition (dev QC helper).
 */
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

const MARKS = [600, 1366] as const;

function bandLabel(width: number): string {
  if (width <= 600) return "≤600 mobile";
  if (width <= 1366) return "601–1366 iPad";
  return ">1366 desktop";
}

type Pos = { left: number; top: number };

export function ViewportWidthOverlay() {
  const pathname = usePathname();
  const isPreviewLab = pathname.startsWith("/preview");
  const [width, setWidth] = useState<number | null>(null);
  const [pos, setPos] = useState<Pos | null>(null);
  const dragRef = useRef<{
    startX: number;
    startY: number;
    originLeft: number;
    originTop: number;
  } | null>(null);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development" || !isPreviewLab) return;

    const update = () => setWidth(window.innerWidth);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [isPreviewLab]);

  const onPointerDown = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const el = boxRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const left = pos?.left ?? rect.left;
    const top = pos?.top ?? rect.top;
    dragRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      originLeft: left,
      originTop: top,
    };
    el.setPointerCapture(event.pointerId);
    event.preventDefault();
  }, [pos]);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag) return;
    const nextLeft = drag.originLeft + (event.clientX - drag.startX);
    const nextTop = drag.originTop + (event.clientY - drag.startY);
    const el = boxRef.current;
    const w = el?.offsetWidth ?? 200;
    const h = el?.offsetHeight ?? 80;
    const maxLeft = Math.max(0, window.innerWidth - w);
    const maxTop = Math.max(0, window.innerHeight - h);
    setPos({
      left: Math.min(maxLeft, Math.max(0, nextLeft)),
      top: Math.min(maxTop, Math.max(0, nextTop)),
    });
  }, []);

  const onPointerUp = useCallback((event: React.PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    dragRef.current = null;
    try {
      boxRef.current?.releasePointerCapture(event.pointerId);
    } catch {
      /* already released */
    }
  }, []);

  if (process.env.NODE_ENV !== "development" || !isPreviewLab || width === null) {
    return null;
  }

  const nearestBreak = MARKS.reduce((best, mark) =>
    Math.abs(mark - width) < Math.abs(best - width) ? mark : best
  );

  const placed = pos !== null;

  return (
    <div
      ref={boxRef}
      role="status"
      aria-live="polite"
      data-temp-viewport-overlay="true"
      title="TEMP — drag to move · remove after breakpoint UI QC"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={onPointerUp}
      style={{
        position: "fixed",
        left: placed ? pos.left : 12,
        top: placed ? pos.top : "auto",
        bottom: placed ? "auto" : 12,
        zIndex: 2147483646,
        maxWidth: "min(380px, calc(100vw - 24px))",
        padding: "10px 12px",
        borderRadius: 8,
        background: "rgba(20, 20, 20, 0.92)",
        color: "#fff",
        fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: 12,
        lineHeight: 1.4,
        boxShadow: "0 4px 16px rgba(0,0,0,0.35)",
        pointerEvents: "auto",
        cursor: "grab",
        userSelect: "none",
        touchAction: "none",
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 4 }}>
        TEMP width overlay — drag to move
      </div>
      <div>
        viewport: <strong>{width}px</strong>
      </div>
      <div>band: {bandLabel(width)}</div>
      <div>
        nearest mark: {nearestBreak}px (Δ {width - nearestBreak >= 0 ? "+" : ""}
        {width - nearestBreak})
      </div>
      <div style={{ opacity: 0.75, marginTop: 4 }}>
        Resize until layout breaks → note this px
      </div>
    </div>
  );
}
