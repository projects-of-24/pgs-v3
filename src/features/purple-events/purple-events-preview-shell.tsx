/**
 * Family — public PurpleEvents **Lite** detail body (template id: `lite`).
 * Desktop Figma `17071:11752` · Mobile `524:8535`.
 * No black side-test banner — body starts at closed toggle (shell margin-top clamp).
 *
 * E0–E13 body blocks on preview lab (event template body complete).
 * Lab URL: `/preview/purpleevents-lite` (old `/preview/purpleevents-session` redirects here).
 */
import { PurpleEventsCover } from "./purple-events-cover";
import { PurpleEventsFacilitators } from "./purple-events-facilitators";
import { PurpleEventsInvite } from "./purple-events-invite";
import { PurpleEventsPerks } from "./purple-events-perks";
import { PurpleEventsStickyTrac } from "./purple-events-sticky-trac";
import { PurpleEventsWhoTopics } from "./purple-events-who-topics";
import { PurpleEventsUpcoming } from "./upcoming/purple-events-upcoming";
import { PurpleEventsShare } from "./purple-events-share";
import { PurpleEventsHighlights } from "./purple-events-highlights";
import { PurpleEventsTestimonials } from "./purple-events-testimonials";
import { PurpleEventsOutro } from "./purple-events-outro";
import { PurpleEventsFaq } from "./purple-events-faq";
import "./purple-events-preview-shell.css";

type PurpleEventsPreviewShellProps = {
  /** Live route — same body as preview; marks `data-cutover=LIVE`. */
  live?: boolean;
};

export function PurpleEventsPreviewShell({
  live = false
}: PurpleEventsPreviewShellProps) {
  return (
    <div
      className="purple-events-preview-shell"
      data-pgs-module="purple-events-lite-preview"
      data-purple-events-family="public"
      data-detail-template="lite"
      data-figma-desktop="17071:11752"
      data-figma-mobile="524:8535"
      data-shell-gate="e0"
      data-block-gate="e1-e13"
      data-cutover={live ? "LIVE" : "preview"}
    >
      <div className="purple-events-preview-shell__body">
        <div
          className="purple-events-preview-shell__univ-gap"
          aria-hidden="true"
        />
        <PurpleEventsInvite />
        <PurpleEventsWhoTopics />
        <PurpleEventsCover />
        <PurpleEventsPerks />
        <PurpleEventsFacilitators />
        <PurpleEventsStickyTrac />
        <PurpleEventsUpcoming />
        <PurpleEventsShare />
        <PurpleEventsHighlights />
        <PurpleEventsTestimonials />
        <PurpleEventsOutro />
        <PurpleEventsFaq />
      </div>
    </div>
  );
}
