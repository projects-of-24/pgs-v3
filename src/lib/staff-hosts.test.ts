import { describe, expect, it } from "vitest";
import {
  authCookieDomain,
  normalizeHostname,
  resolveStaffHost,
  staffHostRootPath
} from "@/lib/staff-hosts";

describe("staff-hosts", () => {
  it("maps production staff subdomains", () => {
    expect(resolveStaffHost("studio.purpleguide.study")).toBe("studio");
    expect(resolveStaffHost("workspace.purpleguide.study")).toBe("workspace");
    expect(resolveStaffHost("Studio.Purpleguide.Study:443")).toBe("studio");
  });

  it("leaves public and preview hosts unmapped", () => {
    expect(resolveStaffHost("www.purpleguide.study")).toBeNull();
    expect(resolveStaffHost("purpleguide.study")).toBeNull();
    expect(resolveStaffHost("pgs-v3-eternity.vercel.app")).toBeNull();
    expect(resolveStaffHost("localhost")).toBeNull();
  });

  it("shares Auth cookies only under purpleguide.study", () => {
    expect(authCookieDomain("studio.purpleguide.study")).toBe(".purpleguide.study");
    expect(authCookieDomain("www.purpleguide.study")).toBe(".purpleguide.study");
    expect(authCookieDomain("localhost")).toBeUndefined();
    expect(authCookieDomain("pgs-v3-eternity.vercel.app")).toBeUndefined();
  });

  it("picks staff root doors", () => {
    expect(staffHostRootPath("studio", false)).toBe("/studio/login");
    expect(staffHostRootPath("studio", true)).toBe("/ops");
    expect(staffHostRootPath("workspace", false)).toBe("/workspace/login");
    expect(staffHostRootPath("workspace", true)).toBe("/workspace");
  });

  it("normalizes host:port", () => {
    expect(normalizeHostname(" workspace.purpleguide.study:443 ")).toBe("workspace.purpleguide.study");
  });
});
