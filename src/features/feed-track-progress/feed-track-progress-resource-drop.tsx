/**
 * Block 9 — Resource Drop (locked fixtures).
 * Desktop Figma `17041:14220` · Mobile `210:3647`
 * Labels + decorative arrows only — real links = backend pass (owner lock).
 */
import Image from "next/image";
import { FEED_TRACK_PROGRESS_RESOURCE_DROP } from "./content";
import "./feed-track-progress-resource-drop.css";

const BADGE_SRC = "/assets/img/figma-progress/resource-drop-badge.svg";

export function FeedTrackProgressResourceDrop() {
  const { title, items } = FEED_TRACK_PROGRESS_RESOURCE_DROP;

  return (
    <section
      className="ftp-drop"
      data-pgs-module="feed-track-progress-resource-drop"
      data-figma-desktop="17041:14220"
      data-figma-mobile="210:3647"
      aria-labelledby="ftp-drop-title"
    >
      <h2 className="ftp-drop__title" id="ftp-drop-title">
        {title}
      </h2>

      <ul className="ftp-drop__list">
        {items.map((label) => (
          <li key={label} className="ftp-drop__row">
            <span className="ftp-drop__label">{label}</span>
            <span className="ftp-drop__badge" aria-hidden="true">
              <Image src={BADGE_SRC} alt="" width={48} height={48} unoptimized />
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
