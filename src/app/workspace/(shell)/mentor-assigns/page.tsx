import { WorkspaceMentorAssigns } from "@/components/workspace-mentor-assigns";
import { loadMentorAssigns } from "@/features/workspace-mentor-assigns/load-mentor-assigns";
import { requireStaffPermission } from "@/lib/staff-auth";

export const metadata = { title: "Mentor Assigns · PGS Workspace" };
export const dynamic = "force-dynamic";

/**
 * FTP-B7b — Mentor Assigns live editor (shared tips + resources).
 */
export default async function WorkspaceMentorAssignsPage() {
  await requireStaffPermission("overview.read");
  const pack = await loadMentorAssigns();
  return (
    <WorkspaceMentorAssigns
      initialTips={pack.tips}
      initialResources={pack.resources}
      wired={pack.wired}
    />
  );
}
