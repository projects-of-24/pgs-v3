/**
 * Preview QC — Family A locked Upload Your Docs (anon / standard).
 * Locked chrome. Body = purified modular React (no Hostinger page CSS).
 * Bands: desktop >1366 · mobile ≤600 · iPad deferred.
 */
import { LegacyPage } from "@/components/legacy-page";
import { applyStudentIdentity } from "@/components/recovered-student-legacy-page";
import { UploadYourDocsPreviewShell } from "@/features/upload-your-docs/upload-your-docs-preview-shell";
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
  studentExperienceAvatarUrl
} from "@/lib/student-experience";

export const dynamic = "force-dynamic";

export default async function UploadYourDocsPreviewPage() {
  const state = await resolveStudentExperience();
  const studentState = state?.kind ?? "anonymous";
  const helloAvatar =
    state && state.kind !== "anonymous"
      ? await studentExperienceAvatarUrl(state)
      : HELLO_ASPIRANT_DEFAULT_AVATAR;

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
      premium: false,
      notifications: state.notifications,
      notificationReadOnly: Boolean(state.preview)
    };
    topHtml = applyAuthenticatedShell(topHtml, shellFields);
    topHtml = applyStudentIdentity(topHtml, state, helloAvatar);
    footerHtml = applyAuthenticatedShell(footerHtml, shellFields);
  }

  topHtml = applyPremiumBusinessRule(topHtml);
  footerHtml = applyPremiumBusinessRule(footerHtml);

  const previewPath = "/preview/upload-your-docs";
  topHtml = withPreviewLoginReturn(topHtml, previewPath);
  footerHtml = withPreviewLoginReturn(footerHtml, previewPath);

  return (
    <LegacyPage page="preview-upload-your-docs" studentState={studentState}>
      <div dangerouslySetInnerHTML={{ __html: topHtml }} />
      <UploadYourDocsPreviewShell />
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </LegacyPage>
  );
}
