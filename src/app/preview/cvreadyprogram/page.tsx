/**
 * Preview QC — CV Ready Program on React chrome (H-R pass 1), same tree as /preview/header:
 * Header = <PublicHeader/> · Strip = <PublicStrip/> · Body = CvreadyProgramPreviewShell (QC'd)
 * Footer = <PublicFooter/>. No chrome HTML strings on this route.
 * CSS = Hostinger until HR-cvready-2 (OWNED_SPLIT). Live `/cvreadyprogram` untouched.
 * Owner: desk + phone QC with DS next; iPad pass later.
 */
import { LegacyPage } from "@/components/legacy-page";
import { CvreadyProgramPreviewShell } from "@/features/cvready-program/cvready-program-preview-shell";
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

export default async function CvreadyProgramPreviewPage() {
  const [state, univMeet] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet()
  ]);
  const signed = state && state.kind !== "anonymous" ? state : null;
  const studentState = state?.kind ?? "anonymous";
  const avatarUrl = signed ? await studentExperienceAvatarUrl(signed) : null;
  const loginHref = `/login?redirect=${encodeURIComponent("/preview/cvreadyprogram")}`;

  return (
    <LegacyPage page="preview-cvreadyprogram" studentState={studentState}>
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
      <CvreadyProgramPreviewShell />
      <PublicFooter />
    </LegacyPage>
  );
}
