/**
 * Preview QC — Explore Countries on React chrome (H-R pass 1), same tree as /preview/header:
 * Header = <PublicHeader/> · Strip = <PublicStrip/> · Body = ExploreCountriesPreviewShell (QC'd, untouched)
 * Footer = <PublicFooter/>. No chrome HTML strings on this route.
 * OWNED_SPLIT = next gate (HR-explore-2). Live `/explorecountries` untouched until cutover.
 */
import { LegacyPage } from "@/components/legacy-page";
import { ExploreCountriesPreviewShell } from "@/features/explore-countries/explore-countries-preview-shell";
import { PublicFooter } from "@/features/shell/public-footer";
import { PublicHeader } from "@/features/shell/public-header";
import { PublicStrip } from "@/features/shell/public-strip-react";
import { getPublishedUnivMeet } from "@/features/shell/univmeet-slots";
import "@/features/shell/legacy-header-breakpoints.css";
import {
  resolveStudentExperience,
  studentExperienceAvatarUrl
} from "@/lib/student-experience";

export const dynamic = "force-dynamic";

export default async function ExploreCountriesPreviewPage() {
  const [state, univMeet] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet()
  ]);
  const signed = state && state.kind !== "anonymous" ? state : null;
  const studentState = state?.kind ?? "anonymous";
  const avatarUrl = signed ? await studentExperienceAvatarUrl(signed) : null;
  const loginHref = `/login?redirect=${encodeURIComponent("/preview/explorecountries")}`;

  return (
    <LegacyPage page="preview-explorecountries" studentState={studentState}>
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
      <ExploreCountriesPreviewShell />
      <PublicFooter />
    </LegacyPage>
  );
}
