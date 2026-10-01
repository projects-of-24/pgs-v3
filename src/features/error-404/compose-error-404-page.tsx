/**
 * Compose Error 404 under locked modular chrome.
 * Hostinger `error404Html` is not served after cutover.
 */
import { LegacyPage } from "@/components/legacy-page";
import { ContentPreviewBanner } from "@/components/content-preview-banner";
import { StaffPreviewBanner } from "@/components/staff-preview-banner";
import { applyStudentIdentity } from "@/components/recovered-student-legacy-page";
import { Error404PreviewShell } from "@/features/error-404/error-404-preview-shell";
import { HEADER_NAV } from "@/features/shell/header-nav";
import { PublicFooter } from "@/features/shell/public-footer";
import { PublicHeader } from "@/features/shell/public-header";
import { PublicStrip } from "@/features/shell/public-strip-react";
import {
  applyUnivMeetToHeaderHtml,
  buildPublicStripHtml
} from "@/features/shell/public-strip";
import { getPublishedUnivMeet } from "@/features/shell/univmeet-slots";
import "@/features/shell/legacy-header-breakpoints.css";
import { applyAuthenticatedShell } from "@/lib/account-shell";
import { resolveActorContext } from "@/lib/actor-context";
import { applyPremiumBusinessRule } from "@/lib/premium-business-rule";
import { withPreviewLoginReturn } from "@/lib/preview-login-return";
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

export type ComposeError404Options = {
  /** Live cutover — `data-cutover=LIVE`. */
  live?: boolean;
  /** LegacyPage `page` attribute. */
  page: string;
  /** Preview lab path for login return. */
  previewPath?: string;
  /**
   * When student experience is absent but a staff/auth user is signed in
   * (Next.js `not-found` boundary), still decorate chrome like Hostinger did.
   */
  authenticatedActorFallback?: boolean;
  /**
   * H-R: mount <PublicHeader/> · <PublicStrip/> · body · <PublicFooter/>, no chrome strings.
   * Used by /preview/error-404, live /error_404 and src/app/global-not-found.tsx (unknown addresses).
   * `src/app/not-found.tsx` (staff/parent record-missing 404s) still uses the string chrome path.
   */
  reactChrome?: boolean;
};

export async function composeError404Page({
  live = false,
  page,
  previewPath,
  authenticatedActorFallback = false,
  reactChrome = false
}: ComposeError404Options) {
  const [state, univMeet] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet()
  ]);
  const studentState = state?.kind ?? "anonymous";
  const helloAvatar =
    state && state.kind !== "anonymous"
      ? await studentExperienceAvatarUrl(state)
      : HELLO_ASPIRANT_DEFAULT_AVATAR;

  if (reactChrome) {
    const signed = state && state.kind !== "anonymous" ? state : null;
    const avatarUrl = signed ? await studentExperienceAvatarUrl(signed) : null;
    const loginHref = previewPath
      ? `/login?redirect=${encodeURIComponent(previewPath)}`
      : HEADER_NAV.login.href;
    return (
      <>
        <ContentPreviewBanner />
        {signed && signed.preview ? (
          <StaffPreviewBanner
            actorName={signed.preview.actorName}
            mode="student"
            targetName={signed.preview.targetName}
          />
        ) : null}
        <LegacyPage page={page} studentState={studentState}>
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
          <Error404PreviewShell live={live} />
          <PublicFooter />
        </LegacyPage>
      </>
    );
  }

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
  } else if (!state && authenticatedActorFallback) {
    const actor = await resolveActorContext();
    if (actor.authenticated) {
      const operationsHref = actor.staff ? "/ops" : "/";
      const shellFields = {
        name: actor.staff?.displayName || actor.user.email || "Signed-in account",
        unreadCount: 0,
        accountHref: operationsHref,
        profileHref: operationsHref,
        savedHref: actor.staff ? "/ops/students" : "/"
      };
      topHtml = applyAuthenticatedShell(topHtml, shellFields);
      footerHtml = applyAuthenticatedShell(footerHtml, shellFields);
    }
  }

  topHtml = applyPremiumBusinessRule(topHtml);
  footerHtml = applyPremiumBusinessRule(footerHtml);

  if (previewPath) {
    topHtml = withPreviewLoginReturn(topHtml, previewPath);
    footerHtml = withPreviewLoginReturn(footerHtml, previewPath);
  }

  return (
    <>
      <ContentPreviewBanner />
      {state && state.kind !== "anonymous" && state.preview ? (
        <StaffPreviewBanner
          actorName={state.preview.actorName}
          mode="student"
          targetName={state.preview.targetName}
        />
      ) : null}
      <LegacyPage page={page} studentState={studentState}>
        <div dangerouslySetInnerHTML={{ __html: topHtml }} />
        <Error404PreviewShell live={live} />
        <div dangerouslySetInnerHTML={{ __html: footerHtml }} />
      </LegacyPage>
    </>
  );
}
