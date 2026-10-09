"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronRight } from "lucide-react";
import {
  mapStaffAccessError,
  staffRoleLabel,
  staffStatusLabel,
  type StaffAccessDetail
} from "@/lib/operations-staff-access";
import {
  collectExpandableIds,
  defaultNavKeysForRole,
  isUm2NavLeafKey,
  leafKeysUnder,
  nodeCheckState,
  UM2_MODULE_TREE,
  type Um2ModuleNode,
  type Um2NavLeafKey
} from "@/lib/operations-user-permissions-tree";

type EditorTab = "user-info" | "permissions" | "assigned-groups" | "login-activity";

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function roleBadgeClass(role: string): string {
  if (role === "admin") return "ops-um-badge ops-um-badge--admin";
  if (role === "mentor") return "ops-um-badge ops-um-badge--mentor";
  return "ops-um-badge ops-um-badge--staff";
}

function statusBadgeClass(status: string, invitePending: boolean): string {
  if (invitePending) return "ops-um-badge ops-um-badge--pending";
  if (status === "active") return "ops-um-badge ops-um-badge--active";
  return "ops-um-badge ops-um-badge--inactive";
}

function displayRoleLabel(role: string): string {
  if (role === "read_only_staff") return "Staff";
  return staffRoleLabel(role);
}

