/**
 * Purple Medical Figma iPad lab — B1 hero + mauve.
 * Figma: pKzGmxz05A72dRJFkJT0d2 · 1352:8063
 * Chrome import · owned split · 85% rail · 15px floor · iPad type = desk type.
 * Does not touch /preview/purplemedical (Paper) or live routes.
 */
import { LegacyPage } from "@/components/legacy-page";
import { PurplemedicalFigmaShell } from "@/features/purplemedical-figma/purplemedical-figma-shell";
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

export default async function PurplemedicalFigmaPreviewPage() {
  const [state, univMeet] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet()
  ]);
  const signed = state && state.kind !== "anonymous" ? state : null;
  const studentState = state?.kind ?? "anonymous";
  const avatarUrl = signed ? await studentExperienceAvatarUrl(signed) : null;
  const loginHref = `/login?redirect=${encodeURIComponent("/preview/purplemedical-figma")}`;

  return (
    <LegacyPage page="preview-purplemedical-figma" studentState={studentState}>
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
      <PurplemedicalFigmaShell />
      <PublicFooter />
    </LegacyPage>
  );
}
