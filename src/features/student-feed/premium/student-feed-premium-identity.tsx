/**
 * Family B — Premium feed identity (Pass 1).
 * Desktop card in artboard `17041:10191` (node `17120:12482`) · Mobile artboard `206:6666`.
 * Always `#PURPLEPREMIUM` — no Yet-to-Unlock branch.
 * Layout/CSS adapted from Family A `student-feed-identity-card` (own module, not shared props).
 * Live `/student/dashboard` UNTOUCHED.
 */
import Image from "next/image";
import { STUDENT_FEED_PREMIUM_LABEL_ACTIVE } from "../student-feed-premium-label";
import { STUDENT_FEED_IDENTITY_AVATAR } from "../student-feed-identity-card";
import "../student-feed-identity-card.css";
import "./student-feed-premium-identity.css";

export type StudentFeedPremiumIdentityProps = {
  firstName?: string;
  lastName?: string;
  handle?: string;
  studentId?: string;
  pathway?: string;
  avatarUrl?: string;
};

export function StudentFeedPremiumIdentity({
  firstName = "Rajeev",
  lastName = "Singh",
  handle = "rajsingh",
  studentId = "2123456",
  pathway = "stem PATHWAY",
  avatarUrl = STUDENT_FEED_IDENTITY_AVATAR
}: StudentFeedPremiumIdentityProps) {
  const fullName = `${firstName} ${lastName}`.trim();
  const label = STUDENT_FEED_PREMIUM_LABEL_ACTIVE;

  return (
    <div
      className="student-feed-identity is-premium"
      data-pgs-module="student-feed-premium-identity"
      data-figma-desktop="17120:12482"
      data-figma-mobile="206:6666"
      data-feed-family="premium"
    >
      <div
        className="student-feed-identity__desktop"
        role="region"
        aria-label="Student identity"
        data-figma-node="17120:12482"
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
          <p className="student-feed-identity__premium">{label}</p>
          <p className="student-feed-identity__pathway">{pathway}</p>
        </div>
        <div className="student-feed-identity__badge" aria-label={label}>
          {label}
        </div>
      </div>

      <div
        className="student-feed-identity__mobile"
        role="region"
        aria-label="Student identity"
        data-figma-node="206:6666"
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
              <p className="student-feed-identity__premium">{label}</p>
              <p className="student-feed-identity__pathway">{pathway}</p>
            </div>
          </div>
          <p className="student-feed-identity__badge" aria-label={label}>
            {label}
          </p>
        </div>
      </div>
    </div>
  );
}
