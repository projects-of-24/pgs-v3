import { readFileSync } from "node:fs";
import { describe, expect, it, vi } from "vitest";
vi.mock("server-only", () => ({}));
vi.mock("next/navigation", () => ({ redirect: vi.fn(), notFound: vi.fn() }));
vi.mock("@/lib/staff-preview-server", () => ({
  getStaffPreviewContext: vi.fn(),
  loadPreviewStudentEntitlements: vi.fn(),
  loadPreviewStudentNotifications: vi.fn(),
  loadPreviewStudentProfile: vi.fn()
}));
vi.mock("@/lib/supabase/server", () => ({ createSupabaseServerClient: vi.fn() }));
vi.mock("@/lib/actor-context", () => ({ resolveActorContext: vi.fn() }));
import { classifyStudentExperience } from "@/lib/student-experience";

const dashboardAlias = readFileSync("src/app/dashboard/page.tsx", "utf8");
const feed = readFileSync("src/app/student/dashboard/page.tsx", "utf8");
const progress = readFileSync("src/app/feed_track_progress/page.tsx", "utf8");
const documents = readFileSync("src/app/upload_your_doc/page.tsx", "utf8");
const home = readFileSync("src/app/page.tsx", "utf8");

describe("PRE-OPS05 student frontend state mapping is still the page contract", () => {
  it("keeps #feed doorman: Family A for anon/standard, Family B for Premium", () => {
    expect(feed).toContain("StudentFeedPreviewShell");
    expect(feed).toContain("StudentFeedPremiumShell");
    expect(feed).toContain('if (state.kind === "anonymous")');
    expect(feed).toContain('if (state.kind === "authenticated_standard")');
    expect(feed).toContain("await requirePremiumActor()");
    expect(feed).toContain("listFeedUpcomingEvents");
    expect(feed).not.toContain("studentDashboardHtml");
    expect(feed).not.toContain("DeveloperStudentShell");
    expect(feed).not.toContain("PremiumStudentDashboard");
    expect(feed).not.toContain("loadPremiumWorkspaceForSubject");
  });

  it("keeps /dashboard as a merged compatibility alias", () => {
    expect(dashboardAlias).toContain('redirect("/student/dashboard")');
    expect(dashboardAlias).not.toContain("loadPremiumWorkspace");
  });

  it("keeps Track Your Progress doorman: Family A for anon/standard, Family B for Premium", () => {
    expect(progress).toContain("FeedTrackProgressPreviewShell");
    expect(progress).toContain("FeedTrackProgressPremiumShell");
    expect(progress).toContain('if (state.kind === "anonymous")');
    expect(progress).toContain('if (state.kind === "authenticated_standard")');
    expect(progress).toContain("await requirePremiumActor()");
    expect(progress).not.toContain("progressLockedHtml");
    expect(progress).not.toContain("PremiumProgressBoard");
    expect(progress).not.toContain("loadPremiumWorkspaceForSubject");
  });

  it("keeps Upload Your Docs doorman: Family A for anon/standard, Family B for Premium", () => {
    expect(documents).toContain("UploadYourDocsPreviewShell");
    expect(documents).toContain("UploadYourDocsPremiumShell");
    expect(documents).toContain('if (state.kind === "anonymous")');
    expect(documents).toContain('if (state.kind === "authenticated_standard")');
    expect(documents).toContain("await requirePremiumActor()");
    expect(documents).toContain("loadPremiumWorkspace(studentId)");
    expect(documents).toContain("mapRequiredRequirementsToRowsWithViewHrefs");
    expect(documents).not.toContain("documentsLockedHtml");
    expect(documents).not.toContain("DocumentWorkspace");
    expect(documents).not.toContain("loadPremiumWorkspaceForSubject");
  });

  it("keeps Home selecting home / home-standard / home-premium from kind only", () => {
    expect(home).toContain("homeSourceHtml(state.kind)");
    expect(home).not.toContain("loadPremiumWorkspaceForSubject");
  });

  it("maps the three student states the same way pages consume them", () => {
    expect(classifyStudentExperience(false, false, "none")).toBe("anonymous");
    expect(classifyStudentExperience(true, true, "none")).toBe("authenticated_standard");
    expect(classifyStudentExperience(true, true, "active")).toBe("authenticated_premium");
  });
});
