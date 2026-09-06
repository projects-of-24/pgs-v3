/**
 * Preview shell — through #Pgs picks (CMS `pgs_picks`).
 * Live `/usmlerotation` unchanged.
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
};

export function UsmleRotationPreviewShell({
  courses = [],
  picksCourses = [],
  isLoggedIn = false,
  initialSavedIds = [],
}: Props) {
  return (
    <div className="usmle-preview-shell" data-pgs-module="usmle-rotation-preview">
      <p className="usmle-preview-shell__banner" role="status">
        Side-test — USMLE Rotation through <strong>#Pgs picks</strong> (CMS).
        Live <code>/usmlerotation</code> unchanged.
      </p>
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
      <p className="usmle-preview-shell__deferred" role="note">
        Deferred: iPad · live route pull · Steps/snap polish · doctor size on
        main pull.
      </p>
    </div>
  );
}
