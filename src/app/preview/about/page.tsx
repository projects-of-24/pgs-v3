/**
 * Preview QC — About Us on React chrome (H-R pass 1 + 2), same tree as /preview/header:
 * Header = <PublicHeader/> · Strip = <PublicStrip/> · Body = AboutPreviewShell (QC'd, untouched)
 * Footer = <PublicFooter/> · CSS = owned split (layout.tsx OWNED_SPLIT_ROUTES).
 * No chrome HTML strings on this route.
 */
import { LegacyPage } from "@/components/legacy-page";
import { AboutPreviewShell } from "@/features/about/about-preview-shell";
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

export default async function AboutPreviewPage() {
  const [state, univMeet] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet()
  ]);
  const signed = state && state.kind !== "anonymous" ? state : null;
  const studentState = state?.kind ?? "anonymous";
  const avatarUrl = signed ? await studentExperienceAvatarUrl(signed) : null;
  const loginHref = `/login?redirect=${encodeURIComponent("/preview/about")}`;

  return (
    <LegacyPage page="preview-about" studentState={studentState}>
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
      <AboutPreviewShell />
      <PublicFooter />
    </LegacyPage>
  );
}
