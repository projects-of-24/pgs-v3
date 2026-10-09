/**
 * Block 9 — Resource Drop.
 * Premium: live `progress_resources` when `items` passed (FTP-B7c).
 * Family A / omit props → Figma label fixtures (no hrefs).
 * Desktop Figma `17041:14220` · Mobile `210:3647`
 */
import Image from "next/image";
import { FEED_TRACK_PROGRESS_RESOURCE_DROP } from "./content";
import type { ProgressResourceItem } from "./load-progress-tips-resources";
import "./feed-track-progress-resource-drop.css";

const BADGE_SRC = "/assets/img/figma-progress/resource-drop-badge.svg";

type FeedTrackProgressResourceDropProps = {
  /** FTP-B7c live store; omit → fixtures. */
  items?: readonly ProgressResourceItem[];
};

export function FeedTrackProgressResourceDrop({
  items: liveItems
}: FeedTrackProgressResourceDropProps) {
  const wired = liveItems !== undefined;
  const title = FEED_TRACK_PROGRESS_RESOURCE_DROP.title;
  const items = wired
    ? liveItems
    : FEED_TRACK_PROGRESS_RESOURCE_DROP.items.map((label, index) => ({
        id: `fixture-res-${index}`,
        label,
        url: ""
      }));

  return (
    <section
      className="ftp-drop"
      data-pgs-module="feed-track-progress-resource-drop"
      data-figma-desktop="17041:14220"
      data-figma-mobile="210:3647"
      data-drop-source={wired ? "progress_resources" : "fixture"}
      data-drop-gate={wired ? "b7c" : "fixture-labels"}
      aria-labelledby="ftp-drop-title"
    >
      <h2 className="ftp-drop__title" id="ftp-drop-title">
        {title}
      </h2>

      {wired && !items.length ? (
        <p className="ftp-drop__empty" role="status">
          No resources yet. Your mentor will add links here.
        </p>
      ) : (
        <ul className="ftp-drop__list">
          {items.map((item) => {
            const hasLink = Boolean(item.url);
            const label = <span className="ftp-drop__label">{item.label}</span>;
            const badge = (
              <span className="ftp-drop__badge" aria-hidden="true">
                <Image src={BADGE_SRC} alt="" width={48} height={48} unoptimized />
              </span>
            );
            return (
              <li key={item.id} className="ftp-drop__row">
                {hasLink ? (
                  <a
                    className="ftp-drop__link"
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label}
                    {badge}
                  </a>
                ) : (
                  <>
                    {label}
                    {badge}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
