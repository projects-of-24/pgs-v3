/**
 * Live Track Your Progress — `/feed_track_progress`.
 * Doorman: `resolveStudentExperience()` (sign-in + premium entitlement).
 *
 * Hostinger-free cutover (B-live):
 * - anonymous + authenticated_standard → Family A (same structure)
 * - authenticated_premium → Family B (separate structure)
 * No shared page + toggle · no ?premium= · do not mix CMS shapes later.
 */
import type { Metadata } from "next";
import { LegacyPage } from "@/components/legacy-page";
import { NoStudentContextPage } from "@/components/no-student-context-page";
import { applyStudentIdentity } from "@/components/recovered-student-legacy-page";
import { FeedTrackProgressPremiumShell } from "@/features/feed-track-progress/feed-track-progress-premium-shell";
import { FeedTrackProgressPreviewShell } from "@/features/feed-track-progress/feed-track-progress-preview-shell";
import { loadProgressAlerts } from "@/features/feed-track-progress/load-progress-alerts";
import "@/features/shell/legacy-header-breakpoints.css";
import { applyAuthenticatedShell } from "@/lib/account-shell";
import { applyPremiumBusinessRule } from "@/lib/premium-business-rule";
import { requirePremiumActor } from "@/lib/premium-workspace";
import {
  resolveStudentExperience,
  studentExperienceAvatarUrl,
  studentSubjectId,
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

export const metadata: Metadata = { title: "Track Your Progress" };
export const dynamic = "force-dynamic";

async function AnonymousFamilyA() {
  const studentState = "anonymous" as const;

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
    <LegacyPage page="progress" studentState={studentState}>
      <div dangerouslySetInnerHTML={{ __html: topHtml }} />
      <FeedTrackProgressPreviewShell />
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </LegacyPage>
  );
}

async function StandardFamilyA({
  state
}: {
  state: AuthenticatedStudentExperience;
}) {
  const studentState = "authenticated_standard" as const;
  const helloAvatar = await studentExperienceAvatarUrl(state);

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
    <LegacyPage page="progress" studentState={studentState}>
      <div dangerouslySetInnerHTML={{ __html: topHtml }} />
      <FeedTrackProgressPreviewShell />
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </LegacyPage>
  );
}

async function PremiumFamilyB({
  state
}: {
  state: AuthenticatedStudentExperience;
}) {
  await requirePremiumActor();

  const studentState = "authenticated_premium" as const;
  const helloAvatar = await studentExperienceAvatarUrl(state);
  const { items: alertItems } = await loadProgressAlerts(studentSubjectId(state));

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
    <LegacyPage page="progress" studentState={studentState}>
      <div dangerouslySetInnerHTML={{ __html: topHtml }} />
      <FeedTrackProgressPremiumShell alertItems={alertItems} />
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </LegacyPage>
  );
}

export default async function ProgressPage() {
  const state = await resolveStudentExperience();
  if (!state) return <NoStudentContextPage />;

  if (state.kind === "anonymous") {
    return <AnonymousFamilyA />;
  }

  if (state.kind === "authenticated_standard") {
    return <StandardFamilyA state={state} />;
  }

  return <PremiumFamilyB state={state} />;
}
