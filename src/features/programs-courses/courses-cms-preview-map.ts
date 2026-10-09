/**
 * COURSE2c — map flat CMS course draft fields onto the Courses template view model.
 * COURSE2b: a valid `detail_body` (schemaVersion 1) supplies the full C1–C13 body; without it,
 * unmapped sections stay empty (no Surgery Week fixture leak into unrelated drafts).
 */
import { PROGRAMS_COURSES_FIXTURE } from "./content";
import { emptyCoursesFaq, emptyCoursesLearners } from "./courses-cms-shared-defaults";
import { coursesDetailBodyToFixture } from "./courses-detail-validation";
import type { CoursesTemplateBodyV1 } from "./courses-template-schema";
import type { ProgramsCoursesDateParts, ProgramsCoursesFixture } from "./content";

export type CoursesCmsPreviewInput = {
  id: number;
  values: Record<string, unknown>;
  tagNames: string[];
  imageUrl: string;
  imageAlt: string;
  brochureUrl: string;
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function splitTitleLines(title: string): string[] {
  if (!title) return ["Untitled course"];
  const byBreak = title.split(/\n+/).map((line) => line.trim()).filter(Boolean);
  if (byBreak.length >= 2) return byBreak.slice(0, 3);
  const dash = title.match(/^(.+?)\s+[—–-]\s+(.+)$/);
  if (dash) return [dash[1].trim(), dash[2].trim()];
  if (title.length > 42) {
    const cut = title.lastIndexOf(" ", 42);
    if (cut > 16) return [title.slice(0, cut).trim(), title.slice(cut).trim()];
  }
  return [title];
}

export function dateParts(iso: string): ProgramsCoursesDateParts {
  if (!iso) return { day: "", month: "", year: "", time: "" };
  const date = new Date(`${iso}T12:00:00Z`);
  if (Number.isNaN(date.getTime())) return { day: "", month: "", year: "", time: "" };
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return {
    day: String(date.getUTCDate()).padStart(2, "0"),
    month: months[date.getUTCMonth()] ?? "",
    year: String(date.getUTCFullYear()).slice(-2),
    time: ""
  };
}

export function modeLabel(mode: string): string {
  if (!mode) return "";
  const cleaned = mode.replace(/^#/, "").replace(/\s+/g, "");
  if (/^at[-_]?campus$/i.test(mode) || /^incampus$/i.test(cleaned)) return "#inCampus";
  return mode.startsWith("#") ? mode : `#${cleaned}`;
}

export function emptyTemplate(id: string): ProgramsCoursesFixture {
  const icons = PROGRAMS_COURSES_FIXTURE;
  return {
    id,
    titleLines: ["Untitled course"],
    whoIsItFor: "",
    whoForNote: "",
    partnership: "",
    typeLabel: "Type",
    typeValue: "",
    durationLabel: "Duration",
    durationValue: "",
    fillingBadge: "",
    fillingIcon: icons.fillingIcon,
    modeLabel: "",
    tags: [],
    locationNote: "",
    bookingCta: "Book Your Seat",
    bookingUrl: "",
    heroImage: "",
    heroImageAlt: "",
    partnerLogo: "",
    shareIcon: icons.shareIcon,
    start: { day: "", month: "", year: "", time: "" },
    end: { day: "", month: "", year: "", time: "" },
    description: {
      left: { title: "Who's It For?", bodies: [] },
      right: { title: "Program Topics", bodies: [] }
    },
    programDescription: {
      titleLines: ["Program", "Description"],
      body: "",
      icon: icons.programDescription.icon
    },
    highlights: {
      title: "explore Program Highlights",
      icon: icons.highlights.icon,
      items: []
    },
    checks: {
      chip: "",
      items: [],
      icon: icons.checks.icon
    },
    brochure: {
      title: "Need a downloadable course copy?",
      subtitle: "Grab the brochure and dive into the details.",
      ctaLabel: "Download Here",
      downloadUrl: "",
      badgeLabel: "",
      translateIcon: icons.brochure.translateIcon
    },
    awarding: {
      title: "Learn more about the awarding body",
      body: "",
      logo: "",
      logoAlt: "",
      photo: "",
      photoAlt: "",
      facts: [],
      rankings: { titleLines: ["Rankings &", "Reputation"], bodies: [] },
      accreditation: { titleLines: ["Accreditation", "and Membership"], logos: [] }
    },
    apply: {
      title: "How to Apply",
      subtitle: "",
      eligibilityLabel: "Eligibility",
      eligibilityChips: [],
      optionLabel: "Option",
      arrowIcon: icons.apply.arrowIcon,
      option1Steps: [],
      option2: {
        title: "",
        bodyBefore: "",
        linkText: "",
        linkHref: "",
        bodyAfter: ""
      }
    },
    certificate: {
      headline: "",
      whyTitle: "Why It Matters",
      checkIcon: icons.certificate.checkIcon,
      checks: [],
      mock: {
        ticket: "Certificate",
        programTitle: "",
        nameLabel: "Name",
        nameValue: "Your Name",
        dateLabel: "Date",
        dateValue: "",
        awardingLabel: "Awarding Body",
        awardingValue: "",
        seal: icons.certificate.mock.seal
      }
    },
    higlights: {
      title: "",
      lead: [],
      place: "",
      pinSrc: "/assets/img/premium-highlights/pin-place.svg",
      note: "",
      photos: []
    },
    learners: emptyCoursesLearners(),
    faq: emptyCoursesFaq(),
    enroll: {
      title: "Enrollment Fee",
      subtitle: "",
      price: "",
      ctaLabel: "Enroll Now",
      ctaHref: "",
      accessBadge: "",
      earlyBird: "",
      breakdownTitle: "course breakdowns:",
      checkIcon: icons.enroll.checkIcon,
      breakdownLeft: [],
      breakdownRight: [],
      otherExpensesTitle: "Other expenses (optional)",
      housingLabel: "Housing & Stay",
      housingPrice: "",
      housingApprox: "*approx",
      paymentTitle: "Payment Methods",
      paymentBody: ""
    }
  };
}

/**
 * COURSE2d — a complete, schema-valid empty detail body (schemaVersion 1) with icon paths from the
 * lab fixture. The Ops editor overlays flat CMS fields and section fields onto this on Save Draft.
 */
export function buildEmptyCoursesDetailBody(id: string): CoursesTemplateBodyV1 {
  return { schemaVersion: 1, ...emptyTemplate(id) };
}

/**
 * COURSE2d — media chosen on the flat form (hero image / brochure PDF asset ids) is resolved by the
 * preview page and laid over a saved body, so the body does not have to carry media URLs.
 */
function overlayPreviewMedia(
  fixture: ProgramsCoursesFixture,
  input: CoursesCmsPreviewInput
): ProgramsCoursesFixture {
  const next: ProgramsCoursesFixture = { ...fixture, brochure: { ...fixture.brochure } };
  // Always prefer resolved CMS media over empty body URLs (body stores no asset paths).
  if (input.imageUrl.trim()) {
    next.heroImage = input.imageUrl.trim();
    next.heroImageAlt = input.imageAlt.trim() || next.heroImageAlt || "Course image";
  }
  if (input.brochureUrl.trim()) next.brochure.downloadUrl = input.brochureUrl.trim();
  return next;
}

/**
 * COURSE2b — a valid schemaVersion 1 `detail_body` (draft or carried live) is the full template.
 * Otherwise COURSE1 flat draft fields are overlaid on an empty template (partial map).
 */
export function coursesCmsDraftToTemplate(input: CoursesCmsPreviewInput): ProgramsCoursesFixture {
  const fromBody = coursesDetailBodyToFixture(input.values.detail_body);
  if (fromBody) return overlayPreviewMedia(fromBody, input);
  const values = input.values;
  const title = asString(values.title) || "Untitled course";
  const shortDescription = asString(values.short_description);
  const description = asString(values.description);
  const duration = asString(values.duration);
  const mode = asString(values.mode);
  const course = emptyTemplate(String(input.id));

  course.titleLines = splitTitleLines(title);
  // Flat COURSE1 map: short_description → partnership only (do not triple-paste).
  course.partnership = shortDescription;
  course.whoIsItFor = "";
  course.whoForNote = "";
  course.durationValue = duration;
  course.modeLabel = modeLabel(mode);
  course.start = dateParts(asString(values.starts_on));
  course.end = dateParts(asString(values.ends_on));
  course.tags = input.tagNames
    .map((name) => name.trim())
    .filter(Boolean)
    .map((name) => (name.startsWith("#") ? name : `#${name}`));
  course.heroImage = input.imageUrl;
  course.heroImageAlt = input.imageAlt || title;
  course.programDescription.body = description;
  course.certificate.mock.programTitle = title;
  course.brochure.downloadUrl = input.brochureUrl;
  course.brochure.title = input.brochureUrl ? course.brochure.title : "";
  course.enroll.subtitle = "";

  return course;
}
