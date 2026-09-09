/**
 * Section 3 — Top picks (desktop expanded · mobile collapsed → expand).
 * Desktop Figma `18375:10739` · Mobile collapsed `206:5883`.
 * Fixture only — CMS pathway tags (#stem / #all) + Tag section = backend later.
 * Preview only. Live `/student/dashboard` UNTOUCHED.
 */
"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useState } from "react";
import "./student-feed-top-picks.css";

export const STUDENT_FEED_TOP_PICK_THUMB = "/assets/img/figma-feed/top-pick-thumb.jpg";
export const STUDENT_FEED_TOP_PICKS_TUNE = "/assets/img/figma-feed/top-picks-tune.svg";

export type StudentFeedTopPickStatus = "InProgress" | "FileldUp";

export type StudentFeedTopPick = {
  id: string;
  title: string;
  status: StudentFeedTopPickStatus;
  tag: string;
  tagColor: string;
  imageUrl: string;
  href?: string;
  /** Fixture / future CMS created_at — used by “Sort by date created”. */
  createdAt: string;
};

/** Fixture rows (>6) so fixed card scrolls — replace with CMS pathway query later. */
export const STUDENT_FEED_TOP_PICKS_FIXTURE: StudentFeedTopPick[] = [
  {
    id: "tp-1",
    title: "Clinical rotation sign up for next batch booking are in progress.",
    status: "InProgress",
    tag: "MEDICAL",
    tagColor: "#00abbd",
    imageUrl: STUDENT_FEED_TOP_PICK_THUMB,
    createdAt: "2026-08-20T10:00:00.000Z"
  },
  {
    id: "tp-2",
    title: "Clinical rotation sign up for next batch booking are in progress.",
    status: "InProgress",
    tag: "USMLE",
    tagColor: "#00abbd",
    imageUrl: STUDENT_FEED_TOP_PICK_THUMB,
    createdAt: "2026-08-18T10:00:00.000Z"
  },
  {
    id: "tp-3",
    title: "Clinical rotation sign up for next batch booking are in progress.",
    status: "InProgress",
    tag: "UKintake",
    tagColor: "#00abbd",
    imageUrl: STUDENT_FEED_TOP_PICK_THUMB,
    createdAt: "2026-08-15T10:00:00.000Z"
  },
  {
    id: "tp-4",
    title: "Clinical rotation sign up for next batch booking are in progress.",
    status: "InProgress",
    tag: "AUSintake",
    tagColor: "#00abbd",
    imageUrl: STUDENT_FEED_TOP_PICK_THUMB,
    createdAt: "2026-08-12T10:00:00.000Z"
  },
  {
    id: "tp-5",
    title: "Clinical rotation sign up for next batch booking are in progress.",
    status: "FileldUp",
    tag: "USMLE",
    tagColor: "#00abbd",
    imageUrl: STUDENT_FEED_TOP_PICK_THUMB,
    createdAt: "2026-08-01T10:00:00.000Z"
  },
  {
    id: "tp-6",
    title: "Clinical rotation sign up for next batch booking are in progress.",
    status: "InProgress",
    tag: "STEM",
    tagColor: "#00abbd",
    imageUrl: STUDENT_FEED_TOP_PICK_THUMB,
    createdAt: "2026-07-28T10:00:00.000Z"
  },
  {
    id: "tp-7",
    title: "Clinical rotation sign up for next batch booking are in progress.",
    status: "InProgress",
    tag: "all",
    tagColor: "#00abbd",
    imageUrl: STUDENT_FEED_TOP_PICK_THUMB,
    createdAt: "2026-07-20T10:00:00.000Z"
  },
  {
    id: "tp-8",
    title: "Clinical rotation sign up for next batch booking are in progress.",
    status: "FileldUp",
    tag: "MEDICAL",
    tagColor: "#00abbd",
    imageUrl: STUDENT_FEED_TOP_PICK_THUMB,
    createdAt: "2026-07-10T10:00:00.000Z"
  }
];

type SortMode = "figma" | "created_desc" | "created_asc";

type Props = {
  picks?: StudentFeedTopPick[];
  /** Desktop starts open; mobile starts collapsed unless overridden. */
  defaultOpen?: boolean;
};

function sortPicks(picks: StudentFeedTopPick[], mode: SortMode): StudentFeedTopPick[] {
  if (mode === "figma") return picks;
  const copy = [...picks];
  copy.sort((a, b) => {
    const da = Date.parse(a.createdAt);
    const db = Date.parse(b.createdAt);
    return mode === "created_desc" ? db - da : da - db;
  });
  return copy;
}

