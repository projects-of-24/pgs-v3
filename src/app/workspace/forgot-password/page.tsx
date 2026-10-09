import { StaffForgotPassword } from "@/components/staff-forgot-password";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "PGS Workspace — Forgot password",
  description: "Reset your PGS Workspace staff password."
};

/** Staff Workspace forgot password — not student `/forgot_password`. */
export default function WorkspaceForgotPasswordPage() {
  return <StaffForgotPassword surface="workspace" />;
}
