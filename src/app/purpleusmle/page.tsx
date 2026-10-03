/**
 * Live `/purpleusmle` — lab-2 cutover (2026-10-03).
 * Same tree as `/preview/purpleusmle-2`: <PublicHeader/> · <PublicStrip/> · PremiumUsmle2Shell · <PublicFooter/>.
 * CSS = owned split (layout.tsx OWNED_SPLIT_ROUTES); no Hostinger style.css / responsive.css,
 * no Hostinger main.js / vendors.min.js, no chrome HTML strings.
 * Typo `/purpleusme` redirects here. CMS storage key stays `purpleusme`.
 * This page owns `src/features/premium-usmle` + lab-2 shell. PLAB and AMC do not import it.
 */
import { LegacyPage } from "@/components/legacy-page";
import { PremiumUsmle2Shell } from "@/features/premium-usmle-2/premium-usmle-2-shell";
import { PublicFooter } from "@/features/shell/public-footer";
import { PublicHeader } from "@/features/shell/public-header";
import { PublicStrip } from "@/features/shell/public-strip-react";
import { getPublishedUnivMeet } from "@/features/shell/univmeet-slots";
import { getUsmleRotationPicksCourses } from "@/features/usmlerotation/get-usmle-rotation-picks-courses";
import "@/features/shell/legacy-header-breakpoints.css";
import { cmsMetadata } from "@/lib/cms-metadata";
import {
  resolveStudentExperience,
  studentExperienceAvatarUrl
} from "@/lib/student-experience";

export async function generateMetadata() {
  return cmsMetadata("purpleusme");
}

export const dynamic = "force-dynamic";

export default async function PurpleUsmlePage() {
  const [state, univMeet, picksCourses] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet(),
    getUsmleRotationPicksCourses()
  ]);
  const signed = state && state.kind !== "anonymous" ? state : null;
  const studentState = state?.kind ?? "anonymous";
  const avatarUrl = signed ? await studentExperienceAvatarUrl(signed) : null;
  const loginHref = `/login?redirect=${encodeURIComponent("/purpleusmle")}`;

  return (
    <LegacyPage page="purpleusmle" studentState={studentState}>
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
      <PremiumUsmle2Shell
        live
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
