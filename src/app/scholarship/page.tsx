/**
 * Live `/scholarship` — H-R cutover (2026-10-01).
 * Same tree as `/preview/scholarship`: <PublicHeader/> · <PublicStrip/> · ScholarshipPreviewShell (live) · <PublicFooter/>.
 * CSS = owned split (layout.tsx OWNED_SPLIT_ROUTES); no Hostinger style.css / responsive.css,
 * no Hostinger main.js / vendors.min.js, no chrome HTML strings.
 * Login sends the student back to /scholarship after signing in.
 * Book / Find CTAs + pager = DEFERRED to popup pass (visual-only).
 */
import { LegacyPage } from "@/components/legacy-page";
import { ScholarshipPreviewShell } from "@/features/scholarship/scholarship-preview-shell";
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
  return cmsMetadata("scholarship");
}

export const dynamic = "force-dynamic";

export default async function ScholarshipPage() {
  const [state, univMeet] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet()
  ]);
  const signed = state && state.kind !== "anonymous" ? state : null;
  const studentState = state?.kind ?? "anonymous";
  const avatarUrl = signed ? await studentExperienceAvatarUrl(signed) : null;
  const loginHref = `/login?redirect=${encodeURIComponent("/scholarship")}`;

  return (
    <LegacyPage page="scholarship" studentState={studentState}>
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
      <ScholarshipPreviewShell live />
      <PublicFooter />
    </LegacyPage>
  );
}
