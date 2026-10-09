-- Ops staff self avatar (P1-photo). Private bucket; writes only via validated server route.
-- Path contract mirrors student avatars: {user_id}/{uuid}.{ext}

alter table public.staff_profiles
  add column if not exists avatar_path text;

alter table public.staff_profiles
  drop constraint if exists staff_profiles_avatar_path_own_folder;

alter table public.staff_profiles
  add constraint staff_profiles_avatar_path_own_folder
  check (avatar_path is null or avatar_path like user_id::text || '/%');

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'staff-avatars',
  'staff-avatars',
  false,
  5242880,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- Browser may read own objects; all writes go through service-role server route.
drop policy if exists "staff read own avatars" on storage.objects;
create policy "staff read own avatars" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'staff-avatars'
    and (storage.foldername(name))[1] = (select auth.uid())::text
  );

create or replace function public.update_staff_avatar_path(target_avatar_path text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  old_path text;
begin
  if not private.has_staff_permission('overview.read') then
    raise exception 'forbidden';
  end if;

  if target_avatar_path is null
     or char_length(trim(target_avatar_path)) < 3
     or char_length(trim(target_avatar_path)) > 512
     or trim(target_avatar_path) not like (auth.uid())::text || '/%' then
    raise exception 'forbidden';
  end if;

  select avatar_path into old_path
  from public.staff_profiles
  where user_id = auth.uid() and status = 'active';

  if not found then
    raise exception 'forbidden';
  end if;

  update public.staff_profiles
  set avatar_path = trim(target_avatar_path), updated_at = now()
  where user_id = auth.uid() and status = 'active';

  insert into public.admin_audit_logs(
    actor_id, action, domain, entity_type, entity_id, target_user_id, old_values, new_values
  )
  values (
    auth.uid(),
    'staff_avatar_updated',
    'staff',
    'staff_profile',
    auth.uid()::text,
    auth.uid(),
    jsonb_build_object('avatar_path', old_path),
    jsonb_build_object('avatar_path', trim(target_avatar_path))
  );
end;
$$;

revoke all on function public.update_staff_avatar_path(text) from public, anon;
grant execute on function public.update_staff_avatar_path(text) to authenticated;
