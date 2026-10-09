/**
 * Preview QC — #premiumUSMLE on React chrome (H-R pass, step 1), same tree as /preview/scholarship:
 * Header = <PublicHeader/> · Strip = <PublicStrip/> · Body = PremiumUsmlePreviewShell (QC'd, untouched)
 * Footer = <PublicFooter/>. No chrome HTML strings on this route.
 * CSS = still Hostinger until step 2 (layout.tsx OWNED_SPLIT_ROUTES).
 * Dropped with the strings (same as About/Finance): Hello Aspirant box, notificationReadOnly,
 * business-rule wording rewrite. Live `/purpleusmle` is untouched until CUTOVER.
 */
import { LegacyPage } from "@/components/legacy-page";
import { PremiumUsmlePreviewShell } from "@/features/premium-usmle/premium-usmle-preview-shell";
import { PublicFooter } from "@/features/shell/public-footer";
import { PublicHeader } from "@/features/shell/public-header";
import { PublicStrip } from "@/features/shell/public-strip-react";
import { getPublishedUnivMeet } from "@/features/shell/univmeet-slots";
import { getUsmleRotationPicksCourses } from "@/features/usmlerotation/get-usmle-rotation-picks-courses";
import "@/features/shell/legacy-header-breakpoints.css";
import {
  resolveStudentExperience,
  studentExperienceAvatarUrl
} from "@/lib/student-experience";

export const dynamic = "force-dynamic";

export default async function PurpleUsmlePreviewPage() {
  const [state, univMeet, picksCourses] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet(),
    getUsmleRotationPicksCourses()
  ]);
  const signed = state && state.kind !== "anonymous" ? state : null;
  const studentState = state?.kind ?? "anonymous";
  const avatarUrl = signed ? await studentExperienceAvatarUrl(signed) : null;
  const loginHref = `/login?redirect=${encodeURIComponent("/preview/purpleusmle")}`;

  return (
    <LegacyPage page="preview-purpleusmle" studentState={studentState}>
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
      <PremiumUsmlePreviewShell
        picks={picksCourses.map((row) => ({
          id: row.card.id,
          href: row.card.href,
          cta: row.card.cta,
          blurb: row.card.blurbDesktop,
          blurbMobile: row.card.blurbMobile,
          imageSrc: row.card.imageSrc,
          imageAlt: row.card.imageAlt
        }))}
      />
      <PublicFooter />
    </LegacyPage>
  );
}
