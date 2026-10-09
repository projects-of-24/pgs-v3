-- WS-FILL-2 / FEED-NOTES — Mentor Notes truth for Premium #FEED
-- Student reads via load-feed-notes.ts; staff writes via workspace profile PATCH.

alter table public.premium_workspace_profiles
  add column if not exists notes_html text not null default ''
    check (char_length(notes_html) <= 20000);

comment on column public.premium_workspace_profiles.notes_html is
  'Plain-text purple #FEED Notes (Junior notes_html ADAPT). Sanitize on write/read; never HTML-render.';
