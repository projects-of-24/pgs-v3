/**
 * Staff subdomain host map (W1).
 *
 * studio.purpleguide.study  → Ops door (/studio/login → /ops)
 * workspace.purpleguide.study → Workspace door (/workspace/login → /workspace)
 * Apex / www stay public + student.
 *
 * Shared Auth cookies use `.purpleguide.study` so one staff session works on both hosts.
 * Localhost and *.vercel.app keep host-only cookies (no parent domain).
 */

export type StaffHostKind = "studio" | "workspace";

const STAFF_HOSTS: Record<string, StaffHostKind> = {
  "studio.purpleguide.study": "studio",
  "workspace.purpleguide.study": "workspace"
};

/** Strip port; lowercase. */
export function normalizeHostname(hostname: string): string {
  return hostname.trim().toLowerCase().split(":")[0] ?? "";
}

export function resolveStaffHost(hostname: string): StaffHostKind | null {
  return STAFF_HOSTS[normalizeHostname(hostname)] ?? null;
}

/**
 * Cookie Domain for Supabase Auth session sharing across staff subdomains.
 * Returns undefined when the host is not under purpleguide.study (dev / Vercel preview).
 */
export function authCookieDomain(hostname: string): string | undefined {
  const host = normalizeHostname(hostname);
  if (host === "purpleguide.study" || host.endsWith(".purpleguide.study")) {
    return ".purpleguide.study";
  }
  return undefined;
}

export function staffHostRootPath(kind: StaffHostKind, authenticated: boolean): string {
  if (kind === "studio") return authenticated ? "/ops" : "/studio/login";
  return authenticated ? "/workspace" : "/workspace/login";
}
