/**
 * Section 6 — Where You Stand (phased).
 * 6A: header — Desktop `18375:10897` · Mobile `206:6778`.
 * 6B: Prep top — Desktop `18375:10903` · Mobile `206:6781`.
 * 6C: Prep Status — Desktop `18375:10922` · Mobile `206:6817`.
 * 6D: Finalized Uni List — Desktop `18375:10956` · Mobile `206:6878`.
 * 6E: Working On + Future tasks — Desktop `18375:10941` · Mobile `206:6951`.
 * forlocked on Prep / Finalized / Tasks. Comments = separate module.
 */
import Image from "next/image";
import "./student-feed-where-you-stand.css";

const LOCK_SRC = "/assets/img/lock.png";
const UNI_IMG = "/assets/img/figma-feed/wys-uni-campus.png";
const PLUS_SRC = "/assets/img/figma-feed/wys-plus.svg";

export const STUDENT_FEED_WYS_INTRO =
  "This is the heart of your study path. This centralized study dashboard helps you track onboarding, monitor progress, see key milestones, and identify next steps. Designed to keep you on track.";

const ONBOARDING = [
  { text: "Profile Setup Complete", checked: true },
  { text: "University Shortlist Discussed", checked: false },
  { text: "SOP Discussion Done", checked: false },
  { text: "IELTS/GRE Status Confirmed", checked: false },
  { text: "Resume Uploaded", checked: false },
  { text: "LOR Briefed", checked: false },
  { text: "Loan & Finance Discussed", checked: false }
] as const;

const FEEDBACK = [{ text: "One-on-One Session Booked", checked: false }] as const;

/** Figma fixture: left/right digit pair (not a single “10”). */
const DOCUMENTS = [
  { left: "1", right: "0", label: "SOP Drafts Uploaded", pending: false },
  { left: "0", right: "3", label: "LORs Uploaded", pending: false },
  { left: "0", right: "3", label: "Degree Certificate Uploaded", pending: false },
  { left: "0", right: "3", label: "Graduation Transcript", pending: false },
  { left: "0", right: "3", label: "Passport Front/Back", pending: false },
  { left: "0", right: "3", label: "Loan Documents If Applied", pending: false },
  { left: "0", right: "3", label: "Other Documents", pending: false },
  { left: "0", right: "3", label: "Pending Documents*", pending: true }
] as const;

const SHORTLIST = [
  { left: "0", right: "3", label: "USA - Stream Choice 1" },
  { left: "0", right: "3", label: "USA- Stream Choice 3" }
] as const;

/** Figma fixture: 7 cards · label “06” (desktop `18375:10956`). */
const FINALIZED_UNIS = Array.from({ length: 7 }, (_, i) => ({
  id: `uni-${i + 1}`,
  name: "Univ of washington",
  tag: "#USA",
  imageSrc: UNI_IMG
}));

/** Desktop Figma `18375:10941` fixture rows. */
const WORKING_ON = [
  { text: "One-on-One Session Booked", badge: "URGENT" as const },
  { text: "One-on-One Session Booked", badge: null },
  { text: "One-on-One Session Booked One-on-One Session Booked", badge: null }
];

const FUTURE_TASKS = [
  { text: "One-on-One Session Booked", badge: null },
  { text: "One-on-One Session Booked", badge: "IMP" as const },
  { text: "One-on-One Session Booked One-on-One Session Booked", badge: null }
];

export type StudentFeedWhereYouStandProps = {
  /** When false / omitted, show forlocked overlays. */
  premiumActive?: boolean;
};

function Toggle({ checked, label }: { checked: boolean; label: string }) {
  return (
    <span
      className={`student-feed-wys__toggle${checked ? " is-on" : " is-off"}`}
      role="img"
      aria-label={`${label}: ${checked ? "yes" : "no"}`}
    >
      <span className="student-feed-wys__toggle-knob" aria-hidden="true" />
    </span>
  );
}