function TreeNode({
  node,
  depth,
  selected,
  expanded,
  disabled,
  onToggleExpand,
  onToggleNode
}: {
  node: Um2ModuleNode;
  depth: number;
  selected: Set<string>;
  expanded: Set<string>;
  disabled: boolean;
  onToggleExpand: (id: string) => void;
  onToggleNode: (node: Um2ModuleNode) => void;
}) {
  const hasChildren = Boolean(node.children?.length);
  const isOpen = expanded.has(node.id);
  const state = nodeCheckState(node, selected);

  return (
    <li>
      <div className="ops-um2-tree-row" style={{ paddingLeft: `${12 + depth * 16}px` }}>
        {hasChildren ? (
          <button
            type="button"
            className="ops-um2-tree-expand"
            aria-expanded={isOpen}
            aria-label={isOpen ? `Collapse ${node.label}` : `Expand ${node.label}`}
            onClick={() => onToggleExpand(node.id)}
          >
            {isOpen ? <ChevronDown aria-hidden="true" /> : <ChevronRight aria-hidden="true" />}
          </button>
        ) : (
          <span className="ops-um2-tree-expand-spacer" aria-hidden="true" />
        )}
        <label className="ops-um2-tree-check">
          <input
            type="checkbox"
            checked={state === "checked"}
            ref={(el) => {
              if (el) el.indeterminate = state === "indeterminate";
            }}
            disabled={disabled}
            aria-label={`${node.label} menu`}
            onChange={() => onToggleNode(node)}
          />
          <span>{node.label}</span>
        </label>
      </div>
      {hasChildren && isOpen ? (
        <ul className="ops-um2-tree-list">
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              selected={selected}
              expanded={expanded}
              disabled={disabled}
              onToggleExpand={onToggleExpand}
              onToggleNode={onToggleNode}
            />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function OperationsUserPermissionsEditor({
  detail,
  email,
  actorUserId,
  initialNavKeys,
  navCustomized
}: {
  detail: StaffAccessDetail;
  email: string | null;
  actorUserId: string;
  initialNavKeys: string[];
  navCustomized: boolean;
}) {
  const router = useRouter();
  const [tab, setTab] = useState<EditorTab>("permissions");
  const [selected, setSelected] = useState<Set<string>>(() => {
    if (navCustomized) {
      return new Set(initialNavKeys.filter(isUm2NavLeafKey));
    }
    return defaultNavKeysForRole(detail.role_key === "super_admin" ? "admin" : detail.role_key);
  });
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set(collectExpandableIds()));
  const [moduleQuery, setModuleQuery] = useState("");
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState("");

  const isSelf = actorUserId === detail.user_id;
  const baseline = useMemo(() => {
    if (navCustomized) return new Set(initialNavKeys.filter(isUm2NavLeafKey));
    return defaultNavKeysForRole(detail.role_key === "super_admin" ? "admin" : detail.role_key);
  }, [detail.role_key, initialNavKeys, navCustomized]);

  const menusDirty = useMemo(() => {
    if (selected.size !== baseline.size) return true;
    for (const key of selected) if (!baseline.has(key as Um2NavLeafKey)) return true;
    return false;
  }, [baseline, selected]);

  const filteredTree = useMemo(() => {
    const q = moduleQuery.trim().toLowerCase();
    if (!q) return UM2_MODULE_TREE;

    function filterNode(node: Um2ModuleNode): Um2ModuleNode | null {
      const selfMatch = node.label.toLowerCase().includes(q);
      const children = (node.children ?? [])
        .map(filterNode)
        .filter((child): child is Um2ModuleNode => Boolean(child));
      if (selfMatch || children.length) {
        return { ...node, children: children.length ? children : node.children };
      }
      return null;
    }

    return UM2_MODULE_TREE.map(filterNode).filter((node): node is Um2ModuleNode => Boolean(node));
  }, [moduleQuery]);

  function toggleExpand(id: string) {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleNode(node: Um2ModuleNode) {
    if (pending || isSelf) return;
    const leaves = leafKeysUnder(node);
    if (!leaves.length) return;
    setSelected((current) => {
      const next = new Set(current);
      const allOn = leaves.every((key) => next.has(key));
      for (const key of leaves) {
        if (allOn) next.delete(key);
        else next.add(key);
      }
      return next;
    });
  }

  async function saveMenus() {
    if (!menusDirty || pending || isSelf) return;
    setPending(true);
    setMessage("Saving…");

    const response = await fetch("/api/admin/staff/nav-grants", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        user_id: detail.user_id,
        nav_keys: [...selected].filter(isUm2NavLeafKey)
      })
    });
    const result = (await response.json()) as { ok?: boolean; message?: string };
    setPending(false);
    if (!response.ok) {
      setMessage(mapStaffAccessError(result.message ?? "Unable to save menus."));
      return;
    }
    setMessage("Menus saved.");
    router.refresh();
  }

  return (
    <div className="ops-um2-shell" data-ops-um-pass="um2b">
      <header className="ops-um2-top ops-um2-top--simple">
        <h1>Edit User Permissions</h1>
        <Link className="ops-um2-back" href="/ops/admin/users">
          Back to User Management
        </Link>
      </header>

      <div className="ops-um2-layout">
        <nav className="ops-um2-tabs" aria-label="User permission sections">
          <div className="ops-um2-side-card">
            <span className="ops-um2-avatar ops-um2-avatar--lg" aria-hidden="true">
              {initials(detail.display_name)}
            </span>
            <strong>{detail.display_name}</strong>
            <span>{email ?? "—"}</span>
            <div className="ops-um2-pills">
              <span className={roleBadgeClass(detail.role_key)}>{displayRoleLabel(detail.role_key)}</span>
              <span className={statusBadgeClass(detail.status, detail.invite_pending)}>
                {detail.status === "active" && !detail.invite_pending ? "Active" : "Inactive"}
              </span>
            </div>
          </div>
          {(
            [
              ["user-info", "User Info"],
              ["permissions", "Permissions"],
              ["assigned-groups", "Assigned Groups"],
              ["login-activity", "Login Activity"]
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={tab === id ? "ops-um2-tab ops-um2-tab--active" : "ops-um2-tab"}
              aria-current={tab === id ? "page" : undefined}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </nav>

        <section className="ops-um2-main" aria-labelledby="ops-um2-main-heading">
          {tab === "permissions" ? (
            <>
              <div className="ops-um2-main-head">
                <h2 id="ops-um2-main-heading">Modules &amp; Permissions</h2>
                <p>
                  Tick menus this user can see in the sidetab. Dashboard, Notifications, and Activity stay common for
                  every staff user. Staff role, suspend, and reactivate live on the Manage staff page from User
                  Management.
                </p>
              </div>

              <div className="ops-um2-tree-panel ops-um2-tree-panel--solo">
                <div className="ops-um2-tree-toolbar">
                  <label className="ops-um2-search">
                    <span className="ops-um-visually-hidden">Search modules or permissions</span>
                    <input
                      type="search"
                      className="ops-um-control"
                      placeholder="Search modules or permissions..."
                      value={moduleQuery}
                      onChange={(event) => setModuleQuery(event.target.value)}
                    />
                  </label>
                  <div className="ops-um2-tree-actions">
                    <button
                      type="button"
                      className="ops-um2-text-btn"
                      onClick={() => setExpanded(new Set(collectExpandableIds()))}
                    >
                      Expand All
                    </button>
                    <button type="button" className="ops-um2-text-btn" onClick={() => setExpanded(new Set())}>
                      Collapse All
                    </button>
                  </div>
                </div>
                <ul className="ops-um2-tree-list">
                  {filteredTree.map((node) => (
                    <TreeNode
                      key={node.id}
                      node={node}
                      depth={0}
                      selected={selected}
                      expanded={expanded}
                      disabled={pending || isSelf}
                      onToggleExpand={toggleExpand}
                      onToggleNode={toggleNode}
                    />
                  ))}
                </ul>
              </div>

              <div className="ops-um2-staff-actions">
                {message ? (
                  <p className="ops-um2-status" role="status">
                    {message}
                  </p>
                ) : null}
                {isSelf ? (
                  <p className="ops-um2-status" role="status">
                    You cannot change your own menu access.
                  </p>
                ) : null}

                <div className="ops-um2-actions ops-um2-actions--start">
                  <Link className="ops-um2-cancel" href="/ops/admin/users">
                    Cancel
                  </Link>
                  <button
                    type="button"
                    className="ops-um2-save"
                    disabled={!menusDirty || pending || isSelf}
                    onClick={() => void saveMenus()}
                  >
                    Save Menus
                  </button>
                </div>
              </div>
            </>
          ) : tab === "user-info" ? (
            <div className="ops-um2-deferred">
              <h2 id="ops-um2-main-heading">User Info</h2>
              <dl className="ops-um2-facts">
                <div>
                  <dt>Name</dt>
                  <dd>{detail.display_name}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{email ?? "—"}</dd>
                </div>
                <div>
                  <dt>Role</dt>
                  <dd>{displayRoleLabel(detail.role_key)}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>{staffStatusLabel(detail.status, detail.invite_pending)}</dd>
                </div>
                <div>
                  <dt>Assigned students</dt>
                  <dd>{detail.assigned_student_count}</dd>
                </div>
              </dl>
            </div>
          ) : (
            <div className="ops-um2-deferred">
              <h2 id="ops-um2-main-heading">
                {tab === "assigned-groups" ? "Assigned Groups" : "Login Activity"}
              </h2>
              <p>
                <strong>DEFERRED</strong> — not in UM2b.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
