import { LogoutConfirm } from "@/components/logout-confirm";

function logoutReturnPath(value: string | undefined): { href: string; label: string } {
  // `next` is cancel-link only — never the post-logout destination. No Ops bridges.
  if (value === "/") return { href: "/", label: "Return to PGS home" };
  return { href: "/student/dashboard", label: "Return to dashboard" };
}

export default async function LogoutPage({
  searchParams
}: {
  searchParams: Promise<{ next?: string; surface?: string }>;
}) {
  const { next, surface: surfaceParam } = await searchParams;
  const home = logoutReturnPath(next);
  const surface = surfaceParam === "studio" || surfaceParam === "operations"
    ? "studio" as const
    : surfaceParam === "student"
      ? "student" as const
      : undefined;
  return <LogoutConfirm homeHref={home.href} homeLabel={home.label} surface={surface} />;
}
