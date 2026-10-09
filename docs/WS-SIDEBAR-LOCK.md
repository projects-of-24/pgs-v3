# WS-SIDEBAR-2 — Workspace sidebar LOCKED

**Gate:** WS-SIDEBAR-2 · **LOCKED** 2026-10-08 (chrome shell package)  
**Parent:** [`WS-CHROME-SHELL-LOCK.md`](./WS-CHROME-SHELL-LOCK.md)  
**Supersedes:** WS-SIDEBAR-1 (dark rail)  
**Mock:** Owner light tree screenshot · ChatGPT shell panels

| Item | Value |
|---|---|
| Brand | **Rail** Ops/Studio band — GraduationCap · **PGS** · Purple Guide Study (WS-CHROME-FIX QC) |
| Nav | Dashboard · Students · Overall Comments · **Mentor Assigns** · Loopboard (**Profile / Logout only in header menu**) |
| Look | White rail · solid purple active · Studio `#6b3fa0` · TYPE ≥16px |
| Chrome rule | **Gmail-stable** — sidebar stays on every Workspace body |
| Desk | Open from Registry → `/workspace/students/[id]` tabs — **no** Student Desk nest in rail |

## Stub / live URLs (IA only — bodies are separate gates)

| Path | Status |
|---|---|
| `/workspace` | Dashboard home (body next) |
| `/workspace/students` | WS-REG live |
| `/workspace/students/[id]` | WS-DESK-WS live |
| `/workspace/students/desk/*` | Pick-student stubs |
| `/workspace/overall-comments` | **WS-OC-2 LOCKED** · [`WS-OC-2-LOCK.md`](./WS-OC-2-LOCK.md) |
| `/workspace/mentor-assigns` | **FTP-B7a** fixture editor · [`FTP-B7A-MENTOR-ASSIGNS-LOCK.md`](./FTP-B7A-MENTOR-ASSIGNS-LOCK.md) |
| `/workspace/loopboard` | Stub |

## Do not touch

Nav chrome / tree look / brand in rail — only via a new chrome gate + `GO AHEAD`.

## WS-CHROME-FIX

See [`WS-CHROME-FIX-LOCK.md`](./WS-CHROME-FIX-LOCK.md) — rail brand + Student Desk nest removed.

## Files

- `src/components/workspace-sidebar.tsx` + `.module.css`
