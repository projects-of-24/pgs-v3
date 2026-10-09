/**
 * Family B body — Premium unlocked (separate from Family A).
 * Desktop Figma `17041:12619` · Mobile `206:8075`
 * B1: Important Alerts ← `student_alerts` when `alertItems` passed.
 * B2: #draftMeter ← `student_document_requirements` when `meterRows` passed.
 * B3: #reviewQueue ← `review_queue_items` when `reviewRows` passed.
 * B4: #counselorNotes ← `counselor_notes` when `noteRows` passed.
 * B7c: Useful Tips ← `progress_tips` · Resource Drop ← `progress_resources`.
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
import type { ProgressCounselorNoteRow } from "./load-progress-counselor-notes";
import type { ProgressDraftMeterRow } from "./load-progress-draft-meter";
import type {
  ProgressResourceItem,
  ProgressTipSlide
} from "./load-progress-tips-resources";
import type { ProgressReviewRow } from "./load-progress-reviews";
import "./feed-track-progress-preview.css";

type FeedTrackProgressPremiumShellProps = {
  /** B1 — from `loadProgressAlerts`. */
  alertItems?: readonly string[];
  /** B2 — from `loadProgressDraftMeter` (omit = fixture). */
  meterRows?: readonly ProgressDraftMeterRow[];
  meterCompleted?: number;
  /** B3 — from `loadProgressReviews` (omit = fixture). */
  reviewRows?: readonly ProgressReviewRow[];
  reviewCompleted?: number;
  /** B4 — from `loadProgressCounselorNotes` (omit = fixture). */
  noteRows?: readonly ProgressCounselorNoteRow[];
  noteWindowSize?: number;
  /** B7c — from `loadProgressTips` (omit = fixture). */
  tipSlides?: readonly ProgressTipSlide[];
  /** B7c — from `loadProgressResources` (omit = fixture). */
  resourceItems?: readonly ProgressResourceItem[];
};

export function FeedTrackProgressPremiumShell({
  alertItems = [],
  meterRows,
  meterCompleted,
  reviewRows,
  reviewCompleted,
  noteRows,
  noteWindowSize,
  tipSlides,
  resourceItems
}: FeedTrackProgressPremiumShellProps) {
  return (
    <div
      className="ftp-preview-shell ftp-preview-shell--premium"
      data-pgs-module="feed-track-progress-premium-preview"
      data-progress-family="premium"
      data-figma-desktop-premium="17041:12619"
      data-figma-mobile-premium="206:8075"
      data-alerts-gate="b1"
      data-meter-gate="b2"
      data-reviews-gate="b3"
      data-notes-gate="b4"
      data-tips-gate="b7c"
      data-drop-gate="b7c"
    >
      <div className="ftp-preview-shell__body">
        <FeedTrackProgressHero locked={false} alertItems={alertItems} />
        <FeedTrackProgressMetersStack locked={false}>
          <FeedTrackProgressDraftMeter rows={meterRows} completed={meterCompleted} />
          <FeedTrackProgressReviewQueue rows={reviewRows} completed={reviewCompleted} />
          <FeedTrackProgressCounselorNotes rows={noteRows} windowSize={noteWindowSize} />
        </FeedTrackProgressMetersStack>
        <FeedTrackProgressLoopboardIntro />
        <FeedTrackProgressBoard locked={false} />
        <FeedTrackProgressTips slides={tipSlides} />
        <FeedTrackProgressResourceDrop items={resourceItems} />
      </div>
    </div>
  );
}
