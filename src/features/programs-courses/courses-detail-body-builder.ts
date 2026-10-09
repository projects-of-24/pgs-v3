/**
 * COURSE2d — Ops Courses editor: form sections <-> complete `CoursesTemplateBodyV1`.
 * Pure functions (no React, no DB). Save Draft calls `buildCoursesDetailBody` so the draft always
 * carries a full, schema-valid body (strict shape) built from the previous body (or an empty one),
 * the flat COURSE1 fields, and the C1–C9 / C11 section fields.
 * C10 / C12 / C13 are shared blocks and are intentionally not part of the body (schema has no keys).
 */
import { buildEmptyCoursesDetailBody, dateParts, modeLabel, splitTitleLines } from "./courses-cms-preview-map";
import { coerceCoursesDetailBody } from "./courses-detail-validation";
import { CoursesTemplateBodyV1 } from "./courses-template-schema";

export type CoursesFactRow = { title: string; body: string };
export type CoursesStepRow = {
  title: string;
  /** Plain body, or the text before the link when link fields are used. */
  body: string;
  linkText: string;
  linkHref: string;
  bodyAfter: string;
};

export type CoursesSectionsForm = {
  c1: {
    whoIsItFor: string;
    whoForNote: string;
    typeValue: string;
    fillingBadge: string;
    locationNote: string;
    bookingUrl: string;
    partnerLogo: string;
  };
  c2: { leftTitle: string; leftBodies: string; rightTitle: string; rightBodies: string };
  c4: { title: string; items: string[] };
  c5: { chip: string; items: string[] };
  c6: { title: string; subtitle: string; ctaLabel: string; badgeLabel: string };
  c7: {
    title: string;
    body: string;
    /** Small logo (left bordered box) — public marketing URL from media upload/picker. */
    logoUrl: string;
    logoAlt: string;
    /** Large photo (right pink area) — public marketing URL from media upload/picker. */
    photoUrl: string;
    photoAlt: string;
    facts: CoursesFactRow[];
    rankingTitleLines: string;
    rankingBodies: string;
    accreditationTitleLines: string;
    accreditationLogos: { url: string; alt: string }[];
  };
  c8: {
    title: string;
    subtitle: string;
    eligibilityChips: string;
    steps: CoursesStepRow[];
    option2: { title: string; bodyBefore: string; linkText: string; linkHref: string; bodyAfter: string };
  };
  c9: {
    headline: string;
    checks: string;
    mockTicket: string;
    mockProgramTitle: string;
    mockNameLabel: string;
    mockNameValue: string;
    mockDateLabel: string;
    mockDateValue: string;
    mockAwardingLabel: string;
    mockAwardingValue: string;
    mockSealUrl: string;
  };
  /** C10 — #higlights photo strip (up to 7 uploads). */
  c10: {
    title: string;
    leadLines: string;
    place: string;
    note: string;
    photos: { url: string; alt: string }[];
  };
  c11: {
    title: string;
    subtitle: string;
    price: string;
    accessBadge: string;
    earlyBird: string;
    breakdownLeft: string;
    breakdownRight: string;
    housingLabel: string;
    housingPrice: string;
    housingApprox: string;
    paymentTitle: string;
    paymentBody: string;
  };
  c12: {
    lead: string;
    badge: string;
    bodyBefore: string;
    bodyBoldPgs: string;
    bodyMid: string;
    bodyBold3x: string;
    bodyAnd: string;
    bodyBoldSkills: string;
    bodyAfter: string;
    photoUrl: string;
    photoAlt: string;
    quoteMob: string;
    quotes: string[];
    bioName: string;
    bioRole: string;
    bioLocation: string;
  };
  c13: {
    heading: string;
    tabs: { id: string; label: string; items: { question: string; answer: string }[] }[];
  };
};

/** Flat COURSE1 fields that also feed the body. */
export type CoursesFlatDraftInput = {
  title?: unknown;
  short_description?: unknown;
  description?: unknown;
  duration?: unknown;
  mode?: unknown;
  starts_on?: unknown;
  ends_on?: unknown;
  /** Tag labels for the selected tag ids (already resolved). */
  tagNames?: string[];
};

const BREAKDOWN_SPLIT = " || ";
const HIGLIGHT_PHOTO_SLOTS = 7;

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function padHiglightPhotos(photos: readonly { src: string; alt: string }[]): { url: string; alt: string }[] {
  const slots = photos.slice(0, HIGLIGHT_PHOTO_SLOTS).map((photo) => ({ url: photo.src, alt: photo.alt }));
  while (slots.length < HIGLIGHT_PHOTO_SLOTS) slots.push({ url: "", alt: "" });
  return slots;
}

