# WS-CHROME-SHELL — Workspace chrome LOCKED

**Gate:** WS-CHROME-SHELL · owner lock 2026-10-08  
**Rule:** **Gmail-stable** — one Workspace door; header + sidebar + footer stay on every view; only the body pane changes.

| Piece | Lock doc | Status |
|---|---|---|
| Login door | [`WS-LOGIN-LOCK.md`](./WS-LOGIN-LOCK.md) · [`WS-LOGIN-UI-LOCK.md`](./WS-LOGIN-UI-LOCK.md) | LOCKED |
| Header | [`WS-HOME-LOCK.md`](./WS-HOME-LOCK.md) | **LOCKED** |
| Sidebar | [`WS-SIDEBAR-LOCK.md`](./WS-SIDEBAR-LOCK.md) (WS-SIDEBAR-2 light tree · **WS-DASH-3** solid purple active) | **LOCKED** |
| Footer | [`WS-FOOTER-LOCK.md`](./WS-FOOTER-LOCK.md) | **LOCKED** |
| Shell layout | `src/app/workspace/(shell)/layout.tsx` + `workspace-shell.module.css` | **LOCKED** |

## Hard rules (no drive-by)

1. Body gates (Registry polish, Desk fill, Overall Comments, Loopboard) **must not** restyle header / sidebar / footer / shell grid.
2. Desk body may reuse Ops panel CSS under `data-ws-desk`, but **must not** apply Ops `position: fixed; inset: 0` full-app shell over Workspace chrome.
3. Palette: Studio purple `#6b3fa0` · TYPE ≥16px (header/search floor 18px where already set).
4. Logout from Workspace chrome → `/workspace/login` only.
5. Reopen chrome only with a named gate + owner `GO AHEAD`.

## Shell files (do not touch without chrome gate)

- `src/components/workspace-header.tsx` + `.module.css`
- `src/components/workspace-sidebar.tsx` + `.module.css`
- `src/components/workspace-footer.tsx` + `.module.css`
- `src/app/workspace/(shell)/layout.tsx`
- `src/app/workspace/(shell)/workspace-shell.module.css`

## Already live under this shell (body — not chrome)

| Body | Lock |
|---|---|
| Dashboard home | [`WS-DASH-LOCK.md`](./WS-DASH-LOCK.md) |
| Student Registry | [`WS-REG-LOCK.md`](./WS-REG-LOCK.md) |
| Open Desk tabs | [`WS-DESK-WS-LOCK.md`](./WS-DESK-WS-LOCK.md) |

## Chrome fix (2026-10-08)

| Gate | Status | Doc |
|---|---|---|
| **WS-CHROME-FIX** | **WIRED** — one header brand · no Student Desk nest · await QC | [`WS-CHROME-FIX-LOCK.md`](./WS-CHROME-FIX-LOCK.md) |

## Next (body only — pick one)

See [`FEED-WORKSPACE-PLAN.md`](./FEED-WORKSPACE-PLAN.md) top-down order after chrome.
