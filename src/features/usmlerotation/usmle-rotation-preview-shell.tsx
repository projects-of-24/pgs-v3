/**
 * Preview shell — USMLE Rotation modular body (through #Pgs picks).
 * Used by `/preview/usmlerotation-body` and live `/usmlerotation`.
 */
import { UsmleRotationDocsRequest } from "./usmle-rotation-docs-request";
import { UsmleRotationExplore } from "./usmle-rotation-explore";
import { UsmleRotationHero } from "./usmle-rotation-hero";
import { UsmleRotationImgPitch } from "./usmle-rotation-img-pitch";
import { UsmleRotationLiveActivity } from "./usmle-rotation-live-activity";
import { UsmleRotationOutro } from "./usmle-rotation-outro";
import { UsmleRotationPickUs } from "./usmle-rotation-pick-us";
import { UsmleRotationPicks } from "./usmle-rotation-picks";
import { UsmleRotationPremium } from "./usmle-rotation-premium";
import { UsmleRotationPricing } from "./usmle-rotation-pricing";
import { UsmleRotationSteps } from "./usmle-rotation-steps";
import { UsmleRotationSupportHub } from "./usmle-rotation-support-hub";
import { UsmleRotationTestimonials } from "./usmle-rotation-testimonials";
import { UsmleRotationWhatIs } from "./usmle-rotation-what-is";
import type { UsmleExploreCourseCards } from "./usmle-explore-types";
import type { UsmlePicksCourseCard } from "./usmle-picks-types";
import "./usmle-rotation-preview-shell.css";

type Props = {
  courses?: UsmleExploreCourseCards[];
  picksCourses?: UsmlePicksCourseCard[];
  isLoggedIn?: boolean;
  initialSavedIds?: string[];
  /** Live route — hide side-test banner / deferred note. */
  live?: boolean;
};

export function UsmleRotationPreviewShell({
  courses = [],
  picksCourses = [],
  isLoggedIn = false,
  initialSavedIds = [],
  live = false
}: Props) {
  return (
    <div
      className="usmle-preview-shell"
      data-pgs-module="usmle-rotation-preview"
      data-cutover={live ? "LIVE" : "preview"}
    >
      {live ? null : (
        <p className="usmle-preview-shell__banner" role="status">
          Side-test — USMLE Rotation through <strong>#Pgs picks</strong> (CMS).
          Mirror of live <code>/usmlerotation</code>.
        </p>
      )}
      <UsmleRotationHero />
      <UsmleRotationLiveActivity />
      <UsmleRotationImgPitch />
      <UsmleRotationWhatIs />
      <UsmleRotationPickUs />
      <UsmleRotationExplore
        courses={courses}
        isLoggedIn={isLoggedIn}
        initialSavedIds={initialSavedIds}
      />
      <UsmleRotationSteps />
      <UsmleRotationPremium />
      <UsmleRotationPricing />
      <UsmleRotationTestimonials />
      <UsmleRotationDocsRequest />
      <UsmleRotationOutro />
      <UsmleRotationSupportHub />
      <UsmleRotationPicks courses={picksCourses} />
      {live ? null : (
        <p className="usmle-preview-shell__deferred" role="note">
          Deferred: iPad · Steps/snap polish · chrome aesthetic pass · doctor
          size polish.
        </p>
      )}
    </div>
  );
}
