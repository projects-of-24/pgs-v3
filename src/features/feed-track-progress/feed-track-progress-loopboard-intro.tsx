/**
 * Block 5 — #PGS Loopboard intro (Figma fixtures).
 * Desktop locked `17041:14167` · Premium `17041:13291` · Mobile `210:3457` / premium `210:2745`
 * Outside meters stack. Board columns = Block 6 / P6.
 */
import { FEED_TRACK_PROGRESS_LOOPBOARD_INTRO } from "./content";
import "./feed-track-progress-loopboard-intro.css";

export function FeedTrackProgressLoopboardIntro() {
  const { title, paragraphs } = FEED_TRACK_PROGRESS_LOOPBOARD_INTRO;

  return (
    <section
      className="ftp-loop-intro"
      data-pgs-module="feed-track-progress-loopboard-intro"
      data-figma-desktop="17041:14167"
      data-figma-mobile="210:3457"
      aria-labelledby="ftp-loopboard-intro-title"
    >
      <h2 className="ftp-loop-intro__title" id="ftp-loopboard-intro-title">
        {title}
      </h2>
      <div className="ftp-loop-intro__copy">
        {paragraphs.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
