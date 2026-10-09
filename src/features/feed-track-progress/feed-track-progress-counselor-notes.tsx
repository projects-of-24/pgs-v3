/**
 * Block 4 — #counselorNotes.
 * Premium: live `counselor_notes` when `rows` passed (B4).
 * Family A / omit props → Figma fixtures (N1 arrow window).
 * Desktop Figma `17041:14120` · Mobile `210:3418`
 */
"use client";

import Image from "next/image";
import { useMemo, useState, type CSSProperties } from "react";
import { FEED_TRACK_PROGRESS_COUNSELOR_NOTES } from "./content";
import type { ProgressCounselorNoteRow } from "./load-progress-counselor-notes";
import "./feed-track-progress-counselor-notes.css";

const AVATAR_SRC = "/assets/img/figma-progress/counselor-avatar.png";
const ARROW_SRC = "/assets/img/figma-progress/notes-arrow-up.png";

type FeedTrackProgressCounselorNotesProps = {
  /** B4 live store; omit → fixtures. */
  rows?: readonly ProgressCounselorNoteRow[];
  windowSize?: number;
};

export function FeedTrackProgressCounselorNotes({
  rows: liveRows,
  windowSize: liveWindow
}: FeedTrackProgressCounselorNotesProps) {
  const wired = liveRows !== undefined;
  const windowSize = liveWindow ?? FEED_TRACK_PROGRESS_COUNSELOR_NOTES.windowSize;

  const rows = useMemo(() => {
    if (wired) return [...liveRows];
    return FEED_TRACK_PROGRESS_COUNSELOR_NOTES.rows.map((row) => ({
      id: `fixture-${row.n}`,
      n: row.n,
      body: row.body
    }));
  }, [wired, liveRows]);

  const total = rows.length;
  const maxOffset = Math.max(0, total - windowSize);
  const [offset, setOffset] = useState(0);
  const safeOffset = Math.min(offset, maxOffset);

  const pendingBelow = Math.max(0, total - (safeOffset + windowSize));
  const canUp = safeOffset > 0;
  const canDown = safeOffset < maxOffset;

  const step = (dir: "up" | "down") => {
    if (dir === "up" && !canUp) return;
    if (dir === "down" && !canDown) return;
    setOffset((current) => {
      const capped = Math.min(current, maxOffset);
      return dir === "up" ? Math.max(0, capped - 1) : Math.min(maxOffset, capped + 1);
    });
  };

  return (
    <section
      className="ftp-notes"
      data-pgs-module="feed-track-progress-counselor-notes"
      data-figma-desktop="17041:14120"
      data-figma-mobile="210:3418"
      data-notes-source={wired ? "counselor_notes" : "fixture"}
      data-notes-gate={wired ? "b4" : "n1-fixture-arrows"}
      data-notes-step="line"
      aria-labelledby="ftp-counselor-notes-title"
      style={
        {
          "--ftp-notes-window": windowSize,
          "--ftp-notes-offset": safeOffset
        } as CSSProperties
      }
    >
      <div className="ftp-notes__layout">
        <div className="ftp-notes__main">
          <h2 className="ftp-notes__title" id="ftp-counselor-notes-title">
            #counselorNotes
          </h2>

          {wired && !rows.length ? (
            <p className="ftp-notes__empty" role="status">
              No counselor notes yet. Your mentor will post updates here.
            </p>
          ) : (
            <>
              <div className="ftp-notes__viewport" aria-live="polite">
                <ul className="ftp-notes__list">
                  {rows.map((row) => (
                    <li
                      key={row.id}
                      className="ftp-notes__item"
                      aria-hidden={row.n - 1 < safeOffset || row.n - 1 >= safeOffset + windowSize}
                      aria-label={`Note ${row.n}: ${row.body}`}
                    >
                      <span className="ftp-notes__avatar" aria-hidden="true">
                        <Image src={AVATAR_SRC} alt="" width={41} height={41} unoptimized />
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
            </>
          )}
        </div>

        {rows.length > windowSize ? (
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
        ) : null}
      </div>
    </section>
  );
}
