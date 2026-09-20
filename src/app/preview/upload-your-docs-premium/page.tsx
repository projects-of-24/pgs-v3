/**
 * Premium Upload Your Docs preview — locked chrome + Family B body.
 * W1: Resource List read-only from loadPremiumWorkspace when Premium.
 * Live Hostinger swap later.
 */
import { LegacyPage } from "@/components/legacy-page";
import { applyStudentIdentity } from "@/components/recovered-student-legacy-page";
import { UploadYourDocsPremiumShell } from "@/features/upload-your-docs/upload-your-docs-premium-shell";
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
import { mapRequiredRequirementsToRowsWithViewHrefs } from "@/features/upload-your-docs/attach-view-hrefs";
import {
  loadPremiumWorkspace
} from "@/lib/premium-workspace";
import {
  resolveStudentExperience,
  studentExperienceAvatarUrl,
  studentSubjectId
} from "@/lib/student-experience";

export const dynamic = "force-dynamic";

export default async function UploadYourDocsPremiumPreviewPage() {
  const state = await resolveStudentExperience();
  const studentState =
    state?.kind === "anonymous" || !state ? "authenticated_standard" : state.kind;
  const helloAvatar =
    state && state.kind !== "anonymous"
      ? await studentExperienceAvatarUrl(state)
      : HELLO_ASPIRANT_DEFAULT_AVATAR;

  const studentId =
    state && state.kind !== "anonymous" ? studentSubjectId(state) : null;

  let alertItems: string[] | undefined;
  let liveRows: Awaited<ReturnType<typeof mapRequiredRequirementsToRowsWithViewHrefs>> | undefined;
  if (studentId && state?.kind === "authenticated_premium") {
    try {
      const workspace = await loadPremiumWorkspace(studentId);
      alertItems = workspace.alerts.map((alert) => alert.alert_text);
      liveRows = await mapRequiredRequirementsToRowsWithViewHrefs(workspace.requirements);
    } catch {
      alertItems = [];
      liveRows = [];
    }
  }

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

  const previewPath = "/preview/upload-your-docs-premium";
  topHtml = withPreviewLoginReturn(topHtml, previewPath);
  footerHtml = withPreviewLoginReturn(footerHtml, previewPath);

  return (
    <LegacyPage page="preview-upload-your-docs-premium" studentState="authenticated_premium">
      <div dangerouslySetInnerHTML={{ __html: topHtml }} />
      <UploadYourDocsPremiumShell alertItems={alertItems} liveRows={liveRows} />
      <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
    </LegacyPage>
  );
}
