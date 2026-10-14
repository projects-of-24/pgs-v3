/**
 * Live cutover helper — usa template copy (forked 2026-10-10).
 * Own folder: `@/features/countries-destination-usa`
 * Content still shared fixtures until per-country content pass.
 */
import { LegacyPage } from "@/components/legacy-page";
import { CountriesDestinationPreviewShell } from "./countries-destination-preview-shell";
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

const PAGE_KEY = "countriesusa";
const COUNTRY = "usa" as const;

export async function composeCountriesDestinationLivePage() {
  const [state, univMeet] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet()
  ]);
  const signed = state && state.kind !== "anonymous" ? state : null;
  const studentState = state?.kind ?? "anonymous";
  const avatarUrl = signed ? await studentExperienceAvatarUrl(signed) : null;
  const loginHref = HEADER_NAV.login.href;

  return (
    <LegacyPage page={PAGE_KEY} studentState={studentState}>
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
      <CountriesDestinationPreviewShell live country={COUNTRY} rail="wide" />
      <PublicFooter />
    </LegacyPage>
  );
}
