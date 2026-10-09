/**
 * Courses template (`detail_template = courses`) — body schema v1.
 * Mirrors `ProgramsCoursesFixture` in `content.ts` (single shape truth for COURSE2a).
 * Strict: unknown keys rejected. No DB, no CMS wire yet.
 */
import { z } from "zod";
import type { ProgramsCoursesFixture } from "./content";

const text = z.string();
const textList = z.array(text);

const dateParts = z.strictObject({
  day: text,
  month: text,
  year: text,
  time: text
});

const descColumn = z.strictObject({
  title: text,
  bodies: textList
});

const descPair = z.strictObject({
  left: descColumn,
  right: descColumn
});

const checkBlock = z.strictObject({
  chip: text,
  items: textList,
  icon: text
});

const breakdownItem = z.strictObject({
  text,
  bold: text.optional()
});

export const CoursesTemplateBodyV1 = z.strictObject({
  schemaVersion: z.literal(1),
  id: text.min(1),
  titleLines: textList,
  whoIsItFor: text,
  whoForNote: text,
  partnership: text,
  typeLabel: text,
  typeValue: text,
  durationLabel: text,
  durationValue: text,
  fillingBadge: text,
  fillingIcon: text,
  modeLabel: text,
  tags: textList,
  locationNote: text,
  bookingCta: text,
  bookingUrl: text,
  heroImage: text,
  heroImageAlt: text,
  partnerLogo: text,
  shareIcon: text,
  start: dateParts,
  end: dateParts,
  description: descPair,
  descriptionMobile: descPair.optional(),
  programDescription: z.strictObject({
    titleLines: textList,
    body: text,
    icon: text
  }),
  highlights: z.strictObject({
    title: text,
    icon: text,
    items: z.array(z.strictObject({ num: text, body: text }))
  }),
  checks: checkBlock,
  checksMobile: checkBlock.optional(),
  brochure: z.strictObject({
    title: text,
    subtitle: text,
    ctaLabel: text,
    downloadUrl: text,
    badgeLabel: text,
    translateIcon: text
  }),
  awarding: z.strictObject({
    title: text,
    body: text,
    logo: text,
    logoAlt: text,
    photo: text,
    photoAlt: text,
    photoMobile: text.optional(),
    facts: z.array(z.strictObject({ title: text, body: text.optional() })),
    rankings: z.strictObject({ titleLines: textList, bodies: textList }),
    accreditation: z.strictObject({
      titleLines: textList,
      logos: z.array(
        z.strictObject({
          src: text,
          alt: text,
          width: z.number(),
          height: z.number()
        })
      )
    })
  }),
  apply: z.strictObject({
    title: text,
    subtitle: text,
    eligibilityLabel: text,
    eligibilityChips: textList,
    optionLabel: text,
    arrowIcon: text,
    option1Steps: z.array(
      z.strictObject({
        title: text,
        body: text.optional(),
        bodyBefore: text.optional(),
        linkText: text.optional(),
        linkHref: text.optional(),
        bodyAfter: text.optional()
      })
    ),
    option2: z.strictObject({
      title: text,
      bodyBefore: text,
      linkText: text,
      linkHref: text,
      bodyAfter: text
    })
  }),
  certificate: z.strictObject({
    headline: text,
    whyTitle: text,
    checkIcon: text,
    checks: textList,
    mock: z.strictObject({
      ticket: text,
      programTitle: text,
      nameLabel: text,
      nameValue: text,
      dateLabel: text,
      dateValue: text,
      awardingLabel: text,
      awardingValue: text,
      seal: text
    })
  }),
  /** C10 — #higlights (spelling locked). Up to 7 changeable photos. */
  higlights: z.strictObject({
    title: text,
    lead: textList,
    place: text,
    pinSrc: text,
    note: text,
    photos: z
      .array(
        z.strictObject({
          src: text,
          alt: text,
          crop: z.union([z.literal(1), z.literal(2), z.literal(3)])
        })
      )
      .max(7)
  }),
  enroll: z.strictObject({
    title: text,
    subtitle: text,
    price: text,
    ctaLabel: text,
    ctaHref: text,
    accessBadge: text,
    earlyBird: text,
    breakdownTitle: text,
    checkIcon: text,
    breakdownLeft: z.array(breakdownItem),
    breakdownRight: z.array(breakdownItem),
    otherExpensesTitle: text,
    housingLabel: text,
    housingPrice: text,
    housingApprox: text,
    paymentTitle: text,
    paymentBody: text
  }),
  /** C12 — learner testimonials */
  learners: z.strictObject({
    lead: text,
    badge: text,
    bodyBefore: text,
    bodyBoldPgs: text,
    bodyMid: text,
    bodyBold3x: text,
    bodyAnd: text,
    bodyBoldSkills: text,
    bodyAfter: text,
    photoSrc: text,
    photoAlt: text,
    quoteSrc: text,
    quoteMob: text,
    cards: z.array(z.strictObject({ quoteDesk: text })).max(3),
    bio: z.strictObject({ name: text, role: text, location: text })
  }),
  /** C13 — FAQ */
  faq: z.strictObject({
    heading: text,
    plusIconSrc: text,
    minusIconSrc: text,
    defaultTabId: text,
    defaultOpenIndex: z.number().int().nonnegative(),
    tabs: z.array(
      z.strictObject({
        id: text,
        label: text,
        items: z.array(z.strictObject({ question: text, answer: text }))
      })
    )
  })
});

export type CoursesTemplateBodyV1 = z.infer<typeof CoursesTemplateBodyV1>;

/** Compile-time guard: schema body (minus version) must stay equal to the fixture shape. */
type _FixtureFromBody = Omit<CoursesTemplateBodyV1, "schemaVersion">;
const _bodyMatchesFixture: [_FixtureFromBody] extends [ProgramsCoursesFixture]
  ? [ProgramsCoursesFixture] extends [_FixtureFromBody]
    ? true
    : never
  : never = true;
void _bodyMatchesFixture;
