/**
 * Notes + aspirant pills + Track / #purpleBoard.
 * Desktop: Notes | aspirant+actions (owner cluster + Figma Note 9 / actions).
 * Mobile: aspirant → actions → (QD elsewhere) → Notes — order owned by mid-cluster.
 *
 * Purple Notes = `premium_workspace_profiles.notes_html` (Junior dash-cms ADAPT).
 * Not the same as `counselor_notes` on /feed_track_progress.
 * Aspirant pills: Student Operations + profile — see docs/STUDENT-FEED-MODULAR.md.
 */
import Image from "next/image";
import Link from "next/link";
import { STUDENT_FEED_NOTES_BODY } from "./feed-notes-default";
import "./student-feed-notes-actions.css";

export { STUDENT_FEED_NOTES_BODY };

export type StudentFeedNotesActionsProps = {
  pathwayLabel?: string;
  classOf?: string;
  gender?: string;
  location?: string;
  countries?: Array<{ code: string; flagSrc: string; name: string }>;
};

const DEFAULT_COUNTRIES = [
  {
    code: "USA",
    name: "USA",
    flagSrc: "/assets/img/figma-feed/flag-usa.png"
  },
  {
    code: "UK",
    name: "UK",
    flagSrc: "/assets/img/figma-feed/flag-uk.svg"
  }
];

export function StudentFeedNotesCard({
  body = STUDENT_FEED_NOTES_BODY
}: {
  body?: string;
}) {
  return (
    <article
      className="student-feed-notes"
      data-pgs-module="student-feed-notes"
      data-figma-desktop="18375:11117"
      data-figma-mobile="206:5915"
      aria-label="Notes"
    >
      <h2 className="student-feed-notes__title">Notes</h2>
      {/* Plain text only — never dangerouslySetInnerHTML (XSS). */}
      <p className="student-feed-notes__body">{body}</p>
    </article>
  );
}

export function StudentFeedAspirantPills({
  pathwayLabel = "MBA",
  classOf = "class of 2025",
  gender = "Male",
  location = "White Town, Pondicherry",
  countries = DEFAULT_COUNTRIES
}: StudentFeedNotesActionsProps) {
  return (
    <div
      className="student-feed-aspirant"
      data-pgs-module="student-feed-aspirant"
      aria-label="Aspirant profile summary"
    >
      <p className="student-feed-aspirant__title">
        <span className="student-feed-aspirant__chip is-teal">
          {pathwayLabel} Aspirant @ {classOf}
        </span>
      </p>
      <div className="student-feed-aspirant__gender">
        <span className="student-feed-aspirant__chip is-pink">Gender</span>
        <span className="student-feed-aspirant__chip is-cyan">{gender}</span>
      </div>
      <div className="student-feed-aspirant__location">
        <span className="student-feed-aspirant__pin" aria-hidden="true">
          📍
        </span>
        <span className="student-feed-aspirant__chip is-pink">{location}</span>
      </div>
      <ul className="student-feed-aspirant__countries">
        {countries.map((c) => (
          <li key={c.code} className="student-feed-aspirant__country">
            <Image src={c.flagSrc} alt="" width={25} height={16} unoptimized />
            <span className="student-feed-aspirant__chip is-cyan">{c.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function StudentFeedActionLinks() {
  return (
    <div
      className="student-feed-actions"
      data-pgs-module="student-feed-actions"
      aria-label="Feed actions"
    >
      {/* Arrow top/left nudge deferred — owner will sort in DevTools */}
      <div className="student-feed-actions__row is-track">
        <Link className="student-feed-actions__btn" href="/feed_track_progress">
          Track Your Progress
        </Link>
        <div className="student-feed-actions__callout">
          <Image
            className="student-feed-actions__arrow"
            src="/assets/img/figma-feed/action-arrow-track.svg"
            alt=""
            width={45}
            height={66}
            unoptimized
            aria-hidden="true"
          />
          <p className="student-feed-actions__hint">
            See what&apos;s done, what&apos;s in progress, and what&apos;s coming next.
          </p>
        </div>
      </div>
      <div className="student-feed-actions__row is-board">
        <Link className="student-feed-actions__btn" href="/purpleboard">
          #purpleBoard
        </Link>
        <div className="student-feed-actions__callout">
          <Image
            className="student-feed-actions__arrow"
            src="/assets/img/figma-feed/action-arrow-board.svg"
            alt=""
            width={80}
            height={80}
            unoptimized
            aria-hidden="true"
          />
          <p className="student-feed-actions__hint">
            Get the latest on scholarships, newly opened courses, and important updates, all in one
            place.
          </p>
        </div>
      </div>
    </div>
  );
}

/** Desktop right column: aspirant + actions stacked (Figma / owner screenshot). */
export function StudentFeedAspirantActions(props: StudentFeedNotesActionsProps) {
  return (
    <div className="student-feed-aspirant-actions">
      <StudentFeedAspirantPills {...props} />
      <StudentFeedActionLinks />
    </div>
  );
}
