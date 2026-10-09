import { notFound, redirect } from "next/navigation";
import { AdminShell } from "@/components/admin-shell";
import { getAuthenticatedUser } from "@/lib/auth";
import { loadOperationsNotificationUnreadCount } from "@/lib/operations-notifications-server";
import { resolveStaffChromeAvatarUrl } from "@/lib/operations-staff-avatar";
import { loadStaffNavGrants } from "@/lib/operations-staff-access-server";
import { getStaffContext } from "@/lib/staff-auth";
import { getStaffPreviewContext } from "@/lib/staff-preview-server";
import "./operations.css";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const user = await getAuthenticatedUser();
  if (!user) redirect("/studio/login?redirect=%2Fops");
  const context = await getStaffContext();
  // Signed-in non-staff (student) on Ops → hard 404; keep session (no Studio bounce/sign-out).
  if (!context) notFound();
  const [preview, notificationUnreadCount, avatarUrl, navGrants] = await Promise.all([
    getStaffPreviewContext(context),
    loadOperationsNotificationUnreadCount(),
    resolveStaffChromeAvatarUrl({
      email: context.user.email,
      avatarPath: context.avatarPath
    }),
    loadStaffNavGrants(context.user.id).catch(() => [] as string[])
  ]);
  return (
    <AdminShell
      displayName={context.displayName}
      avatarUrl={avatarUrl}
      roles={context.roles}
      permissions={[...context.permissions]}
      navGrants={navGrants}
      notificationUnreadCount={notificationUnreadCount}
      preview={preview ? { mode: preview.mode, targetName: preview.targetName, actorName: preview.actorName } : null}
    >
      {children}
    </AdminShell>
  );
}
