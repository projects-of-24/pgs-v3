import { NextResponse } from "next/server";
import { adminApiError } from "@/lib/admin-api";
import { recordDeniedAuditEvent, recordFailedAuditEvent } from "@/lib/audit";
import { readJsonObject, validUuid } from "@/lib/http";
import { mapStaffAccessError } from "@/lib/operations-staff-access";
import { isUm2NavLeafKey } from "@/lib/operations-user-permissions-tree";
import { requireStaffPermission, StaffAuthorizationError } from "@/lib/staff-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const ROUTE = "/api/admin/staff/nav-grants";

export async function GET(request: Request) {
  let targetUserId: string | undefined;
  let authorized = false;
  try {
    await requireStaffPermission("roles.manage");
    authorized = true;
    const url = new URL(request.url);
    const userId = url.searchParams.get("user_id") ?? "";
    targetUserId = userId || undefined;
    if (!validUuid(userId)) throw new Error("Invalid staff user.");

    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.rpc("staff_nav_grants_list", { target_user: userId });
    if (error) throw new Error(error.message);
    const navKeys = Array.isArray(data)
      ? data.filter((key): key is string => typeof key === "string" && isUm2NavLeafKey(key))
      : [];
    return NextResponse.json({
      ok: true,
      user_id: userId,
      nav_keys: navKeys,
      customized: navKeys.length > 0
    });
  } catch (error) {
    if (error instanceof StaffAuthorizationError) {
      await recordDeniedAuditEvent(request, {
        eventType: "staff.access.denied",
        sourceSubsystem: "staff",
        targetType: "staff_user",
        targetId: targetUserId,
        metadata: {
          permission_required: "roles.manage",
          reason_code: error.status === 401 ? "staff_context_required" : "permission_denied",
          route: ROUTE
        }
      });
    } else if (authorized) {
      await recordFailedAuditEvent(request, {
        eventType: "staff.access.failed",
        sourceSubsystem: "staff",
        targetType: "staff_user",
        targetId: targetUserId,
        metadata: { reason_code: "request_failed", route: ROUTE }
      });
    }
    return adminApiError(error);
  }
}

export async function POST(request: Request) {
  let targetUserId: string | undefined;
  let authorized = false;
  try {
    const context = await requireStaffPermission("roles.manage");
    if (!context.roles.includes("super_admin")) {
      throw new StaffAuthorizationError(403, "Super Admin only.");
    }
    authorized = true;
    const input = await readJsonObject(request);
    const userId = typeof input.user_id === "string" ? input.user_id : "";
    targetUserId = userId || undefined;
    if (!validUuid(userId)) throw new Error("Invalid staff user.");
    if (userId === context.user.id) {
      throw new StaffAuthorizationError(403, mapStaffAccessError("self role changes are forbidden"));
    }

    const rawKeys = Array.isArray(input.nav_keys) ? input.nav_keys : null;
    if (!rawKeys) throw new Error("nav_keys must be an array.");
    const navKeys = [
      ...new Set(
        rawKeys
          .filter((key): key is string => typeof key === "string")
          .filter(isUm2NavLeafKey)
      )
    ];

    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.rpc("manage_staff_nav_grants", {
      target_user: userId,
      target_nav_keys: navKeys
    });
    if (error) {
      const message = error.message || "Unable to save menu grants.";
      if (/staff_nav_grants|PGRST202|does not exist|schema cache|Could not find the function/i.test(message)) {
        throw new Error(
          "Menu grants are not installed on this database yet. Apply migration 20261001183000_um2b_staff_nav_grants.sql, then retry Save Menus."
        );
      }
      if (/forbidden|self role|staff identity/i.test(message)) {
        await recordDeniedAuditEvent(request, {
          eventType: "staff.access.denied",
          sourceSubsystem: "staff",
          targetType: "staff_user",
          targetId: userId,
          metadata: { permission_required: "roles.manage", reason_code: "database_denied", route: ROUTE }
        });
        return adminApiError(new StaffAuthorizationError(403, mapStaffAccessError(message)));
      }
      throw new Error(mapStaffAccessError(message));
    }

    return NextResponse.json({
      ok: true,
      user_id: userId,
      nav_keys: navKeys,
      saved_count: typeof data === "number" ? data : navKeys.length
    });
  } catch (error) {
    if (error instanceof StaffAuthorizationError) {
      await recordDeniedAuditEvent(request, {
        eventType: "staff.access.denied",
        sourceSubsystem: "staff",
        targetType: "staff_user",
        targetId: targetUserId,
        metadata: {
          permission_required: "roles.manage",
          reason_code: error.status === 401 ? "staff_context_required" : "permission_denied",
          route: ROUTE
        }
      });
    } else if (authorized) {
      await recordFailedAuditEvent(request, {
        eventType: "staff.access.failed",
        sourceSubsystem: "staff",
        targetType: "staff_user",
        targetId: targetUserId,
        metadata: { reason_code: "request_failed", route: ROUTE }
      });
    }
    return adminApiError(error);
  }
}
