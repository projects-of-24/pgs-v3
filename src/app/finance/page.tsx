/**
 * Live `/finance` — H-R cutover (2026-09-30).
 * Same tree as `/preview/finance`: <PublicHeader/> · <PublicStrip/> · FinancePreviewShell (live) · <PublicFooter/>.
 * CSS = owned split (layout.tsx OWNED_SPLIT_ROUTES); no Hostinger style.css / responsive.css,
 * no Hostinger main.js / vendors.min.js, no chrome HTML strings.
 * Eligibility CTA popup = DEFERRED to popup pass (visual button only).
 */
import { LegacyPage } from "@/components/legacy-page";
import { FinancePreviewShell } from "@/features/finance/finance-preview-shell";
import { getFinancePartnerLogos } from "@/features/finance/get-finance-partner-logos";
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
  return cmsMetadata("finance");
}

export const dynamic = "force-dynamic";

export default async function FinancePage() {
  const [state, univMeet, partnerLogos] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet(),
    getFinancePartnerLogos()
  ]);
  const signed = state && state.kind !== "anonymous" ? state : null;
  const studentState = state?.kind ?? "anonymous";
  const avatarUrl = signed ? await studentExperienceAvatarUrl(signed) : null;
  const loginHref = HEADER_NAV.login.href;

  return (
    <LegacyPage page="finance" studentState={studentState}>
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
      <FinancePreviewShell live partnerLogos={partnerLogos} />
      <PublicFooter />
    </LegacyPage>
  );
}
