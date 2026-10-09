import { StaffForgotPassword } from "@/components/staff-forgot-password";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "PGS Studio — Forgot password",
  description: "Reset your PGS Studio staff password."
};

/** Staff Studio forgot password — not student `/forgot_password`. */
export default function StudioForgotPasswordPage() {
  return <StaffForgotPassword surface="studio" />;
}
