import "server-only";

import { getStaffContext, StaffAuthorizationError, type StaffContext } from "@/lib/staff-auth";

/** Staff who may edit shared Tips / Resource Drop (Mentor Assigns). */
export async function requireMentorAssignsEditor(): Promise<StaffContext> {
  const context = await getStaffContext();
  if (!context) {
    throw new StaffAuthorizationError(401, "Please sign in with an active staff account.");
  }
  const allowed =
    context.permissions.has("student_workspace.manage") ||
    context.permissions.has("student_workspace.manage_all") ||
    context.permissions.has("overview.read") ||
    context.roles.includes("mentor") ||
    context.roles.includes("admin") ||
    context.roles.includes("super_admin");
  if (!allowed) {
    throw new StaffAuthorizationError(403, "You do not have permission to edit Mentor Assigns.");
  }
  return context;
}
