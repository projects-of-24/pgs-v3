/**
 * Block 4 — #counselorNotes (N1 fixture window + one-line arrow step).
 * Desktop Figma `17041:14120` · Mobile `210:3418`
 * Arrows translate the list by one row (not a full window replace). DB = B4 later.
 */
"use client";

import Image from "next/image";
import { useState, type CSSProperties } from "react";
import { FEED_TRACK_PROGRESS_COUNSELOR_NOTES } from "./content";
import "./feed-track-progress-counselor-notes.css";

const AVATAR_SRC = "/assets/img/figma-progress/counselor-avatar.png";
const ARROW_SRC = "/assets/img/figma-progress/notes-arrow-up.png";

export function FeedTrackProgressCounselorNotes() {
  const { windowSize, rows } = FEED_TRACK_PROGRESS_COUNSELOR_NOTES;
  const total = rows.length;
  const maxOffset = Math.max(0, total - windowSize);
  const [offset, setOffset] = useState(0);

  const pendingBelow = Math.max(0, total - (offset + windowSize));
  const canUp = offset > 0;
  const canDown = offset < maxOffset;

  const step = (dir: "up" | "down") => {
    if (dir === "up" && !canUp) return;
    if (dir === "down" && !canDown) return;
    setOffset((current) =>
      dir === "up" ? Math.max(0, current - 1) : Math.min(maxOffset, current + 1)
    );
  };

  return (
    <section
      className="ftp-notes"
      data-pgs-module="feed-track-progress-counselor-notes"
      data-figma-desktop="17041:14120"
      data-figma-mobile="210:3418"
      data-notes-gate="n1-fixture-arrows"
      data-notes-step="line"
      aria-labelledby="ftp-counselor-notes-title"
      style={
        {
          "--ftp-notes-window": windowSize,
          "--ftp-notes-offset": offset
        } as CSSProperties
      }
    >
      <div className="ftp-notes__layout">
        <div className="ftp-notes__main">
          <h2 className="ftp-notes__title" id="ftp-counselor-notes-title">
            #counselorNotes
          </h2>

          <div className="ftp-notes__viewport" aria-live="polite">
            <ul className="ftp-notes__list">
              {rows.map((row) => (
                <li
                  key={row.n}
                  className="ftp-notes__item"
                  aria-hidden={
                    row.n - 1 < offset || row.n - 1 >= offset + windowSize
                  }
                  aria-label={`Note ${row.n}: ${row.body}`}
                >
                  <span className="ftp-notes__avatar" aria-hidden="true">
                    <Image
                      src={AVATAR_SRC}
                      alt=""
                      width={41}
                      height={41}
                      unoptimized
                    />
                  </span>
                  <article className="ftp-notes__bubble" aria-hidden="true">
                    <span className="ftp-notes__n">{row.n}</span>
                    <p className="ftp-notes__body">{row.body}</p>
                  </article>
                </li>
              ))}
            </ul>
          </div>

          <p className="ftp-notes__count" aria-label={`${pendingBelow} notes below`}>
            <span className="ftp-notes__plus" aria-hidden="true">
              +
            </span>
            <span className="ftp-notes__pending-n">{pendingBelow}</span>
            <span className="ftp-notes__pending-label">notes</span>
          </p>
        </div>

        <div className="ftp-notes__arrows">
          <button
            type="button"
            className="ftp-notes__arrow ftp-notes__arrow--up"
            aria-label="Show earlier counselor notes"
            disabled={!canUp}
            onClick={() => step("up")}
          >
            <Image src={ARROW_SRC} alt="" width={39} height={39} unoptimized />
          </button>
          <button
            type="button"
            className="ftp-notes__arrow ftp-notes__arrow--down"
            aria-label="Show later counselor notes"
            disabled={!canDown}
            onClick={() => step("down")}
          >
            <Image src={ARROW_SRC} alt="" width={39} height={39} unoptimized />
          </button>
        </div>
      </div>
    </section>
  );
}
