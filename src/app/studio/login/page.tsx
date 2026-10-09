import { notFound, redirect } from "next/navigation";
import { StudioLogin } from "@/components/studio-login";
import { getAuthenticatedUser, safeNext } from "@/lib/auth";
import { getStaffContext } from "@/lib/staff-auth";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "PGS Studio sign in",
  description: "Staff portal sign in for Super Admin, Admin, Mentor, and Staff."
};

function opsSafeRedirect(value: string | null | undefined): string {
  const next = safeNext(value, "/ops");
  return next.startsWith("/ops") || next.startsWith("/admin") || next.startsWith("/cms")
    ? next
    : "/ops";
}

export default async function StudioLoginPage({
  searchParams
}: {
  searchParams: Promise<{ redirect?: string; error?: string }>;
}) {
  const params = await searchParams;
  const redirectPath = opsSafeRedirect(params.redirect);
  const user = await getAuthenticatedUser();

  if (user) {
    const staff = await getStaffContext();
    if (staff) redirect(redirectPath);
    // Student (or non-staff) session on Studio door → hard 404; keep session.
    notFound();
  }

  const initialMessage =
    params.error === "staff_required"
      ? "Sign in with an active staff Studio account."
      : "";

  return <StudioLogin redirectPath={redirectPath} initialMessage={initialMessage} />;
}
