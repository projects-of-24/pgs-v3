# WS-FILL-1 — Student Desk → Dashboard Data LOCKED

**Gate:** WS-FILL-1 · **OWNER QC PASSED** 2026-10-08  
**Sub-tabs IA:** **OWNER QC PASSED** 2026-10-08 (lock)  
**URL:** `/workspace/students/[id]` → tab **Dashboard Data**  
**Chrome:** Untouched — [`WS-CHROME-SHELL-LOCK.md`](./WS-CHROME-SHELL-LOCK.md)

| Block | Status |
|---|---|
| **Sub-tabs IA** | **LOCKED** — **Details** (Preview + Quick) · **Mentor Notes** · **Where You Stand** · **Top Picks** — click tab to view |
| Student Preview (read-only CRM) | **LOCKED LIVE** · under Details |
| Quick Dashboard (Uni / Offers / Tuition / Visa) | **LOCKED LIVE** · under Details · `PATCH …/workspace/profile` → #FEED |
| Mentor Notes | **WS-FILL-2 LOCKED** · own sub-tab |
| Where You Stand | **WS-FILL-4 / 4B LOCKED** · own sub-tab |
| Top Picks / Assigned | **WS-FILL-3 LOCKED** · own sub-tab |

## Do not touch

Dashboard Data sub-tabs IA + Preview / Quick / Notes / WYS / Top Picks — only via a new fill gate + `GO AHEAD`.

## Files

- `src/components/workspace-desk-dashboard-data.tsx` + `.module.css`  
- `src/app/workspace/(shell)/students/[studentId]/page.tsx`  

