import { redirect } from "next/navigation";
import { OperationsLogin } from "@/components/operations-login";
import { PublicLegacyPage } from "@/components/public-legacy-page";
import { loginHtml } from "@/legacy/generated/login";
import { getAuthenticatedUser, safeNext, safeStudentNext } from "@/lib/auth";
import { withLoginError } from "@/lib/login-ui";
import { getStaffContext } from "@/lib/staff-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { cmsMetadata } from "@/lib/cms-metadata";

export async function generateMetadata() {
  return cmsMetadata("login");
}

export default async function LoginPage({
  searchParams
}: {
  searchParams: Promise<{ redirect?: string; error?: string; surface?: string }>;
}) {
  const params = await searchParams;
  // Student /login is students (+ guardian flag) only. Staff door is /studio/login.
  // Ignore legacy ?surface=studio|operations — never bounce into Ops from here.
  const user = await getAuthenticatedUser();
  if (user) {
    const staff = await getStaffContext();
    if (staff) {
      // Staff cannot use the student frontend login — clear session, show student form.
      const supabase = await createSupabaseServerClient();
      await supabase.auth.signOut();
    } else {
      redirect(safeStudentNext(params.redirect));
    }
  }
  if (params.surface === "guardian") {
    return (
      <OperationsLogin
        redirectPath={safeNext(params.redirect, "/portal")}
        guardianSurface
      />
    );
  }
  return <PublicLegacyPage slug="login" html={withLoginError(loginHtml, params.error)} />;
}
