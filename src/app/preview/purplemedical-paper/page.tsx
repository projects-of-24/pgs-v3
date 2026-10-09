/**
 * Purple Medical — Paper body attach lab (2VH-0 JSX as attached).
 * Chrome import only · owned split · 85% rail · 15px floor.
 * Does not touch live routes or prior figma/module labs.
 */
import { LegacyPage } from "@/components/legacy-page";
import { PurplemedicalPaperShell } from "@/features/purplemedical-paper/purplemedical-paper-shell";
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

export default async function PurplemedicalPaperPreviewPage() {
  const [state, univMeet] = await Promise.all([
    resolveStudentExperience(),
    getPublishedUnivMeet()
  ]);
  const signed = state && state.kind !== "anonymous" ? state : null;
  const studentState = state?.kind ?? "anonymous";
  const avatarUrl = signed ? await studentExperienceAvatarUrl(signed) : null;
  const loginHref = `/login?redirect=${encodeURIComponent("/preview/purplemedical-paper")}`;

  return (
    <LegacyPage page="preview-purplemedical-paper" studentState={studentState}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Roboto:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Roboto+Mono:wght@300;400&display=swap"
      />
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
      <PurplemedicalPaperShell />
      <PublicFooter />
    </LegacyPage>
  );
}
