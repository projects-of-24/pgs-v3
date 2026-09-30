/**
 * T-1 — open toggle box (#sidebar) nav config.
 * Figma authority: `left-closed update v2` 19072:16102 (rows, bottom row)
 * and `v1` 19067:15117 → 19067:15187 (#exploreCountries dropdown card).
 *
 * Shape is CMS-ready (label / href / icon / children) so a later backend
 * gate can serve the same rows from a table without touching the UI.
 * Icons: Hostinger set reused (same glyphs as Figma). Swap `SIDEBAR_ICONS`
 * for the Figma SVG exports when the owner drops them into
 * public/assets/img/sidebar/ — one edit here.
 */

export const SIDEBAR_ICONS = {
  generic: "/assets/img/loading-icon.png",
  upload: "/assets/img/upload-icon.png",
  finance: "/assets/img/finance-icon.png",
  scholarship: "/assets/img/scholar-icon.png",
  profile: "/assets/img/profile-icon.png",
  heart: "/assets/img/heart-icon.png",
  logout: "/assets/img/logout.png",
  close: "/assets/img/sidebar-arrow.png"
} as const;

export type SidebarIcon = keyof typeof SIDEBAR_ICONS;

export type SidebarLink = { label: string; href: string };

export type SidebarRow = {
  id: string;
  label: string;
  href: string;
  icon: SidebarIcon;
  /** Present = row opens a dropdown (Figma: arrow-circle glyph after the label). */
  children?: SidebarLink[];
};

/** Figma v1 19067:15187 — five links, centered, "FULL COUNTRY LIST" last. */
export const SIDEBAR_COUNTRIES: SidebarLink[] = [
  { label: "USA", href: "/countriesusa" },
  { label: "UK", href: "/countriesuk" },
  { label: "AUSTRALIA", href: "/countriesaus" },
  { label: "GERMANY", href: "/countriesgermany" },
  { label: "FULL COUNTRY LIST", href: "/explorecountries" }
];

export const SIDEBAR_ROWS: SidebarRow[] = [
  { id: "explore", label: "#exploreCountries", href: "/explorecountries", icon: "generic", children: SIDEBAR_COUNTRIES },
  { id: "dates", label: "#datesDeadlines", href: "/studentresources", icon: "generic" },
  { id: "track", label: "Track Your Progress", href: "/feed_track_progress", icon: "generic" },
  { id: "board", label: "#purpleBoard", href: "/purpleboard", icon: "generic" },
  { id: "docs", label: "Upload Your Docs", href: "/upload_your_doc", icon: "upload" },
  { id: "finance", label: "#purpleFinance Hub", href: "/finance", icon: "finance" },
  { id: "scholarship", label: "#purpleScholarship", href: "/scholarship", icon: "scholarship" }
];

export type SidebarFooterLink = SidebarLink & { icon: SidebarIcon; loginRequired?: boolean };

/** Signed in: Profile · Saved List · Logout. Signed out: Profile / Saved List gate to login, Login replaces Logout (owner 2026-09-27). */
export function sidebarFooterLinks(signedIn: boolean, loginHref = "/login"): SidebarFooterLink[] {
  return [
    { label: "Profile", href: signedIn ? "/student/profile" : loginHref, icon: "profile", loginRequired: !signedIn },
    { label: "Saved List", href: signedIn ? "/saved" : loginHref, icon: "heart", loginRequired: !signedIn },
    signedIn
      ? { label: "Logout", href: "/logout", icon: "logout" }
      : { label: "Login", href: loginHref, icon: "logout" }
  ];
}
