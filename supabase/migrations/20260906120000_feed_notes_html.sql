-- B3: purple #feed Notes body (Junior dash-cms `notes_html` ADAPT).
-- Plain text only at app layer (no HTML render). Column name keeps Junior contract.
-- Empty string = student sees fixture default until staff writes.

alter table public.premium_workspace_profiles
  add column if not exists notes_html text not null default ''
    check (char_length(notes_html) <= 20000);

comment on column public.premium_workspace_profiles.notes_html is
  'Per-student purple Notes box on #feed. Plain text (Junior notes_html ADAPT). Empty → fixture default on read.';
