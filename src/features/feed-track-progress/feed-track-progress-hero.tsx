/**
 * Block 1 / P1 — title + Important Alerts + intro.
 * Family A locked: fixtures + frost.
 * Family B Premium: optional `alertItems` from `student_alerts` (B1); empty = honest empty.
 */
import Image from "next/image";
import {
  FEED_TRACK_PROGRESS_ALERTS,
  FEED_TRACK_PROGRESS_INTRO,
  PROGRESS_ALERTS_EMPTY
} from "./content";
import "./feed-track-progress-hero.css";

const STICKER_SRC = "/assets/img/figma-progress/alerts-sticker.gif";
const LOCK_SRC = "/assets/img/figma-progress/alerts-lock.svg";

type FeedTrackProgressHeroProps = {
  /** Family A default: frost + lock. Family B Premium: false. */
  locked?: boolean;
  /**
   * When set (Premium B1+), render these instead of fixtures.
   * Empty array → honest empty message (live board parity).
   * Omit on Family A → keep Figma fixtures.
   */
  alertItems?: readonly string[];
};

export function FeedTrackProgressHero({
  locked = true,
  alertItems
}: FeedTrackProgressHeroProps) {
  const wired = alertItems !== undefined;
  const lines = wired
    ? alertItems.length > 0
      ? alertItems
      : [PROGRESS_ALERTS_EMPTY]
    : [...FEED_TRACK_PROGRESS_ALERTS];

  return (
    <section
      className="ftp-hero"
      data-pgs-module="feed-track-progress-hero"
      data-progress-family={locked ? "locked" : "premium"}
      data-alerts-source={wired ? "student_alerts" : "fixture"}
      data-figma-desktop="17041:13318"
      data-figma-mobile={locked ? "210:3352" : "207:2262"}
      data-figma-alerts={locked ? "17041:16262" : "17041:13319"}
    >
      <div className="ftp-hero__cluster">
        <h1 className="ftp-hero__title">your custom progress board</h1>

        <div className="ftp-hero__alerts-wrap">
          <article className="ftp-hero__alerts" aria-label="Important Alerts">
            <div className="ftp-hero__alerts-head">
              <span className="ftp-hero__sticker" aria-hidden="true">
                <Image src={STICKER_SRC} alt="" width={38} height={38} unoptimized />
              </span>
              <h2 className="ftp-hero__alerts-title">Important Alerts</h2>
            </div>
            <ol className="ftp-hero__alerts-list">
              {lines.map((text, index) => (
                <li key={`${index}-${text.slice(0, 24)}`} className="ftp-hero__alerts-item">
                  <span className="ftp-hero__alerts-num">{index + 1}</span>
                  <span className="ftp-hero__alerts-text">{text}</span>
                </li>
              ))}
            </ol>
          </article>
          {locked ? (
            <div className="ftp-hero__forlocked" aria-hidden="true">
              <Image src={LOCK_SRC} alt="" width={54} height={54} unoptimized />
            </div>
          ) : null}
        </div>
      </div>

      <p className="ftp-hero__intro">{FEED_TRACK_PROGRESS_INTRO}</p>
    </section>
  );
}
