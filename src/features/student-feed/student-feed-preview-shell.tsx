/**
 * Preview body shell — all #feed section slots in Figma order.
 * Section 1 identity filled; remaining slots locked placeholders.
 * Live `/student/dashboard` untouched. iPad deferred.
 */
import { StudentFeedIdentityCard } from "./student-feed-identity-card";
import { StudentFeedSectionSlot } from "./student-feed-section-slot";
import "./student-feed-preview-shell.css";

export function StudentFeedPreviewShell() {
  return (
    <div className="student-feed-preview-shell" data-pgs-module="student-feed-preview">
      <p className="student-feed-preview-shell__banner" role="status">
        Side-test — student <strong>#feed</strong> modular body. Live{" "}
        <code>/student/dashboard</code> (Hostinger) unchanged. Desktop + mobile first; iPad
        deferred.
      </p>

      <div className="student-feed-preview-shell__body">
        <div className="student-feed-preview-shell__main">
          {/* 1 — Identity (DONE) */}
          <StudentFeedIdentityCard />

          {/* 2 — Quick dashboard (LOCKED) */}
          <StudentFeedSectionSlot
            id="quick-dashboard-overview"
            title="Your Quick Dashboard overview"
            module="student-feed-quick-dashboard"
            locked
            note="Section 2 — Figma pending"
            minHeight={220}
          />

          {/* 4 — Notes + actions */}
          <StudentFeedSectionSlot
            id="notes-actions"
            title="Notes + actions"
            module="student-feed-notes-actions"
            locked={false}
            note="Section 4 — Figma pending (unlocked in locked-feed frame)"
            minHeight={200}
          />

          {/* 6 — Where You Stand (LOCKED) */}
          <StudentFeedSectionSlot
            id="where-you-stand"
            title="Where You Stand"
            module="student-feed-where-you-stand"
            locked
            note="Section 6 — Figma pending (includes finalized / tasks)"
            minHeight={320}
          />

          {/* 7 — Comments (LOCKED) */}
          <StudentFeedSectionSlot
            id="comments"
            title="Comments"
            module="student-feed-comments"
            locked
            note="Section 7 — Figma pending"
            minHeight={240}
          />

          {/* 8 — Upcoming Events */}
          <StudentFeedSectionSlot
            id="upcoming-events"
            title="Upcoming Events"
            module="student-feed-upcoming-events"
            locked={false}
            note="Section 8 — Figma pending"
            minHeight={280}
          />
        </div>

        <aside className="student-feed-preview-shell__aside">
          {/* 3 — Top picks */}
          <StudentFeedSectionSlot
            id="top-picks"
            title="Top picks"
            module="student-feed-top-picks"
            locked={false}
            note="Section 3 — Figma pending"
            minHeight={360}
          />

          {/* 5 — Help hub */}
          <StudentFeedSectionSlot
            id="help-hub"
            title="Help Hub / unlock copy"
            module="student-feed-help-hub"
            locked={false}
            note="Section 5 — Figma pending"
            minHeight={220}
          />
        </aside>
      </div>

      <p className="student-feed-preview-shell__deferred" role="note">
        Deferred: iPad (601–1366) · Premium unlocked body · live Hostinger cutover · CMS wiring.
        Next: Figma → code one section at a time into these slots.
      </p>
    </div>
  );
}
