import { WorkspaceOverallComments } from "@/components/workspace-overall-comments";
import { loadOverallCommentsInbox } from "@/features/workspace-overall-comments/load-overall-comments";

export const metadata = { title: "Overall Comments · PGS Workspace" };
export const dynamic = "force-dynamic";

/**
 * WS-OC-2 — live Overall Comments table from `workspace_comments`.
 * No reply here — Desk Comments owns write/reply.
 */
export default async function WorkspaceOverallCommentsPage() {
  const inbox = await loadOverallCommentsInbox();
  return <WorkspaceOverallComments rows={inbox.rows} scope={inbox.scope} />;
}
