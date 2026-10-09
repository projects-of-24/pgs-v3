/**
 * Live `/about` — H-R DONE (owner QC passed + LOCKED 2026-09-27).
 * Same tree as `/preview/about`: <PublicHeader/> · <PublicStrip/> · AboutPreviewShell (live) · <PublicFooter/>.
 * CSS = owned split (layout.tsx OWNED_SPLIT_ROUTES); no Hostinger style.css / responsive.css,
 * no Hostinger main.js / vendors.min.js, no chrome HTML strings. Hostinger `aboutHtml` is not served.
 */
import { LegacyPage } from "@/components/legacy-page";
import { AboutPreviewShell } from "@/features/about/about-preview-shell";
import { HEADER_NAV } from "@/features/shell/header-nav";
import { PublicFooter } from "@/features/shell/public-footer";
import { PublicHeader } from "@/features/shell/public-header";
import { PublicStrip } from "@/features/shell/public-strip-react";
import { getPublishedUnivMeet } from "@/features/shell/univmeet-slots";
import "@/features/shell/legacy-header-breakpoints.css";
import { cmsMetadata } from "@/lib/cms-metadata";
import {
  resolveStudentExperience,
  studentExperienceAvatarUrl
} from "@/lib/student-experience";

export async function generateMetadata() {
  return cmsMetadata("about");
}

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  const [state, univMeet] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet()
  ]);
  const signed = state && state.kind !== "anonymous" ? state : null;
  const studentState = state?.kind ?? "anonymous";
  const avatarUrl = signed ? await studentExperienceAvatarUrl(signed) : null;
  const loginHref = HEADER_NAV.login.href;

  return (
    <LegacyPage page="about" studentState={studentState}>
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
      <AboutPreviewShell live />
      <PublicFooter />
    </LegacyPage>
  );
}
