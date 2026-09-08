/**
 * Family B body — Premium unlocked (separate from Family A).
 * Desktop Figma `17041:12619` · Mobile `206:8075`
 * B1: Important Alerts ← `student_alerts` when `alertItems` passed.
 * Live + preview share this shell — do not merge into Family A.
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

type FeedTrackProgressPremiumShellProps = {
  /** B1 — from `loadProgressAlerts`. */
  alertItems?: readonly string[];
};

export function FeedTrackProgressPremiumShell({
  alertItems = []
}: FeedTrackProgressPremiumShellProps) {
  return (
    <div
      className="ftp-preview-shell ftp-preview-shell--premium"
      data-pgs-module="feed-track-progress-premium-preview"
      data-progress-family="premium"
      data-figma-desktop-premium="17041:12619"
      data-figma-mobile-premium="206:8075"
      data-alerts-gate="b1"
    >
      <div className="ftp-preview-shell__body">
        <FeedTrackProgressHero locked={false} alertItems={alertItems} />
        <FeedTrackProgressMetersStack locked={false}>
          <FeedTrackProgressDraftMeter />
          <FeedTrackProgressReviewQueue />
          <FeedTrackProgressCounselorNotes />
        </FeedTrackProgressMetersStack>
        <FeedTrackProgressLoopboardIntro />
        <FeedTrackProgressBoard locked={false} />
        <FeedTrackProgressTips />
        <FeedTrackProgressResourceDrop />
      </div>
    </div>
  );
}
