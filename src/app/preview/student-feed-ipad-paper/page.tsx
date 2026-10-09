/**
 * iPad A/B Pass B — Paper MCP source.
 * Preview only. Live `/student/dashboard` UNTOUCHED.
 * Paper: file 01M40FPTTH8E6PZV2GBA8QSD3C · node 2DP-0
 * CSS = owned split (layout.tsx OWNED_SPLIT_ROUTES). React chrome — no Hostinger sheets.
 */
import { LegacyPage } from "@/components/legacy-page";
import { loadFeedNotesBody } from "@/features/student-feed/load-feed-notes";
import { loadFeedQuickDashboardMetrics } from "@/features/student-feed/load-feed-quick-dashboard";
import { listFeedUpcomingEvents } from "@/features/student-feed/list-feed-upcoming-events";
import { StudentFeedIpadLabShell } from "@/features/student-feed/ipad-lab/student-feed-ipad-lab-shell";
import { PublicFooter } from "@/features/shell/public-footer";
import { PublicHeader } from "@/features/shell/public-header";
import { PublicStrip } from "@/features/shell/public-strip-react";
import { getPublishedUnivMeet } from "@/features/shell/univmeet-slots";
import "@/features/shell/legacy-header-breakpoints.css";
import {
  resolveStudentExperience,
  studentExperienceAvatarUrl
} from "@/lib/student-experience";

export const dynamic = "force-dynamic";

export default async function StudentFeedIpadPaperPreviewPage() {
  const [state, univMeet] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet()
  ]);
  const signed = state && state.kind !== "anonymous" ? state : null;
  const studentState = state?.kind ?? "anonymous";
  const avatarUrl = signed ? await studentExperienceAvatarUrl(signed) : null;
  const loginHref = `/login?redirect=${encodeURIComponent("/preview/student-feed-ipad-paper")}`;

  const studentId = signed ? signed.subject.id : null;
  const [quickDashboard, notes, upcomingEvents] = await Promise.all([
    loadFeedQuickDashboardMetrics(studentId),
    loadFeedNotesBody(studentId),
    listFeedUpcomingEvents()
  ]);

  return (
    <LegacyPage
      page="preview-student-feed-ipad-paper"
      studentState={studentState}
    >
      <PublicHeader
        loginHref={loginHref}
        avatarUrl={avatarUrl}
        unreadCount={signed ? signed.unreadCount : 0}
        signedIn={Boolean(signed)}
        notifications={signed ? signed.notifications : []}
        univMeet={univMeet}
      />
      <PublicStrip
        univMeet={univMeet}
        signedIn={Boolean(signed)}
        name={signed ? signed.name : "User"}
        loginHref={loginHref}
      />
      <StudentFeedIpadLabShell
        source="paper"
        quickDashboard={quickDashboard}
        notesBody={notes.body}
        upcomingEvents={upcomingEvents}
      />
      <PublicFooter />
    </LegacyPage>
  );
}
