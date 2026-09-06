/**
 * Preview body shell — Section 1 identity (desktop + mobile synced).
 * Non-premium: Yet to Unlock Full Access only (no green premium title).
 */
import { StudentFeedIdentityCard } from "./student-feed-identity-card";
import "./student-feed-preview-shell.css";

type Props = {
  premiumActive?: boolean;
};

export function StudentFeedPreviewShell({ premiumActive = false }: Props) {
  return (
    <div className="student-feed-preview-shell" data-pgs-module="student-feed-preview">
      <p className="student-feed-preview-shell__banner" role="status">
        Side-test — <strong>#feed</strong> Section 1 identity (
        <code>18657:10454</code> / <code>207:2217</code>). Non-premium badge:{" "}
        <strong>Yet to Unlock Full Access</strong> (desktop + mobile). Live{" "}
        <code>/student/dashboard</code> unchanged.{" "}
        <a href="/preview/student-feed">locked</a>
        {" · "}
        <a href="/preview/student-feed?premium=1">premium</a>
      </p>

      <div className="student-feed-preview-shell__body student-feed-preview-shell__body--identity-only">
        <StudentFeedIdentityCard premiumActive={premiumActive} />
      </div>

      <p className="student-feed-preview-shell__deferred" role="note">
        This pass: identity locked badge sync. Deferred: other sections · iPad · live cutover.
      </p>
    </div>
  );
}
