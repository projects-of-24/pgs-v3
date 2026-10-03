/**
 * Preview QC — #premiumUSMLE lab-2 (Hostinger-free, chrome-first).
 * Header = <PublicHeader/> · Strip = <PublicStrip/> · Body = PremiumUsmle2Shell (empty Gate 0)
 * Footer = <PublicFooter/>. No chrome HTML strings. Owned split from day 1.
 * Old `/preview/purpleusmle` ignored for this rebuild. Live `/purpleusmle` untouched.
 */
import { LegacyPage } from "@/components/legacy-page";
import { PremiumUsmle2Shell } from "@/features/premium-usmle-2/premium-usmle-2-shell";
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

export default async function PurpleUsmle2PreviewPage() {
  const [state, univMeet] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet()
  ]);
  const signed = state && state.kind !== "anonymous" ? state : null;
  const studentState = state?.kind ?? "anonymous";
  const avatarUrl = signed ? await studentExperienceAvatarUrl(signed) : null;
  const loginHref = `/login?redirect=${encodeURIComponent("/preview/purpleusmle-2")}`;

  return (
    <LegacyPage page="preview-purpleusmle-2" studentState={studentState}>
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
      <PremiumUsmle2Shell />
      <PublicFooter />
    </LegacyPage>
  );
}
