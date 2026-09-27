/**
 * Preview QC — public header lab.
 * Default: fake logged-in (lab avatar) so avatar → Logout is QC-able.
 * ?loggedOut=1 → yellow login button.
 */
import type { Viewport } from "next";
import { LegacyPage } from "@/components/legacy-page";
import { HEADER_NAV } from "@/features/shell/header-nav";
import { HeaderPreviewShell } from "@/features/shell/header-preview-shell";
import { PublicHeader } from "@/features/shell/public-header";
import { getPublishedUnivMeet } from "@/features/shell/univmeet-slots";
import "@/features/shell/legacy-header-breakpoints.css";
import {
  resolveStudentExperience,
  studentExperienceAvatarUrl
} from "@/lib/student-experience";
import { PublicFooter } from "@/features/shell/public-footer";
import { PublicStrip } from "@/features/shell/public-strip-react";
import { HELLO_ASPIRANT_DEFAULT_AVATAR } from "@/legacy/pages/hello-aspirant";

export const dynamic = "force-dynamic";

/**
 * H7 (preview only): let the page extend under the notch / Dynamic Island so
 * `env(safe-area-inset-top)` inside `--pgs-safe-top` is non-zero on phones.
 * Promote to the root layout in gate H7-LIVE after owner QC.
 */
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

type HeaderPreviewPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function HeaderPreviewPage({
  searchParams,
}: HeaderPreviewPageProps) {
  const params = (await searchParams) ?? {};
  const loggedOutParam = params.loggedOut;
  const forceLoggedOut =
    loggedOutParam === "1" ||
    (Array.isArray(loggedOutParam) && loggedOutParam[0] === "1");

  const [state, univMeet] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet()
  ]);
  const realLoggedIn = Boolean(state && state.kind !== "anonymous");
  const studentState = forceLoggedOut
    ? "anonymous"
    : realLoggedIn
      ? (state!.kind as
          | "authenticated_standard"
          | "authenticated_premium")
      : "authenticated_standard";

  const helloAvatar =
    state && state.kind !== "anonymous"
      ? await studentExperienceAvatarUrl(state)
      : HELLO_ASPIRANT_DEFAULT_AVATAR;

  const loginHref = forceLoggedOut
    ? "/preview/header"
    : `/login?redirect=${encodeURIComponent("/preview/header")}`;

  const avatarUrl = forceLoggedOut
    ? null
    : realLoggedIn
      ? helloAvatar
      : HEADER_NAV.labAvatarSrc;

  const labFakeAuth = !forceLoggedOut && !realLoggedIn;
  const unreadCount =
    state && state.kind !== "anonymous"
      ? state.unreadCount
      : labFakeAuth
        ? 4
        : 0;

  const sidebarName = state && state.kind !== "anonymous" ? state.name : labFakeAuth ? "Lab User" : "User";

  return (
    <LegacyPage page="preview-header" studentState={studentState}>
      <PublicHeader
        loginHref={loginHref}
        avatarUrl={avatarUrl}
        unreadCount={unreadCount}
        labFakeAuth={labFakeAuth}
        signedIn={studentState !== "anonymous"}
        notifications={
          state && state.kind !== "anonymous" ? state.notifications : []
        }
        univMeet={univMeet}
      />
      {/* S-R: strip row as React — toggle pill · #sidebar · univMeet · search (Hello Aspirant box removed) */}
      <PublicStrip
        univMeet={univMeet}
        signedIn={studentState !== "anonymous"}
        name={sidebarName}
        loginHref={loginHref}
      />
      <HeaderPreviewShell
        studentState={studentState}
        labFakeAuth={labFakeAuth}
      />
      {/* F-R: React footer (same DOM/classes as the string; string footer carried no tokens) */}
      <PublicFooter />
    </LegacyPage>
  );
}
