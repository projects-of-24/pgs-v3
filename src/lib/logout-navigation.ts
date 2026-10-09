type LogoutNavigation = Pick<Location, "origin" | "replace">;
type LogoutSurface = "studio" | "workspace" | "student";

function logoutRedirect(value: unknown): string {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//") || /[\r\n]/.test(value)) {
    return "/";
  }
  // Allow only fixed same-site landings the server may return.
  if (value === "/studio/login" || value === "/workspace/login" || value === "/") return value;
  return "/";
}

export async function signOutAndNavigate(
  fetcher: typeof fetch = fetch,
  navigation: LogoutNavigation = window.location,
  surface?: LogoutSurface
): Promise<void> {
  const response = await fetcher("/api/auth/logout", {
    method: "POST",
    headers: surface ? { "content-type": "application/json" } : undefined,
    body: surface ? JSON.stringify({ surface }) : undefined
  });
  if (!response.ok) throw new Error("Logout failed");

  const body = await response.json().catch(() => ({})) as { redirect?: unknown };
  const destination = new URL(logoutRedirect(body.redirect), navigation.origin).toString();

  // Document navigation from post-sign-out cookie state; replace blocks Back to cached auth screens.
  navigation.replace(destination);
}
