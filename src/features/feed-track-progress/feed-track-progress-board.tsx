/**
 * Block 6+7 — Loopboard stand-in: black panel + 4 cols + pathway chips.
 * Family A: forlocked. Family B Premium: same UI, no frost (owner Loopboard swap later).
 * Desktop panel locked `17041:14070` / Premium `17041:13192` · pathway on black panel.
 * Visual only — does NOT import preview Loopboard / StudentKanbanBoard / live tasks.
 */
import Image from "next/image";
import { LOOPBOARD_ACCENT_HEX, type LoopboardAccent } from "@/features/loopboard/loopboard-accents";
import { FEED_TRACK_PROGRESS_BOARD } from "./content";
import { FeedTrackProgressPathway } from "./feed-track-progress-pathway";
import "./feed-track-progress-board.css";

const ARROW_SRC = "/assets/img/figma-progress/board-arrow.png";
const LOCK_SRC = "/assets/img/figma-progress/meters-lock.svg";

type BoardCard = (typeof FEED_TRACK_PROGRESS_BOARD.columns)[number]["cards"][number];

function accentColor(accent: LoopboardAccent): string {
  return LOOPBOARD_ACCENT_HEX[accent];
}

function BoardCardView({ card }: { card: BoardCard }) {
  if (card.kind === "note") {
    return <article className="ftp-board__note">{card.body}</article>;
  }

  if (card.kind === "task") {
    return (
      <article className="ftp-board__task">
        <p className="ftp-board__task-title">{card.title}</p>
        <p className="ftp-board__task-body">{card.body}</p>
      </article>
    );
  }

  if (card.kind === "media") {
    return (
      <article className="ftp-board__media">
        <div className="ftp-board__media-img">
          <Image src={card.imageSrc} alt="" width={248} height={96} unoptimized />
        </div>
        <div className="ftp-board__media-row">
          <p className="ftp-board__media-title">{card.title}</p>
          <Image
            className="ftp-board__media-emoji"
            src={card.emojiSrc}
            alt=""
            width={18}
            height={18}
            unoptimized
          />
        </div>
        <div className="ftp-board__progress" aria-hidden="true">
          <span className="ftp-board__progress-fill" />
        </div>
      </article>
    );
  }

  const style = { backgroundColor: accentColor(card.accent) };

  if (card.kind === "ticket-list") {
    return (
      <article className="ftp-board__ticket is-light-text" style={style}>
        {"badge" in card && card.badge ? (
          <span className="ftp-board__badge">{card.badge}</span>
        ) : null}
        <p className="ftp-board__ticket-title">{card.title}</p>
        <ul className="ftp-board__bullets">
          {card.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      </article>
    );
  }

  return (
    <article className="ftp-board__ticket is-light-text" style={style}>
      <p className="ftp-board__ticket-title">{card.title}</p>
      <p className="ftp-board__ticket-body">{card.body}</p>
    </article>
  );
}

type FeedTrackProgressBoardProps = {
  /** Family A default true. Premium: false (stand-in visible, no frost). */
  locked?: boolean;
};

export function FeedTrackProgressBoard({ locked = true }: FeedTrackProgressBoardProps) {
  return (
    <section
      className="ftp-board"
      data-pgs-module="feed-track-progress-board"
      data-progress-family={locked ? "locked" : "premium"}
      data-figma-desktop-panel={locked ? "17041:14070" : "17041:13192"}
      data-figma-desktop-cols={locked ? "17041:14140" : "17041:13264"}
      data-figma-desktop-pathway={locked ? "17041:14210" : "17041:13334"}
      data-figma-desktop-lock={locked ? "17041:14481" : undefined}
      data-figma-mobile="210:3466"
      data-lock={locked ? "forlocked" : "unlocked"}
      aria-label={locked ? "Loopboard preview (locked)" : "Loopboard preview"}
    >
      <div className="ftp-board__arrow" aria-hidden="true">
        <Image src={ARROW_SRC} alt="" width={138} height={138} unoptimized />
      </div>

      <div className="ftp-board__stage">
        <div className="ftp-board__scroller" aria-hidden="true">
          <div className="ftp-board__columns">
            {FEED_TRACK_PROGRESS_BOARD.columns.map((column) => (
              <div key={column.title} className="ftp-board__column">
                <h3 className="ftp-board__column-title">{column.title}</h3>
                <div className="ftp-board__cards">
                  {column.cards.map((card, index) => (
                    <BoardCardView key={`${column.title}-${index}`} card={card} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <FeedTrackProgressPathway nested />

        {locked ? (
          <div className="ftp-board__forlocked" aria-hidden="true">
            <Image src={LOCK_SRC} alt="" width={208} height={208} unoptimized />
          </div>
        ) : null}
      </div>
    </section>
  );
}
