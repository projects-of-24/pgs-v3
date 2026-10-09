-- WS-COMMENTS-1 QC: workspace_comments had INSERT/UPDATE/SELECT RLS but no DELETE.
-- Desk trash icon failed closed (0 rows / "not found"). Also allow managing staff to UPDATE any comment.

drop policy if exists "authors and staff delete comments" on public.workspace_comments;
create policy "authors and staff delete comments"
  on public.workspace_comments
  for delete
  to authenticated
  using (
    author_id = auth.uid()
    or private.can_manage_premium_student(student_id)
  );

drop policy if exists "authors update comments" on public.workspace_comments;
create policy "authors and staff update comments"
  on public.workspace_comments
  for update
  to authenticated
  using (
    (
      author_id = auth.uid()
      and (
        (student_id = auth.uid() and private.has_active_premium(student_id))
        or private.can_manage_premium_student(student_id)
      )
    )
    or private.can_manage_premium_student(student_id)
  )
  with check (
    (
      author_id = auth.uid()
      and (
        (student_id = auth.uid() and private.has_active_premium(student_id) and visibility = 'student_visible')
        or private.can_manage_premium_student(student_id)
      )
    )
    or private.can_manage_premium_student(student_id)
  );
