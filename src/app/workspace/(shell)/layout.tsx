import type { ReactNode } from "react";
import { notFound, redirect } from "next/navigation";
import { WorkspaceBodyScrollNav } from "@/components/workspace-body-scroll-nav";
import { WorkspaceChromeFooter } from "@/components/workspace-chrome-footer";
import { WorkspaceHeader } from "@/components/workspace-header";
import { WorkspaceSessionLock } from "@/components/workspace-session-lock";
import { WorkspaceSidebar } from "@/components/workspace-sidebar";
import { getAuthenticatedUser } from "@/lib/auth";
import { operationsRoleLabel } from "@/lib/operations-presentation";
import { resolveStaffChromeAvatarUrl } from "@/lib/operations-staff-avatar";
import { getStaffContext } from "@/lib/staff-auth";
import { operationsRoboto } from "@/lib/operations-font";
import styles from "./workspace-shell.module.css";
import "./workspace-session.css";

export const dynamic = "force-dynamic";

/**
 * Workspace chrome: Ops-like frame — sidebar brand · header over body only.
 * Login stays outside this group at `/workspace/login`.
 * WS-CHROME-FIX QC: brand not in header (matches `/ops` / Studio shell).
 */
export default async function WorkspaceShellLayout({ children }: { children: ReactNode }) {
  const user = await getAuthenticatedUser();
  if (!user) redirect("/workspace/login?redirect=%2Fworkspace");

  const context = await getStaffContext();
  if (!context) notFound();

  const avatarUrl = await resolveStaffChromeAvatarUrl({
    email: context.user.email,
    avatarPath: context.avatarPath
  });

  return (
    <div className={`${styles.shell} ${operationsRoboto.variable}`}>
      <WorkspaceSessionLock />
      <div className={styles.frame}>
        <WorkspaceSidebar />
        <div className={styles.mainColumn}>
          <WorkspaceHeader
            displayName={context.displayName}
            roleLabel={operationsRoleLabel(context.roles)}
            avatarUrl={avatarUrl}
          />
          <WorkspaceBodyScrollNav>
            <div className={styles.body}>{children}</div>
          </WorkspaceBodyScrollNav>
          <WorkspaceChromeFooter />
        </div>
      </div>
    </div>
  );
}
