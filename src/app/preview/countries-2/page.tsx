/**
 * Preview QC — Country destination lab.
 * ≤1366: modular wide iPad rails (Figma `27:2999`) — iPad LOCKED.
 * >1366: About method — QC’d `/countriesuk` React body + owned CSS (1:1).
 * Header = <PublicHeader/> · Strip = <PublicStrip/> · Footer = <PublicFooter/>.
 * CSS = owned-split + UK feature CSS (layout.tsx OWNED_SPLIT_ROUTES).
 */
import { LegacyPage } from "@/components/legacy-page";
import { CountriesDestinationPreviewShell } from "@/features/countries-destination-usa/countries-destination-preview-shell";
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

export default async function CountriesDestinationWidePreviewPage() {
  const [state, univMeet] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet()
  ]);
  const signed = state && state.kind !== "anonymous" ? state : null;
  const studentState = state?.kind ?? "anonymous";
  const avatarUrl = signed ? await studentExperienceAvatarUrl(signed) : null;
  const loginHref = `/login?redirect=${encodeURIComponent("/preview/countries-2")}`;

  return (
    <LegacyPage page="preview-countries-2" studentState={studentState}>
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
      <CountriesDestinationPreviewShell country="usa" rail="wide" />
      <PublicFooter />
    </LegacyPage>
  );
}
