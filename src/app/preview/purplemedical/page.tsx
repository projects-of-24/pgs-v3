/**
 * Purple Medical non yolo — Paper-first iPad preview lab.
 * Skill: pgs-ipad-paper-pass. Body from Paper 2VH-0 — not desk/phone modules.
 * Chrome: React import. CSS: owned split. Serve :7100.
 */
import { LegacyPage } from "@/components/legacy-page";
import { PurplemedicalIpadShell } from "@/features/purplemedical-ipad/purplemedical-ipad-shell";
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

export default async function PurplemedicalIpadPreviewPage() {
  const [state, univMeet] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet()
  ]);
  const signed = state && state.kind !== "anonymous" ? state : null;
  const studentState = state?.kind ?? "anonymous";
  const avatarUrl = signed ? await studentExperienceAvatarUrl(signed) : null;
  const loginHref = `/login?redirect=${encodeURIComponent("/preview/purplemedical")}`;

  return (
    <LegacyPage page="preview-purplemedical" studentState={studentState}>
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
      <PurplemedicalIpadShell source="paper" />
      <PublicFooter />
    </LegacyPage>
  );
}
