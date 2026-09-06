/**
 * Live `/usmlerotation` — purified modular body (cutover from Hostinger HTML).
 * Same shell as `/preview/usmlerotation-body`. Chrome aesthetic pass deferred.
 */
import { LegacyPage } from "@/components/legacy-page";
import { applyStudentIdentity } from "@/components/recovered-student-legacy-page";
import { getUsmleRotationExploreCourses } from "@/features/usmlerotation/get-usmle-rotation-courses";
import { getUsmleRotationPicksCourses } from "@/features/usmlerotation/get-usmle-rotation-picks-courses";
import { UsmleRotationPreviewShell } from "@/features/usmlerotation/usmle-rotation-preview-shell";
import {
  applyUnivMeetToHeaderHtml,
  buildPublicStripHtml
} from "@/features/shell/public-strip";
import { getPublishedUnivMeet } from "@/features/shell/univmeet-slots";
import "@/features/shell/legacy-header-breakpoints.css";
import { applyAuthenticatedShell } from "@/lib/account-shell";
import { cmsMetadata } from "@/lib/cms-metadata";
import { applyPremiumBusinessRule } from "@/lib/premium-business-rule";
import {
  resolveStudentExperience,
  studentExperienceAvatarUrl
} from "@/lib/student-experience";
import {
  applySharedHelloAspirant,
  HELLO_ASPIRANT_DEFAULT_AVATAR
} from "@/legacy/pages/hello-aspirant";
import { getPublicFooterHtml } from "@/legacy/pages/public-footer";
import { getPublicHeaderHtml } from "@/legacy/pages/public-header";
import { applySharedPublicSidebar } from "@/legacy/pages/public-sidebar";

export async function generateMetadata() {
  return cmsMetadata("usmlerotation");
}

export const dynamic = "force-dynamic";

export default async function UsmleRotationPage() {
  const [state, univMeet, courses, picksCourses] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet(),
    getUsmleRotationExploreCourses(),
    getUsmleRotationPicksCourses()
  ]);
  const studentState = state?.kind ?? "anonymous";
  const isLoggedIn = Boolean(state && state.kind !== "anonymous");
  const helloAvatar =
    state && state.kind !== "anonymous"
      ? await studentExperienceAvatarUrl(state)
      : HELLO_ASPIRANT_DEFAULT_AVATAR;

  let topHtml = [
    applyUnivMeetToHeaderHtml(getPublicHeaderHtml(), univMeet),
    buildPublicStripHtml(univMeet)
  ].join("");
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
      premium: state.kind === "authenticated_premium",
      notifications: state.notifications,
      notificationReadOnly: Boolean(state.preview)
    };
    topHtml = applyAuthenticatedShell(topHtml, shellFields);
    topHtml = applyStudentIdentity(topHtml, state, helloAvatar);
    footerHtml = applyAuthenticatedShell(footerHtml, shellFields);
  }

  topHtml = applyPremiumBusinessRule(topHtml);
  footerHtml = applyPremiumBusinessRule(footerHtml);

  return (
    <LegacyPage page="usmlerotation" studentState={studentState}>
      <div dangerouslySetInnerHTML={{ __html: topHtml }} />
      <UsmleRotationPreviewShell
        courses={courses}
        picksCourses={picksCourses}
        isLoggedIn={isLoggedIn}
        live
      />
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </LegacyPage>
  );
}
