import type { StaffPermission } from "@/lib/staff-auth";
import {
  STAFF_ROLE_PERMISSION_PREVIEW,
  type StaffDirectoryRole
} from "@/lib/operations-staff-access";

/** Leaf nav keys persisted in staff_nav_grants (must match migration check).
 * Dashboard / Notifications / Activity are common for all staff — not grantable. */
export const UM2_NAV_LEAF_KEYS = [
  "ops-students",
  "ops-targets",
  "ops-team",
  "cms-courses",
  "cms-webinar",
  "cms-universities",
  "cms-testimonial",
  "cms-media"
] as const;

export type Um2NavLeafKey = (typeof UM2_NAV_LEAF_KEYS)[number];

export function isUm2NavLeafKey(value: string): value is Um2NavLeafKey {
  return (UM2_NAV_LEAF_KEYS as readonly string[]).includes(value);
}

/** Map Ops sidetab href → nav grant key (grantable menus only). */
export const UM2_HREF_TO_NAV_KEY: Record<string, Um2NavLeafKey> = {
  "/ops/students": "ops-students",
  "/ops/work": "ops-targets",
  "/ops/team": "ops-team",
  "/ops/cms/courses": "cms-courses",
  "/ops/cms/webinar": "cms-webinar",
  "/ops/cms/universities": "cms-universities",
  "/ops/cms/testimonial": "cms-testimonial",
  "/ops/cms/media": "cms-media"
};

/** UM2 module tree — mirrors Ops sidetab. */
export type Um2ModuleNode = {
  id: string;
  label: string;
  permissionKeys: StaffPermission[];
  /** Present only on grantable leaves. */
  navKey?: Um2NavLeafKey;
  sharedNote?: string;
  children?: Um2ModuleNode[];
};

export const UM2_MODULE_TREE: Um2ModuleNode[] = [
  {
    id: "operations",
    label: "Operations",
    permissionKeys: ["overview.read", "staff.read"],
    children: [
      { id: "ops-students", label: "Students", permissionKeys: ["overview.read"], navKey: "ops-students" },
      { id: "ops-targets", label: "Targets", permissionKeys: ["overview.read"], navKey: "ops-targets" },
      { id: "ops-team", label: "Team", permissionKeys: ["staff.read"], navKey: "ops-team" }
    ]
  },
  {
    id: "cms",
    label: "CMS",
    permissionKeys: ["catalog.read", "content.read", "media.read"],
    children: [
      {
        id: "cms-creating",
        label: "Creating",
        permissionKeys: ["catalog.read"],
        sharedNote: "Shared route permission: catalog.read — menus can differ per user",
        children: [
          {
            id: "cms-courses",
            label: "Courses",
            permissionKeys: ["catalog.read"],
            navKey: "cms-courses",
            sharedNote: "Menu grant independent of Webinar / Universities"
          },
          {
            id: "cms-webinar",
            label: "Webinar",
            permissionKeys: ["catalog.read"],
            navKey: "cms-webinar"
          },
          {
            id: "cms-universities",
            label: "Universities",
            permissionKeys: ["catalog.read"],
            navKey: "cms-universities"
          }
        ]
      },
      {
        id: "cms-editing",
        label: "Editing",
        permissionKeys: ["content.read", "media.read"],
        children: [
          {
            id: "cms-testimonial",
            label: "Testimonial",
            permissionKeys: ["content.read"],
            navKey: "cms-testimonial"
          },
          { id: "cms-media", label: "Pic / Video", permissionKeys: ["media.read"], navKey: "cms-media" }
        ]
      }
    ]
  }
];

export function permissionsForRole(role: StaffDirectoryRole): Set<string> {
  return new Set(STAFF_ROLE_PERMISSION_PREVIEW[role]);
}

export function collectLeafNodes(nodes: Um2ModuleNode[] = UM2_MODULE_TREE): Um2ModuleNode[] {
  const leaves: Um2ModuleNode[] = [];
  for (const node of nodes) {
    if (node.navKey) leaves.push(node);
    if (node.children?.length) leaves.push(...collectLeafNodes(node.children));
  }
  return leaves;
}

/**
 * Default sidetab menus when SA picks a staff role in UM2b.
 * Explicit product defaults (not coarse permission-key inference — overview.read
 * would otherwise keep Students/Targets checked for Mentor).
 * SA may still check/uncheck any box before Save Menus.
 */
export function defaultNavKeysForRole(role: StaffDirectoryRole): Set<Um2NavLeafKey> {
  if (role === "admin" || role === "super_admin") {
    return new Set(UM2_NAV_LEAF_KEYS);
  }
  if (role === "mentor") {
    return new Set<Um2NavLeafKey>(["ops-students", "ops-targets"]);
  }
  // read_only_staff
  return new Set<Um2NavLeafKey>(["ops-students"]);
}

export function leafKeysUnder(node: Um2ModuleNode): Um2NavLeafKey[] {
  if (node.navKey) return [node.navKey];
  if (!node.children?.length) return [];
  return node.children.flatMap(leafKeysUnder);
}

export function nodeCheckState(
  node: Um2ModuleNode,
  selected: Set<string>
): "checked" | "unchecked" | "indeterminate" {
  const leaves = leafKeysUnder(node);
  if (!leaves.length) return "unchecked";
  const on = leaves.filter((key) => selected.has(key)).length;
  if (on === 0) return "unchecked";
  if (on === leaves.length) return "checked";
  return "indeterminate";
}

export function collectExpandableIds(nodes: Um2ModuleNode[] = UM2_MODULE_TREE): string[] {
  const ids: string[] = [];
  for (const node of nodes) {
    if (node.children?.length) {
      ids.push(node.id);
      ids.push(...collectExpandableIds(node.children));
    }
  }
  return ids;
}

export function findModuleNode(id: string, nodes: Um2ModuleNode[] = UM2_MODULE_TREE): Um2ModuleNode | null {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findModuleNode(id, node.children);
      if (found) return found;
    }
  }
  return null;
}