/** One entry per non-empty line. */
export function linesToList(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}

export function listToLines(list: readonly string[]): string {
  return list.join("\n");
}

/** Only http(s), site-relative, or in-page anchors are kept; anything else is dropped. */
export function safeBodyUrl(value: unknown): string {
  const url = str(value);
  if (!url) return "";
  if (url.startsWith("//")) return "";
  if (/^https?:\/\//i.test(url) || url.startsWith("/") || url.startsWith("#")) return url;
  return "";
}

function breakdownToLines(items: readonly { text: string; bold?: string }[]): string {
  return items
    .map((item) => {
      const text = item.text.trim();
      return item.bold?.trim() ? `${text}${BREAKDOWN_SPLIT}${item.bold.trim()}` : text;
    })
    .join("\n");
}

function linesToBreakdown(text: string): { text: string; bold?: string }[] {
  return linesToList(text).map((line) => {
    const at = line.indexOf(BREAKDOWN_SPLIT.trim());
    if (at < 0) return { text: line };
    const left = line.slice(0, at).trim();
    const bold = line.slice(at + 2).trim();
    // The bold tail renders straight after the text, so keep one separating space.
    return bold ? { text: `${left} `, bold } : { text: left };
  });
}

/** Valid body → typed body; anything else → null. */
export function parseCoursesDetailBody(value: unknown): CoursesTemplateBodyV1 | null {
  if (typeof value !== "object" || value === null || Array.isArray(value)) return null;
  const parsed = CoursesTemplateBodyV1.safeParse(coerceCoursesDetailBody(value as Record<string, unknown>));
  return parsed.success ? parsed.data : null;
}

/** Body (or empty body) → editor state. */
export function bodyToSectionsForm(
  source: unknown,
  bookingUrl: unknown = ""
): CoursesSectionsForm {
  const body = parseCoursesDetailBody(source) ?? buildEmptyCoursesDetailBody("form");
  return {
    c1: {
      whoIsItFor: body.whoIsItFor,
      whoForNote: body.whoForNote,
      typeValue: body.typeValue,
      fillingBadge: body.fillingBadge,
      locationNote: body.locationNote,
      bookingUrl: str(bookingUrl) || body.bookingUrl,
      partnerLogo: body.partnerLogo
    },
    c2: {
      leftTitle: body.description.left.title,
      leftBodies: listToLines(body.description.left.bodies),
      rightTitle: body.description.right.title,
      rightBodies: listToLines(body.description.right.bodies)
    },
    c4: { title: body.highlights.title, items: body.highlights.items.map((item) => item.body) },
    c5: { chip: body.checks.chip, items: [...body.checks.items] },
    c6: {
      title: body.brochure.title,
      subtitle: body.brochure.subtitle,
      ctaLabel: body.brochure.ctaLabel,
      badgeLabel: body.brochure.badgeLabel
    },
    c7: {
      title: body.awarding.title,
      body: body.awarding.body,
      logoUrl: body.awarding.logo,
      logoAlt: body.awarding.logoAlt,
      photoUrl: body.awarding.photo,
      photoAlt: body.awarding.photoAlt,
      facts: body.awarding.facts.map((fact) => ({ title: fact.title, body: fact.body ?? "" })),
      rankingTitleLines: listToLines(body.awarding.rankings.titleLines),
      rankingBodies: listToLines(body.awarding.rankings.bodies),
      accreditationTitleLines: listToLines(body.awarding.accreditation.titleLines),
      accreditationLogos: body.awarding.accreditation.logos.map((logo) => ({ url: logo.src, alt: logo.alt }))
    },
    c8: {
      title: body.apply.title,
      subtitle: body.apply.subtitle,
      eligibilityChips: listToLines(body.apply.eligibilityChips),
      steps: body.apply.option1Steps.map((step) =>
        step.linkText
          ? {
              title: step.title,
              body: step.bodyBefore ?? "",
              linkText: step.linkText,
              linkHref: step.linkHref ?? "",
              bodyAfter: step.bodyAfter ?? ""
            }
          : { title: step.title, body: step.body ?? "", linkText: "", linkHref: "", bodyAfter: "" }
      ),
      option2: { ...body.apply.option2 }
    },
    c9: {
      headline: body.certificate.headline,
      checks: listToLines(body.certificate.checks),
      mockTicket: body.certificate.mock.ticket,
      mockProgramTitle: body.certificate.mock.programTitle,
      mockNameLabel: body.certificate.mock.nameLabel,
      mockNameValue: body.certificate.mock.nameValue,
      mockDateLabel: body.certificate.mock.dateLabel,
      mockDateValue: body.certificate.mock.dateValue,
      mockAwardingLabel: body.certificate.mock.awardingLabel,
      mockAwardingValue: body.certificate.mock.awardingValue,
      mockSealUrl: body.certificate.mock.seal
    },
    c10: {
      title: body.higlights.title,
      leadLines: listToLines(body.higlights.lead),
      place: body.higlights.place,
      note: body.higlights.note,
      photos: padHiglightPhotos(body.higlights.photos)
    },
    c11: {
      title: body.enroll.title,
      subtitle: body.enroll.subtitle,
      price: body.enroll.price,
      accessBadge: body.enroll.accessBadge,
      earlyBird: body.enroll.earlyBird,
      breakdownLeft: breakdownToLines(body.enroll.breakdownLeft),
      breakdownRight: breakdownToLines(body.enroll.breakdownRight),
      housingLabel: body.enroll.housingLabel,
      housingPrice: body.enroll.housingPrice,
      housingApprox: body.enroll.housingApprox,
      paymentTitle: body.enroll.paymentTitle,
      paymentBody: body.enroll.paymentBody
    },
    c12: {
      lead: body.learners.lead,
      badge: body.learners.badge,
      bodyBefore: body.learners.bodyBefore,
      bodyBoldPgs: body.learners.bodyBoldPgs,
      bodyMid: body.learners.bodyMid,
      bodyBold3x: body.learners.bodyBold3x,
      bodyAnd: body.learners.bodyAnd,
      bodyBoldSkills: body.learners.bodyBoldSkills,
      bodyAfter: body.learners.bodyAfter,
      photoUrl: body.learners.photoSrc,
      photoAlt: body.learners.photoAlt,
      quoteMob: body.learners.quoteMob,
      quotes: padLearnerQuotes(body.learners.cards.map((card) => card.quoteDesk)),
      bioName: body.learners.bio.name,
      bioRole: body.learners.bio.role,
      bioLocation: body.learners.bio.location
    },
    c13: {
      heading: body.faq.heading,
      tabs: body.faq.tabs.map((tab) => ({
        id: tab.id,
        label: tab.label,
        items: tab.items.map((item) => ({ question: item.question, answer: item.answer }))
      }))
    }
  };
}

function padLearnerQuotes(quotes: readonly string[]): string[] {
  const slots = quotes.slice(0, 3);
  while (slots.length < 3) slots.push("");
  return [...slots];
}

function overlayFlat(body: CoursesTemplateBodyV1, flat: CoursesFlatDraftInput) {
  const title = str(flat.title);
  if (title) {
    body.titleLines = splitTitleLines(title);
    body.certificate.mock.programTitle = title;
  }
  body.partnership = str(flat.short_description);
  body.programDescription.body = str(flat.description);
  body.durationValue = str(flat.duration);
  body.modeLabel = modeLabel(str(flat.mode));

  // Dates come from the flat date fields; the time-of-day text already in the body is kept.
  for (const [key, iso] of [
    ["start", str(flat.starts_on)],
    ["end", str(flat.ends_on)]
  ] as const) {
    if (!iso) continue;
    const parts = dateParts(iso);
    if (!parts.day) continue;
    body[key] = { ...parts, time: body[key].time };
  }

  if (flat.tagNames) {
    body.tags = flat.tagNames
      .map((name) => name.trim())
      .filter(Boolean)
      .map((name) => (name.startsWith("#") ? name : `#${name}`));
  }
}

function overlaySections(body: CoursesTemplateBodyV1, s: CoursesSectionsForm) {
  body.whoIsItFor = s.c1.whoIsItFor.trim();
  body.whoForNote = s.c1.whoForNote.trim();
  body.typeValue = s.c1.typeValue.trim();
  body.fillingBadge = s.c1.fillingBadge.trim();
  body.locationNote = s.c1.locationNote.trim();
  body.bookingUrl = safeBodyUrl(s.c1.bookingUrl);
  body.partnerLogo = safeBodyUrl(s.c1.partnerLogo);

  body.description = {
    left: { title: s.c2.leftTitle.trim(), bodies: linesToList(s.c2.leftBodies) },
    right: { title: s.c2.rightTitle.trim(), bodies: linesToList(s.c2.rightBodies) }
  };
  // The editor owns one set of C2 / C5 copy; mobile variants mirror desktop.
  delete body.descriptionMobile;

  body.highlights.title = s.c4.title.trim();
  body.highlights.items = s.c4.items
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item, index) => ({ num: String(index + 1).padStart(2, "0"), body: item }));

  body.checks.chip = s.c5.chip.trim();
  body.checks.items = s.c5.items.map((item) => item.trim()).filter(Boolean);
  delete body.checksMobile;

  body.brochure.title = s.c6.title.trim();
  body.brochure.subtitle = s.c6.subtitle.trim();
  body.brochure.ctaLabel = s.c6.ctaLabel.trim();
  body.brochure.badgeLabel = s.c6.badgeLabel.trim();

  body.awarding.title = s.c7.title.trim();
  body.awarding.body = s.c7.body.trim();
  body.awarding.logo = safeBodyUrl(s.c7.logoUrl);
  body.awarding.logoAlt = s.c7.logoAlt.trim() || body.awarding.logoAlt;
  body.awarding.photo = safeBodyUrl(s.c7.photoUrl);
  body.awarding.photoAlt = s.c7.photoAlt.trim() || body.awarding.photoAlt;
  if (body.awarding.photo) body.awarding.photoMobile = body.awarding.photo;
  body.awarding.facts = s.c7.facts
    .map((fact) => ({ title: fact.title.trim(), body: fact.body.trim() }))
    .filter((fact) => fact.title)
    .map((fact) => (fact.body ? { title: fact.title, body: fact.body } : { title: fact.title }));
  body.awarding.rankings = {
    titleLines: linesToList(s.c7.rankingTitleLines),
    bodies: linesToList(s.c7.rankingBodies)
  };
  body.awarding.accreditation.titleLines = linesToList(s.c7.accreditationTitleLines);
  body.awarding.accreditation.logos = s.c7.accreditationLogos
    .map((logo) => ({
      src: safeBodyUrl(logo.url),
      alt: logo.alt.trim(),
      width: 80,
      height: 40
    }))
    .filter((logo) => logo.src)
    .slice(0, 6);

  body.apply.title = s.c8.title.trim();
  body.apply.subtitle = s.c8.subtitle.trim();
  body.apply.eligibilityChips = linesToList(s.c8.eligibilityChips);
  body.apply.option1Steps = s.c8.steps
    .filter((step) => step.title.trim())
    .map((step) => {
      const linkText = step.linkText.trim();
      if (linkText) {
        return {
          title: step.title.trim(),
          bodyBefore: step.body,
          linkText,
          linkHref: safeBodyUrl(step.linkHref),
          bodyAfter: step.bodyAfter
        };
      }
      return { title: step.title.trim(), body: step.body.trim() };
    });
  body.apply.option2 = {
    title: s.c8.option2.title.trim(),
    bodyBefore: s.c8.option2.bodyBefore,
    linkText: s.c8.option2.linkText.trim(),
    linkHref: safeBodyUrl(s.c8.option2.linkHref),
    bodyAfter: s.c8.option2.bodyAfter
  };

  body.certificate.headline = s.c9.headline.trim();
  body.certificate.checks = linesToList(s.c9.checks);
  body.certificate.mock.ticket = s.c9.mockTicket.trim();
  body.certificate.mock.programTitle = s.c9.mockProgramTitle.trim();
  body.certificate.mock.nameLabel = s.c9.mockNameLabel.trim();
  body.certificate.mock.nameValue = s.c9.mockNameValue.trim();
  body.certificate.mock.dateLabel = s.c9.mockDateLabel.trim();
  body.certificate.mock.dateValue = s.c9.mockDateValue.trim();
  body.certificate.mock.awardingLabel = s.c9.mockAwardingLabel.trim();
  body.certificate.mock.awardingValue = s.c9.mockAwardingValue.trim();
  const seal = safeBodyUrl(s.c9.mockSealUrl);
  if (seal) body.certificate.mock.seal = seal;

  body.higlights.title = s.c10.title.trim();
  body.higlights.lead = linesToList(s.c10.leadLines).slice(0, 4);
  body.higlights.place = s.c10.place.trim();
  body.higlights.note = s.c10.note.trim();
  if (!body.higlights.pinSrc) body.higlights.pinSrc = "/assets/img/premium-highlights/pin-place.svg";
  body.higlights.photos = s.c10.photos
    .map((photo, index) => ({
      src: safeBodyUrl(photo.url),
      alt: photo.alt.trim(),
      crop: ((index % 3) + 1) as 1 | 2 | 3
    }))
    .filter((photo) => photo.src)
    .slice(0, 7);

  body.enroll.title = s.c11.title.trim();
  body.enroll.subtitle = s.c11.subtitle.trim();
  body.enroll.price = s.c11.price.trim();
  body.enroll.accessBadge = s.c11.accessBadge.trim();
  body.enroll.earlyBird = s.c11.earlyBird.trim();
  body.enroll.breakdownLeft = linesToBreakdown(s.c11.breakdownLeft);
  body.enroll.breakdownRight = linesToBreakdown(s.c11.breakdownRight);
  body.enroll.housingLabel = s.c11.housingLabel.trim();
  body.enroll.housingPrice = s.c11.housingPrice.trim();
  body.enroll.housingApprox = s.c11.housingApprox.trim();
  body.enroll.paymentTitle = s.c11.paymentTitle.trim();
  body.enroll.paymentBody = s.c11.paymentBody.trim();

  body.learners.lead = s.c12.lead.trim();
  body.learners.badge = s.c12.badge.trim();
  body.learners.bodyBefore = s.c12.bodyBefore;
  body.learners.bodyBoldPgs = s.c12.bodyBoldPgs.trim();
  body.learners.bodyMid = s.c12.bodyMid;
  body.learners.bodyBold3x = s.c12.bodyBold3x.trim();
  body.learners.bodyAnd = s.c12.bodyAnd;
  body.learners.bodyBoldSkills = s.c12.bodyBoldSkills.trim();
  body.learners.bodyAfter = s.c12.bodyAfter;
  body.learners.photoSrc = safeBodyUrl(s.c12.photoUrl);
  body.learners.photoAlt = s.c12.photoAlt.trim();
  body.learners.quoteMob = s.c12.quoteMob.trim();
  if (!body.learners.quoteSrc) body.learners.quoteSrc = "/assets/img/learner-words/quote.svg";
  body.learners.cards = s.c12.quotes
    .map((quote) => quote.trim())
    .filter(Boolean)
    .slice(0, 3)
    .map((quoteDesk) => ({ quoteDesk }));
  body.learners.bio = {
    name: s.c12.bioName.trim(),
    role: s.c12.bioRole.trim(),
    location: s.c12.bioLocation.trim()
  };

  body.faq.heading = s.c13.heading.trim();
  if (!body.faq.plusIconSrc) body.faq.plusIconSrc = "/assets/img/purple-events/faq-plus.png";
  if (!body.faq.minusIconSrc) body.faq.minusIconSrc = "/assets/img/purple-events/faq-minus.png";
  body.faq.tabs = s.c13.tabs.map((tab) => ({
    id: tab.id.trim() || "tab",
    label: tab.label.trim(),
    items: tab.items
      .map((item) => ({ question: item.question.trim(), answer: item.answer.trim() }))
      .filter((item) => item.question)
  }));
  if (body.faq.tabs[0]) body.faq.defaultTabId = body.faq.tabs[0].id;
}

/**
 * Build the complete detail body for Save Draft.
 * 1) previous body when valid, else the empty body · 2) flat fields · 3) section fields · 4) strict re-parse.
 * Hero image and brochure URLs stay as-is in the body; the preview overlays the chosen media assets.
 */
export function buildCoursesDetailBody(args: {
  id: string;
  previous?: unknown;
  flat: CoursesFlatDraftInput;
  sections: CoursesSectionsForm;
}): CoursesTemplateBodyV1 {
  const previous = parseCoursesDetailBody(args.previous);
  const body: CoursesTemplateBodyV1 = previous
    ? structuredClone(previous)
    : buildEmptyCoursesDetailBody(args.id);
  body.schemaVersion = 1;
  body.id = args.id || body.id || "new";

  overlayFlat(body, args.flat);
  overlaySections(body, args.sections);

  const result = CoursesTemplateBodyV1.safeParse(body);
  if (!result.success) {
    const issue = result.error.issues[0];
    throw new Error(`Course detail sections are invalid — ${issue?.path.join(".") ?? "body"}: ${issue?.message ?? ""}`);
  }
  return result.data;
}
