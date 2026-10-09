"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  Bell,
  BriefcaseBusiness,
  ChevronDown,
  Columns3,
  Crown,
  FileImage,
  FileText,
  FolderKanban,
  GraduationCap,
  Home,
  Lock,
  MessagesSquare,
  School,
  ShieldCheck,
  UserRound,
  UsersRound,
  Video
} from "lucide-react";
import { OpsProductMain } from "@/components/ops-product-main";
import { OperationsActorMenu } from "@/components/operations-actor-menu";
import { OperationsStaffSearch } from "@/components/operations-staff-search";
import { canViewOperationsScoreboard } from "@/lib/operations-authorization";
import { operationsRoboto } from "@/lib/operations-font";
import { operationsRoleLabel } from "@/lib/operations-presentation";
import { UM2_HREF_TO_NAV_KEY } from "@/lib/operations-user-permissions-tree";
import { cn } from "@/lib/utils";
import type { StaffPermission, StaffRoleKey } from "@/lib/staff-auth";

type NavIcon = typeof Home;

type LiveNavItem = {
  kind: "live";
  href: string;
  label: string;
  permission: StaffPermission;
  icon: NavIcon;
  scoreboard?: boolean;
  superAdminOnly?: boolean;
  stub?: boolean;
  group: "primary" | "operations" | "admin";
  adminTone?: "panel" | "users" | "default";
};

type CmsNavItem = {
  kind: "cms";
  id: string;
  label: string;
  icon: NavIcon;
  group: "cms-creating" | "cms-editing";
  href: string;
  stub?: boolean;
  permission: StaffPermission;
};

const liveItems: LiveNavItem[] = [
  /* WS-CHROME-1 primary IA — ChatGPT workspace mocks + keep Ops tools */
  { kind: "live", href: "/ops", label: "Dashboard", permission: "overview.read", icon: Home, scoreboard: true, group: "primary" },
  { kind: "live", href: "/ops/students", label: "Students", permission: "overview.read", icon: UsersRound, group: "primary" },
  {
    kind: "live",
    href: "/ops/overall-comments",
    label: "Overall Comments",
    permission: "overview.read",
    icon: MessagesSquare,
    stub: true,
    group: "primary"
  },
  {
    kind: "live",
    href: "/ops/loopboard",
    label: "Loopboard",
    permission: "overview.read",
    icon: Columns3,
    stub: true,
    group: "primary"
  },
  { kind: "live", href: "/ops/notifications", label: "Notifications", permission: "overview.read", icon: Bell, group: "primary" },
  { kind: "live", href: "/ops/activity", label: "Activity", permission: "audit.read", icon: Activity, group: "primary" },
  { kind: "live", href: "/ops/work", label: "Targets", permission: "overview.read", icon: BriefcaseBusiness, group: "operations" },
  { kind: "live", href: "/ops/team", label: "Team", permission: "staff.read", icon: UsersRound, group: "operations" },
  {
    kind: "live",
    href: "/ops/admin-panel",
    label: "Admin Panel",
    permission: "overview.read",
    icon: Crown,
    superAdminOnly: true,
    group: "admin",
    adminTone: "panel"
  },
  {
    kind: "live",
    href: "/ops/admin/users",
    label: "User Management",
    permission: "roles.manage",
    icon: UsersRound,
    superAdminOnly: true,
    group: "admin",
    adminTone: "users"
  },
  {
    kind: "live",
    href: "/studio/profile",
    label: "Edit Profile",
    permission: "overview.read",
    icon: UserRound,
    group: "admin"
  }
];

const cmsItems: CmsNavItem[] = [
  {
    kind: "cms",
    id: "courses",
    label: "Courses",
    icon: FolderKanban,
    group: "cms-creating",
    href: "/ops/cms/courses",
    permission: "catalog.read"
  },
  {
    kind: "cms",
    id: "webinar",
    label: "Webinar",
    icon: Video,
    group: "cms-creating",
    href: "/ops/cms/webinar",
    stub: true,
    permission: "catalog.read"
  },
  {
    kind: "cms",
    id: "universities",
    label: "Universities",
    icon: School,
    group: "cms-creating",
    href: "/ops/cms/universities",
    permission: "catalog.read"
  },
  {
    kind: "cms",
    id: "testimonial",
    label: "Testimonial",
    icon: FileText,
    group: "cms-editing",
    href: "/ops/cms/testimonial",
    permission: "content.read"
  },
  {
    kind: "cms",
    id: "media",
    label: "Pic / Video",
    icon: FileImage,
    group: "cms-editing",
    href: "/ops/cms/media",
    permission: "media.read"
  }
];

