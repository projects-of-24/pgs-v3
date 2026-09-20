/**
 * Live `/purpleplab` — own Photoshop file at `src/features/premium-plab`.
 * Does not import the USMLE folder. Hostinger `purplePlabHtml` is not served.
 */
import { LegacyPage } from "@/components/legacy-page";
import { applyStudentIdentity } from "@/components/recovered-student-legacy-page";
import { PremiumPlabPreviewShell } from "@/features/premium-plab/premium-plab-preview-shell";
import { getUsmleRotationPicksCourses } from "@/features/usmlerotation/get-usmle-rotation-picks-courses";
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
  return cmsMetadata("purpleplab");
}

export const dynamic = "force-dynamic";

export default async function PurplePlabPage() {
  const [state, univMeet, picksCourses] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet(),
    getUsmleRotationPicksCourses()
  ]);
  const studentState = state?.kind ?? "anonymous";
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
    <LegacyPage page="purpleplab" studentState={studentState}>
      <div dangerouslySetInnerHTML={{ __html: topHtml }} />
      <PremiumPlabPreviewShell
        live
        picks={picksCourses.map((row) => ({
          id: row.card.id,
          href: row.card.href,
          cta: row.card.cta,
          blurb: row.card.blurbDesktop,
          blurbMobile: row.card.blurbMobile,
          imageSrc: row.card.imageSrc,
          imageAlt: row.card.imageAlt
        }))}
      />
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </LegacyPage>
  );
}
