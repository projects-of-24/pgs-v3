# WS-HOME-1 — Workspace header LOCKED

**Gate:** WS-HOME-1 · **LOCKED** 2026-10-08 (chrome shell package)  
**Parent:** [`WS-CHROME-SHELL-LOCK.md`](./WS-CHROME-SHELL-LOCK.md)  
**Mock:** [`public/preview/feed-workspace-qc/chatgpt-mocks/shell-registry-desk.jpg`](../public/preview/feed-workspace-qc/chatgpt-mocks/shell-registry-desk.jpg) (screens 2–5 header)

| Item | Value |
|---|---|
| URL | `/workspace` shell (login excluded) |
| Header | Centered search · Ops-size profile · bell · avatar menu (**no brand** · WS-CHROME-FIX) |
| Search / bell | Chrome only — **DEFERRED** data |
| My Profile | `/workspace/profile` |
| Logout | → `/workspace/login` (`surface: workspace`) |
| Body pager | Ops ◀ · grip · ▶ scroll dock |
| Chrome rule | **Gmail-stable** — header stays on every Workspace body |

## Do not touch

Restyle / remove / replace only via a new chrome gate + `GO AHEAD`.

## Files

- `src/components/workspace-header.tsx` + `.module.css`
- Shell: `src/app/workspace/(shell)/layout.tsx`
