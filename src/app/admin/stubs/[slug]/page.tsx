import { notFound } from "next/navigation";
import { OpsStubPage } from "@/components/ops-stub-page";
import { requireStaffPermission, type StaffPermission } from "@/lib/staff-auth";

const STUBS: Record<
  string,
  {
    title: string;
    permission: StaffPermission;
    connectLater: string;
    superAdminOnly?: boolean;
  }
> = {
  "admin-panel": {
    title: "Admin Panel",
    permission: "overview.read",
    connectLater: "SA admin hub (user management, permissions, org settings) — Track B / BE-S3",
    superAdminOnly: true
  },
  permissions: {
    title: "Permissions",
    permission: "overview.read",
    connectLater: "Roles & permissions product UI (not Premium /admin/access) — BE-S4 / Track R",
    superAdminOnly: true
  },
  webinar: {
    title: "Webinar",
    permission: "catalog.read",
    connectLater: "CMS webinar creating flow (Payload / catalog events specialization) — BE-S2"
  },
  "overall-comments": {
    title: "Overall Comments",
    permission: "overview.read",
    connectLater: "Cross-student comment inbox (WS-COMMENTS) — mentor/admin reply + staff notes"
  },
  loopboard: {
    title: "Loopboard",
    permission: "overview.read",
    connectLater: "Global Journey Map / Loopboard kanban (WS-LOOP) — student_tasks columns"
  }
};

export default async function OpsStubRoutePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stub = STUBS[slug];
  if (!stub) notFound();

  const context = await requireStaffPermission(stub.permission);
  if (stub.superAdminOnly && !context.roles.includes("super_admin")) {
    notFound();
  }

  return (
    <OpsStubPage
      stubId={slug}
      title={stub.title}
      connectLater={stub.connectLater}
    />
  );
}
