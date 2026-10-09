-- UM2b follow-up: Dashboard / Notifications / Activity are common for all staff — not grantable.

delete from public.staff_nav_grants
where nav_key in ('ops-dashboard', 'ops-notifications', 'ops-activity');

alter table public.staff_nav_grants
  drop constraint if exists staff_nav_grants_nav_key_check;

alter table public.staff_nav_grants
  add constraint staff_nav_grants_nav_key_check check (
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
  );

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
