import { beforeEach, describe, expect, it, vi } from "vitest";
import { StaffAuthorizationError } from "@/lib/staff-auth";

const {
  requirePermission,
  rpc,
  from,
  storageUpload,
  storageRemove,
  consumeRateLimit,
  createAdmin
} = vi.hoisted(() => ({
  requirePermission: vi.fn(),
  rpc: vi.fn(),
  from: vi.fn(),
  storageUpload: vi.fn(),
  storageRemove: vi.fn(),
  consumeRateLimit: vi.fn(),
  createAdmin: vi.fn()
}));

vi.mock("@/lib/staff-auth", async () => {
  const actual = await vi.importActual<typeof import("@/lib/staff-auth")>("@/lib/staff-auth");
  return { ...actual, requireStaffPermission: requirePermission };
});
vi.mock("@/lib/supabase/server", () => ({
  createSupabaseServerClient: vi.fn(async () => ({
    from,
    rpc
  }))
}));
vi.mock("@/lib/supabase/admin", () => ({
  createSupabaseAdminClient: createAdmin
}));
vi.mock("@/lib/server-security", () => ({
  consumeRateLimit,
  logServerError: vi.fn()
}));

import { POST as avatarPost } from "@/app/api/admin/avatar/route";

function jpegFile(name = "face.jpg") {
  const bytes = new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x10, 0x4a, 0x46, 0x49, 0x46]);
  return new File([bytes], name, { type: "image/jpeg" });
}

describe("admin staff avatar upload", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    requirePermission.mockResolvedValue({
      user: { id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", email: "staff@pgs.lab" },
      permissions: new Set(["overview.read"])
    });
    consumeRateLimit.mockResolvedValue({ allowed: true, configured: true });
    from.mockReturnValue({
      select: vi.fn().mockReturnValue({
        eq: vi.fn().mockReturnValue({
          maybeSingle: vi.fn().mockResolvedValue({ data: { avatar_path: null }, error: null })
        })
      })
    });
    storageUpload.mockResolvedValue({ error: null });
    storageRemove.mockResolvedValue({ error: null });
    rpc.mockResolvedValue({ error: null });
    createAdmin.mockReturnValue({
      storage: {
        from: vi.fn(() => ({
          upload: storageUpload,
          remove: storageRemove
        }))
      }
    });
  });

  it("rejects non-staff before storage", async () => {
    requirePermission.mockRejectedValue(new StaffAuthorizationError(403, "denied"));
    const request = new Request("http://localhost/api/admin/avatar", { method: "POST" });
    vi.spyOn(request, "formData").mockResolvedValue({
      get: (key: string) => (key === "avatar" ? jpegFile() : null)
    } as FormData);
    const response = await avatarPost(request);
    expect(response.status).toBe(403);
    expect(storageUpload).not.toHaveBeenCalled();
  });

  it("uploads under the staff user folder and updates avatar_path", async () => {
    const request = new Request("http://localhost/api/admin/avatar", { method: "POST" });
    vi.spyOn(request, "formData").mockResolvedValue({
      get: (key: string) => (key === "avatar" ? jpegFile() : null)
    } as FormData);
    const response = await avatarPost(request);
    expect(response.status).toBe(200);
    expect(storageUpload).toHaveBeenCalledOnce();
    const [path] = storageUpload.mock.calls[0];
    expect(path).toMatch(/^aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa\/.+\.jpg$/);
    expect(rpc).toHaveBeenCalledWith("update_staff_avatar_path", {
      target_avatar_path: path
    });
  });

  it("falls back to auth metadata when the avatar RPC is missing", async () => {
    rpc.mockResolvedValue({ error: { message: "Could not find the function" } });
    createAdmin.mockReturnValue({
      storage: {
        from: vi.fn(() => ({
          upload: storageUpload,
          remove: storageRemove
        }))
      },
      auth: {
        admin: {
          getUserById: vi.fn().mockResolvedValue({
            data: { user: { id: "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa", user_metadata: {} } },
            error: null
          }),
          updateUserById: vi.fn().mockResolvedValue({ data: { user: {} }, error: null })
        }
      }
    });

    const request = new Request("http://localhost/api/admin/avatar", { method: "POST" });
    vi.spyOn(request, "formData").mockResolvedValue({
      get: (key: string) => (key === "avatar" ? jpegFile() : null)
    } as FormData);
    const response = await avatarPost(request);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true });
  });
});
