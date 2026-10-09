-- NAV1: Dashboard, Notifications, Activity common to all staff roles.
-- Grant audit.read to mentor + read_only_staff so Activity (/ops/activity) opens
-- for those roles (RPC staff_operations_activity requires audit.read).
-- Admin Panel / User Management / Permissions remain Super Admin only in UI.

insert into public.staff_role_permissions(role_id, permission_id)
select r.id, p.id
from public.staff_roles r
join public.staff_permissions p on p.key = 'audit.read'
where r.key in ('mentor', 'read_only_staff')
on conflict do nothing;
