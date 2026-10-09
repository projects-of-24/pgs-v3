/**
 * Block 2 — #draftMeter.
 * Premium: live `student_document_requirements` when `rows` passed (B2).
 * Family A / omit props → Figma fixtures.
 * Desktop Figma `17041:13195` · Mobile locked `210:3371` · Mobile premium under `206:8075`
 */
import Image from "next/image";
import { FEED_TRACK_PROGRESS_DRAFT_METER } from "./content";
import type { ProgressDraftMeterRow } from "./load-progress-draft-meter";
import "./feed-track-progress-draft-meter.css";

type FeedTrackProgressDraftMeterProps = {
  /** B2 live store; omit → fixtures. */
  rows?: readonly ProgressDraftMeterRow[];
  completed?: number;
};

export function FeedTrackProgressDraftMeter({
  rows: liveRows,
  completed: liveCompleted
}: FeedTrackProgressDraftMeterProps) {
  const wired = liveRows !== undefined;
  const rows = wired
    ? liveRows
    : FEED_TRACK_PROGRESS_DRAFT_METER.rows.map((row, index) => ({
        id: `fixture-${index}`,
        label: row.label,
        meterSrc: row.meterSrc,
        status: "fixture"
      }));
  const completed = wired
    ? (liveCompleted ?? 0)
    : FEED_TRACK_PROGRESS_DRAFT_METER.completed;

  return (
    <section
      className="ftp-meter"
      data-pgs-module="feed-track-progress-draft-meter"
      data-figma-desktop="17041:13195"
      data-figma-mobile="210:3371"
      data-figma-mobile-premium="207:2402"
      data-meter-source={wired ? "student_document_requirements" : "fixture"}
      aria-labelledby="ftp-draft-meter-title"
    >
      <div className="ftp-meter__row">
        <article className="ftp-meter__card">
          <h2 className="ftp-meter__title" id="ftp-draft-meter-title">
            #draftMeter
          </h2>
          {wired && !rows.length ? (
            <p className="ftp-meter__empty" role="status">
              {completed > 0
                ? "All configured documents are approved."
                : "Once your mentor adds document requirements, pending work shows here."}
            </p>
          ) : (
            <ul className="ftp-meter__list">
              {rows.map((row) => (
                <li key={row.id} className="ftp-meter__item">
                  <span className="ftp-meter__gauge" aria-hidden="true">
                    <Image src={row.meterSrc} alt="" width={73} height={37} unoptimized />
                  </span>
                  <span className="ftp-meter__bar" aria-hidden="true" />
                  <span className="ftp-meter__label">{row.label}</span>
                </li>
              ))}
            </ul>
          )}
        </article>

        <p className="ftp-meter__count" aria-label={`${completed} completed`}>
          <span className="ftp-meter__plus" aria-hidden="true">
            +
          </span>
          <span className="ftp-meter__n">{completed}</span>
          <span className="ftp-meter__done">completed</span>
        </p>
      </div>
    </section>
  );
}
