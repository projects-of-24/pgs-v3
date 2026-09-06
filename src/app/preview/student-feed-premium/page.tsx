/**
 * Premium feed preview — locked chrome + Family B purified body.
 * UI LOCKED (desktop + mobile) — READY TO PORT (replace Hostinger on GO AHEAD).
 * CMS/Ops student wiring + iPad deferred. Live `/student/dashboard` UNTOUCHED until cutover.
 * Figma: desktop `17041:10191` · mobile `206:6666`.
 */
import { LegacyPage } from "@/components/legacy-page";
import { applyStudentIdentity } from "@/components/recovered-student-legacy-page";
import { loadFeedNotesBody } from "@/features/student-feed/load-feed-notes";
import { loadFeedQuickDashboardMetrics } from "@/features/student-feed/load-feed-quick-dashboard";
import { listFeedUpcomingEvents } from "@/features/student-feed/list-feed-upcoming-events";
import { StudentFeedPremiumShell } from "@/features/student-feed/premium/student-feed-premium-shell";
import "@/features/shell/legacy-header-breakpoints.css";
import { applyAuthenticatedShell } from "@/lib/account-shell";
import { applyPremiumBusinessRule } from "@/lib/premium-business-rule";
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
  studentExperienceAvatarUrl
} from "@/lib/student-experience";

export const dynamic = "force-dynamic";

export default async function StudentFeedPremiumPreviewPage() {
  const state = await resolveStudentExperience();
  // Preview chrome: treat as signed-in premium surface for shell chrome rules.
  const studentState =
    state?.kind === "anonymous" || !state ? "authenticated_standard" : state.kind;
  const helloAvatar =
    state && state.kind !== "anonymous"
      ? await studentExperienceAvatarUrl(state)
      : HELLO_ASPIRANT_DEFAULT_AVATAR;

  const studentId =
    state && state.kind !== "anonymous" ? state.subject.id : null;
  const [quickDashboard, notes, upcomingEvents] = await Promise.all([
    loadFeedQuickDashboardMetrics(studentId),
    loadFeedNotesBody(studentId),
    listFeedUpcomingEvents()
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
  } else {
    // Anonymous session still gets authenticated-looking chrome for Premium QC.
    const shellFields = {
      name: "Aspirant",
      unreadCount: 0,
      premium: true,
      notifications: [],
      notificationReadOnly: true
    };
    topHtml = applyAuthenticatedShell(topHtml, shellFields);
    footerHtml = applyAuthenticatedShell(footerHtml, shellFields);
  }

  topHtml = applyPremiumBusinessRule(topHtml);
  footerHtml = applyPremiumBusinessRule(footerHtml);

  return (
    <LegacyPage page="preview-student-feed-premium" studentState="authenticated_premium">
      <div dangerouslySetInnerHTML={{ __html: topHtml }} />
      <StudentFeedPremiumShell
        quickDashboard={quickDashboard}
        notesBody={notes.body}
        upcomingEvents={upcomingEvents}
      />
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </LegacyPage>
  );
}
