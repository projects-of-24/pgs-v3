/**
 * Part 1 — purified locked #feed BODY (Figma V6).
 *
 * Preview: `/preview/student-feed`
 * Live `/student/dashboard` Hostinger/React feed: UNTOUCHED until cutover.
 *
 * Nodes: desktop locked standard `17961:10662` (profile `17961:10697`,
 * quick dash `17961:10787`, locks `17961:11024`…, help `17961:11043`).
 * Anonymous body uses the same lock pattern; chrome deferred.
 *
 * Does NOT edit header / sidebar / footer.
 */
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import "./student-feed-locked-body.css";

export const STUDENT_FEED_LOCK_SRC = "/assets/img/figma-feed/lock.svg";

export const STUDENT_FEED_HELP_COPY =
  "Unlock the full dashboard experience with #PurplePremium  we accept only a limited number of seats each month, connect with our Help Hub to get in.";

const LOCKED_STAND_INTRO =
  "This is the heart of your study path. This centralized study dashboard helps you track onboarding, monitor progress, see key milestones, and identify next steps. Designed to keep you on track.";

const NOTE_COPY =
  "This is the phase where we check your documents, get your applications ready, and start planning your university journey. Got questions or need feedback? Reach out to your counselor anytime—and make sure to join any upcoming sessions we invite you to.";

const TOP_PICKS = [
  { tag: "#MEDICAL", status: "InProgress" },
  { tag: "#USMLE", status: "InProgress" },
  { tag: "#UKintake", status: "InProgress" },
  { tag: "#AUSintake", status: "InProgress" },
  { tag: "#medical", status: "FileldUp" }
] as const;

export type StudentFeedLockedPreviewState = "anonymous" | "authenticated_standard";

export type StudentFeedLockedBodyProps = {
  state?: StudentFeedLockedPreviewState;
  name?: string;
  handle?: string;
  studentId?: string;
  pathway?: string;
  avatarUrl?: string;
};

function FeedLockRegion({
  children,
  size,
  copy
}: {
  children: ReactNode;
  size: number;
  copy?: boolean;
}) {
  return (
    <div className="student-feed-lock-region">
      <div className="student-feed-lock-region__content" inert aria-hidden="true">
        {children}
      </div>
      <div
        className="student-feed-lock-region__overlay"
        style={{ ["--sff-lock-size" as string]: `${size}px` }}
        role="img"
        aria-label={STUDENT_FEED_HELP_COPY}
      >
        <div>
          <Image
            src={STUDENT_FEED_LOCK_SRC}
            alt=""
            width={size}
            height={size}
            unoptimized
          />
          {copy ? <p>{STUDENT_FEED_HELP_COPY}</p> : null}
        </div>
      </div>
    </div>
  );
}

