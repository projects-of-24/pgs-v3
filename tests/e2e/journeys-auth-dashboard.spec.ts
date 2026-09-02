import { expect, test } from "@playwright/test";
import { skipIfOperationsFixtureInvalid } from "./ops-helpers";
import { anonymousState, journeyProfiles } from "./journey-profiles";

const goto = (page: import("@playwright/test").Page, route: string) =>
  page.goto(route, { waitUntil: "domcontentloaded" });

const loginForm = "#loginForm";
const registerForm = "#registerForm";

/**
 * Cross-profile journey smoke (@smoke).
 * Run on Chromium + Firefox + WebKit via `pnpm test:e2e:smoke`.
 * Does not create live Auth accounts — signup coverage is UI-only.
 */
test.describe("Journey — anonymous signup and login UI", () => {
  test.use({ storageState: anonymousState });

  test("signup panel exposes register fields without creating an account", {
    tag: "@smoke"
  }, async ({ page }) => {
    await goto(page, "/login");
    await expect(page.locator(`${loginForm} input[name="email"]`)).toBeVisible();
    await page.getByRole("button", { name: "Sign up", exact: true }).click();
    await expect(page.locator(registerForm)).toBeVisible();
    await expect(page.locator(`${registerForm} input[name="email"]`)).toBeVisible();
    await expect(page.locator(`${registerForm} input[name="password"]`)).toBeVisible();
    await expect(page.locator(`${registerForm} input[name="confirm_password"]`)).toBeVisible();
    await expect(page.getByRole("button", { name: /Create #PGS Account/i })).toBeVisible();
    await expect(page).toHaveURL(/\/login/);
  });

  test("email-only login stays on login without authenticating", {
    tag: "@smoke"
  }, async ({ page }) => {
    await goto(page, "/login");
    await page.locator(`${loginForm} input[name="email"]`).fill("test@example.com");
    await page.getByRole("button", { name: /Access your #PGS account/i }).click();
    await expect(page).toHaveURL(/\/login/);
    // Chromium/Firefox often surface the custom status; WebKit may keep native required validation.
    const status = page.locator(`${loginForm} [role="status"]`);
    const password = page.locator(`${loginForm} input[name="password"]`);
    const statusVisible = await status.isVisible().catch(() => false);
    if (statusVisible) {
      await expect(status).toContainText(/required fields/i);
    } else {
      await expect(password).toBeFocused();
      await expect.poll(async () => password.evaluate((el: HTMLInputElement) => el.validationMessage)).not.toEqual("");
    }
  });

  test("anonymous profile gate redirects to login with redirect param", {
    tag: "@smoke"
  }, async ({ page }) => {
    await goto(page, "/student/profile");
    await expect(page).toHaveURL(/\/login\?redirect=%2Fstudent%2Fprofile/);
    await expect(page.locator(`${loginForm} input[name="email"]`)).toBeVisible();
  });

  test("anonymous dashboard remains a locked Feed preview", {
    tag: "@smoke"
  }, async ({ page }) => {
    await goto(page, "/student/dashboard");
    await expect(page).toHaveURL(/\/student\/dashboard$/);
    await expect(
      page.locator('[data-legacy-page="student-dashboard"], .developer-student-shell').first()
    ).toHaveAttribute("data-student-state", "anonymous");
  });
});

test.describe("Journey — standard-student dashboard navigation", () => {
  const profile = journeyProfiles.standardStudent;
  test.use({ storageState: profile.storageState ?? anonymousState });
  test.skip(!profile.storageState, `Supply PLAYWRIGHT_STANDARD_STUDENT_STORAGE_STATE for ${profile.label}.`);

  test("standard student opens dashboard then Profile", {
    tag: "@smoke"
  }, async ({ page }) => {
    await goto(page, "/student/dashboard");
    await expect(page).toHaveURL(/\/student\/dashboard$/);
    await expect(
      page.locator('[data-legacy-page="student-dashboard"], .developer-student-shell').first()
    ).toHaveAttribute("data-student-state", "authenticated_standard");

    // Prefer direct authenticated navigation — sidebar toggle visibility differs by engine/viewport.
    await goto(page, "/student/profile");
    await expect(page).toHaveURL(/\/student\/profile/);
    await expect(page).not.toHaveURL(/\/login/);
  });

  test("standard student Saved List stays authenticated", {
    tag: "@smoke"
  }, async ({ page }) => {
    await goto(page, "/student/dashboard");
    await goto(page, "/saved");
    await expect(page).toHaveURL(/\/saved/);
    await expect(page).not.toHaveURL(/\/login/);
  });
});

test.describe("Journey — premium-student dashboard navigation", () => {
  const profile = journeyProfiles.premiumStudent;
  test.use({ storageState: profile.storageState ?? anonymousState });
  test.skip(!profile.storageState, `Supply PLAYWRIGHT_PREMIUM_STUDENT_STORAGE_STATE for ${profile.label}.`);

  test("premium student dashboard exposes Where You Stand", {
    tag: "@smoke"
  }, async ({ page }) => {
    await goto(page, "/student/dashboard");
    await expect(page).toHaveURL(/\/student\/dashboard$/);
    const shell = page.locator(".developer-student-shell, [data-legacy-page=\"student-dashboard\"]").first();
    await expect(shell).toBeVisible();
    const state = await shell.getAttribute("data-student-state");
    // Prefer Premium truth; tolerate authenticated shell if entitlement attribute is on a nested node.
    if (state && state !== "authenticated_premium") {
      await expect(page.locator('[data-student-state="authenticated_premium"]').first()).toBeVisible();
    }
    await expect(page.getByRole("heading", { name: "Where You Stand", exact: true })).toBeVisible();
  });

  test("premium student can open progress surface", {
    tag: "@smoke"
  }, async ({ page }) => {
    await goto(page, "/feed_track_progress");
    await expect(page).not.toHaveURL(/\/login/);
    await expect(
      page.locator('[data-legacy-page="progress"], .developer-progress-page, .premium-kanban').first()
    ).toBeVisible();
  });
});

test.describe("Journey — mentor ops smoke", () => {
  const profile = journeyProfiles.mentor;
  test.use({ storageState: profile.storageState ?? anonymousState });
  test.skip(!profile.storageState, `Supply PLAYWRIGHT_MENTOR_STORAGE_STATE for ${profile.label}.`);

  test("mentor reaches Operations scoreboard or truthful fallback", {
    tag: "@smoke"
  }, async ({ page }) => {
    await goto(page, "/ops");
    await skipIfOperationsFixtureInvalid(page);
    await expect(
      page.getByRole("heading", { name: /Scoreboard/i }).or(
        page.getByRole("link", { name: "Scoreboard" })
      ).or(
        page.getByRole("button", { name: "Open operations navigation" })
      ).first()
    ).toBeVisible();
  });
});

test.describe("Journey — admin ops smoke", () => {
  const profile = journeyProfiles.admin;
  test.use({ storageState: profile.storageState ?? anonymousState });
  test.skip(!profile.storageState, `Supply PLAYWRIGHT_ADMIN_STORAGE_STATE or SUPER_ADMIN for ${profile.label}.`);

  test("admin reaches Operations surface", {
    tag: "@smoke"
  }, async ({ page }) => {
    await goto(page, "/ops");
    await skipIfOperationsFixtureInvalid(page);
    await expect(
      page.getByRole("heading", { name: /Scoreboard/i }).or(
        page.getByRole("link", { name: "Scoreboard" })
      ).or(
        page.getByRole("button", { name: "Open operations navigation" })
      ).first()
    ).toBeVisible();
  });
});
