-- WS-FILL-3 — Mentor-assign Top picks per Premium student (courses only).
-- Staff Desk writes; student #FEED Top picks reads same rows.

create table public.student_feed_top_picks (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references public.profiles(id) on delete cascade,
  course_id bigint not null references public.courses(id) on delete cascade,
  sort_order integer not null default 0
    check (sort_order >= 0 and sort_order <= 1000000),
  status text not null default 'InProgress'
    check (status in ('InProgress', 'FileldUp')),
  assigned_by uuid not null references auth.users(id) on delete restrict,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (student_id, course_id)
);

create index student_feed_top_picks_student_sort_idx
  on public.student_feed_top_picks (student_id, sort_order, created_at desc);

comment on table public.student_feed_top_picks is
  'WS-FILL-3 mentor-assigned Top picks per student (course catalog). One truth for Desk + #FEED.';

alter table public.student_feed_top_picks enable row level security;

create policy "authorized users read student feed top picks"
  on public.student_feed_top_picks
  for select to authenticated
  using (private.can_access_premium_student(student_id));

create policy "staff insert student feed top picks"
  on public.student_feed_top_picks
  for insert to authenticated
  with check (
    private.can_manage_premium_student(student_id)
    and assigned_by = auth.uid()
  );

create policy "staff update student feed top picks"
  on public.student_feed_top_picks
  for update to authenticated
  using (private.can_manage_premium_student(student_id))
  with check (private.can_manage_premium_student(student_id));

create policy "staff delete student feed top picks"
  on public.student_feed_top_picks
  for delete to authenticated
  using (private.can_manage_premium_student(student_id));

grant select, insert, update, delete on public.student_feed_top_picks to authenticated;
