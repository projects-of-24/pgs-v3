/**
 * Premium Track Your Progress preview — locked chrome + Family B body.
 * B1: Important Alerts ← `student_alerts` (active, ≤3).
 * B2: #draftMeter ← `student_document_requirements`.
 * B3: #reviewQueue ← `review_queue_items` (student_visible).
 * B4: #counselorNotes ← `counselor_notes` (student_visible).
 * B7c: Useful Tips ← `progress_tips` · Resource Drop ← `progress_resources`.
 * Live `/feed_track_progress` Premium uses the same Family B shell.
 * Figma: desktop `17041:12619` · mobile `206:8075`.
 */
import { LegacyPage } from "@/components/legacy-page";
import { applyStudentIdentity } from "@/components/recovered-student-legacy-page";
import { FeedTrackProgressPremiumShell } from "@/features/feed-track-progress/feed-track-progress-premium-shell";
import { loadProgressAlerts } from "@/features/feed-track-progress/load-progress-alerts";
import { loadProgressCounselorNotes } from "@/features/feed-track-progress/load-progress-counselor-notes";
import { loadProgressDraftMeter } from "@/features/feed-track-progress/load-progress-draft-meter";
import { loadProgressReviews } from "@/features/feed-track-progress/load-progress-reviews";
import {
  loadProgressResources,
  loadProgressTips
} from "@/features/feed-track-progress/load-progress-tips-resources";
import "@/features/shell/legacy-header-breakpoints.css";
import { applyAuthenticatedShell } from "@/lib/account-shell";
import { applyPremiumBusinessRule } from "@/lib/premium-business-rule";
import { withPreviewLoginReturn } from "@/lib/preview-login-return";
import {
  applySharedHelloAspirant,
  HELLO_ASPIRANT_DEFAULT_AVATAR
} from "@/legacy/pages/hello-aspirant";
import { countriesUkStripHtml } from "@/legacy/pages/countriesuk";
import { getPublicFooterHtml } from "@/legacy/pages/public-footer";
import { getPublicHeaderHtml } from "@/legacy/pages/public-header";
import { applySharedPublicSidebar } from "@/legacy/pages/public-sidebar";
import {
  resolveStudentExperience,
  studentExperienceAvatarUrl,
  studentSubjectId
} from "@/lib/student-experience";

export const dynamic = "force-dynamic";

export default async function FeedTrackProgressPremiumPreviewPage() {
  const state = await resolveStudentExperience();
  const studentState =
    state?.kind === "anonymous" || !state ? "authenticated_standard" : state.kind;
  const helloAvatar =
    state && state.kind !== "anonymous"
      ? await studentExperienceAvatarUrl(state)
      : HELLO_ASPIRANT_DEFAULT_AVATAR;

  const studentId =
    state && state.kind !== "anonymous" ? studentSubjectId(state) : null;
  const [{ items: alertItems }, meter, reviews, notes, tips, resources] =
    await Promise.all([
      loadProgressAlerts(studentId),
      loadProgressDraftMeter(studentId),
      loadProgressReviews(studentId),
      loadProgressCounselorNotes(studentId),
      loadProgressTips(),
      loadProgressResources()
    ]);

  let topHtml = [getPublicHeaderHtml(), countriesUkStripHtml()].join("");
  topHtml = applySharedPublicSidebar(topHtml, studentState, {
    name: state && state.kind !== "anonymous" ? state.name : "User"
  });
  topHtml = applySharedHelloAspirant(topHtml, studentState, {
    name: state && state.kind !== "anonymous" ? state.name : "Aspirant",
    avatarUrl: helloAvatar
  });

  let footerHtml = getPublicFooterHtml();

  if (state && state.kind !== "anonymous") {
    const shellFields = {
      name: state.name,
      unreadCount: state.unreadCount,
      premium: true,
      notifications: state.notifications,
      notificationReadOnly: Boolean(state.preview)
    };
    topHtml = applyAuthenticatedShell(topHtml, shellFields);
    topHtml = applyStudentIdentity(topHtml, state, helloAvatar);
    footerHtml = applyAuthenticatedShell(footerHtml, shellFields);
  }
  // Anonymous: keep real Login → /login (do not fake authenticated shell).

  topHtml = applyPremiumBusinessRule(topHtml);
  footerHtml = applyPremiumBusinessRule(footerHtml);

  const previewPath = "/preview/feed-track-progress-premium";
  topHtml = withPreviewLoginReturn(topHtml, previewPath);
  footerHtml = withPreviewLoginReturn(footerHtml, previewPath);

  return (
    <LegacyPage page="preview-feed-track-progress-premium" studentState="authenticated_premium">
      <div dangerouslySetInnerHTML={{ __html: topHtml }} />
      <FeedTrackProgressPremiumShell
        alertItems={alertItems}
        meterRows={meter.wired ? meter.rows : undefined}
        meterCompleted={meter.wired ? meter.completed : undefined}
        reviewRows={reviews.wired ? reviews.rows : undefined}
        reviewCompleted={reviews.wired ? reviews.completed : undefined}
        noteRows={notes.wired ? notes.rows : undefined}
        noteWindowSize={notes.wired ? notes.windowSize : undefined}
        tipSlides={tips.wired ? tips.slides : undefined}
        resourceItems={resources.wired ? resources.items : undefined}
      />
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </LegacyPage>
  );
}
