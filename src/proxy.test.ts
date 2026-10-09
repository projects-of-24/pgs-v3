import { NextRequest } from "next/server";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ getClaims: vi.fn() }));
vi.mock("@supabase/ssr", () => ({
  createServerClient: () => ({ auth: { getClaims: mocks.getClaims } })
}));

import nextConfig from "../next.config";
import { proxy } from "@/proxy";

function request(path: string) {
  return new NextRequest(new URL(path, "https://preview.example.test"));
}

beforeEach(() => {
  mocks.getClaims.mockResolvedValue({ data: null });
});

describe("canonical Operations product routing", () => {
  it("always keeps the public/student root public", async () => {
    const response = await proxy(request("/"));
    expect(response.headers.get("location")).toBeNull();
  });

  it("lets the merged dashboard alias reach its canonical route redirect", async () => {
    const response = await proxy(request("/dashboard"));
    expect(response.headers.get("location")).toBeNull();
  });

  it("routes unauthenticated Operations requests to Studio login with the exact return URL", async () => {
    const response = await proxy(request("/ops/students?premium=active&mentor=actor-1"));
    const location = new URL(response.headers.get("location")!);
    expect(location.pathname).toBe("/studio/login");
    expect(location.searchParams.get("redirect")).toBe("/ops/students?premium=active&mentor=actor-1");
    expect(location.searchParams.get("surface")).toBe("studio");
  });


  it.each([
    ["/admin", "/ops"],
    ["/admin/students?premium=active", "/ops/students?premium=active"],
    ["/admin/students/student-1", "/ops/students/student-1"],
    ["/admin/work", "/ops/work"],
    ["/admin/staff", "/ops/team"],
    ["/admin/staff/invite", "/ops/team/invite"],
    ["/admin/staff/staff-1", "/ops/team/staff-1"],
    ["/admin/notifications", "/ops/notifications"],
    ["/admin/audit", "/ops/activity"]
  ])("redirects mapped compatibility route %s to %s", async (legacy, canonical) => {
    const response = await proxy(request(legacy));
    expect(response.status).toBe(308);
    const location = new URL(response.headers.get("location")!);
    expect(`${location.pathname}${location.search}`).toBe(canonical);
  });

  it("sends unauthenticated legacy admin catalog to Studio login (not student /login)", async () => {
    const response = await proxy(request("/admin/catalog"));
    const location = new URL(response.headers.get("location")!);
    expect(location.pathname).toBe("/studio/login");
    expect(location.searchParams.get("redirect")).toBe("/admin/catalog");
    expect(location.searchParams.get("surface")).toBe("studio");
  });


  it("keeps student routes on the existing public sign-in surface", async () => {
    const response = await proxy(request("/saved?tab=courses"));
    const location = new URL(response.headers.get("location")!);
    expect(location.pathname).toBe("/login");
    expect(location.searchParams.get("redirect")).toBe("/saved?tab=courses");
    expect(location.searchParams.get("surface")).toBeNull();
  });

  it("VAS1: staff APIs stay writable with preview cookie; student APIs stay read-only", async () => {
    mocks.getClaims.mockResolvedValue({ data: { claims: { sub: "admin" } } });
    const staffMutating = new NextRequest(new URL("/api/staff/assignments", "https://preview.example.test"), {
      method: "POST",
      headers: { cookie: "pgs_staff_preview=forged" }
    });
    const staffAllowed = await proxy(staffMutating);
    expect(staffAllowed.status).not.toBe(403);

    const studentMutating = new NextRequest(new URL("/api/student/profile", "https://preview.example.test"), {
      method: "POST",
      headers: { cookie: "pgs_staff_preview=forged" }
    });
    const blocked = await proxy(studentMutating);
    expect(blocked.status).toBe(403);
    expect(await blocked.json()).toMatchObject({ message: "Preview is read-only. Exit preview to make changes." });

  });

  it("maps canonical Operations URLs to the existing admin implementation", async () => {
    expect(typeof nextConfig.rewrites).toBe("function");
    const rewrites = await nextConfig.rewrites!();
    expect(rewrites).toEqual(
      expect.arrayContaining([
        { source: "/ops", destination: "/admin" },
        { source: "/ops/students/:path*", destination: "/admin/students/:path*" },
        { source: "/ops/work", destination: "/admin/work" },
        { source: "/ops/team", destination: "/admin/staff" },
        { source: "/ops/cms/courses", destination: "/admin/catalog/courses" },
        { source: "/studio/change-password", destination: "/admin/change-password" },
        { source: "/studio/profile", destination: "/admin/profile" }
      ])
    );
  });
});

describe("staff subdomain host map (W1)", () => {
  it("sends anonymous studio root to Studio login", async () => {
    const response = await proxy(new NextRequest("https://studio.purpleguide.study/"));
    const location = new URL(response.headers.get("location")!);
    expect(location.pathname).toBe("/studio/login");
    expect(location.searchParams.get("surface")).toBe("studio");
  });

  it("sends anonymous workspace root to Workspace login", async () => {
    const response = await proxy(new NextRequest("https://workspace.purpleguide.study/"));
    const location = new URL(response.headers.get("location")!);
    expect(location.pathname).toBe("/workspace/login");
    expect(location.searchParams.get("surface")).toBe("workspace");
  });

  it("sends authenticated studio root to Ops", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon";
    mocks.getClaims.mockResolvedValue({ data: { claims: { sub: "staff-1" } } });
    const response = await proxy(new NextRequest("https://studio.purpleguide.study/"));
    const location = new URL(response.headers.get("location")!);
    expect(location.pathname).toBe("/ops");
  });

  it("sends authenticated workspace root to Workspace home", async () => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-anon";
    mocks.getClaims.mockResolvedValue({ data: { claims: { sub: "staff-1" } } });
    const response = await proxy(new NextRequest("https://workspace.purpleguide.study/"));
    const location = new URL(response.headers.get("location")!);
    expect(location.pathname).toBe("/workspace");
  });

  it("does not remap public www root", async () => {
    const response = await proxy(new NextRequest("https://www.purpleguide.study/"));
    expect(response.headers.get("location")).toBeNull();
  });
});

