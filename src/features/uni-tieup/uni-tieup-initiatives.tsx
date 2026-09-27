/**
 * Uni Tie-up Co-Developed Initiatives — UT3.
 * Mob: 2×2 grid · Desk: 3×3 grid (owner). Arrows snug under, centered.
 * Cards = Pair 6 `program_compact` + Pair 9 `program_compact_sm` FACE-FIXTURES.
 * Page size follows band; height locks to a full page when enough cards exist.
 */
"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { listFaceFixtures } from "@/features/purple-events/face-card/face-fixtures";
import { ProgramCompactFaceCard } from "@/features/purple-events/face-card/program-compact-face-card";
import type { ProgramCompactFaceCard as ProgramCompactCard } from "@/features/purple-events/face-card/program-compact-content";
import { UNI_TIEUP_INITIATIVES } from "./content";
import "./uni-tieup-initiatives.css";

type InitiativeItem = {
  card: ProgramCompactCard;
  size: "default" | "sm";
};

function initiativeItems(): InitiativeItem[] {
  const cfg = UNI_TIEUP_INITIATIVES;
  const items: InitiativeItem[] = [];

  for (const row of listFaceFixtures({
    face_layout: "program_compact",
    kind: "course"
  }).slice(0, cfg.cardCountPair6)) {
    if (row.face_layout === "program_compact") {
      items.push({ card: row.card, size: "default" });
    }
  }

  for (const row of listFaceFixtures({
    face_layout: "program_compact_sm",
    kind: "course"
  }).slice(0, cfg.cardCountPair9)) {
    if (row.face_layout === "program_compact_sm") {
      items.push({ card: row.card, size: "sm" });
    }
  }

  return items;
}

function readDeskPageSize() {
  if (typeof window === "undefined") return UNI_TIEUP_INITIATIVES.pageSizeMob;
  return window.matchMedia("(min-width: 1367px)").matches
    ? UNI_TIEUP_INITIATIVES.pageSizeDesk
    : UNI_TIEUP_INITIATIVES.pageSizeMob;
}

export function UniTieupInitiatives() {
  const c = UNI_TIEUP_INITIATIVES;
  const items = initiativeItems();
  const gridRef = useRef<HTMLUListElement>(null);
  const lockedHeightRef = useRef<number>(0);
  const [pageSize, setPageSize] = useState<number>(c.pageSizeMob);
  const [page, setPage] = useState(0);

  useEffect(() => {
    function syncPageSize() {
      const next = readDeskPageSize();
      setPageSize((prev) => {
        if (prev !== next) {
          setPage(0);
          lockedHeightRef.current = 0;
        }
        return next;
      });
    }
    syncPageSize();
    const mq = window.matchMedia("(min-width: 1367px)");
    mq.addEventListener("change", syncPageSize);
    return () => mq.removeEventListener("change", syncPageSize);
  }, []);

  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const pageItems = items.slice(
    safePage * pageSize,
    safePage * pageSize + pageSize
  );
  const layout = pageSize >= 9 ? "grid-3x3" : "grid-2x2";

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    function lockHeightFromFullGrid() {
      const el = gridRef.current;
      if (!el) return;
      /*
       * min-height only — never fixed height.
       * Fixed height shorter than hug-cards let footers spill over the arrows.
       */
      if (pageItems.length < pageSize) {
        if (lockedHeightRef.current > 0) {
          el.style.minHeight = `${lockedHeightRef.current}px`;
        }
        el.style.height = "";
        return;
      }
      el.style.height = "";
      el.style.minHeight = "";
      const h = Math.round(el.getBoundingClientRect().height);
      if (h > 0) {
        lockedHeightRef.current = Math.max(lockedHeightRef.current, h);
        el.style.minHeight = `${lockedHeightRef.current}px`;
      }
    }

    lockHeightFromFullGrid();
    const ro = new ResizeObserver(lockHeightFromFullGrid);
    ro.observe(grid);
    window.addEventListener("resize", lockHeightFromFullGrid);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", lockHeightFromFullGrid);
    };
  }, [safePage, pageItems.length, items.length, pageSize]);

  function go(direction: -1 | 1) {
    const next = Math.max(0, Math.min(pageCount - 1, safePage + direction));
    if (next === safePage) return;
    setPage(next);
  }

  const atStart = safePage <= 0;
  const atEnd = safePage >= pageCount - 1;

  return (
    <section
      className="uni-tieup-initiatives"
      data-pgs-module="uni-tieup-initiatives"
      data-block-gate="ut3"
      data-figma-desktop="17071:9376"
      data-figma-mobile="524:7303"
      data-face-layout="program_compact+program_compact_sm"
      data-page-size={pageSize}
      data-page={safePage}
      data-layout={layout}
      aria-labelledby="uni-tieup-initiatives-heading"
    >
      <h2
        id="uni-tieup-initiatives-heading"
        className="uni-tieup-initiatives__heading"
      >
        {c.heading}
      </h2>

      <div className="uni-tieup-initiatives__stack">
        <ul
          ref={gridRef}
          className="uni-tieup-initiatives__grid"
          data-initiative-count={items.length}
          data-page-count={pageItems.length}
          aria-label="Co-developed initiative cards"
        >
          {pageItems.map((item) => (
            <li key={item.card.id} className="uni-tieup-initiatives__cell">
              <ProgramCompactFaceCard card={item.card} size={item.size} />
            </li>
          ))}
        </ul>

        <div
          className="uni-tieup-initiatives__nav"
          role="group"
          aria-label="Browse initiatives"
        >
          <button
            type="button"
            className="uni-tieup-initiatives__arrow"
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
            className="uni-tieup-initiatives__arrow"
            aria-label={c.nextLabel}
            aria-disabled={atEnd}
            disabled={atEnd}
            onClick={() => go(1)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={c.arrowRightSrc} alt="" width={48} height={48} />
          </button>
        </div>
      </div>
    </section>
  );
}
