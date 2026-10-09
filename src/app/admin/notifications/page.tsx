import { OperationsNotificationInbox } from "@/components/operations-notification-inbox";
import { loadOperationsNotifications } from "@/lib/operations-notifications-server";
import {
  normalizeStaffNotificationFilter,
  type StaffNotificationFilter
} from "@/lib/operations-notifications";
import { requireStaffPermission } from "@/lib/staff-auth";

function resolveFilter(raw: string | undefined): StaffNotificationFilter {
  if (!raw) return "all";
  return normalizeStaffNotificationFilter(raw);
}

export default async function StaffNotificationsPage({
  searchParams
}: {
  searchParams: Promise<{ view?: string | string[] }>;
}) {
  await requireStaffPermission("overview.read");
  const query = await searchParams;
  const rawView = Array.isArray(query.view) ? query.view[0] : query.view;
  const filter = resolveFilter(rawView);

  const [allItems, unreadItems, readItems, recentItems] = await Promise.all([
    loadOperationsNotifications("all"),
    loadOperationsNotifications("unread"),
    loadOperationsNotifications("read"),
    filter === "recent" ? loadOperationsNotifications("recent") : Promise.resolve([])
  ]);

  const counts = {
    all: allItems.length,
    unread: unreadItems.length,
    read: readItems.length
  };

  const notifications =
    filter === "unread"
      ? unreadItems
      : filter === "read"
        ? readItems
        : filter === "recent"
          ? recentItems
          : allItems;

  return (
    <div className="ops-page ops-notifications-page">
      <header className="ops-notifications-page-header">
        <nav className="ops-notifications-breadcrumb" aria-label="Breadcrumb">
          <span>Notifications</span>
          <span className="ops-notifications-breadcrumb-sep" aria-hidden="true">
            ›
          </span>
          <span aria-current="page">Notifications</span>
        </nav>
        <h1>Notifications</h1>
        <p>
          Stay updated with important updates, mentions and activities. Opening a notification may
          require normal permission.
        </p>
      </header>

      <section className="ops-notifications-panel" aria-labelledby="ops-notifications-heading">
        <h2 id="ops-notifications-heading" className="ops-notifications-visually-hidden">
          Notifications inbox
        </h2>
        <OperationsNotificationInbox
          key={filter}
          initialItems={notifications}
          filter={filter}
          counts={counts}
        />
      </section>
    </div>
  );
}
