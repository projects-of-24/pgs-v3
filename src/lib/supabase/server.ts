import { createServerClient } from "@supabase/ssr";
import { cookies, headers } from "next/headers";
import { authCookieDomain } from "@/lib/staff-hosts";
import { requireSupabasePublicConfig } from "@/lib/supabase/config";

export async function createSupabaseServerClient() {
  const { url, key } = requireSupabasePublicConfig();
  const cookieStore = await cookies();
  const requestHeaders = await headers();
  const hostname = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "";
  const cookieDomain = authCookieDomain(hostname);
  return createServerClient(url, key, {
    cookies: {
      getAll: () => cookieStore.getAll(),
      setAll: (values, responseHeaders) => {
        void responseHeaders; // Private/no-store response headers are enforced in Next config and Proxy.
        try {
          values.forEach(({ name, value, options }) => {
            cookieStore.set(
              name,
              value,
              cookieDomain ? { ...options, domain: cookieDomain } : options
            );
          });
        } catch {
          // Server Components cannot set cookies. The proxy refreshes sessions.
        }
      }
    }
  });
}
