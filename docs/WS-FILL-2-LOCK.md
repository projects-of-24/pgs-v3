# WS-FILL-2 — Mentor Notes → student #FEED LOCK

**Gate:** WS-FILL-2 · owner `GO AHEAD WS-FILL-2` · 2026-10-08  
**URL:** `/workspace/students/[id]` → Dashboard Data → **Mentor Notes**  
**Student surface:** Premium `#FEED` Notes card (`load-feed-notes.ts`)  
**Not:** `counselor_notes` (Track Progress / private)

| Item | Value |
|---|---|
| Storage | `premium_workspace_profiles.notes_html` (≤ 20k, plain text) |
| Write | `PATCH /api/staff/students/[id]/workspace/profile` + `sanitizeFeedNotesBody` |
| Read | Existing student loader · React text only (no `dangerouslySetInnerHTML`) |
| UI | Textarea · Student visible · Save Notes |
| Preserve | Quick Dashboard save omits `notes_html` so Notes are not wiped |
| NOTES-CLEAR-A | After Save: clear Desk box + “Notes saved.” · no reload · `#FEED` keeps last saved text |
| Compose desk | Editor always starts empty (refresh does not refill). Live #FEED text shown read-only above. |

## Migration apply (required before Save Notes works)

File: `supabase/migrations/20261008120000_ws_fill2_feed_notes_html.sql`

Until this runs on the connected Supabase project, Save Notes returns **503** with a clear “column missing” message.

Paste in **Supabase → SQL Editor → Run**:

```sql
alter table public.premium_workspace_profiles
  add column if not exists notes_html text not null default ''
    check (char_length(notes_html) <= 20000);

comment on column public.premium_workspace_profiles.notes_html is
  'Plain-text purple #FEED Notes (Junior notes_html ADAPT). Sanitize on write/read; never HTML-render.';
```

Or: `supabase link` + `supabase db push` on lab, then live when you pull.

## Owner QC

1. Confirm `notes_html` column exists on `premium_workspace_profiles`  
2. Open Desk (Premium) → Mentor Notes → type text → **Save Notes**  
3. View as Student / student `#FEED` → Notes shows the same text  
4. Clear Notes + Save → student falls back to fixture default  
5. Save Quick Dashboard does **not** clear Notes  

## Security

- Staff manage scope only (`requirePremiumActor` manage)  
- Sanitize on write; sanitize again on student read  
- Domain split from `counselor_notes`  

## Accessibility

- Semantic HTML: PASS (`section`, `label`, `textarea`)  
- Accessible names: PASS  
- Contrast: PASS target  
- Keyboard: PASS  
- Focus: PASS  
- Forms/labels: PASS  
- Zoom/reflow: PASS intent  
- Automated scan: NOT RUN  

## Files

- `supabase/migrations/20261008120000_ws_fill2_feed_notes_html.sql`  
- `src/app/api/staff/students/[studentId]/workspace/[resource]/route.ts`  
- `src/lib/premium-workspace.ts`  
- `src/components/workspace-desk-dashboard-data.tsx` + `.module.css`  
