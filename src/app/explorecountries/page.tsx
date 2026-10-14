/**
 * Live `/explorecountries` — H-R cutover (2026-10-10).
 * Same tree as `/preview/explorecountries`: <PublicHeader/> · <PublicStrip/> ·
 * ExploreCountriesPreviewShell (live) · <PublicFooter/>.
 * CSS = owned split (layout.tsx OWNED_SPLIT_ROUTES); no Hostinger style.css / responsive.css,
 * no Hostinger main.js / vendors.min.js, no chrome HTML strings.
 * Body QC passed (desk · iPad · phone gap). Legacy HTML kept on disk for rollback; not served.
 */
import { LegacyPage } from "@/components/legacy-page";
import { ExploreCountriesPreviewShell } from "@/features/explore-countries/explore-countries-preview-shell";
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
  return cmsMetadata("explorecountries");
}

export const dynamic = "force-dynamic";

export default async function ExploreCountriesPage() {
  const [state, univMeet] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet()
  ]);
  const signed = state && state.kind !== "anonymous" ? state : null;
  const studentState = state?.kind ?? "anonymous";
  const avatarUrl = signed ? await studentExperienceAvatarUrl(signed) : null;
  const loginHref = HEADER_NAV.login.href;

  return (
    <LegacyPage page="explorecountries" studentState={studentState}>
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
      <ExploreCountriesPreviewShell live />
      <PublicFooter />
    </LegacyPage>
  );
}
