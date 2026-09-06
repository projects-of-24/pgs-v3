/**
 * Preview body shell — this pass: Section 1 identity only (desktop + mobile Figma).
 * Other slots remain in the map; hidden until their Figma pass.
 * Live `/student/dashboard` untouched. iPad deferred.
 */
import { StudentFeedIdentityCard } from "./student-feed-identity-card";
import "./student-feed-preview-shell.css";

export function StudentFeedPreviewShell() {
  return (
    <div className="student-feed-preview-shell" data-pgs-module="student-feed-preview">
      <p className="student-feed-preview-shell__banner" role="status">
        Side-test — <strong>#feed</strong> Section 1 identity only (
        <code>18657:10454</code> / <code>207:2217</code>). Centered + edge clamp + from-top.
        Live <code>/student/dashboard</code> unchanged.
      </p>

      <div className="student-feed-preview-shell__body student-feed-preview-shell__body--identity-only">
        <StudentFeedIdentityCard />
      </div>

      <p className="student-feed-preview-shell__deferred" role="note">
        This pass: identity card only. Deferred: other sections · iPad · live cutover.
      </p>
    </div>
  );
}
