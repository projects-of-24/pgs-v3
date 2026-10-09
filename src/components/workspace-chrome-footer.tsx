"use client";

import { usePathname } from "next/navigation";
import { WorkspaceFooter } from "@/components/workspace-footer";

/**
 * Owner QC — branded footer only on Workspace Dashboard (`/workspace`).
 * Hidden on Students, Desk, Profile, Loopboard, etc.
 */
export function WorkspaceChromeFooter() {
  const pathname = usePathname() || "";
  if (pathname === "/workspace" || pathname === "/workspace/") {
    return <WorkspaceFooter />;
  }
  return null;
}
