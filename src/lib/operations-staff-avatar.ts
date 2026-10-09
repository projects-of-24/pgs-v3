/**
 * Ops chrome avatar URLs for staff.
 * Prefer saved `staff_profiles.avatar_path` (private `staff-avatars` bucket).
 * Fixture emails remain a lab fallback when no path is stored.
 *
 * Owner 2026-10-01: primary QC actor = Progress Lab Super Admin
 * (`progress-lab-superadmin@pgs.lab`), not Admin.
 */
import "server-only";
import { PROGRESS_LAB_SUPER_ADMIN_EMAIL } from "@/lib/progress-lab";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { logServerError } from "@/lib/server-security";

const FIXTURE_STAFF_AVATARS: Record<string, string> = {
  [PROGRESS_LAB_SUPER_ADMIN_EMAIL]: "/assets/img/ops/fixture-super-admin-avatar.jpg",
  "pgs-v3-fixture+super-admin@example.test": "/assets/img/ops/fixture-super-admin-avatar.jpg",
  "pgs-v3-fixture+admin@example.test": "/assets/img/ops/fixture-admin-avatar.jpg"
};

export function getStaffFixtureAvatarUrl(email: string | null | undefined): string | null {
  if (!email) return null;
  return FIXTURE_STAFF_AVATARS[email.trim().toLowerCase()] ?? null;
}

/** @deprecated Use resolveStaffChromeAvatarUrl — kept for fixture-only call sites. */
export function getStaffChromeAvatarUrl(email: string | null | undefined): string | null {
  return getStaffFixtureAvatarUrl(email);
}

export async function resolveStaffChromeAvatarUrl(options: {
  email?: string | null;
  avatarPath?: string | null;
}): Promise<string | null> {
  const path = options.avatarPath?.trim();
  if (path) {
    try {
      const admin = createSupabaseAdminClient();
      const { data, error } = await admin.storage.from("staff-avatars").createSignedUrl(path, 3600);
      if (!error && data?.signedUrl) return data.signedUrl;
      if (error) {
        logServerError("staff_avatar_signed_url_failed", error, { path: path.slice(0, 80) });
      }
    } catch (error) {
      logServerError("staff_avatar_signed_url_unavailable", error, { path: path.slice(0, 80) });
    }
  }
  return getStaffFixtureAvatarUrl(options.email);
}
