import type { Metadata } from "next";
import { AskPurpleGuide } from "@/components/ask-purple-guide";
import { DeveloperStudentShell } from "@/components/developer-student-shell";
import { NoStudentContextPage } from "@/components/no-student-context-page";
import { PremiumStudentDashboard } from "@/components/premium-student-dashboard";
import { RetainedStudentFooter } from "@/components/retained-student-footer";
import { displayName, getOwnAvatarUrl } from "@/lib/student-data";
import { loadPremiumDashboardCatalog, loadPremiumWorkspace, requirePremiumActor } from "@/lib/premium-workspace";
import { resolveStudentExperience } from "@/lib/student-experience";

export const metadata: Metadata = { title: "Student Dashboard" };
export const dynamic = "force-dynamic";

const FEED_FIGMA_NODE = {
  anonymous: "18375:10685",
  authenticated_standard: "17961:10662",
  authenticated_premium: "17041:10191"
} as const;

function feedLocation(profile: {
  preferred_study_country: string | null;
  citizenship_country: string | null;
}): string | null {
  const parts = [profile.preferred_study_country, profile.citizenship_country]
    .map((value) => value?.trim())
    .filter((value): value is string => Boolean(value));
  return parts.length ? parts.join(" · ") : null;
}

export default async function StudentDashboardPage() {
  const state = await resolveStudentExperience();
  if (!state) return <NoStudentContextPage />;

  const catalog = await loadPremiumDashboardCatalog();
  const locked = state.kind !== "authenticated_premium";
  const figmaNode = FEED_FIGMA_NODE[state.kind];

  if (state.kind === "anonymous") {
    return (
      <>
        <DeveloperStudentShell
          name="Aspirant"
          avatarUrl="/assets/img/default-avatar.png"
          stateKind={state.kind}
          unreadCount={state.unreadCount}
          notifications={state.notifications}
          active="feed"
          contentClassName="developer-premium-dashboard"
          feedLayout
          legacyPage="student-dashboard"
        >
          <PremiumStudentDashboard
            avatarUrl="/assets/img/default-avatar.png"
            catalog={catalog}
            dashboard={null}
            email=""
            figmaNode={figmaNode}
            locked
            name="Aspirant"
            pathway={null}
            readOnly
            workspace={null}
          />
        </DeveloperStudentShell>
        <RetainedStudentFooter studentState={state.kind} />
      </>
    );
  }

  const { user, profile } = state;
  const avatarUrl = await getOwnAvatarUrl(profile.avatar_path);
  const name = displayName(profile, user);
  let workspace = null;
  if (state.kind === "authenticated_premium") {
    await requirePremiumActor();
    workspace = await loadPremiumWorkspace(user.id);
  }

  return (
    <>
      <DeveloperStudentShell
        name={name}
        email={user.email ?? ""}
        avatarUrl={avatarUrl}
        stateKind={state.kind}
        unreadCount={state.unreadCount}
        notifications={state.notifications}
        active="feed"
        preview={state.preview}
        contentClassName="developer-premium-dashboard"
        feedLayout
        legacyPage="student-dashboard"
        urgentAlert={workspace?.alerts[0]?.alert_text}
      >
        {locked ? null : <AskPurpleGuide />}
        <PremiumStudentDashboard
          avatarUrl={avatarUrl}
          catalog={catalog}
          dashboard={workspace?.premiumProfile ?? null}
          email={user.email ?? ""}
          figmaNode={figmaNode}
          location={feedLocation(profile)}
          locked={locked}
          name={name}
          pathway={profile.study_level}
          readOnly={Boolean(state.preview) || locked}
          workspace={workspace}
        />
      </DeveloperStudentShell>
      <RetainedStudentFooter studentState={state.kind} />
    </>
  );
}
