/**
 * Block 2 — #draftMeter (Figma fixtures; backend wire later).
 * Desktop Figma `17041:13195` · Mobile locked `210:3371` · Mobile premium under `206:8075`
 * Family A lock overlay lives on `FeedTrackProgressMetersStack`.
 * Premium: same stack with `locked={false}` (780 / mobile inset rail, no frost).
 */
import Image from "next/image";
import { FEED_TRACK_PROGRESS_DRAFT_METER } from "./content";
import "./feed-track-progress-draft-meter.css";

export function FeedTrackProgressDraftMeter() {
  const { completed, rows } = FEED_TRACK_PROGRESS_DRAFT_METER;

  return (
    <section
      className="ftp-meter"
      data-pgs-module="feed-track-progress-draft-meter"
      data-figma-desktop="17041:13195"
      data-figma-mobile="210:3371"
      data-figma-mobile-premium="207:2402"
      aria-labelledby="ftp-draft-meter-title"
    >
      <div className="ftp-meter__row">
        <article className="ftp-meter__card">
          <h2 className="ftp-meter__title" id="ftp-draft-meter-title">
            #draftMeter
          </h2>
          <ul className="ftp-meter__list">
            {rows.map((row) => (
              <li key={row.label} className="ftp-meter__item">
                <span className="ftp-meter__gauge" aria-hidden="true">
                  <Image src={row.meterSrc} alt="" width={73} height={37} unoptimized />
                </span>
                <span className="ftp-meter__bar" aria-hidden="true" />
                <span className="ftp-meter__label">{row.label}</span>
              </li>
            ))}
          </ul>
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