const sectionTitles: Record<string, string> = {
  "/ops": "Dashboard",
  "/ops/students": "Students",
  "/ops/overall-comments": "Overall Comments",
  "/ops/loopboard": "Loopboard",
  "/ops/work": "Staff Targets",
  "/ops/team": "Team",
  "/ops/team/invite": "Invite staff",
  "/ops/admin/users": "User Management",
  "/ops/notifications": "Notifications",
  "/ops/activity": "Activity",
  "/ops/admin-panel": "Admin Panel",
  "/admin/access": "Access",
  "/ops/cms/courses": "Courses",
  "/ops/cms/webinar": "Webinar",
  "/ops/cms/universities": "Universities",
  "/ops/cms/testimonial": "Testimonial",
  "/ops/cms/media": "Pic / Video",
  "/admin/profile": "Staff profile",
  "/studio/profile": "Staff profile",
  "/admin/change-password": "Change Password",
  "/studio/change-password": "Change Password"
};

function isActivePath(pathname: string, href: string) {
  if (href === "/ops") return pathname === "/ops" || pathname === "/admin";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminShell({
  children,
  displayName,
  avatarUrl = null,
  roles,
  permissions,
  navGrants = [],
  notificationUnreadCount = 0,
  preview = null
}: {
  children: React.ReactNode;
  displayName: string;
  avatarUrl?: string | null;
  roles: StaffRoleKey[];
  permissions: StaffPermission[];
  /** Empty = role-default menus (no custom filter). Non-empty = only these nav keys. */
  navGrants?: string[];
  notificationUnreadCount?: number;
  preview?: { mode: "student" | "mentor"; targetName: string; actorName: string } | null;
}) {
  const pathname = usePathname();
  const isOperationsProduct =
    pathname === "/ops" ||
    pathname.startsWith("/ops/") ||
    pathname === "/admin/audit" ||
    pathname === "/admin/notifications" ||
    pathname === "/admin/profile" ||
    pathname === "/studio/profile" ||
    pathname === "/admin/change-password" ||
    pathname === "/studio/change-password" ||
    pathname === "/admin/access" ||
    pathname.startsWith("/admin/students");
  const allowed = new Set(permissions);
  const navGrantSet = navGrants.length ? new Set(navGrants) : null;
  const canViewScoreboard = canViewOperationsScoreboard({ roles, permissions: allowed });
  const mentorPreview = preview?.mode === "mentor";
  const isSuperAdmin = roles.includes("super_admin");
  const title =
    pathname.startsWith("/ops/team/") && pathname !== "/ops/team/invite"
      ? "Staff access"
      : pathname.includes("/permissions") && pathname.startsWith("/ops/admin/users/")
        ? "Edit Permissions"
      : (sectionTitles[pathname] ?? "Operations");
  const currentRole = operationsRoleLabel(roles);
  const onTeamPath = pathname === "/ops/team" || pathname.startsWith("/ops/team/");
  const onUserManagementPath = pathname === "/ops/admin/users" || pathname.startsWith("/ops/admin/users/");

  useEffect(() => {
    if (!isOperationsProduct) return;
    const root = document.documentElement;
    root.classList.add("operations-session", operationsRoboto.variable);
    return () => {
      root.classList.remove("operations-session", operationsRoboto.variable);
    };
  }, [isOperationsProduct]);

  function navGrantAllows(href: string): boolean {
    if (!navGrantSet) return true;
    const key = UM2_HREF_TO_NAV_KEY[href];
    if (!key) return true; // Admin Panel / Profile etc. stay permission-gated only
    return navGrantSet.has(key);
  }

  function canOpenLive(item: LiveNavItem) {
    if (item.superAdminOnly && !isSuperAdmin) return false;
    if (!allowed.has(item.permission)) return false;
    if (!navGrantAllows(item.href)) return false;
    if (item.scoreboard && !canViewScoreboard) return false;
    if (mentorPreview && item.href === "/ops/team") return false;
    return true;
  }

  function renderLiveLink(item: LiveNavItem, options?: { forceShowLocked?: boolean }) {
    const open = canOpenLive(item);
    const Icon = item.icon;
    let showActive = open && isActivePath(pathname, item.href);
    if (item.label === "User Management") {
      showActive = open && onUserManagementPath && isSuperAdmin;
    } else if (item.label === "Team") {
      showActive = open && onTeamPath;
    }

    // SA-only admin items: hide completely for other roles (no lock placeholders)
    if (item.superAdminOnly && !isSuperAdmin) return null;

    if (!open && !options?.forceShowLocked) return null;
    if (!open && options?.forceShowLocked) {
      return (
        <span
          key={`${item.group}-${item.label}`}
          className="ops-nav-link ops-nav-link--locked"
          aria-disabled="true"
          title="Permission required"
        >
          <Icon aria-hidden="true" className="ops-nav-icon" />
          <span className="ops-nav-label">{item.label}</span>
          <Lock aria-hidden="true" className="ops-nav-lock" />
          <span className="ops:sr-only">Locked — permission required</span>
        </span>
      );
    }

    return (
      <Link
        key={`${item.group}-${item.label}-${item.href}`}
        href={item.href}
        aria-current={showActive ? "page" : undefined}
        className={cn(
          "ops-nav-link",
          showActive && "ops-nav-link--active",
          item.adminTone === "panel" && "ops-nav-link--admin-panel",
          item.adminTone === "users" && "ops-nav-link--admin-users",
          showActive && item.adminTone === "panel" && "ops-nav-link--admin-panel-active"
        )}
      >
        <Icon aria-hidden="true" className="ops-nav-icon" />
        <span className="ops-nav-label">{item.label}</span>
        {item.stub ? <span className="ops-nav-badge">Stub</span> : null}
      </Link>
    );
  }

  function renderCmsLink(item: CmsNavItem) {
    const open = allowed.has(item.permission) && navGrantAllows(item.href);
    const Icon = item.icon;
    if (!open) {
      // Custom menu grants hide items; permission-only miss shows lock when grants unused.
      if (navGrantSet && allowed.has(item.permission) && !navGrantAllows(item.href)) {
        return null;
      }
      return (
        <span
          key={item.id}
          className="ops-nav-link ops-nav-link--locked"
          aria-disabled="true"
          title="Permission required"
        >
          <Icon aria-hidden="true" className="ops-nav-icon" />
          <span className="ops-nav-label">{item.label}</span>
          <Lock aria-hidden="true" className="ops-nav-lock" />
        </span>
      );
    }
    const active = isActivePath(pathname, item.href);
    return (
      <Link
        key={item.id}
        href={item.href}
        aria-current={active ? "page" : undefined}
        className={cn("ops-nav-link", active && "ops-nav-link--active")}
      >
        <Icon aria-hidden="true" className="ops-nav-icon" />
        <span className="ops-nav-label">{item.label}</span>
        {item.stub ? <span className="ops-nav-badge">Stub</span> : null}
      </Link>
    );
  }

  function NavDisclosure({
    title: disclosureTitle,
    icon: DisclosureIcon,
    children: disclosureChildren,
    defaultOpen = true
  }: {
    title: string;
    icon: NavIcon;
    children: ReactNode;
    defaultOpen?: boolean;
  }) {
    return (
      <details className="ops-nav-disclosure" open={defaultOpen}>
        <summary className="ops-nav-disclosure-summary">
          <DisclosureIcon aria-hidden="true" className="ops-nav-icon" />
          <span className="ops-nav-label">{disclosureTitle}</span>
          <ChevronDown aria-hidden="true" className="ops-nav-disclosure-chevron" />
        </summary>
        <div className="ops-nav-disclosure-body">{disclosureChildren}</div>
      </details>
    );
  }

  const navigation = (
    <nav aria-label="Operations navigation" className="ops-system-navigation">
      <div className="ops-nav-group">
        <div className="ops-nav-group-list">
          {liveItems
            .filter((item) => item.group === "primary")
            .map((item) => renderLiveLink(item))}
        </div>
      </div>

      <div className="ops-nav-group">
        <NavDisclosure title="Operations" icon={ShieldCheck} defaultOpen>
          {liveItems
            .filter((item) => item.group === "operations")
            .map((item) => renderLiveLink(item, { forceShowLocked: true }))}
        </NavDisclosure>
      </div>

      <div className="ops-nav-group">
        <NavDisclosure title="CMS" icon={BriefcaseBusiness} defaultOpen>
          <NavDisclosure title="Creating" icon={FolderKanban} defaultOpen>
            {cmsItems.filter((item) => item.group === "cms-creating").map(renderCmsLink)}
          </NavDisclosure>
          <NavDisclosure title="Editing" icon={FileText} defaultOpen>
            {cmsItems.filter((item) => item.group === "cms-editing").map(renderCmsLink)}
          </NavDisclosure>
        </NavDisclosure>
      </div>

      <div className="ops-nav-group ops-nav-group--admin">
        <div className="ops-nav-group-list">
          {liveItems
            .filter((item) => item.group === "admin")
            .map((item) =>
              renderLiveLink(item, {
                // Edit Profile may show locked if permission missing; SA-only items hide above
                forceShowLocked: !item.superAdminOnly
              })
            )}
        </div>
      </div>
    </nav>
  );

  return (
    <div
      data-operations-shell
      data-operations-product={isOperationsProduct ? "true" : undefined}
      data-ops-shell-pass="1"
      data-ops-chrome-pass="c3-fix"
      className={cn(
        "operations-root ops:bg-background ops:text-foreground",
        !isOperationsProduct && "ops:min-h-screen",
        isOperationsProduct && operationsRoboto.variable
      )}
    >
      <aside className="ops-system-sidebar ops:fixed ops:inset-y-0 ops:left-0 ops:z-30 ops:hidden ops:w-64 ops:flex-col ops:border-r ops:border-border ops:bg-card ops:px-4 ops:py-5 ops:lg:flex">
        <Link href="/ops" className="ops-system-brand ops:no-underline">
          <GraduationCap aria-hidden="true" className="ops-system-brand-icon" />
          <span className="ops-system-brand-text">
            <strong>PGS</strong>
            <span>Purple Guide Study</span>
          </span>
        </Link>
        <div className="ops:mt-4 ops:flex-1 ops:overflow-y-auto">{navigation}</div>
      </aside>

      <div className="ops-system-content ops:min-w-0 ops:lg:pl-64">
        <header className="ops-system-topbar">
          <div className="ops-system-topbar-left">
            {isOperationsProduct ? (
              <p className="ops-system-current-section">{title}</p>
            ) : (
              <h1 className="ops:m-0 ops:truncate ops:text-base ops:font-semibold ops:tracking-tight">{title}</h1>
            )}
          </div>

          <div className="ops-system-topbar-center">
            {allowed.has("overview.read") ? <OperationsStaffSearch /> : null}
          </div>

          <div className="ops-system-topbar-right">
            {allowed.has("overview.read") ? (
              <Link
                href="/ops/notifications"
                aria-label={`Open notifications${notificationUnreadCount ? `, ${notificationUnreadCount} unread` : ""}`}
                className="ops-system-topbar-notify ops:relative"
              >
                <Bell aria-hidden="true" />
                {notificationUnreadCount ? (
                  <span className="ops-system-topbar-notify-badge" aria-hidden="true">
                    {notificationUnreadCount > 99 ? "99+" : notificationUnreadCount}
                  </span>
                ) : null}
              </Link>
            ) : null}
            <OperationsActorMenu displayName={displayName} roleLabel={currentRole} avatarUrl={avatarUrl} />
          </div>
        </header>

        {isOperationsProduct ? (
          <OpsProductMain>{children}</OpsProductMain>
        ) : (
          <main
            className={cn(
              "ops-system-main",
              "ops:mx-auto ops:w-full ops:max-w-[1440px] ops:p-4 ops:sm:p-6 ops:lg:p-8"
            )}
          >
            <div className="ops-system-body">{children}</div>
          </main>
        )}
        {isOperationsProduct ? (
          <footer className="ops-system-footer-rail" aria-label="Operations shell footer" />
        ) : null}
      </div>
    </div>
  );
}
