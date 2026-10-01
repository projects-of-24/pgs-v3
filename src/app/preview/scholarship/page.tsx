/**
 * Preview QC — Scholarship (#purpleScholarships) on React chrome (H-R pass), same tree as /preview/finance:
 * Header = <PublicHeader/> · Strip = <PublicStrip/> · Body = ScholarshipPreviewShell (QC'd, untouched)
 * Footer = <PublicFooter/>. No chrome HTML strings on this route.
 * CSS = still Hostinger until Step 2 (layout.tsx OWNED_SPLIT_ROUTES).
 * Book / Find CTAs + pager = DEFERRED to popup pass (visual only).
 * Live `/scholarship` is untouched until CUTOVER.
 */
import { LegacyPage } from "@/components/legacy-page";
import { ScholarshipPreviewShell } from "@/features/scholarship/scholarship-preview-shell";
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

export default async function ScholarshipPreviewPage() {
  const [state, univMeet] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet()
  ]);
  const signed = state && state.kind !== "anonymous" ? state : null;
  const studentState = state?.kind ?? "anonymous";
  const avatarUrl = signed ? await studentExperienceAvatarUrl(signed) : null;
  const loginHref = `/login?redirect=${encodeURIComponent("/preview/scholarship")}`;

  return (
    <LegacyPage page="preview-scholarship" studentState={studentState}>
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
      <ScholarshipPreviewShell />
      <PublicFooter />
    </LegacyPage>
  );
}
