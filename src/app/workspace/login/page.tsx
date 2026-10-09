import { notFound, redirect } from "next/navigation";
import { StudioLogin } from "@/components/studio-login";
import { getAuthenticatedUser } from "@/lib/auth";
import { getStaffContext } from "@/lib/staff-auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "PGS Workspace sign in",
  description: "Mentor-Student Workspace sign in for Super Admin, Admin, Mentor, and Staff."
};

/**
 * WS-LOGIN-1 + WS-LOGIN-UI — staff-only workspace door.
 * Centered ChatGPT mock card · lands on empty /workspace (never Ops).
 */
export default async function WorkspaceLoginPage({
  searchParams
}: {
  searchParams: Promise<{ redirect?: string; error?: string }>;
}) {
  const params = await searchParams;
  const user = await getAuthenticatedUser();

  if (user) {
    const staff = await getStaffContext();
    if (staff) redirect("/workspace");
    // Student (or non-staff) session on Workspace door → hard 404; keep session.
    notFound();
  }

  const initialMessage =
    params.error === "staff_required"
      ? "Sign in with an active staff Workspace account."
      : "";

  return (
    <StudioLogin
      redirectPath="/workspace"
      initialMessage={initialMessage}
      surface="workspace"
      formTitle="Sign in to PGS Workspace"
      formLead="Use your staff account. Access is granted in User Management."
      brandTitle="Mentor-Student Workspace"
      brandLead="Manage students, assignments, progress and content in one place."
      footerLabel="PGS Workspace"
    />
  );
}
