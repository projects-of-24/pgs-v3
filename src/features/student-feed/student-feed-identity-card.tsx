/**
 * Section 1 — student feed identity card (desktop + mobile Figma).
 *
 * Desktop `18657:10454` · Mobile `207:2217` — kept in sync.
 * Non-premium: no green premium title; badge = “Yet to Unlock Full Access” on both.
 * Anonymous: placebo name/handle/id/pathway + avatar (same frame CSS; image src only).
 * Premium entitlement: green “#PURPLEPREMIUM” + matching badge.
 * Preview only. Live `/student/dashboard` UNTOUCHED.
 */
import Image from "next/image";
import { STUDENT_FEED_PREMIUM_LABEL_ACTIVE } from "./student-feed-premium-label";
import "./student-feed-identity-card.css";

export const STUDENT_FEED_IDENTITY_AVATAR = "/assets/img/figma-feed/identity-avatar.jpg";
/**
 * Anonymous placebo — shrug square crop (owner 2026-09-07).
 * Frame/CSS unchanged; same file as `HELLO_ASPIRANT_DEFAULT_AVATAR`.
 */
export const STUDENT_FEED_IDENTITY_AVATAR_ANONYMOUS =
  "/assets/img/figma-feed/identity-avatar-anonymous.jpg";

export const STUDENT_FEED_UNLOCK_BADGE_LINES = [
  "Yet to Unlock",
  "Full Access"
] as const;

/** Owner placebo for anonymous feed identity (2026-09-07). */
export const STUDENT_FEED_ANONYMOUS_IDENTITY = {
  firstName: "Aspirant",
  lastName: "",
  handle: "futureAchiever",
  studentId: "1111",
  pathway: "Skill Mindset",
  avatarUrl: STUDENT_FEED_IDENTITY_AVATAR_ANONYMOUS
} as const;

export type StudentFeedIdentityCardProps = {
  firstName?: string;
  lastName?: string;
  handle?: string;
  studentId?: string;
  pathway?: string;
  avatarUrl?: string;
  /** True only when `premium_entitlement` is active. */
  premiumActive?: boolean;
  /** Anonymous preview — placebo identity; same locked badge contract. */
  anonymous?: boolean;
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
  firstName,
  lastName,
  handle,
  studentId,
  pathway,
  avatarUrl,
  premiumActive = false,
  anonymous = false
}: StudentFeedIdentityCardProps) {
  const placebo = anonymous ? STUDENT_FEED_ANONYMOUS_IDENTITY : null;
  const resolvedFirst = firstName ?? placebo?.firstName ?? "Rajeev";
  const resolvedLast = lastName ?? placebo?.lastName ?? "Singh";
  const resolvedHandle = handle ?? placebo?.handle ?? "rajsingh";
  const resolvedId = studentId ?? placebo?.studentId ?? "2123456";
  const resolvedPathway = pathway ?? placebo?.pathway ?? "stem PATHWAY";
  const resolvedAvatar =
    avatarUrl ?? placebo?.avatarUrl ?? STUDENT_FEED_IDENTITY_AVATAR;
  const fullName = `${resolvedFirst} ${resolvedLast}`.trim();

  return (
    <div
      className={`student-feed-identity${premiumActive ? " is-premium" : " is-locked"}${anonymous ? " is-anonymous" : ""}`}
      data-pgs-module="student-feed-identity-card"
      data-figma-desktop="18657:10454"
      data-figma-mobile="207:2217"
      data-premium-active={premiumActive ? "true" : "false"}
      data-identity-state={anonymous ? "anonymous" : premiumActive ? "premium" : "standard"}
      data-avatar-frame="fixed"
    >
      {/* Desktop — 18657:10454 (div: no Hostinger section padding) */}
      <div
        className="student-feed-identity__desktop"
        role="region"
        aria-label="Student identity"
        data-figma-node="18657:10454"
      >
        <div className="student-feed-identity__avatar-frame">
          <Image
            className="student-feed-identity__avatar"
            src={resolvedAvatar}
            alt=""
            width={130}
            height={130}
            unoptimized
          />
        </div>
        <h1 className="student-feed-identity__name">{fullName}</h1>
        <p className="student-feed-identity__meta">
          <span>@{resolvedHandle}</span>
          <span>id: {resolvedId}</span>
        </p>
        <div className="student-feed-identity__titles">
          {premiumActive ? (
            <p className="student-feed-identity__premium">{STUDENT_FEED_PREMIUM_LABEL_ACTIVE}</p>
          ) : null}
          <p className="student-feed-identity__pathway">{resolvedPathway}</p>
        </div>
        {premiumActive ? (
          <div className="student-feed-identity__badge" aria-label={STUDENT_FEED_PREMIUM_LABEL_ACTIVE}>
            {STUDENT_FEED_PREMIUM_LABEL_ACTIVE}
          </div>
        ) : (
          <YetToUnlockBadge />
        )}
      </div>

      {/* Mobile — 207:2217 — same non-premium contract as desktop */}
      <div
        className="student-feed-identity__mobile"
        role="region"
        aria-label="Student identity"
        data-figma-node="207:2217"
      >
        <div className="student-feed-identity__mobile-inner">
          <div className="student-feed-identity__mobile-top">
            <div className="student-feed-identity__mobile-row">
              <div className="student-feed-identity__avatar-frame">
                <Image
                  className="student-feed-identity__avatar"
                  src={resolvedAvatar}
                  alt=""
                  width={65}
                  height={65}
                  unoptimized
                />
              </div>
              <div className="student-feed-identity__mobile-copy">
                <h1 className="student-feed-identity__name">{fullName}</h1>
                <p className="student-feed-identity__meta">
                  <span>@{resolvedHandle}</span>
                  <span>id: {resolvedId}</span>
                </p>
              </div>
            </div>
            <div className="student-feed-identity__titles">
              {premiumActive ? (
                <p className="student-feed-identity__premium">{STUDENT_FEED_PREMIUM_LABEL_ACTIVE}</p>
              ) : null}
              <p className="student-feed-identity__pathway">{resolvedPathway}</p>
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
      </div>
    </div>
  );
}
