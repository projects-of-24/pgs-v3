import { describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ getAuthenticatedUser: vi.fn(), getStaffContext: vi.fn() }));

vi.mock("next/font/google", () => ({
  Roboto: () => ({ className: "operations-roboto", variable: "operations-roboto-variable" })
}));

vi.mock("@/lib/auth", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/auth")>();
  return { ...actual, getAuthenticatedUser: mocks.getAuthenticatedUser };
});

vi.mock("@/lib/staff-auth", () => ({
  getStaffContext: mocks.getStaffContext
}));

import LoginPage from "@/app/login/page";
import { OperationsLogin } from "@/components/operations-login";
import { PublicLegacyPage } from "@/components/public-legacy-page";

async function login(params: { redirect?: string; surface?: string }) {
  mocks.getAuthenticatedUser.mockResolvedValue(null);
  mocks.getStaffContext.mockResolvedValue(null);
  return await LoginPage({ searchParams: Promise.resolve(params) });
}

describe("student login surface", () => {
  it("ignores legacy staff surface flags — student form only (Studio door is /studio/login)", async () => {
    const element = await login({ surface: "operations", redirect: "/admin" });
    expect(element.type).toBe(PublicLegacyPage);
    expect(element.props).toMatchObject({ slug: "login" });
  });

  it("ignores surface=studio on student /login", async () => {
    const element = await login({ surface: "studio", redirect: "/ops" });
    expect(element.type).toBe(PublicLegacyPage);
  });

  it("keeps the existing public/student login untouched", async () => {
    const element = await login({ redirect: "/saved" });
    expect(element.type).toBe(PublicLegacyPage);
    expect(element.props).toMatchObject({ slug: "login" });
  });

  it("keeps guardian surface on the shared URL", async () => {
    const element = await login({ surface: "guardian", redirect: "/portal" });
    expect(element.type).toBe(OperationsLogin);
  });
});