export function StudentFeedTopPicks({
  picks = STUDENT_FEED_TOP_PICKS_FIXTURE,
  defaultOpen
}: Props) {
  const listId = useId();
  const menuId = useId();
  // Desktop Figma is expanded; mobile starts collapsed (owner shrink).
  const [open, setOpen] = useState(defaultOpen ?? true);
  const [sortMenuOpen, setSortMenuOpen] = useState(false);
  const [sortMode, setSortMode] = useState<SortMode>("figma");

  useEffect(() => {
    if (defaultOpen !== undefined) return;
    const mq = window.matchMedia("(max-width: 600px)");
    const sync = () => setOpen(!mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [defaultOpen]);

  const ordered = useMemo(() => sortPicks(picks, sortMode), [picks, sortMode]);

  const toggleOpen = () => {
    // Mobile only: collapsed bar expands. Desktop stays expanded (Figma).
    if (typeof window !== "undefined" && window.matchMedia("(max-width: 600px)").matches) {
      setOpen((v) => !v);
    } else {
      setOpen(true);
    }
  };

  return (
    <section
      className={`student-feed-top-picks${open ? " is-open" : " is-collapsed"}`}
      data-pgs-module="student-feed-top-picks"
      data-figma-desktop="18375:10739"
      data-figma-mobile="206:5883"
      aria-label="Top picks"
    >
      <div className="student-feed-top-picks__card">
        <div className="student-feed-top-picks__header">
          <button
            type="button"
            className="student-feed-top-picks__title-btn"
            aria-expanded={open}
            aria-controls={listId}
            onClick={toggleOpen}
          >
            <span className="student-feed-top-picks__title">Top picks</span>
            <span className="student-feed-top-picks__chevron" aria-hidden="true">
              &gt;
            </span>
          </button>

          <div className="student-feed-top-picks__sort">
            <button
              type="button"
              className="student-feed-top-picks__tune"
              aria-label="Sort Top picks"
              aria-haspopup="menu"
              aria-expanded={sortMenuOpen}
              aria-controls={menuId}
              onClick={() => setSortMenuOpen((v) => !v)}
            >
              <Image
                src={STUDENT_FEED_TOP_PICKS_TUNE}
                alt=""
                width={20}
                height={20}
                unoptimized
              />
            </button>
            {sortMenuOpen ? (
              <ul
                id={menuId}
                className="student-feed-top-picks__menu"
                role="menu"
                aria-label="Sort options"
              >
                <li role="none">
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={sortMode === "created_desc"}
                    className={sortMode === "created_desc" ? "is-active" : undefined}
                    onClick={() => {
                      setSortMode("created_desc");
                      setSortMenuOpen(false);
                      setOpen(true);
                    }}
                  >
                    Sort by date created (newest)
                  </button>
                </li>
                <li role="none">
                  <button
                    type="button"
                    role="menuitemradio"
                    aria-checked={sortMode === "created_asc"}
                    className={sortMode === "created_asc" ? "is-active" : undefined}
                    onClick={() => {
                      setSortMode("created_asc");
                      setSortMenuOpen(false);
                      setOpen(true);
                    }}
                  >
                    Sort by date created (oldest)
                  </button>
                </li>
              </ul>
            ) : null}
          </div>
        </div>

        <div
          id={listId}
          className="student-feed-top-picks__list"
          aria-hidden={!open}
          {...(!open ? { inert: true } : {})}
        >
          {ordered.map((pick) => (
            <a
              key={pick.id}
              className="student-feed-top-picks__row"
              href={pick.href ?? "#"}
              onClick={(e) => {
                if (!pick.href) e.preventDefault();
              }}
            >
              <div className="student-feed-top-picks__copy">
                <p className="student-feed-top-picks__row-title">{pick.title}</p>
                <div className="student-feed-top-picks__meta">
                  <span
                    className={`student-feed-top-picks__status is-${pick.status === "InProgress" ? "in-progress" : "filled"}`}
                  >
                    {pick.status}
                  </span>
                  <span className="student-feed-top-picks__tag">
                    <i
                      className="student-feed-top-picks__tag-dot"
                      style={{ background: pick.tagColor }}
                      aria-hidden="true"
                    />
                    #{pick.tag}
                  </span>
                </div>
              </div>
              <div className="student-feed-top-picks__thumb">
                <Image
                  src={pick.imageUrl}
                  alt=""
                  width={91}
                  height={55}
                  unoptimized
                />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
