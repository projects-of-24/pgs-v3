import type { BrowserContextOptions } from "@playwright/test";

/** Empty anonymous browser context (no Auth cookies). */
export const anonymousState: BrowserContextOptions["storageState"] = {
  cookies: [],
  origins: []
};

/**
 * Named e2e identity profiles. Authenticated profiles resolve from the
 * existing PLAYWRIGHT_*_STORAGE_STATE env paths produced by
 * `pnpm fixtures:auth-states` (typically `.auth/phase36/*.json`).
 */
export const journeyProfiles = {
  anonymous: {
    label: "anonymous",
    storageState: anonymousState as BrowserContextOptions["storageState"],
    required: true
  },
  standardStudent: {
    label: "standard-student",
    storageState: process.env.PLAYWRIGHT_STANDARD_STUDENT_STORAGE_STATE,
    required: false
  },
  premiumStudent: {
    label: "premium-student",
    storageState: process.env.PLAYWRIGHT_PREMIUM_STUDENT_STORAGE_STATE,
    required: false
  },
  mentor: {
    label: "mentor",
    storageState: process.env.PLAYWRIGHT_MENTOR_STORAGE_STATE,
    required: false
  },
  admin: {
    label: "admin",
    // Prefer Super Admin for smoke — plain Admin fixtures may lack active Ops surface access.
    storageState:
      process.env.PLAYWRIGHT_SUPER_ADMIN_STORAGE_STATE
      ?? process.env.PLAYWRIGHT_ADMIN_STORAGE_STATE,
    required: false
  }
} as const;

export type JourneyProfileName = keyof typeof journeyProfiles;
