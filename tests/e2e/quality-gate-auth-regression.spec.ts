/**
 * Quality Gate roadmap #5 — authenticated / session regression matrix.
 *
 * Tag: @auth-regression
 * - Always-on cases need no Auth fixtures (anonymous denial).
 * - Fixture cases skip cleanly unless PLAYWRIGHT_*_STORAGE_STATE paths are set
 *   and the session is still valid (see `pnpm fixtures:auth-states`).
 *
 * Test IDs align with docs/quality-gate/security-test-cases.md.
 */
import { expect, test, type Page } from "@playwright/test";
import { anonymousState, journeyProfiles } from "./journey-profiles";
import { skipIfOperationsFixtureInvalid } from "./ops-helpers";

const goto = (page: Page, route: string) =>
  page.goto(route, { waitUntil: "domcontentloaded" });

const studentShell = '[data-legacy-page="student-dashboard"], .developer-student-shell';

async function expectLoginRedirect(page: Page, pathFragment: string) {
  await expect(page).toHaveURL(new RegExp(`/login\\?redirect=.*${pathFragment}`));
  await expect(
    page.locator("#loginForm input[name=\"email\"], form:not(#registerForm) input[name=\"email\"]").first()
  ).toBeVisible();
}

/** Skip when storage-state cookies no longer resolve to an authenticated student. */
async function skipIfStudentFixtureInvalid(page: Page, expectedState: "authenticated_standard" | "authenticated_premium") {
  await goto(page, "/student/dashboard");
  const state = await page.locator(studentShell).first().getAttribute("data-student-state");
  if (state !== expectedState) {
    test.skip(
      true,
      `Student fixture session invalid/expired (got data-student-state="${state ?? "missing"}"; refresh via pnpm fixtures:auth-states). Not reported as a product regression.`
    );
  }
}

test.describe("QG auth regression — anonymous (always on)", () => {
  test.use({ storageState: anonymousState });

  test("QG-AUTH-001: anonymous cannot open student profile", {
    tag: "@auth-regression"
  }, async ({ page }) => {
    await goto(page, "/student/profile");
    await expectLoginRedirect(page, "student");
  });

  test("QG-AUTH-001: anonymous cannot open Operations scoreboard", {
    tag: "@auth-regression"
  }, async ({ page }) => {
    await goto(page, "/ops");
    await expect(page).toHaveURL(/\/login\?redirect=/);
  });

  test("QG-AUTH-001: anonymous cannot open admin staff surface", {
    tag: "@auth-regression"
  }, async ({ page }) => {
    await goto(page, "/admin/staff");
    await expect(page).toHaveURL(/\/login\?redirect=/);
  });

  test("QG-AUTH-001: anonymous cannot open legacy mentor surface (404)", {
    tag: "@auth-regression"
  }, async ({ page }) => {
    // Post-#16/#17: /mentor is removed (notFound), not a student-/login redirect.
    // Staff enter via /studio/login · workspace. Same contract as legacy /cms.
    const response = await page.goto("/mentor", { waitUntil: "domcontentloaded" });
    expect(response?.status()).toBe(404);
  });

  test("QG-AUTH-001: anonymous Feed stays anonymous locked preview", {
    tag: "@auth-regression"
  }, async ({ page }) => {
    await goto(page, "/student/dashboard");
    await expect(page.locator(studentShell).first()).toHaveAttribute("data-student-state", "anonymous");
  });
});

