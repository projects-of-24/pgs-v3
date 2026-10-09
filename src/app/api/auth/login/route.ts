import { NextResponse } from "next/server";
import { authErrorMessage, safeNext, safeStudentNext } from "@/lib/auth";
import { jsonError, readJsonObject } from "@/lib/http";
import { getStaffContextForUser } from "@/lib/staff-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { consumeRateLimit, logServerError } from "@/lib/server-security";

type LoginSurface = "studio" | "workspace" | "student" | "guardian";

/** Studio and Workspace are separate staff doors. Legacy `operations` maps to studio. */
function normalizeSurface(value: unknown): LoginSurface {
  if (value === "studio" || value === "operations") return "studio";
  if (value === "workspace") return "workspace";
  if (value === "guardian") return "guardian";
  return "student";
}

function studioRedirect(requested: unknown): string {
  const next = safeNext(typeof requested === "string" ? requested : "/ops", "/ops");
  return next.startsWith("/ops") || next.startsWith("/admin") || next.startsWith("/cms") ? next : "/ops";
}

/** Workspace home only — ignore client redirect; never bounce into Ops. */
function workspaceRedirect(): string {
  return "/workspace";
}

export async function POST(request: Request) {
  try {
    const body = await readJsonObject(request);
    const email = typeof body.email === "string" ? body.email.trim().toLowerCase() : "";
    const password = typeof body.password === "string" ? body.password : "";
    const surface = normalizeSurface(body.surface);
    if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 254 || !password || password.length > 1024) {
      return jsonError("Enter a valid email and password.", 400);
    }
    const limit = await consumeRateLimit(request, "auth.login", email);
    if (!limit.allowed) {
      return jsonError(
        limit.configured ? "Too many login attempts. Please wait and try again." : "Login is temporarily unavailable.",
        limit.configured ? 429 : 503
      );
    }

    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) return jsonError(authErrorMessage(error.message), 401);
    const user = data.user ?? (await supabase.auth.getUser()).data.user;
    if (!user) return jsonError("Invalid email or password.", 401);

    // Read-only staff check against existing profiles (no seed/flush in this gate).
    const staff = await getStaffContextForUser(user);

    if (surface === "studio") {
      if (!staff) {
        await supabase.auth.signOut();
        return jsonError("Students are not allowed to sign in to Studio. Use the student login at /login.", 403);
      }
      return NextResponse.json({ ok: true, redirect: studioRedirect(body.redirect) });
    }

    if (surface === "workspace") {
      if (!staff) {
        await supabase.auth.signOut();
        return jsonError("Students are not allowed to sign in to Workspace. Use the student login at /login.", 403);
      }
      return NextResponse.json({ ok: true, redirect: workspaceRedirect() });
    }

    if (surface === "student") {
      if (staff) {
        await supabase.auth.signOut();
        return jsonError("This account can't sign in here.", 403);
      }
      return NextResponse.json({
        ok: true,
        redirect: safeStudentNext(typeof body.redirect === "string" ? body.redirect : null)
      });
    }

    // Guardian surface: authenticate only; portal gate decides access.
    return NextResponse.json({
      ok: true,
      redirect: safeNext(typeof body.redirect === "string" ? body.redirect : "/portal", "/portal")
    });
  } catch (error) {
    logServerError("auth_login_failed", error);
    return jsonError("Unable to log in. Please try again.", 503);
  }
}
