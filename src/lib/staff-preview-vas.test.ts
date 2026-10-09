import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({
  from: vi.fn(),
  getStaffContext: vi.fn()
}));

vi.mock("server-only", () => ({}));
vi.mock("next/headers", () => ({ cookies: vi.fn(async () => ({ get: () => undefined, set: () => undefined })) }));
vi.mock("next/navigation", () => ({ redirect: vi.fn() }));
vi.mock("@/lib/supabase/admin", () => ({ createSupabaseAdminClient: vi.fn() }));
vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: async () => ({ from: mocks.from })
}));
vi.mock("@/lib/staff-auth", async () => {
  const actual = await vi.importActual<typeof import("@/lib/staff-auth")>("@/lib/staff-auth");
  return { ...actual, getStaffContext: mocks.getStaffContext };
});

import {
  canPreviewStudentTarget,
  canStartMentorPreview,
  canUseStaffPreview
} from "@/lib/staff-preview-server";
import type { StaffContext } from "@/lib/staff-auth";

function staff(partial: Partial<StaffContext> & Pick<StaffContext, "roles" | "permissions">): StaffContext {
  return {
    user: { id: "mentor-1" } as StaffContext["user"],
    displayName: "Mentor",
    status: "active",
    avatarPath: null,
    ...partial
  };
}

describe("FEED-VAS View as Student scope", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("allows mentors and Admin/SA to use student preview capability", () => {
    expect(
      canUseStaffPreview(staff({ roles: ["mentor"], permissions: new Set(["student_workspace.read"]) }))
    ).toBe(true);
    expect(canUseStaffPreview(staff({ roles: ["admin"], permissions: new Set() }))).toBe(true);
    expect(canUseStaffPreview(staff({ roles: ["super_admin"], permissions: new Set() }))).toBe(true);
    expect(canUseStaffPreview(staff({ roles: ["read_only_staff"], permissions: new Set() }))).toBe(false);
  });

  it("keeps View as Mentor Admin/SA only", () => {
    expect(canStartMentorPreview(staff({ roles: ["mentor"], permissions: new Set() }))).toBe(false);
    expect(canStartMentorPreview(staff({ roles: ["admin"], permissions: new Set() }))).toBe(true);
  });

  it("allows mentors only for active assigned students", async () => {
    mocks.from.mockImplementation((table: string) => {
      if (table === "profiles") {
        return {
          select: () => ({
            eq: () => ({
              maybeSingle: async () => ({ data: { id: "student-1" } })
            })
          })
        };
      }
      if (table === "mentor_assignments") {
        return {
          select: () => ({
            eq: () => ({
              eq: () => ({
                eq: () => ({
                  maybeSingle: async () => ({ data: { id: "asg-1", status: "active" } })
                })
              })
            })
          })
        };
      }
      throw new Error(`unexpected table ${table}`);
    });

    await expect(
      canPreviewStudentTarget(
        staff({
          roles: ["mentor"],
          permissions: new Set(["student_workspace.read"]),
          user: { id: "mentor-1" } as StaffContext["user"]
        }),
        "student-1"
      )
    ).resolves.toBe("ok");
  });

  it("denies mentors for unassigned students", async () => {
    mocks.from.mockImplementation((table: string) => {
      if (table === "profiles") {
        return {
          select: () => ({
            eq: () => ({
              maybeSingle: async () => ({ data: { id: "student-2" } })
            })
          })
        };
      }
      return {
        select: () => ({
          eq: () => ({
            eq: () => ({
              eq: () => ({
                maybeSingle: async () => ({ data: null })
              })
            })
          })
        })
      };
    });

    await expect(
      canPreviewStudentTarget(
        staff({
          roles: ["mentor"],
          permissions: new Set(["student_workspace.read"]),
          user: { id: "mentor-1" } as StaffContext["user"]
        }),
        "student-2"
      )
    ).resolves.toBe("out_of_scope");
  });
});
