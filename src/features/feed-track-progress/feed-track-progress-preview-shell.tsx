/**
 * Family A body — anon + standard (same structure).
 * Desktop lock authority: Figma `17041:14026`. Mobile: `210:3346`.
 * Live `/feed_track_progress` doorman uses this for non-Premium.
 * Premium = separate Family B shell — do not mix CMS shapes.
 */
import { FeedTrackProgressBoard } from "./feed-track-progress-board";
import { FeedTrackProgressCounselorNotes } from "./feed-track-progress-counselor-notes";
import { FeedTrackProgressDraftMeter } from "./feed-track-progress-draft-meter";
import { FeedTrackProgressHero } from "./feed-track-progress-hero";
import { FeedTrackProgressLoopboardIntro } from "./feed-track-progress-loopboard-intro";
import { FeedTrackProgressMetersStack } from "./feed-track-progress-meters-stack";
import { FeedTrackProgressResourceDrop } from "./feed-track-progress-resource-drop";
import { FeedTrackProgressReviewQueue } from "./feed-track-progress-review-queue";
import { FeedTrackProgressTips } from "./feed-track-progress-tips";
import "./feed-track-progress-preview.css";

export function FeedTrackProgressPreviewShell() {
  return (
    <div
      className="ftp-preview-shell"
      data-pgs-module="feed-track-progress-preview"
      data-progress-family="locked"
      data-figma-desktop-locked="17041:14026"
    >
      <div className="ftp-preview-shell__body">
        <FeedTrackProgressHero />
        <FeedTrackProgressMetersStack>
          <FeedTrackProgressDraftMeter />
          <FeedTrackProgressReviewQueue />
          <FeedTrackProgressCounselorNotes />
        </FeedTrackProgressMetersStack>
        <FeedTrackProgressLoopboardIntro />
        <FeedTrackProgressBoard />
        <FeedTrackProgressTips />
        <FeedTrackProgressResourceDrop />
      </div>
    </div>
  );
}
