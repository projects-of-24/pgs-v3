/**
 * Section — Your Quick Dashboard overview.
 * Desktop Figma `18375:10811` (1×4) · Mobile `206:5892` (2×2).
 * Non-Premium: lock overlay (owner cluster + Figma). Fixture metrics only.
 */
import Image from "next/image";
import "./student-feed-quick-dashboard.css";

const LOCK_SRC = "/assets/img/lock.png";

export type StudentFeedQuickDashboardProps = {
  /** When false (standard / anon), show lock overlay. */
  unlocked?: boolean;
  uniApplied?: string;
  offersReceived?: string;
  tuitionUploaded?: boolean;
  visaApplied?: boolean;
};

function MetricToggle({ checked, label }: { checked: boolean; label: string }) {
  return (
    <span
      className={`student-feed-qd__toggle${checked ? " is-on" : " is-off"}`}
      role="img"
      aria-label={`${label}: ${checked ? "yes" : "no"}`}
    >
      <span className="student-feed-qd__toggle-knob" aria-hidden="true" />
    </span>
  );
}

export function StudentFeedQuickDashboard({
  unlocked = false,
  uniApplied = "02",
  offersReceived = "02",
  tuitionUploaded = true,
  visaApplied = true
}: StudentFeedQuickDashboardProps) {
  return (
    <section
      className={`student-feed-qd${unlocked ? " is-unlocked" : " is-locked"}`}
      data-pgs-module="student-feed-quick-dashboard"
      data-figma-desktop="18375:10811"
      data-figma-mobile="206:5892"
      aria-label="Your Quick Dashboard overview"
    >
      <div className="student-feed-qd__frame">
        <h2 className="student-feed-qd__title">Your Quick Dashboard overview</h2>
        <div className="student-feed-qd__grid">
          <article className="student-feed-qd__tile">
            <p className="student-feed-qd__label">
              Uni
              <br />
              Applied
            </p>
            <div className="student-feed-qd__foot">
              <i className="student-feed-qd__bar" aria-hidden="true" />
              <strong className="student-feed-qd__value">{uniApplied}</strong>
            </div>
          </article>
          <article className="student-feed-qd__tile">
            <p className="student-feed-qd__label">
              Offers
              <br />
              Received
            </p>
            <div className="student-feed-qd__foot">
              <i className="student-feed-qd__bar" aria-hidden="true" />
              <strong className="student-feed-qd__value">{offersReceived}</strong>
            </div>
          </article>
          <article className="student-feed-qd__tile">
            <p className="student-feed-qd__label">
              Tuition Receipt
              <br />
              Uploaded
            </p>
            <div className="student-feed-qd__foot">
              <i className="student-feed-qd__bar" aria-hidden="true" />
              <MetricToggle checked={tuitionUploaded} label="Tuition receipt uploaded" />
            </div>
          </article>
          <article className="student-feed-qd__tile">
            <p className="student-feed-qd__label">
              Visa
              <br />
              Applied
            </p>
            <div className="student-feed-qd__foot">
              <i className="student-feed-qd__bar" aria-hidden="true" />
              <MetricToggle checked={visaApplied} label="Visa applied" />
            </div>
          </article>
        </div>

        {!unlocked ? (
          <div className="student-feed-qd__lock" role="img" aria-label="Yet to Unlock Full Access">
            <Image src={LOCK_SRC} alt="" width={93} height={93} unoptimized />
          </div>
        ) : null}
      </div>
    </section>
  );
}
