# WS-FOOTER-1 — Workspace footer LOCKED

**Gate:** WS-FOOTER-1 · **LOCKED** 2026-10-08 (chrome shell package)  
**Parent:** [`WS-CHROME-SHELL-LOCK.md`](./WS-CHROME-SHELL-LOCK.md)

| Item | Value |
|---|---|
| Placement | Bottom of main column (beside sidebar), **outside** body scroll |
| Content | **PGS** · Mentor-Student Workspace · short staff note |
| Look | Light purple tint rail · Studio purple brand |
| Chrome rule | Footer **only on Dashboard** (`/workspace`) |
| Exception | **Hidden** on Students · Desk · Profile · Loopboard · all non-home Workspace routes (owner QC 2026-10-08) |

## Also locked with chrome

Header avatar: circular clip (`overflow` + `object-fit: cover`).

## Do not touch

Footer copy/rail restyle only via a new chrome gate + `GO AHEAD`.

## Files

- `src/components/workspace-footer.tsx` + `.module.css`
