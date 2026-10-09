/**
 * Preview QC — Finance (#purpleFinance) on React chrome (H-R pass 1), same tree as /preview/header:
 * Header = <PublicHeader/> · Strip = <PublicStrip/> · Body = FinancePreviewShell (QC'd, untouched)
 * Footer = <PublicFooter/>. No chrome HTML strings on this route.
 * CSS = owned split from pass 2 (layout.tsx OWNED_SPLIT_ROUTES).
 * Eligibility CTA popup = DEFERRED to popup pass (visual button only).
 */
import { LegacyPage } from "@/components/legacy-page";
import { FinancePreviewShell } from "@/features/finance/finance-preview-shell";
import { getFinancePartnerLogos } from "@/features/finance/get-finance-partner-logos";
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

export default async function FinancePreviewPage() {
  const [state, univMeet, partnerLogos] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet(),
    getFinancePartnerLogos()
  ]);
  const signed = state && state.kind !== "anonymous" ? state : null;
  const studentState = state?.kind ?? "anonymous";
  const avatarUrl = signed ? await studentExperienceAvatarUrl(signed) : null;
  const loginHref = `/login?redirect=${encodeURIComponent("/preview/finance")}`;

  return (
    <LegacyPage page="preview-finance" studentState={studentState}>
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
      <FinancePreviewShell partnerLogos={partnerLogos} />
      <PublicFooter />
    </LegacyPage>
  );
}
