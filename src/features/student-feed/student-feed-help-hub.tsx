/**
 * Section 5 — #helpHub CTA card.
 * Desktop Figma content `18375:11127` inside stroked frame `18375:10686` (~478×509).
 * Mobile: same structure; sizes = 70% of desktop (real values, no transform scale).
 *
 * Book appointment → popup / Zoho DEFERRED (button only, no destination).
 */
import "./student-feed-help-hub.css";

export type StudentFeedHelpHubProps = {
  /** When true (Premium), section is omitted — same gate as unlock pitch for now. */
  premiumActive?: boolean;
};

export function StudentFeedHelpHub({ premiumActive = false }: StudentFeedHelpHubProps) {
  if (premiumActive) return null;

  return (
    <section
      className="student-feed-help-hub"
      data-pgs-module="student-feed-help-hub"
      data-figma-desktop-frame="18375:10686"
      data-figma-desktop-content="18375:11127"
      aria-label="Help Hub"
    >
      {/* Stroked padded frame — Figma Rectangle 4305 around CTA */}
      <div className="student-feed-help-hub__frame">
        <div className="student-feed-help-hub__card">
          <p className="student-feed-help-hub__lead">
            Is PurplePremium the smartest move for your study plan?
          </p>
          <p className="student-feed-help-hub__body">
            <mark className="student-feed-help-hub__mark">
              The #pgs #helpHub is here to give you straight answers.
            </mark>
          </p>
          {/* Destination deferred — popup / Zoho (owner). */}
          <button type="button" className="student-feed-help-hub__book">
            Book Your Appointment today
          </button>
        </div>
      </div>
    </section>
  );
}
