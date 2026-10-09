-- FTP-B7b — Shared Useful Tips + Resource Drop (all Premium students).
-- Mentor Assigns editor writes; student Track Progress reads (FTP-B7c).

create or replace function private.can_manage_progress_library()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select private.is_privileged_staff()
    or private.has_staff_permission('student_workspace.manage')
    or private.has_staff_permission('student_workspace.manage_all')
    or exists (
      select 1
      from public.mentor_assignments a
      where a.mentor_id = auth.uid()
        and a.status = 'active'
    );
$$;

revoke all on function private.can_manage_progress_library() from public, anon;
grant execute on function private.can_manage_progress_library() to authenticated;

create table public.progress_tips (
  id uuid primary key default gen_random_uuid(),
  label text not null
    check (char_length(btrim(label)) between 1 and 80),
  body text not null
    check (char_length(btrim(body)) between 1 and 2000),
  sort_order integer not null default 0
    check (sort_order >= 0 and sort_order <= 1000000),
  active boolean not null default true,
  updated_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index progress_tips_sort_idx
  on public.progress_tips (active, sort_order, created_at);

comment on table public.progress_tips is
  'FTP-B7b shared Useful Tips for all Premium students (Mentor Assigns).';

create table public.progress_resources (
  id uuid primary key default gen_random_uuid(),
  label text not null
    check (char_length(btrim(label)) between 1 and 160),
  url text not null default ''
    check (char_length(url) <= 2000),
  sort_order integer not null default 0
    check (sort_order >= 0 and sort_order <= 1000000),
  active boolean not null default true,
  updated_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index progress_resources_sort_idx
  on public.progress_resources (active, sort_order, created_at);

comment on table public.progress_resources is
  'FTP-B7b shared Resource Drop links for all Premium students (Mentor Assigns).';

alter table public.progress_tips enable row level security;
alter table public.progress_resources enable row level security;

create policy "staff and premium students read progress tips"
  on public.progress_tips
  for select to authenticated
  using (
    private.can_manage_progress_library()
    or private.has_staff_permission('overview.read')
    or (active and private.has_active_premium(auth.uid()))
  );

create policy "staff manage progress tips"
  on public.progress_tips
  for all to authenticated
  using (private.can_manage_progress_library())
  with check (private.can_manage_progress_library() and updated_by = auth.uid());

create policy "staff and premium students read progress resources"
  on public.progress_resources
  for select to authenticated
  using (
    private.can_manage_progress_library()
    or private.has_staff_permission('overview.read')
    or (active and private.has_active_premium(auth.uid()))
  );

create policy "staff manage progress resources"
  on public.progress_resources
  for all to authenticated
  using (private.can_manage_progress_library())
  with check (private.can_manage_progress_library() and updated_by = auth.uid());

grant select, insert, update, delete on public.progress_tips to authenticated;
grant select, insert, update, delete on public.progress_resources to authenticated;

-- Seed Figma fixture pack (shared starter content).
do $$
declare
  seed_user uuid;
begin
  select sp.user_id into seed_user
  from public.staff_profiles sp
  where sp.status = 'active'
  order by sp.created_at
  limit 1;

  if seed_user is null then
    return;
  end if;

  if not exists (select 1 from public.progress_tips) then
    insert into public.progress_tips (label, body, sort_order, updated_by) values
      (
        'SOP Flow',
        'Don''t start your SOP with your academic history — start with why this dream matters to you. Story > Stats.',
        0,
        seed_user
      ),
      (
        'SOP Flow',
        'Don''t start your SOP with your academic history — start with why this dream matters to you. Story > Stats.',
        1,
        seed_user
      ),
      (
        'SOP Flow',
        'Don''t start your SOP with your academic history — start with why this dream matters to you. Story > Stats.',
        2,
        seed_user
      );
  end if;

  if not exists (select 1 from public.progress_resources) then
    insert into public.progress_resources (label, url, sort_order, updated_by) values
      ('Visa Docs Checklist', '', 0, seed_user),
      ('Sample SOP for STEM', '', 1, seed_user),
      ('pre-journey checklist', '', 2, seed_user);
  end if;
end $$;
