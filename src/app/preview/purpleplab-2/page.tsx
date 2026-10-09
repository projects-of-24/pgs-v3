/**
 * Preview QC — #premiumPLAB lab-2 (Hostinger-free, chrome-first).
 * Same tree as USMLE lab-2: <PublicHeader/> · <PublicStrip/> · PremiumPlab2Shell · <PublicFooter/>.
 * Gate 2a (2026-10-03). Live `/purpleplab` = same tree (Gate 2b 2026-10-03).
 */
import { LegacyPage } from "@/components/legacy-page";
import { PremiumPlab2Shell } from "@/features/premium-plab-2/premium-plab-2-shell";
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

export default async function PurplePlab2PreviewPage() {
  const [state, univMeet, picksCourses] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet(),
    getUsmleRotationPicksCourses()
  ]);
  const signed = state && state.kind !== "anonymous" ? state : null;
  const studentState = state?.kind ?? "anonymous";
  const avatarUrl = signed ? await studentExperienceAvatarUrl(signed) : null;
  const loginHref = `/login?redirect=${encodeURIComponent("/preview/purpleplab-2")}`;

  return (
    <LegacyPage page="preview-purpleplab-2" studentState={studentState}>
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
      <PremiumPlab2Shell
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
