/**
 * Section 1 — student feed identity card (desktop + mobile Figma only).
 *
 * Desktop: https://www.figma.com/design/7WFrAbx3cvXReZxtTiQ76r/…?node-id=18657-10454
 * Mobile:  https://www.figma.com/design/pKzGmxz05A72dRJFkJT0d2/…?node-id=207-2217
 *
 * Preview: `/preview/student-feed`
 * Live `/student/dashboard`: UNTOUCHED.
 */
import Image from "next/image";
import "./student-feed-identity-card.css";

export const STUDENT_FEED_IDENTITY_AVATAR = "/assets/img/figma-feed/identity-avatar.jpg";

export type StudentFeedIdentityCardProps = {
  firstName?: string;
  lastName?: string;
  handle?: string;
  studentId?: string;
  pathway?: string;
  avatarUrl?: string;
  /** Desktop node uses locked badge; mobile node uses #purplepremium per Figma. */
};

export function StudentFeedIdentityCard({
  firstName = "Rajeev",
  lastName = "Singh",
  handle = "rajsingh",
  studentId = "2123456",
  pathway = "stem PATHWAY",
  avatarUrl = STUDENT_FEED_IDENTITY_AVATAR
}: StudentFeedIdentityCardProps) {
  const fullName = `${firstName} ${lastName}`;

  return (
    <div
      className="student-feed-identity"
      data-pgs-module="student-feed-identity-card"
      data-figma-desktop="18657:10454"
      data-figma-mobile="207:2217"
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
          <p className="student-feed-identity__premium">#purplePremium</p>
          <p className="student-feed-identity__pathway">{pathway}</p>
        </div>
        <div className="student-feed-identity__badge" aria-label="Yet to Unlock Full Access">
          Yet to Unlock
          <br />
          Full Access
        </div>
      </section>

      {/* Mobile — 207:2217 */}
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
              <p className="student-feed-identity__premium">#purplePremium</p>
              <p className="student-feed-identity__pathway">{pathway}</p>
            </div>
          </div>
          <p className="student-feed-identity__badge">#purplepremium</p>
        </div>
      </section>
    </div>
  );
}
