/**
 * Live student #feed — `/student/dashboard`.
 * Doorman: `resolveStudentExperience()` (sign-in + premium entitlement).
 *
 * Cutover complete (one-by-one):
 * - Step 1: `authenticated_standard` → Family A locked feed
 * - Step 2: `anonymous` → Family A + placebo identity
 * - Step 3: `authenticated_premium` → Family B Premium feed
 * Aesthetic issues = later single pass. CMS/Ops + iPad deferred.
 */
import type { Metadata } from "next";
import { LegacyPage } from "@/components/legacy-page";
import { NoStudentContextPage } from "@/components/no-student-context-page";
import { applyStudentIdentity } from "@/components/recovered-student-legacy-page";
import { loadFeedNotesBody } from "@/features/student-feed/load-feed-notes";
import { loadFeedQuickDashboardMetrics } from "@/features/student-feed/load-feed-quick-dashboard";
import { listFeedUpcomingEvents } from "@/features/student-feed/list-feed-upcoming-events";
import { StudentFeedPremiumShell } from "@/features/student-feed/premium/student-feed-premium-shell";
import { StudentFeedPreviewShell } from "@/features/student-feed/student-feed-preview-shell";
import "@/features/shell/legacy-header-breakpoints.css";
import { applyAuthenticatedShell } from "@/lib/account-shell";
import { applyPremiumBusinessRule } from "@/lib/premium-business-rule";
import { requirePremiumActor } from "@/lib/premium-workspace";
import {
  resolveStudentExperience,
  studentExperienceAvatarUrl,
  type AuthenticatedStudentExperience
} from "@/lib/student-experience";
import {
  applySharedHelloAspirant,
  HELLO_ASPIRANT_DEFAULT_AVATAR
} from "@/legacy/pages/hello-aspirant";
import { countriesUkStripHtml } from "@/legacy/pages/countriesuk";
import { getPublicFooterHtml } from "@/legacy/pages/public-footer";
import { getPublicHeaderHtml } from "@/legacy/pages/public-header";
import { applySharedPublicSidebar } from "@/legacy/pages/public-sidebar";

export const metadata: Metadata = { title: "Student Dashboard" };
export const dynamic = "force-dynamic";

function splitDisplayName(name: string): { firstName: string; lastName: string } {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "Student", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: "" };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

async function AnonymousModularFeed() {
  const studentState = "anonymous" as const;
  const upcomingEvents = await listFeedUpcomingEvents();

  let topHtml = [getPublicHeaderHtml(), countriesUkStripHtml()].join("");
  topHtml = applySharedPublicSidebar(topHtml, studentState, { name: "User" });
  topHtml = applySharedHelloAspirant(topHtml, studentState, {
    name: "Aspirant",
    avatarUrl: HELLO_ASPIRANT_DEFAULT_AVATAR
  });

  let footerHtml = getPublicFooterHtml();
  topHtml = applyPremiumBusinessRule(topHtml);
  footerHtml = applyPremiumBusinessRule(footerHtml);

  return (
    <LegacyPage page="student-dashboard" studentState={studentState}>
      <div dangerouslySetInnerHTML={{ __html: topHtml }} />
      <StudentFeedPreviewShell upcomingEvents={upcomingEvents} anonymous />
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </LegacyPage>
  );
}

async function StandardModularFeed({
  state
}: {
  state: AuthenticatedStudentExperience;
}) {
  const studentState = "authenticated_standard" as const;
  const helloAvatar = await studentExperienceAvatarUrl(state);
  const upcomingEvents = await listFeedUpcomingEvents();

  let topHtml = [getPublicHeaderHtml(), countriesUkStripHtml()].join("");
  topHtml = applySharedPublicSidebar(topHtml, studentState, {
    name: state.name
  });
  topHtml = applySharedHelloAspirant(topHtml, studentState, {
    name: state.name,
    avatarUrl: helloAvatar
  });

  const shellFields = {
    name: state.name,
    unreadCount: state.unreadCount,
    premium: false,
    notifications: state.notifications,
    notificationReadOnly: Boolean(state.preview)
  };
  topHtml = applyAuthenticatedShell(topHtml, shellFields);
  topHtml = applyStudentIdentity(topHtml, state, helloAvatar);

  let footerHtml = getPublicFooterHtml();
  footerHtml = applyAuthenticatedShell(footerHtml, shellFields);

  topHtml = applyPremiumBusinessRule(topHtml);
  footerHtml = applyPremiumBusinessRule(footerHtml);

  return (
    <LegacyPage page="student-dashboard" studentState={studentState}>
      <div dangerouslySetInnerHTML={{ __html: topHtml }} />
      <StudentFeedPreviewShell upcomingEvents={upcomingEvents} />
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </LegacyPage>
  );
}

async function PremiumModularFeed({
  state
}: {
  state: AuthenticatedStudentExperience;
}) {
  await requirePremiumActor();

  const studentState = "authenticated_premium" as const;
  const studentId = state.subject.id;
  const helloAvatar = await studentExperienceAvatarUrl(state);
  const { firstName, lastName } = splitDisplayName(state.name);
  const [quickDashboard, notes, upcomingEvents] = await Promise.all([
    loadFeedQuickDashboardMetrics(studentId),
    loadFeedNotesBody(studentId),
    listFeedUpcomingEvents()
  ]);

  let topHtml = [getPublicHeaderHtml(), countriesUkStripHtml()].join("");
  topHtml = applySharedPublicSidebar(topHtml, studentState, {
    name: state.name
  });
  topHtml = applySharedHelloAspirant(topHtml, studentState, {
    name: state.name,
    avatarUrl: helloAvatar
  });

  const shellFields = {
    name: state.name,
    unreadCount: state.unreadCount,
    premium: true,
    notifications: state.notifications,
    notificationReadOnly: Boolean(state.preview)
  };
  topHtml = applyAuthenticatedShell(topHtml, shellFields);
  topHtml = applyStudentIdentity(topHtml, state, helloAvatar);

  let footerHtml = getPublicFooterHtml();
  footerHtml = applyAuthenticatedShell(footerHtml, shellFields);

  topHtml = applyPremiumBusinessRule(topHtml);
  footerHtml = applyPremiumBusinessRule(footerHtml);

  return (
    <LegacyPage page="student-dashboard" studentState={studentState}>
      <div dangerouslySetInnerHTML={{ __html: topHtml }} />
      <StudentFeedPremiumShell
        quickDashboard={quickDashboard}
        notesBody={notes.body}
        upcomingEvents={upcomingEvents}
        identity={{
          firstName,
          lastName,
          pathway: state.profile.study_level?.trim() || "stem PATHWAY",
          avatarUrl: helloAvatar
        }}
      />
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </LegacyPage>
  );
}

export default async function StudentDashboardPage() {
  const state = await resolveStudentExperience();
  if (!state) return <NoStudentContextPage />;

  if (state.kind === "anonymous") {
    return <AnonymousModularFeed />;
  }

  if (state.kind === "authenticated_standard") {
    return <StandardModularFeed state={state} />;
  }

  return <PremiumModularFeed state={state} />;
}
