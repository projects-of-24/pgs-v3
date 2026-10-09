-- UM2b: per-user Ops sidetab menu grants (nav visibility only — not RLS authority).

create table if not exists public.staff_nav_grants (
  user_id uuid not null references public.staff_profiles(user_id) on delete cascade,
  nav_key text not null,
  granted_by uuid references auth.users(id) on delete set null,
  granted_at timestamptz not null default now(),
  primary key (user_id, nav_key),
  constraint staff_nav_grants_nav_key_check check (
    nav_key in (
      'ops-students',
      'ops-targets',
      'ops-team',
      'cms-courses',
      'cms-webinar',
      'cms-universities',
      'cms-testimonial',
      'cms-media'
    )
  )
);

create index if not exists staff_nav_grants_user_id_idx
  on public.staff_nav_grants (user_id);

alter table public.staff_nav_grants enable row level security;

drop policy if exists "staff read own nav grants" on public.staff_nav_grants;
create policy "staff read own nav grants"
  on public.staff_nav_grants
  for select
  to authenticated
  using (
    user_id = (select auth.uid())
    or private.has_staff_permission('roles.manage')
    or private.has_staff_permission('staff.read')
  );

revoke all on public.staff_nav_grants from public, anon;
grant select on public.staff_nav_grants to authenticated;

create or replace function public.staff_nav_grants_list(target_user uuid)
returns text[]
language plpgsql
security definer
set search_path = ''
as $$
declare
  keys text[];
begin
  if target_user is null then
    raise exception 'forbidden';
  end if;

  -- Own grants (for sidetab) or roles.manage / staff.read for admin UI.
  if target_user <> auth.uid()
    and not private.has_staff_permission('roles.manage')
    and not private.has_staff_permission('staff.read') then
    raise exception 'forbidden';
  end if;

  select coalesce(array_agg(g.nav_key order by g.nav_key), '{}'::text[])
    into keys
  from public.staff_nav_grants g
  where g.user_id = target_user;

  return keys;
end;
$$;

revoke all on function public.staff_nav_grants_list(uuid) from public, anon;
grant execute on function public.staff_nav_grants_list(uuid) to authenticated;

create or replace function public.manage_staff_nav_grants(
  target_user uuid,
  target_nav_keys text[]
)
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  allowed constant text[] := array[
    'ops-students',
    'ops-targets',
    'ops-team',
    'cms-courses',
    'cms-webinar',
    'cms-universities',
    'cms-testimonial',
    'cms-media'
  ];
  cleaned text[] := '{}'::text[];
  previous text[] := '{}'::text[];
  key text;
  inserted integer := 0;
begin
  if not private.has_staff_permission('roles.manage') then
    raise exception 'forbidden';
  end if;
  if target_user is null then
    raise exception 'forbidden';
  end if;
  if target_user = auth.uid() then
    raise exception 'self role changes are forbidden';
  end if;
  if not exists (
    select 1 from public.staff_profiles sp
    where sp.user_id = target_user and sp.status in ('active', 'suspended')
  ) then
    raise exception 'staff identity not found';
  end if;

  -- Reject Super Admin targets (UM list excludes them; fail closed).
  if exists (
    select 1
    from public.staff_role_assignments a
    join public.staff_roles r on r.id = a.role_id
    where a.staff_user_id = target_user
      and a.revoked_at is null
      and r.key = 'super_admin'
  ) then
    raise exception 'forbidden';
  end if;

  select coalesce(array_agg(g.nav_key order by g.nav_key), '{}'::text[])
    into previous
  from public.staff_nav_grants g
  where g.user_id = target_user;

  if target_nav_keys is not null then
    foreach key in array target_nav_keys loop
      if key = any(allowed) and not (key = any(cleaned)) then
        cleaned := array_append(cleaned, key);
      end if;
    end loop;
  end if;

  delete from public.staff_nav_grants where user_id = target_user;

  if array_length(cleaned, 1) is not null then
    insert into public.staff_nav_grants(user_id, nav_key, granted_by)
    select target_user, k, auth.uid()
    from unnest(cleaned) as k;
    get diagnostics inserted = row_count;
  end if;

  perform private.write_audit_event(
    'staff.nav_grants_changed',
    auth.uid(),
    'staff_user',
    target_user::text,
    'succeeded',
    'staff',
    jsonb_build_object(
      'result', 'nav_grants_updated',
      'previous_count', coalesce(array_length(previous, 1), 0),
      'new_count', coalesce(array_length(cleaned, 1), 0),
      'previous_role', array_to_string(previous, ','),
      'new_role', array_to_string(cleaned, ',')
    ),
    null
  );

  return inserted;
end;
$$;

revoke all on function public.manage_staff_nav_grants(uuid, text[]) from public, anon;
grant execute on function public.manage_staff_nav_grants(uuid, text[]) to authenticated;