function CountPair({
  left,
  right,
  label,
  pending = false
}: {
  left: string;
  right: string;
  label: string;
  pending?: boolean;
}) {
  return (
    <li className={`student-feed-wys__count-row${pending ? " is-pending" : ""}`}>
      <span
        className="student-feed-wys__counts"
        aria-label={`${label}: ${left} and ${right}`}
      >
        <span className="student-feed-wys__count is-left" aria-hidden="true">
          {left}
        </span>
        <span className="student-feed-wys__count is-right" aria-hidden="true">
          {right}
        </span>
      </span>
      <span className="student-feed-wys__count-label">{label}</span>
    </li>
  );
}

function UniCard({ name, tag, imageSrc }: { name: string; tag: string; imageSrc: string }) {
  return (
    <article className="student-feed-wys__uni-card">
      <div className="student-feed-wys__uni-label">
        {/* eslint-disable-next-line @next/next/no-img-element -- small decorative Figma SVG */}
        <img className="student-feed-wys__uni-plus" src={PLUS_SRC} alt="" width={20} height={20} />
        <span className="student-feed-wys__uni-name">{name}</span>
      </div>
      <div className="student-feed-wys__uni-media">
        <Image
          className="student-feed-wys__uni-img"
          src={imageSrc}
          alt=""
          width={186}
          height={186}
          unoptimized
        />
        <span className="student-feed-wys__uni-tag">{tag}</span>
      </div>
    </article>
  );
}

function TaskRow({ text, badge }: { text: string; badge: "URGENT" | "IMP" | null }) {
  return (
    <li className={`student-feed-wys__task-row${badge ? " has-badge" : ""}`}>
      {badge ? <span className="student-feed-wys__task-badge">{badge}</span> : null}
      <span className="student-feed-wys__task-text">{text}</span>
    </li>
  );
}

function ForlockedOverlay() {
  return (
    <div
      className="student-feed-wys__forlocked"
      role="img"
      aria-label="Yet to Unlock Full Access"
    >
      <Image src={LOCK_SRC} alt="" width={144} height={144} unoptimized />
    </div>
  );
}

