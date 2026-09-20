/**
 * Shared feed Upcoming Events types (safe for client + server).
 */
export type FeedUpcomingEvent = {
  id: string;
  title: string;
  date: string;
  time: string;
  blurb: string;
  mode: string;
  /** ISO date used to mark the month calendar. */
  startsAt: string | null;
};

export const FEED_UPCOMING_CHIP_LIMIT = 3;
