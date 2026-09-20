/**
 * Section 8 — Upcoming Events.
 * Desktop Figma `17961:10810` · Mobile `206:6244`.
 * Phase 2A: site-wide published `events` (prop). Fixture fallback if empty.
 * Per-student Dash CMS pin list — DEFERRED (backend/CMS backlog).
 * Full calendar page — DEFERRED (no Figma yet).
 */
"use client";

import { useMemo, useState } from "react";
import type { FeedUpcomingEvent } from "./feed-upcoming-event";
import { FEED_UPCOMING_CHIP_LIMIT } from "./feed-upcoming-event";
import "./student-feed-upcoming-events.css";

export type FeedUpcomingEventView = FeedUpcomingEvent & {
  titleLines?: readonly string[];
};

/** Figma visual fallback when CMS has no published events. */
const FIXTURE_EVENTS: FeedUpcomingEventView[] = [
  {
    id: "ue-1",
    title: "Visa 101 Webinar",
    date: "SEP 7",
    time: "7 PM IST",
    blurb: "Meet our Visa Counselor (5+ years experience)",
    mode: "Google Meet",
    startsAt: "2025-09-07T19:00:00+05:30"
  },
  {
    id: "ue-2",
    title: "Visa 101 Webinar",
    date: "AUG 29",
    time: "7 PM IST",
    blurb: "Meet our Visa Counselor (5+ years experience)",
    mode: "Google Meet",
    startsAt: "2025-08-29T19:00:00+05:30"
  },
  {
    id: "ue-3",
    title: "Spotlight UCL",
    titleLines: ["Spotlight", "UCL"],
    date: "APRIL 23",
    time: "7:30 PM IST",
    blurb: "Meet our Visa Counselor (5+ years experience)",
    mode: "Google Meet",
    startsAt: "2025-04-23T19:30:00+05:30"
  },
  {
    id: "ue-4",
    title: "Fixture event",
    date: "APRIL 7",
    time: "7 PM IST",
    blurb: "",
    mode: "Online",
    startsAt: "2025-04-07T19:00:00+05:30"
  },
  {
    id: "ue-5",
    title: "Fixture event",
    date: "MAY 1",
    time: "7 PM IST",
    blurb: "",
    mode: "Online",
    startsAt: "2025-05-01T19:00:00+05:30"
  },
  {
    id: "ue-6",
    title: "Fixture event",
    date: "JUN 12",
    time: "7 PM IST",
    blurb: "",
    mode: "Online",
    startsAt: "2025-06-12T19:00:00+05:30"
  },
  {
    id: "ue-7",
    title: "Fixture event",
    date: "JUL 3",
    time: "7 PM IST",
    blurb: "",
    mode: "Online",
    startsAt: "2025-07-03T19:00:00+05:30"
  }
];

const DOW = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"] as const;

type Cell = { day: number; inMonth: boolean; hasEvent: boolean };

function buildCells(year: number, month: number, eventDays: Set<number>): Cell[] {
  const firstWeekday = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  const cells: Cell[] = [];

  for (let i = firstWeekday - 1; i >= 0; i--) {
    cells.push({ day: daysInPrev - i, inMonth: false, hasEvent: false });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, inMonth: true, hasEvent: eventDays.has(d) });
  }
  // Always 6 weeks (42 cells) so calendar panel height is stable → page footer doesn't jump.
  let next = 1;
  while (cells.length < 42) {
    cells.push({ day: next++, inMonth: false, hasEvent: false });
  }
  return cells;
}

function initialCursor(events: FeedUpcomingEventView[]): Date {
  for (const ev of events) {
    if (!ev.startsAt) continue;
    const d = new Date(ev.startsAt);
    if (!Number.isNaN(d.getTime())) {
      return new Date(d.getFullYear(), d.getMonth(), 1);
    }
  }
  return new Date(2025, 3, 1);
}

function EventCard({ event }: { event: FeedUpcomingEventView }) {
  return (
    <article className="student-feed-ue__card">
      <h3 className="student-feed-ue__chip is-title">
        {event.titleLines ? (
          <>
            {event.titleLines.map((line) => (
              <span key={line} className="student-feed-ue__chip-line">
                {line}
              </span>
            ))}
          </>
        ) : (
          event.title
        )}
      </h3>
      <div className="student-feed-ue__chip-row">
        <span className="student-feed-ue__chip">{event.date}</span>
        {event.time ? <span className="student-feed-ue__chip">{event.time}</span> : null}
      </div>
      {event.blurb ? <p className="student-feed-ue__blurb">{event.blurb}</p> : null}
      <p className="student-feed-ue__mode">
        <strong>Mode: </strong>
        <span>{event.mode}</span>
      </p>
    </article>
  );
}