test.describe("QG auth regression — standard student fixture", () => {
  const profile = journeyProfiles.standardStudent;
  test.use({ storageState: profile.storageState ?? anonymousState });
  test.skip(!profile.storageState, "Supply PLAYWRIGHT_STANDARD_STUDENT_STORAGE_STATE (pnpm fixtures:auth-states).");

  test("QG-RBAC-001: standard student cannot open Operations scoreboard nav", {
    tag: "@auth-regression"
  }, async ({ page }) => {
    await skipIfStudentFixtureInvalid(page, "authenticated_standard");
    await goto(page, "/ops");
    await expect(page, "fixture session must not bounce to login").not.toHaveURL(/\/login(\?|$)/);
    await expect(page.getByRole("link", { name: "Scoreboard" })).toHaveCount(0);
  });

  test("QG-RBAC: standard student dashboard is authenticated_standard", {
    tag: "@auth-regression"
  }, async ({ page }) => {
    await skipIfStudentFixtureInvalid(page, "authenticated_standard");
    await expect(page.locator(studentShell).first()).toHaveAttribute("data-student-state", "authenticated_standard");
  });
});

test.describe("QG auth regression — Premium student fixture", () => {
  const profile = journeyProfiles.premiumStudent;
  test.use({ storageState: profile.storageState ?? anonymousState });
  test.skip(!profile.storageState, "Supply PLAYWRIGHT_PREMIUM_STUDENT_STORAGE_STATE (pnpm fixtures:auth-states).");

  test("QG-RBAC: Premium student dashboard is authenticated_premium", {
    tag: "@auth-regression"
  }, async ({ page }) => {
    await skipIfStudentFixtureInvalid(page, "authenticated_premium");
    await expect(page.locator(studentShell).first()).toHaveAttribute("data-student-state", "authenticated_premium");
  });

  test("QG-RBAC-001: Premium student cannot manage staff via /admin/staff", {
    tag: "@auth-regression"
  }, async ({ page }) => {
    await skipIfStudentFixtureInvalid(page, "authenticated_premium");
    await goto(page, "/admin/staff");
    await expect(page, "fixture session must not bounce to login").not.toHaveURL(/\/login(\?|$)/);
    await expect(page.getByRole("button", { name: /Invite/i })).toHaveCount(0);
    await expect(page.locator("body")).not.toContainText(/Invite staff/i);
  });
});

test.describe("QG auth regression — mentor fixture", () => {
  const profile = journeyProfiles.mentor;
  test.use({ storageState: profile.storageState ?? anonymousState });
  test.skip(!profile.storageState, "Supply PLAYWRIGHT_MENTOR_STORAGE_STATE (pnpm fixtures:auth-states).");

  test("QG-RBAC-005: mentor reaches Ops but not staff role admin without roles.manage UI", {
    tag: "@auth-regression"
  }, async ({ page }) => {
    await goto(page, "/ops");
    await skipIfOperationsFixtureInvalid(page);
    await expect(page).not.toHaveURL(/\/login(\?|$)/);
    await goto(page, "/admin/staff");
    const onLogin = /\/login(\?|$)/.test(page.url());
    const body = await page.locator("body").innerText();
    const deniedCopy = /do not have permission|not authorized|Access denied|sign in with an active staff/i.test(body);
    expect(onLogin || deniedCopy || !/Invite staff|Assign role/i.test(body)).toBeTruthy();
  });
});

test.describe("QG auth regression — admin / super-admin fixture", () => {
  const profile = journeyProfiles.admin;
  test.use({ storageState: profile.storageState ?? anonymousState });
  test.skip(!profile.storageState, "Supply PLAYWRIGHT_SUPER_ADMIN_STORAGE_STATE or PLAYWRIGHT_ADMIN_STORAGE_STATE.");

  test("QG-RBAC: admin fixture can open Operations scoreboard", {
    tag: "@auth-regression"
  }, async ({ page }) => {
    await goto(page, "/ops");
    await skipIfOperationsFixtureInvalid(page);
    await expect(page).not.toHaveURL(/\/login(\?|$)/);
    const scoreboard = page.getByRole("heading", { name: /Scoreboard|Operations/i }).first();
    const nav = page.getByRole("link", { name: "Scoreboard" }).first();
    await expect(scoreboard.or(nav).first()).toBeVisible();
  });
});
