/**
 * Ops CoursesTemplateBodyV1 (+ flat catalog fields) → Sanity course document fields.
 * Used by seed script only — does not touch Supabase or Ops APIs.
 */
import type { CoursesTemplateBodyV1 } from "@/features/programs-courses/courses-template-schema";

const BREAKDOWN_SPLIT = " || ";

export type Course64FlatFields = {
  title?: string;
  startsOn?: string;
  endsOn?: string;
  brochureDownloadUrl?: string;
};

export type SanityImageUploadHint = {
  /** Sanity field name on course document */
  field: string;
  /** Absolute or site-relative URL to fetch */
  url: string;
};

export type SanityDocumentPayload = {
  fields: Record<string, unknown>;
  imageUploads: SanityImageUploadHint[];
};

function breakdownToLine(item: { text: string; bold?: string }): string {
  const text = item.text.trim();
  const bold = item.bold?.trim();
  return bold ? `${text}${BREAKDOWN_SPLIT}${bold}` : text;
}

function hint(field: string, url: string | undefined, uploads: SanityImageUploadHint[]): void {
  const trimmed = url?.trim();
  if (!trimmed || trimmed.startsWith("data:")) return;
  uploads.push({ field, url: trimmed });
}

/** Build Sanity `course` fields from the same body Ops preview uses for course 64. */
export function templateBodyToSanityDocument(
  body: CoursesTemplateBodyV1,
  flat: Course64FlatFields = {}
): SanityDocumentPayload {
  const imageUploads: SanityImageUploadHint[] = [];
  const title =
    flat.title?.trim() ||
    body.titleLines.join(" ").trim() ||
    "FULL STACK WEB DEVELOPMENT BOOTCAMP JAN 2026";

  hint("heroImage", body.heroImage, imageUploads);
  hint("partnerLogo", body.partnerLogo, imageUploads);
  hint("awardingLogo", body.awarding.logo, imageUploads);
  hint("awardingPhoto", body.awarding.photo, imageUploads);
  hint("mockSeal", body.certificate.mock.seal, imageUploads);
  hint("learnersPhoto", body.learners.photoSrc, imageUploads);

  const accreditationLogos = body.awarding.accreditation.logos
    .filter((logo) => logo.src.trim())
    .map((logo, index) => {
      hint(`accreditationLogos.${index}.image`, logo.src, imageUploads);
      return {
        alt: logo.alt,
        width: logo.width,
        height: logo.height
      };
    });

  const higlightsPhotos = body.higlights.photos
    .filter((photo) => photo.src.trim())
    .map((photo, index) => {
      hint(`higlightsPhotos.${index}.image`, photo.src, imageUploads);
      return { alt: photo.alt, crop: photo.crop };
    });

  const fields: Record<string, unknown> = {
    title,
    slug: { _type: "slug", current: "demo-course" },
    partnership: body.partnership,
    durationValue: body.durationValue,
    modeLabel: body.modeLabel,
    tags: body.tags.map((tag) => tag.replace(/^#/, "")),
    startsOn: flat.startsOn || "2026-01-15",
    endsOn: flat.endsOn || "2026-02-28",
    heroImageAlt: body.heroImageAlt,
    brochureDownloadUrl: flat.brochureDownloadUrl || body.brochure.downloadUrl || "",
    whoIsItFor: body.whoIsItFor,
    whoForNote: body.whoForNote,
    typeValue: body.typeValue,
    fillingBadge: body.fillingBadge,
    locationNote: body.locationNote,
    bookingCta: body.bookingCta,
    bookingUrl: body.bookingUrl || undefined,
    topicsLeftTitle: body.description.left.title,
    topicsLeftBodies: body.description.left.bodies,
    topicsRightTitle: body.description.right.title,
    topicsRightBodies: body.description.right.bodies,
    programDescriptionTitle: body.programDescription.titleLines.join("\n"),
    programDescriptionBody: body.programDescription.body,
    highlightsTitle: body.highlights.title,
    highlightItems: body.highlights.items.map((item) => ({ num: item.num, body: item.body })),
    checksChip: body.checks.chip,
    checkItems: body.checks.items,
    brochureTitle: body.brochure.title,
    brochureSubtitle: body.brochure.subtitle,
    brochureCtaLabel: body.brochure.ctaLabel,
    brochureBadgeLabel: body.brochure.badgeLabel,
    awardingTitle: body.awarding.title,
    awardingBody: body.awarding.body,
    awardingLogoAlt: body.awarding.logoAlt,
    awardingPhotoAlt: body.awarding.photoAlt,
    awardingFacts: body.awarding.facts.map((f) => ({ title: f.title, body: f.body ?? "" })),
    rankingTitleLines: body.awarding.rankings.titleLines,
    rankingBodies: body.awarding.rankings.bodies,
    accreditationTitleLines: body.awarding.accreditation.titleLines,
    accreditationLogos,
    applyTitle: body.apply.title,
    applySubtitle: body.apply.subtitle,
    eligibilityChips: body.apply.eligibilityChips,
    applySteps: body.apply.option1Steps.map((step) => ({
      title: step.title,
      body: step.body ?? step.bodyBefore ?? "",
      linkText: step.linkText ?? "",
      linkHref: step.linkHref ?? "",
      bodyAfter: step.bodyAfter ?? ""
    })),
    applyOption2: {
      title: body.apply.option2.title,
      bodyBefore: body.apply.option2.bodyBefore,
      linkText: body.apply.option2.linkText,
      linkHref: body.apply.option2.linkHref,
      bodyAfter: body.apply.option2.bodyAfter
    },
    certificateHeadline: body.certificate.headline,
    certificateChecks: body.certificate.checks,
    mockTicket: body.certificate.mock.ticket,
    mockProgramTitle: body.certificate.mock.programTitle,
    mockNameLabel: body.certificate.mock.nameLabel,
    mockNameValue: body.certificate.mock.nameValue,
    mockDateLabel: body.certificate.mock.dateLabel,
    mockDateValue: body.certificate.mock.dateValue,
    mockAwardingLabel: body.certificate.mock.awardingLabel,
    mockAwardingValue: body.certificate.mock.awardingValue,
    higlightsTitle: body.higlights.title,
    higlightsLead: body.higlights.lead,
    higlightsPlace: body.higlights.place,
    higlightsNote: body.higlights.note,
    higlightsPhotos,
    enrollTitle: body.enroll.title,
    enrollSubtitle: body.enroll.subtitle,
    enrollPrice: body.enroll.price,
    enrollAccessBadge: body.enroll.accessBadge,
    enrollEarlyBird: body.enroll.earlyBird,
    breakdownLeftLines: body.enroll.breakdownLeft.map(breakdownToLine),
    breakdownRightLines: body.enroll.breakdownRight.map(breakdownToLine),
    housingLabel: body.enroll.housingLabel,
    housingPrice: body.enroll.housingPrice,
    housingApprox: body.enroll.housingApprox,
    paymentTitle: body.enroll.paymentTitle,
    paymentBody: body.enroll.paymentBody,
    learnersLead: body.learners.lead,
    learnersBadge: body.learners.badge,
    learnersBodyBefore: body.learners.bodyBefore,
    learnersBodyBoldPgs: body.learners.bodyBoldPgs,
    learnersBodyMid: body.learners.bodyMid,
    learnersBodyBold3x: body.learners.bodyBold3x,
    learnersBodyAnd: body.learners.bodyAnd,
    learnersBodyBoldSkills: body.learners.bodyBoldSkills,
    learnersBodyAfter: body.learners.bodyAfter,
    learnersPhotoAlt: body.learners.photoAlt,
    learnersQuoteMob: body.learners.quoteMob,
    learnersQuotes: body.learners.cards.map((c) => c.quoteDesk),
    learnersBioName: body.learners.bio.name,
    learnersBioRole: body.learners.bio.role,
    learnersBioLocation: body.learners.bio.location,
    faqHeading: body.faq.heading,
    faqTabs: body.faq.tabs
      .filter((tab) => tab.items.length > 0)
      .map((tab) => ({
        id: tab.id,
        label: tab.label,
        items: tab.items.map((item) => ({ question: item.question, answer: item.answer }))
      }))
  };

  return { fields, imageUploads };
}
