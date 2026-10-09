import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { assertStaffPreviewWritable } from "@/lib/staff-preview-server";

/**
 * VAS1-WRITE guardrails — prevent reintroducing “preview cookie freezes staff”.
 * Companion: docs/VAS1-WRITE-LOCK.md
 */
describe("VAS1-WRITE contract", () => {
  it("assertStaffPreviewWritable is a no-op (never freezes staff)", async () => {
    await expect(assertStaffPreviewWritable()).resolves.toBeUndefined();
  });

  it("proxy only freezes non-staff mutating APIs when preview cookie is present", () => {
    const source = readFileSync(join(process.cwd(), "src/proxy.ts"), "utf8");
    expect(source).toContain('!request.nextUrl.pathname.startsWith("/api/staff/")');
    expect(source).toContain('!request.nextUrl.pathname.startsWith("/api/auth/")');
    // Must not use the old global freeze that blocked /api/staff/* mutations.
    expect(source).not.toMatch(
      /pathname !== "\/api\/staff\/preview"[\s\S]{0,120}Preview is read-only/
    );
  });

  it("student-access must not deny manage solely for preview cookie", () => {
    const source = readFileSync(join(process.cwd(), "src/lib/student-access.ts"), "utf8");
    expect(source).not.toMatch(/if\s*\(\s*preview\s*&&\s*access\s*===\s*"manage"\s*\)/);
    expect(source).toMatch(/VAS1/);
  });
});
