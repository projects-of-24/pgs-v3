# WS-FILL-4 / 4B — Where You Stand (mentor Prep → #FEED)

**Gate:** WS-FILL-4 · owner `GO AHEAD WS-FILL-4` · 2026-10-08  
**Gate:** WS-FILL-4B · Finalized Uni List + CMS images · plan implement  
**Status:** **WIRED** (await owner QC → LOCK)  
**Decisions:** **1A** shortlist counts in `documents_tracker` · **2A** finalized from university selections · **3A** mentor-typed %  
**Desk:** `/workspace/students/[id]` → Dashboard Data → **Where You Stand** (+ Finalized Uni List)  
**Student:** Premium `#FEED` Where You Stand (`student-feed-where-you-stand`)

| Item | Value |
|---|---|
| Prep + tasks store | `premium_workspace_profiles` (`onboarding_*`, `feedback_*`, `documents_tracker`, `currently_working_on`, `future_tasks`) |
| Task desk UX | Type (None / URGENT / IMP) + text + **Add** / **Remove** (2026-10-09) — not textarea lines |
| Uni Shortlist counts | Mentor labels in `documents_tracker` (partition by shortlist label rules) |
| Finalized Uni List | `student_university_selections` where `stage = finalized` |
| Campus image | CMS `universities.image_asset_id` → `media_assets` (fallback `wys-uni-campus.png`) |
| Staff write Prep | `PATCH /api/staff/students/[id]/workspace/profile` |
| Staff write Finalized | `POST/PATCH/DELETE …/workspace/universities` |
| Student read | `load-feed-where-you-stand.ts` → live `/student/dashboard` |
| Preview lab | `/preview/student-feed-premium` keeps fixtures until a student id is wired |

## DB

No new migration. Profile columns from `20260817035326_recover_premium_frontend_contract.sql`.  
Selections + university media from existing premium workspace + public catalog.

## Owner QC

1. Desk (Premium student) → **Where You Stand** → set % · toggle checklist · set doc counts · Save  
2. View as Student / student `#FEED` → Prep cards match  
3. Set Uni Shortlist counts → feed shortlist card updates  
4. **Finalized:** Desk → Choose published CMS university → **Finalize** → list shows it  
5. Student `#FEED` → Finalized count > `00`, card name + image (CMS logo or fixture)  
6. **Remove** on Desk → feed empties finalized  
7. (Optional) CMS → Universities → set logo → feed card uses that image after refresh  
8. Mentor without assignment cannot manage out-of-scope student  

## Security (day-1)

- Same profile / universities APIs: manage + Premium + student_id from URL only  
- Student loader uses preview-aware client (View as Student OK)  
- No student write path for these fields  
- Published universities only in Desk dropdown  

## Deferred

- Auto-% from checklist (3B)  
- Shortlist from live university rows (1B)  
- Per-student campus upload (DB GAP — rejected for 4B)  
- Desk media upload that mutates CMS university image  
- Comments (next fill gate)  
- Phase 4D auto document counts  
