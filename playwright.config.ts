import { defineConfig, devices } from "@playwright/test";

const chromiumDesktop = {
  ...devices["Desktop Chrome"],
  viewport: { width: 1440, height: 1000 }
} as const;

const chromiumMobile = {
  ...devices["iPhone 13"],
  browserName: "chromium" as const,
  deviceScaleFactor: 1,
  viewport: { width: 390, height: 844 }
};

const desktopViewport = { width: 1440, height: 1000 } as const;

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:7100",
    trace: "retain-on-failure",
    // Preview deployments sit behind Vercel Deployment Protection; the bypass
    // header lets the same specs run against them without a Vercel login.
    extraHTTPHeaders: process.env.PLAYWRIGHT_PROTECTION_BYPASS
      ? { "x-vercel-protection-bypass": process.env.PLAYWRIGHT_PROTECTION_BYPASS }
      : undefined
  },
  webServer: process.env.PLAYWRIGHT_BASE_URL ? undefined : {
    command: "./node_modules/.bin/next start -p 7100",
    url: "http://127.0.0.1:7100",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  },
  // Default `pnpm test:e2e` pins --project=desktop,mobile (Chromium only).
  // Firefox/WebKit are available for smoke / explicit --project runs.
  projects: [
    { name: "desktop", use: chromiumDesktop },
    { name: "mobile", use: chromiumMobile },
    { name: "firefox", use: { ...devices["Desktop Firefox"], viewport: desktopViewport } },
    { name: "webkit", use: { ...devices["Desktop Safari"], viewport: desktopViewport } }
  ]
});