export type StudentFeedUpcomingEventsProps = {
  /** Site-wide published events from CMS. Empty → Figma fixture fallback. */
  events?: FeedUpcomingEvent[];
};

export function StudentFeedUpcomingEvents({ events }: StudentFeedUpcomingEventsProps) {
  const feedEvents: FeedUpcomingEventView[] =
    events && events.length > 0 ? events : FIXTURE_EVENTS;
  const usingFixture = !(events && events.length > 0);

  const chipEvents = feedEvents.slice(0, FEED_UPCOMING_CHIP_LIMIT);
  const moreCount = Math.max(0, feedEvents.length - FEED_UPCOMING_CHIP_LIMIT);

  const [cursor, setCursor] = useState(() => initialCursor(feedEvents));

  const year = cursor.getFullYear();
  const month = cursor.getMonth();
  const monthName = cursor.toLocaleString("en-US", { month: "long" }).toUpperCase();

  const eventDays = useMemo(() => {
    const set = new Set<number>();
    for (const ev of feedEvents) {
      if (!ev.startsAt) continue;
      const d = new Date(ev.startsAt);
      if (!Number.isNaN(d.getTime()) && d.getFullYear() === year && d.getMonth() === month) {
        set.add(d.getDate());
      }
    }
    return set;
  }, [feedEvents, year, month]);

  const cells = useMemo(() => buildCells(year, month, eventDays), [year, month, eventDays]);

  function shiftMonth(delta: number) {
    setCursor((prev) => new Date(prev.getFullYear(), prev.getMonth() + delta, 1));
  }

  const topPair = chipEvents.slice(0, 2);
  const bottomCard = chipEvents[2];

  return (
    <section
      className="student-feed-ue"
      data-pgs-module="student-feed-upcoming-events"
      data-figma-desktop="17961:10810"
      data-figma-mobile="206:6244"
      data-phase={usingFixture ? "2a-fixture-fallback" : "2a-events"}
      data-source={usingFixture ? "fixture" : "events"}
      aria-label="Upcoming Events"
    >
      <h2 className="student-feed-ue__title">Upcoming Events</h2>

      <div className="student-feed-ue__layout">
        <div className="student-feed-ue__calendar" aria-label={`Calendar for ${monthName} ${year}`}>
          <div className="student-feed-ue__cal-header">
            <button
              type="button"
              className="student-feed-ue__nav is-prev"
              aria-label="Previous month"
              onClick={() => shiftMonth(-1)}
            >
              <span aria-hidden="true">‹</span>
            </button>
            <div className="student-feed-ue__pills">
              <span className="student-feed-ue__pill">{monthName}</span>
              <span className="student-feed-ue__pill">{year}</span>
            </div>
            <button
              type="button"
              className="student-feed-ue__nav is-next"
              aria-label="Next month"
              onClick={() => shiftMonth(1)}
            >
              <span aria-hidden="true">›</span>
            </button>
          </div>

          <div className="student-feed-ue__dow" aria-hidden="true">
            {DOW.map((d) => (
              <span key={d}>{d}</span>
            ))}
          </div>

          <div className="student-feed-ue__grid">
            {cells.map((cell, i) => (
              <span
                key={`d-${i}`}
                className={[
                  "student-feed-ue__day",
                  cell.inMonth ? "" : " is-muted",
                  cell.hasEvent ? " has-event" : ""
                ].join("")}
              >
                {cell.day}
              </span>
            ))}
          </div>
        </div>

        <div className="student-feed-ue__cards">
          {topPair.length > 0 ? (
            <div className="student-feed-ue__cards-top">
              {topPair.map((ev) => (
                <EventCard key={ev.id} event={ev} />
              ))}
            </div>
          ) : null}
          <div className="student-feed-ue__cards-bottom">
            {bottomCard ? <EventCard event={bottomCard} /> : null}
            {/* Full calendar page link — DEFERRED (no Figma page yet). */}
            {moreCount > 0 ? (
              <div className="student-feed-ue__more" aria-label={`${moreCount} more events`}>
                <span className="student-feed-ue__more-plus">
                  <span aria-hidden="true">+</span>
                  <span>{moreCount}</span>
                </span>
                <span className="student-feed-ue__more-label">more</span>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