export function StudentFeedLockedBody({
  state = "authenticated_standard",
  name = "Rajeev Singh",
  handle = "rajsingh",
  studentId = "2123456",
  pathway = "STEM PATHWAY",
  avatarUrl = "/assets/img/default-avatar.png"
}: StudentFeedLockedBodyProps) {
  const displayName = state === "anonymous" ? "Aspirant" : name;
  const displayHandle = state === "anonymous" ? "guest" : handle;
  const displayId = state === "anonymous" ? "—" : studentId;

  return (
    <div
      className="student-feed-locked"
      data-pgs-module="student-feed-locked-body"
      data-figma-node="17961:10662"
      data-student-state={state}
    >
      <div className="student-feed-locked__stage">
        <div className="student-feed-locked__main">
          <section className="student-feed-locked__profile" aria-label="Student identity">
            <div className="student-feed-locked__profile-left">
              <div className="student-feed-locked__identity">
                <Image
                  className="student-feed-locked__avatar"
                  src={avatarUrl}
                  alt=""
                  width={68}
                  height={83}
                  unoptimized
                />
                <div className="student-feed-locked__identity-text">
                  <h1 className="student-feed-locked__name">{displayName}</h1>
                  <p className="student-feed-locked__meta">@{displayHandle}</p>
                  <p className="student-feed-locked__meta">id: {displayId}</p>
                </div>
              </div>
              <div className="student-feed-locked__titles">
                <p className="student-feed-locked__premium-label">#purplePremium</p>
                <p className="student-feed-locked__pathway">{pathway}</p>
              </div>
            </div>
            <div className="student-feed-locked__unlock-badge" aria-label="Yet to Unlock Full Access">
              Yet to Unlock
              <br />
              Full Access
            </div>
          </section>

          <FeedLockRegion size={93}>
            <section className="student-feed-locked__quick" id="quick-dashboard-overview">
              <h2>Your Quick Dashboard overview</h2>
              <div className="student-feed-locked__metrics">
                <article>
                  <span>
                    Uni
                    <br />
                    Applied
                  </span>
                  <div>
                    <i />
                    <strong>02</strong>
                  </div>
                </article>
                <article>
                  <span>
                    Offers
                    <br />
                    Received
                  </span>
                  <div>
                    <i />
                    <strong>02</strong>
                  </div>
                </article>
                <article>
                  <span>Tuition Receipt Uploaded</span>
                  <div>
                    <i />
                    <span className="student-feed-locked__switch" aria-hidden="true" />
                  </div>
                </article>
                <article>
                  <span>
                    Visa
                    <br />
                    Applied
                  </span>
                  <div>
                    <i />
                    <span className="student-feed-locked__switch" aria-hidden="true" />
                  </div>
                </article>
              </div>
            </section>
          </FeedLockRegion>

          <section className="student-feed-locked__notes" aria-label="Notes and actions">
            <article className="student-feed-locked__note">
              <h2>Notes</h2>
              <p>{NOTE_COPY}</p>
            </article>
            <div>
              <strong className="student-feed-locked__aspirant">
                {pathway.replace(/ PATHWAY$/i, "")} Aspirant @Your intake plan
              </strong>
              <div className="student-feed-locked__action-row">
                <Link href="/feed_track_progress">Track Your Progress</Link>
                <span>See what’s done, what’s in progress, and what’s coming next.</span>
              </div>
              <div className="student-feed-locked__action-row">
                <Link href="/purpleboard">#purpleBoard</Link>
                <span>
                  Get the latest on scholarships, newly opened courses, and important updates, all
                  in one place.
                </span>
              </div>
            </div>
          </section>

          <FeedLockRegion size={198} copy>
            <section className="student-feed-locked__stand" id="where-you-stand">
              <header className="student-feed-locked__stand-head">
                <h2>Where You Stand</h2>
                <p>{LOCKED_STAND_INTRO}</p>
              </header>
              <div className="student-feed-locked__stand-card">
                <div className="student-feed-locked__placeholder-grid" aria-hidden="true">
                  <div className="student-feed-locked__placeholder" />
                  <div className="student-feed-locked__placeholder" />
                  <div className="student-feed-locked__placeholder" />
                  <div className="student-feed-locked__placeholder" />
                </div>
              </div>
            </section>
          </FeedLockRegion>

          <FeedLockRegion size={96}>
            <section className="student-feed-locked__comments" id="comments" aria-label="Comments">
              <h2>Comments</h2>
              <div className="student-feed-locked__comments-card" aria-hidden="true" />
            </section>
          </FeedLockRegion>
        </div>

        <aside className="student-feed-locked__aside">
          <section className="student-feed-locked__picks" id="top-picks" aria-label="Top picks">
            <header>
              <h2>Top picks &nbsp;&gt;</h2>
              <Image src="/assets/img/filter-icon.png" alt="" width={20} height={20} unoptimized />
            </header>
            <div className="student-feed-locked__picks-list">
              {TOP_PICKS.map((pick) => (
                <div className="student-feed-locked__pick" key={pick.tag}>
                  <span>
                    <strong>Clinical rotation sign up for next batch booking are in progress.</strong>
                    <small>
                      <span className="student-feed-locked__pick-status">{pick.status}</span>
                      <i className="student-feed-locked__dot" aria-hidden="true" />
                      {pick.tag}
                    </small>
                  </span>
                  <Image
                    src="/assets/img/computer.jpg"
                    alt=""
                    width={91}
                    height={55}
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </section>

          <p className="student-feed-locked__help">{STUDENT_FEED_HELP_COPY}</p>
        </aside>
      </div>
    </div>
  );
}
