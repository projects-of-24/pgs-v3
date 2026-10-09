import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type LogoutSurface = "studio" | "workspace" | "student";

/** Fixed server map — never echo a client-supplied path. */
function redirectForSurface(surface: unknown): string {
  if (surface === "studio" || surface === "operations") return "/studio/login";
  if (surface === "workspace") return "/workspace/login";
  return "/";
}

export async function POST(request: Request) {
  let surface: LogoutSurface | undefined;
  try {
    const contentType = request.headers.get("content-type") ?? "";
    if (contentType.includes("application/json")) {
      const body = (await request.json().catch(() => null)) as { surface?: unknown } | null;
      if (
        body?.surface === "studio"
        || body?.surface === "operations"
        || body?.surface === "workspace"
        || body?.surface === "student"
      ) {
        surface = body.surface === "operations" ? "studio" : body.surface;
      }
    }
  } catch {
    // Empty / non-JSON body is fine — default student/public landing.
  }

  try {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signOut();
    if (error) {
      return NextResponse.json(
        { ok: false, error: "Unable to log out. Please try again." },
        { status: 502, headers: { "Cache-Control": "private, no-store" } }
      );
    }
  } catch {
    // An already-expired or unconfigured session has the same logged-out result.
  }

  return NextResponse.json(
    { ok: true, redirect: redirectForSurface(surface) },
    { headers: { "Cache-Control": "private, no-store" } }
  );
}
