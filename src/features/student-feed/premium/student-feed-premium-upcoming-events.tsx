/**
 * Family B Pass 8 — Upcoming Events.
 * Reuses Family A LOCKED UI + 2A site-wide `events` (fixture if empty).
 * No forlocked on Figma; per-student pin list = B8 backlog.
 */
import type { FeedUpcomingEvent } from "../feed-upcoming-event";
import { StudentFeedUpcomingEvents } from "../student-feed-upcoming-events";

type Props = {
  events?: FeedUpcomingEvent[];
};

export function StudentFeedPremiumUpcomingEvents({ events }: Props) {
  return (
    <div
      data-pgs-module="student-feed-premium-upcoming-events"
      data-feed-family="premium"
      data-premium-pass="8-upcoming-events"
      data-cms="2A-site-wide"
    >
      <StudentFeedUpcomingEvents events={events} />
    </div>
  );
}
