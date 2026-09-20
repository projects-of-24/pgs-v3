/**
 * Pathway chips — Figma part of Loopboard black panel (not a separate white page block).
 * Desktop `17041:14210`–`14215` · Mobile `210:3618`
 */
import { FEED_TRACK_PROGRESS_PATHWAY } from "./content";
import "./feed-track-progress-pathway.css";

export function FeedTrackProgressPathway({ nested = false }: { nested?: boolean }) {
  const { title, chips } = FEED_TRACK_PROGRESS_PATHWAY;

  return (
    <div
      className={`ftp-pathway${nested ? " is-nested" : ""}`}
      data-pgs-module="feed-track-progress-pathway"
      data-figma-desktop="17041:14210"
      data-figma-mobile="210:3618"
      aria-labelledby="ftp-pathway-title"
    >
      <h2 className="ftp-pathway__title" id="ftp-pathway-title">
        {title}
      </h2>
      <ul className="ftp-pathway__chips">
        {chips.map((chip) => (
          <li key={chip.id} className={`ftp-pathway__chip is-${chip.tone}`}>
            {chip.parts.map((part, index) => (
              <span
                key={`${chip.id}-${index}`}
                className={part.kind === "sep" ? "ftp-pathway__sep" : undefined}
              >
                {part.text}
              </span>
            ))}
          </li>
        ))}
      </ul>
    </div>
  );
}
