/**
 * Section 1 — student feed identity card (desktop + mobile Figma).
 *
 * Desktop `18657:10454` · Mobile `207:2217` — kept in sync.
 * Non-premium: no green premium title; badge = “Yet to Unlock Full Access” on both.
 * Premium entitlement: green “#purplePremium” + matching badge.
 * Preview only. Live `/student/dashboard` UNTOUCHED.
 */
import Image from "next/image";
import { STUDENT_FEED_PREMIUM_LABEL_ACTIVE } from "./student-feed-premium-label";
import "./student-feed-identity-card.css";

export const STUDENT_FEED_IDENTITY_AVATAR = "/assets/img/figma-feed/identity-avatar.jpg";

export const STUDENT_FEED_UNLOCK_BADGE_LINES = [
  "Yet to Unlock",
  "Full Access"
] as const;

export type StudentFeedIdentityCardProps = {
  firstName?: string;
  lastName?: string;
  handle?: string;
  studentId?: string;
  pathway?: string;
  avatarUrl?: string;
  /** True only when `premium_entitlement` is active. */
  premiumActive?: boolean;
};

function YetToUnlockBadge() {
  return (
    <div className="student-feed-identity__badge" aria-label="Yet to Unlock Full Access">
      {STUDENT_FEED_UNLOCK_BADGE_LINES[0]}
      <br />
      {STUDENT_FEED_UNLOCK_BADGE_LINES[1]}
    </div>
  );
}

export function StudentFeedIdentityCard({
  firstName = "Rajeev",
  lastName = "Singh",
  handle = "rajsingh",
  studentId = "2123456",
  pathway = "stem PATHWAY",
  avatarUrl = STUDENT_FEED_IDENTITY_AVATAR,
  premiumActive = false
}: StudentFeedIdentityCardProps) {
  const fullName = `${firstName} ${lastName}`;

  return (
    <div
      className={`student-feed-identity${premiumActive ? " is-premium" : " is-locked"}`}
      data-pgs-module="student-feed-identity-card"
      data-figma-desktop="18657:10454"
      data-figma-mobile="207:2217"
      data-premium-active={premiumActive ? "true" : "false"}
    >
      {/* Desktop — 18657:10454 */}
      <section
        className="student-feed-identity__desktop"
        aria-label="Student identity"
        data-figma-node="18657:10454"
      >
        <div className="student-feed-identity__avatar-frame">
          <Image
            className="student-feed-identity__avatar"
            src={avatarUrl}
            alt=""
            width={130}
            height={130}
            unoptimized
          />
        </div>
        <h1 className="student-feed-identity__name">{fullName}</h1>
        <p className="student-feed-identity__meta">
          <span>@{handle}</span>
          <span>id: {studentId}</span>
        </p>
        <div className="student-feed-identity__titles">
          {premiumActive ? (
            <p className="student-feed-identity__premium">{STUDENT_FEED_PREMIUM_LABEL_ACTIVE}</p>
          ) : null}
          <p className="student-feed-identity__pathway">{pathway}</p>
        </div>
        {premiumActive ? (
          <div className="student-feed-identity__badge" aria-label={STUDENT_FEED_PREMIUM_LABEL_ACTIVE}>
            {STUDENT_FEED_PREMIUM_LABEL_ACTIVE}
          </div>
        ) : (
          <YetToUnlockBadge />
        )}
      </section>

      {/* Mobile — 207:2217 — same non-premium contract as desktop */}
      <section
        className="student-feed-identity__mobile"
        aria-label="Student identity"
        data-figma-node="207:2217"
      >
        <div className="student-feed-identity__mobile-inner">
          <div className="student-feed-identity__mobile-top">
            <div className="student-feed-identity__mobile-row">
              <div className="student-feed-identity__avatar-frame">
                <Image
                  className="student-feed-identity__avatar"
                  src={avatarUrl}
                  alt=""
                  width={65}
                  height={65}
                  unoptimized
                />
              </div>
              <div className="student-feed-identity__mobile-copy">
                <h1 className="student-feed-identity__name">{fullName}</h1>
                <p className="student-feed-identity__meta">
                  <span>@{handle}</span>
                  <span>id: {studentId}</span>
                </p>
              </div>
            </div>
            <div className="student-feed-identity__titles">
              {premiumActive ? (
                <p className="student-feed-identity__premium">{STUDENT_FEED_PREMIUM_LABEL_ACTIVE}</p>
              ) : null}
              <p className="student-feed-identity__pathway">{pathway}</p>
            </div>
          </div>
          {premiumActive ? (
            <p className="student-feed-identity__badge" aria-label={STUDENT_FEED_PREMIUM_LABEL_ACTIVE}>
              {STUDENT_FEED_PREMIUM_LABEL_ACTIVE}
            </p>
          ) : (
            <YetToUnlockBadge />
          )}
        </div>
      </section>
    </div>
  );
}
