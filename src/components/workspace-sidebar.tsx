"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { CheckSquare, GraduationCap, Home, Library, MessagesSquare, Users } from "lucide-react";
import styles from "./workspace-sidebar.module.css";

function pathActive(pathname: string, href: string) {
  if (href === "/workspace") return pathname === "/workspace";
  if (href === "/workspace/students") {
    return pathname === "/workspace/students" || pathname.startsWith("/workspace/students/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

/**
 * WS-SIDEBAR-2 + WS-CHROME-FIX — Ops brand in rail.
 * Profile + Logout live only in the header account menu (not in the sidebar).
 */
export function WorkspaceSidebar() {
  const pathname = usePathname() || "/workspace";

  return (
    <aside className={styles.aside} aria-label="Workspace">
      <Link href="/workspace" className={styles.brand} aria-label="PGS Workspace home">
        <GraduationCap aria-hidden="true" className={styles.brandIcon} />
        <span className={styles.brandText}>
          <strong>PGS</strong>
          <span>Purple Guide Study</span>
        </span>
      </Link>

      <nav className={styles.nav} aria-label="Primary">
        <Link
          href="/workspace"
          className={pathActive(pathname, "/workspace") ? `${styles.link} ${styles.linkActive}` : styles.link}
        >
          <Home aria-hidden="true" />
          Dashboard
        </Link>

        <Link
          href="/workspace/students"
          className={
            pathActive(pathname, "/workspace/students") ? `${styles.link} ${styles.linkActive}` : styles.link
          }
        >
          <Users aria-hidden="true" />
          Students
        </Link>

        <Link
          href="/workspace/overall-comments"
          className={
            pathActive(pathname, "/workspace/overall-comments")
              ? `${styles.link} ${styles.linkActive}`
              : styles.link
          }
        >
          <MessagesSquare aria-hidden="true" />
          Overall Comments
        </Link>

        <Link
          href="/workspace/mentor-assigns"
          className={
            pathActive(pathname, "/workspace/mentor-assigns")
              ? `${styles.link} ${styles.linkActive}`
              : styles.link
          }
        >
          <Library aria-hidden="true" />
          Mentor Assigns
        </Link>

        <Link
          href="/workspace/loopboard"
          className={
            pathActive(pathname, "/workspace/loopboard") ? `${styles.link} ${styles.linkActive}` : styles.link
          }
        >
          <CheckSquare aria-hidden="true" />
          Loopboard
        </Link>
      </nav>
    </aside>
  );
}
