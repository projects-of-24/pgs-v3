import { describe, expect, it } from "vitest";
import { authErrorMessage, isStaffDoorPath, safeNext, safeStudentNext } from "@/lib/auth";

describe("student auth safety helpers", () => {
  it("preserves internal redirects", () => {
    expect(safeNext("/saved?tab=courses")).toBe("/saved?tab=courses");
  });
  it.each(["https://evil.test", "//evil.test", "/ok\r\nLocation: evil", "/\\evil.test"])("rejects unsafe redirect %s", (value) => {
    expect(safeNext(value)).toBe("/student/dashboard");
  });
  it.each([
    "/ops",
    "/ops/students",
    "/admin",
    "/admin/catalog",
    "/cms",
    "/mentor",
    "/mentor/access",
    "/studio/login",
    "/workspace/login",
    "/workspace",
    "/sanity"
  ])("safeStudentNext blocks staff door %s", (value) => {
    expect(isStaffDoorPath(value)).toBe(true);
    expect(safeStudentNext(value)).toBe("/student/dashboard");
  });
  it("safeStudentNext keeps student destinations", () => {
    expect(safeStudentNext("/saved?tab=courses")).toBe("/saved?tab=courses");
    expect(safeStudentNext("/feed_track_progress")).toBe("/feed_track_progress");
  });
  it("does not expose provider errors for wrong passwords", () => {
    expect(authErrorMessage("Invalid login credentials")).toBe("Invalid email or password.");
  });
});

