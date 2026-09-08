/**
 * Block 3 — #reviewQueue (Figma fixtures; backend wire later).
 * Desktop locked `17041:14094` · Premium desktop under `17041:12619` · Mobile `210:3393` / premium `210:2438`
 * Switches are visual only. Family A frost = meters-stack; Premium renders alone (no frost).
 */
import Image from "next/image";
import { FEED_TRACK_PROGRESS_REVIEW_QUEUE } from "./content";
import "./feed-track-progress-review-queue.css";

const TICK_SRC = "/assets/img/figma-progress/switch-tick.svg";

function ReviewSwitch({ done, label }: { done: boolean; label: string }) {
  return (
    <span
      className={`ftp-review__switch${done ? " is-on" : " is-off"}`}
      role="img"
      aria-label={`${label}: ${done ? "completed" : "not completed"}`}
    >
      {done ? (
        <Image
          className="ftp-review__switch-tick"
          src={TICK_SRC}
          alt=""
          width={19}
          height={19}
          unoptimized
        />
      ) : (
        <span className="ftp-review__switch-knob" aria-hidden="true" />
      )}
    </span>
  );
}

export function FeedTrackProgressReviewQueue() {
  const { completed, rows } = FEED_TRACK_PROGRESS_REVIEW_QUEUE;

  return (
    <section
      className="ftp-review"
      data-pgs-module="feed-track-progress-review-queue"
      data-figma-desktop="17041:14094"
      data-figma-mobile="210:3393"
      aria-labelledby="ftp-review-queue-title"
    >
      <div className="ftp-review__row">
        <article className="ftp-review__card">
          <h2 className="ftp-review__title" id="ftp-review-queue-title">
            #reviewQueue
          </h2>
          <ul className="ftp-review__list">
            {rows.map((row, index) => (
              <li key={`${row.label}-${index}`} className="ftp-review__item">
                <ReviewSwitch done={row.done} label={row.label} />
                <span className="ftp-review__bar" aria-hidden="true" />
                <span className="ftp-review__label">{row.label}</span>
              </li>
            ))}
          </ul>
        </article>

        <p className="ftp-review__count" aria-label={`${completed} completed`}>
          <span className="ftp-review__plus" aria-hidden="true">
            +
          </span>
          <span className="ftp-review__n">{completed}</span>
          <span className="ftp-review__done">completed</span>
        </p>
      </div>
    </section>
  );
}
