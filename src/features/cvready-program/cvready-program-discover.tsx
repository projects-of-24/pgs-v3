/**
 * CV Ready Discover Our Programs — CR6d.
 * Desk title `17046:10577` · search `17046:10578` · grid `17046:10579`.
 * Mob title+search `357:4231` · grid `357:4388`.
 *
 * Owner lock CR6d 2026-09-24:
 * Pair 10 `program_compact_sm_desk` only (desk Pair 9 @ 80% · mob Pair 6 full).
 * UT-style pager · Mob 2×3 · Desk 4×2 · arrows.
 * Client search filters tags + title (DB later). Hide lab band-note.
 */
"use client";

import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { listFaceFixtures } from "@/features/purple-events/face-card/face-fixtures";
import { ProgramCompactFaceCard } from "@/features/purple-events/face-card/program-compact-face-card";
import type { ProgramCompactFaceCard as ProgramCompactCard } from "@/features/purple-events/face-card/program-compact-content";
import { CVREADY_PROGRAM_DISCOVER } from "./content";
import "./cvready-program-discover.css";

type DiscoverItem = {
  card: ProgramCompactCard;
};

function discoverItems(): DiscoverItem[] {
  const cfg = CVREADY_PROGRAM_DISCOVER;
  const items: DiscoverItem[] = [];

  for (const row of listFaceFixtures({
    face_layout: "program_compact_sm_desk",
    kind: "course"
  }).slice(0, cfg.cardCountCourse)) {
    if (row.face_layout === "program_compact_sm_desk") {
      items.push({ card: row.card });
    }
  }

  for (const row of listFaceFixtures({
    face_layout: "program_compact_sm_desk",
    kind: "event"
  }).slice(0, cfg.cardCountEvent)) {
    if (row.face_layout === "program_compact_sm_desk") {
      items.push({ card: row.card });
    }
  }

  return items;
}

function itemHaystack(item: DiscoverItem): string {
  const { card } = item;
  return [
    ...card.titleLines,
    ...card.tags,
    card.closesLabel,
    card.closesValue,
    card.blurb
  ]
    .join(" ")
    .toLowerCase();
}

function readDeskPageSize() {
  if (typeof window === "undefined") return CVREADY_PROGRAM_DISCOVER.pageSizeMob;
  return window.matchMedia("(min-width: 1367px)").matches
    ? CVREADY_PROGRAM_DISCOVER.pageSizeDesk
    : CVREADY_PROGRAM_DISCOVER.pageSizeMob;
}

export function CvreadyProgramDiscover() {
  const c = CVREADY_PROGRAM_DISCOVER;
  const items = useMemo(() => discoverItems(), []);
  const [pageSize, setPageSize] = useState<number>(c.pageSizeMob);
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState("");
  const [placeholder, setPlaceholder] = useState<string>(
    c.searchPlaceholderDesk
  );
  const scrollYRef = useRef(0);

  useEffect(() => {
    function syncBand() {
      const next = readDeskPageSize();
      setPageSize((prev) => {
        if (prev !== next) {
          setPage(0);
        }
        return next;
      });
      const mob = window.matchMedia("(max-width: 600px)").matches;
      setPlaceholder(
        mob ? c.searchPlaceholderMob : c.searchPlaceholderDesk
      );
    }
    syncBand();
    const deskMq = window.matchMedia("(min-width: 1367px)");
    const mobMq = window.matchMedia("(max-width: 600px)");
    deskMq.addEventListener("change", syncBand);
    mobMq.addEventListener("change", syncBand);
    return () => {
      deskMq.removeEventListener("change", syncBand);
      mobMq.removeEventListener("change", syncBand);
    };
  }, [c.searchPlaceholderDesk, c.searchPlaceholderMob]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((item) => itemHaystack(item).includes(q));
  }, [items, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, pageCount - 1);
  const pageItems = filtered.slice(
    safePage * pageSize,
    safePage * pageSize + pageSize
  );
  const layout = pageSize >= c.pageSizeDesk ? "grid-4x2" : "grid-2x3";

  function go(direction: -1 | 1) {
    const next = Math.max(0, Math.min(pageCount - 1, safePage + direction));
    if (next === safePage) return;
    scrollYRef.current = window.scrollY;
    setPage(next);
  }

  useLayoutEffect(() => {
    const y = scrollYRef.current;
    if (y <= 0) return;
    scrollYRef.current = 0;
    window.scrollTo(0, y);
  }, [safePage]);

  const atStart = safePage <= 0;
  const atEnd = safePage >= pageCount - 1;

  return (
    <section
      className="cvready-program-discover"
      data-pgs-module="cvready-program-discover"
      data-block-gate="cr6d"
      data-face-layout="program_compact_sm_desk"
      data-page-size={pageSize}
      data-page={safePage}
      data-layout={layout}
      data-figma-desktop="17046:10577"
      data-figma-mobile="357:4231"
      aria-labelledby="cvready-program-discover-title"
    >
      <h2
        id="cvready-program-discover-title"
        className="cvready-program-discover__title"
      >
        <span className="cvready-program-discover__title-lead">
          {c.titleLead}
        </span>
        <span className="cvready-program-discover__title-badge">
          {c.titleBadge}
        </span>
      </h2>

      <div className="cvready-program-discover__search">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="cvready-program-discover__menu-icon"
          src={c.menuIconSrc}
          alt=""
          width={24}
          height={24}
          decoding="async"
        />
        <label
          className="cvready-program-discover__search-label"
          htmlFor="cvready-program-discover-q"
        >
          {c.searchLabel}
        </label>
        <input
          id="cvready-program-discover-q"
          className="cvready-program-discover__search-input"
          type="search"
          name="q"
          autoComplete="off"
          placeholder={placeholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setPage(0); // back to page 1 on every new search (was a useEffect on query)
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="cvready-program-discover__search-icon"
          src={c.searchIconSrc}
          alt=""
          width={24}
          height={24}
          decoding="async"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="cvready-program-discover__empty" role="status">
          No programs match “{query.trim()}”.
        </p>
      ) : (
        <div className="cvready-program-discover__stack">
          <ul
            className="cvready-program-discover__grid"
            data-item-count={filtered.length}
            data-page-count={pageItems.length}
            aria-label="Discover program cards"
          >
            {pageItems.map((item) => (
              <li
                key={item.card.id}
                className="cvready-program-discover__cell"
                data-face-layout="program_compact_sm_desk"
              >
                <ProgramCompactFaceCard card={item.card} size="sm_desk" />
              </li>
            ))}
          </ul>

          {/* Always show — UT pattern · Figma page `17046:10661` under grid */}
          <div
            className="cvready-program-discover__nav"
            role="group"
            aria-label="Browse programs"
          >
            <button
              type="button"
              className="cvready-program-discover__arrow"
              aria-label={c.prevLabel}
              aria-disabled={atStart}
              disabled={atStart}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => go(-1)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.arrowLeftSrc} alt="" width={48} height={48} />
            </button>
            <button
              type="button"
              className="cvready-program-discover__arrow"
              aria-label={c.nextLabel}
              aria-disabled={atEnd}
              disabled={atEnd}
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => go(1)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.arrowRightSrc} alt="" width={48} height={48} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