export function StudentFeedWhereYouStand({ premiumActive = false }: StudentFeedWhereYouStandProps) {
  const unlocked = premiumActive;

  return (
    <section
      className={`student-feed-wys${unlocked ? " is-unlocked" : " is-locked"}`}
      data-pgs-module="student-feed-where-you-stand"
      data-wys-phase="6A+6B+6C+6D+6E"
      data-figma-desktop-header="18375:10897"
      data-figma-desktop-prep-top="18375:10903"
      data-figma-desktop-prep-status="18375:10922"
      data-figma-desktop-finalized="18375:10956"
      data-figma-desktop-tasks="18375:10941"
      data-figma-mobile-header="206:6778"
      data-figma-mobile-prep="206:6781"
      data-figma-mobile-prep-status="206:6817"
      data-figma-mobile-finalized="206:6878"
      data-figma-mobile-tasks="206:6951"
      aria-labelledby="student-feed-wys-title"
    >
      <header className="student-feed-wys__header">
        <h2 id="student-feed-wys-title" className="student-feed-wys__title">
          Where You Stand
        </h2>
        <p className="student-feed-wys__intro">{STUDENT_FEED_WYS_INTRO}</p>
      </header>

      {/* 6B+6C — real Prep UI underneath; forlocked on top when locked */}
      <div className="student-feed-wys__prep" data-wys-block="prep">
        <div className="student-feed-wys__prep-body">
          <div className="student-feed-wys__prep-top">
            <div className="student-feed-wys__pct">
              <p className="student-feed-wys__pct-value">14%</p>
              <p className="student-feed-wys__pct-label">
                through your
                <br />
                onboarding
                <br />
                journey
              </p>
            </div>

            <div className="student-feed-wys__prep-cards">
              <article className="student-feed-wys__card is-checklist">
                <h3 className="student-feed-wys__card-title">Onboarding Checklist</h3>
                <ul className="student-feed-wys__check-list">
                  {ONBOARDING.map((item) => (
                    <li key={item.text} className="student-feed-wys__check-row">
                      <Toggle checked={item.checked} label={item.text} />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </article>

              <article className="student-feed-wys__card is-feedback">
                <h3 className="student-feed-wys__card-title">June feedback session</h3>
                <ul className="student-feed-wys__check-list">
                  {FEEDBACK.map((item) => (
                    <li key={item.text} className="student-feed-wys__check-row">
                      <Toggle checked={item.checked} label={item.text} />
                      <span>{item.text}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </div>
          </div>

          <div className="student-feed-wys__prep-status" data-wys-block="prep-status">
            <p className="student-feed-wys__prep-status-label">
              Prep
              <br />
              Status
            </p>
            <div className="student-feed-wys__status-cards">
              <article
                className="student-feed-wys__card is-docs"
                aria-labelledby="student-feed-wys-docs-title"
              >
                <h3 id="student-feed-wys-docs-title" className="student-feed-wys__card-title">
                  Documents Tracker
                </h3>
                <ul className="student-feed-wys__count-list">
                  {DOCUMENTS.map((item) => (
                    <CountPair
                      key={item.label}
                      left={item.left}
                      right={item.right}
                      label={item.label}
                      pending={item.pending}
                    />
                  ))}
                </ul>
              </article>

              <article
                className="student-feed-wys__card is-shortlist"
                aria-labelledby="student-feed-wys-shortlist-title"
              >
                <h3 id="student-feed-wys-shortlist-title" className="student-feed-wys__card-title">
                  Uni Shortlist
                </h3>
                <ul className="student-feed-wys__count-list">
                  {SHORTLIST.map((item) => (
                    <CountPair
                      key={item.label}
                      left={item.left}
                      right={item.right}
                      label={item.label}
                    />
                  ))}
                </ul>
              </article>
            </div>
          </div>
        </div>

        {!unlocked ? <ForlockedOverlay /> : null}
      </div>

      {/* 6D — Finalized Uni List */}
      <div
        className="student-feed-wys__finalized"
        data-wys-block="finalized"
        aria-labelledby="student-feed-wys-finalized-title"
      >
        <div className="student-feed-wys__finalized-body">
          <div className="student-feed-wys__finalized-meta">
            <p className="student-feed-wys__finalized-count">06</p>
            <h3 id="student-feed-wys-finalized-title" className="student-feed-wys__finalized-title">
              Finalized
              <br />
              Uni List
            </h3>
          </div>
          <div className="student-feed-wys__uni-grid">
            {FINALIZED_UNIS.map((uni) => (
              <UniCard key={uni.id} name={uni.name} tag={uni.tag} imageSrc={uni.imageSrc} />
            ))}
          </div>
        </div>

        {!unlocked ? <ForlockedOverlay /> : null}
      </div>

      {/* 6E — Working On + Future task preview */}
      <div className="student-feed-wys__tasks" data-wys-block="tasks">
        <div className="student-feed-wys__tasks-body">
          <div
            className="student-feed-wys__task-block"
            aria-labelledby="student-feed-wys-working-title"
          >
            <h3 id="student-feed-wys-working-title" className="student-feed-wys__task-heading">
              You are
              <br />
              Currently
              <br />
              Working On
            </h3>
            <div className="student-feed-wys__task-panel">
              <ul className="student-feed-wys__task-list">
                {WORKING_ON.map((item, i) => (
                  <TaskRow key={`working-${i}`} text={item.text} badge={item.badge} />
                ))}
              </ul>
            </div>
          </div>

          <div
            className="student-feed-wys__task-block is-future"
            aria-labelledby="student-feed-wys-future-title"
          >
            <h3 id="student-feed-wys-future-title" className="student-feed-wys__task-heading">
              Future task
              <br />
              <span className="student-feed-wys__task-heading-accent">preview</span>
            </h3>
            <div className="student-feed-wys__task-panel">
              <ul className="student-feed-wys__task-list">
                {FUTURE_TASKS.map((item, i) => (
                  <TaskRow key={`future-${i}`} text={item.text} badge={item.badge} />
                ))}
              </ul>
            </div>
          </div>
        </div>

        {!unlocked ? <ForlockedOverlay /> : null}
      </div>
    </section>
  );
}
