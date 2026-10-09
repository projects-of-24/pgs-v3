/**
 * Block 3 — #reviewQueue.
 * Premium: live `review_queue_items` when `rows` passed (B3).
 * Family A / omit props → Figma fixtures.
 * Desktop locked `17041:14094` · Mobile `210:3393` / premium `210:2438`
 * Switches are display-only (staff toggles status on Desk Reviews).
 */
import Image from "next/image";
import { FEED_TRACK_PROGRESS_REVIEW_QUEUE } from "./content";
import type { ProgressReviewRow } from "./load-progress-reviews";
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

type FeedTrackProgressReviewQueueProps = {
  /** B3 live store; omit → fixtures (Family A / preview without student). */
  rows?: readonly ProgressReviewRow[];
  completed?: number;
};

export function FeedTrackProgressReviewQueue({
  rows: liveRows,
  completed: liveCompleted
}: FeedTrackProgressReviewQueueProps) {
  const wired = liveRows !== undefined;
  const rows = wired
    ? liveRows
    : FEED_TRACK_PROGRESS_REVIEW_QUEUE.rows.map((row, index) => ({
        id: `fixture-${index}`,
        label: row.label,
        done: row.done
      }));
  const completed = wired
    ? (liveCompleted ?? rows.filter((row) => row.done).length)
    : FEED_TRACK_PROGRESS_REVIEW_QUEUE.completed;

  return (
    <section
      className="ftp-review"
      data-pgs-module="feed-track-progress-review-queue"
      data-figma-desktop="17041:14094"
      data-figma-mobile="210:3393"
      data-reviews-source={wired ? "review_queue_items" : "fixture"}
      aria-labelledby="ftp-review-queue-title"
    >
      <div className="ftp-review__row">
        <article className="ftp-review__card">
          <h2 className="ftp-review__title" id="ftp-review-queue-title">
            #reviewQueue
          </h2>
          {wired && !rows.length ? (
            <p className="ftp-review__empty" role="status">
              No review items yet. Your mentor will add them here.
            </p>
          ) : (
            <ul className="ftp-review__list">
              {rows.map((row) => (
                <li key={row.id} className="ftp-review__item">
                  <ReviewSwitch done={row.done} label={row.label} />
                  <span className="ftp-review__bar" aria-hidden="true" />
                  <span className="ftp-review__label">{row.label}</span>
                </li>
              ))}
            </ul>
          )}
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
