/**
 * Parallel Sanity trial (M1) — env helpers.
 * Does not touch Ops CMS / Supabase course drafts.
 */

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION ?? "2025-01-01";

export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() || "";

/** True when a real Sanity project id is present (not a placeholder). */
export function isSanityConfigured(): boolean {
  return /^[a-z0-9]{8,}$/i.test(projectId);
}
