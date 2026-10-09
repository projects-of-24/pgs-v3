# WS-REG — Workspace Student Registry LOCKED

**Gate:** WS-REG · **OWNER QC PASSED** 2026-10-08  
**Mock:** ChatGPT registry panel · [`shell-registry-desk.jpg`](../public/preview/feed-workspace-qc/chatgpt-mocks/shell-registry-desk.jpg)  
**Data:** Same Ops STU1 registry RPC + mentor scope (RB-01) — **no second student DB**

| Item | Value |
|---|---|
| URL | `/workspace/students` |
| UI | Search · tabs (All / My Assigned / Premium / Not Premium) · table · pagination |
| Columns | Student · PGS ID · Premium · Mentor · Stage · **Open Desk** |
| Open Desk | `/workspace/students/[id]` · [`WS-DESK-WS-LOCK.md`](./WS-DESK-WS-LOCK.md) |
| Header search | Ops search popup · student → Open Desk (WS-CHROME-FIX QC) |
| Pagination | Ops STU1 style — `N–M of total` · numbered page buttons |
| Height / scroll | Shell **100dvh** · **table scrolls inside** · pagination pinned · **no outward browser scroll** (Ops STU1) |
| Ops `/ops/students` | Untouched STU1 lock |

## Do not touch

Registry list UI / filters / Open Desk column — only via a new registry gate + `GO AHEAD`.

## Next after OG Dashboard QC

**WS-FILL-1** — Student Desk → Dashboard Data UI (mock screen 4), top-down.

## Files

- `src/app/workspace/(shell)/students/page.tsx`  
- `src/components/workspace-student-registry.tsx` + `.module.css`  
- `src/lib/operations-student-registry.ts` (`basePath` on `registryHref`)  
