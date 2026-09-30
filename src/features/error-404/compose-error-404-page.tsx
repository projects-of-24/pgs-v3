/**
 * Compose Error 404 — H-R step 1 (HR-404-1, 2026-09-27): React chrome, same tree as /preview/header:
 * <PublicHeader/> · <PublicStrip/> · Error404PreviewShell (QC'd body, untouched) · <PublicFooter/>.
 * No chrome HTML strings / dangerouslySetInnerHTML. One composer for all three surfaces:
 * /preview/error-404 (lab), /error_404 (live) and src/app/not-found.tsx (any unknown URL).
 * Hostinger `error404Html` is not served after cutover.
 */
import { LegacyPage } from "@/components/legacy-page";
import { ContentPreviewBanner } from "@/components/content-preview-banner";
import { StaffPreviewBanner } from "@/components/staff-preview-banner";
import { Error404PreviewShell } from "@/features/error-404/error-404-preview-shell";
import { HEADER_NAV } from "@/features/shell/header-nav";
import { PublicFooter } from "@/features/shell/public-footer";
import { PublicHeader } from "@/features/shell/public-header";
import { PublicStrip } from "@/features/shell/public-strip-react";
import { getPublishedUnivMeet } from "@/features/shell/univmeet-slots";
import "@/features/shell/legacy-header-breakpoints.css";
import {
  resolveStudentExperience,
  studentExperienceAvatarUrl
} from "@/lib/student-experience";

export type ComposeError404Options = {
  /** Live cutover — `data-cutover=LIVE`. */
  live?: boolean;
  /** LegacyPage `page` attribute. */
  page: string;
  /** Preview lab path for login return. */
  previewPath?: string;
  /**
   * Kept for the not-found call site. Owner decision (HR-404-1, 2026-09-27): a signed-in
   * staff/auth user without student state gets the logged-out React chrome on a 404
   * (no /ops account links — React chrome has no accountHref/profileHref props).
   */
  authenticatedActorFallback?: boolean;
};

export async function composeError404Page({ live = false, page, previewPath }: ComposeError404Options) {
  const [state, univMeet] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet()
  ]);
  const signed = state && state.kind !== "anonymous" ? state : null;
  const studentState = state?.kind ?? "anonymous";
  const avatarUrl = signed ? await studentExperienceAvatarUrl(signed) : null;
  const loginHref = previewPath?.startsWith("/preview/")
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
