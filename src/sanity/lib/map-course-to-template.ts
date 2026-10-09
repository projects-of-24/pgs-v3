/**
 * Sanity course document → Programs Courses fixture (same shell as Ops preview).
 * Parallel trial only — does not read or write Supabase.
 */
import {
  buildEmptyCoursesDetailBody,
  dateParts,
  splitTitleLines
} from "@/features/programs-courses/courses-cms-preview-map";
import { coursesDetailBodyToFixture } from "@/features/programs-courses/courses-detail-validation";
import type { ProgramsCoursesFixture } from "@/features/programs-courses/content";
import { urlForImage } from "../image";

const BREAKDOWN_SPLIT = " || ";

export type SanityCourseDoc = Record<string, unknown> & {
  _id?: string;
  title?: string | null;
  slug?: string | null;
};

function str(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function strList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => str(item)).filter(Boolean);
}

function linesToBreakdown(lines: string[]): { text: string; bold?: string }[] {
  return lines.map((line) => {
    const at = line.indexOf(BREAKDOWN_SPLIT.trim());
    if (at < 0) return { text: line.trim() };
    const left = line.slice(0, at).trim();
    const bold = line.slice(at + BREAKDOWN_SPLIT.length).trim();
    return bold ? { text: `${left} `, bold } : { text: left };
  });
}

function cropVariant(value: unknown): 1 | 2 | 3 {
  const n = typeof value === "number" ? value : Number(value);
  if (n === 2) return 2;
  if (n === 3) return 3;
  return 1;
}

function asObject(value: unknown): Record<string, unknown> | null {
  return typeof value === "object" && value !== null && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

export function mapSanityCourseToTemplate(doc: SanityCourseDoc): ProgramsCoursesFixture {
  const id = str(doc.slug) || str(doc._id) || "sanity-course";
  const body = buildEmptyCoursesDetailBody(id);
  const title = str(doc.title) || "Untitled Sanity course";

  body.titleLines = splitTitleLines(title);
  body.partnership = str(doc.partnership);
  body.whoIsItFor = str(doc.whoIsItFor);
  body.whoForNote = str(doc.whoForNote);
  body.typeValue = str(doc.typeValue);
  body.durationValue = str(doc.durationValue);
  const mode = str(doc.modeLabel);
  body.modeLabel = mode ? (mode.startsWith("#") ? mode : `#${mode}`) : "";
  body.tags = strList(doc.tags).map((tag) => (tag.startsWith("#") ? tag : `#${tag}`));
  body.fillingBadge = str(doc.fillingBadge);
  body.locationNote = str(doc.locationNote);
  body.bookingCta = str(doc.bookingCta) || body.bookingCta;
  body.bookingUrl = str(doc.bookingUrl);
  body.heroImage = urlForImage(doc.heroImage as never);
  body.heroImageAlt = str(doc.heroImageAlt) || title;
  body.partnerLogo = urlForImage(doc.partnerLogo as never);

  const startIso = str(doc.startsOn);
  const endIso = str(doc.endsOn);
  if (startIso) body.start = dateParts(startIso);
  if (endIso) body.end = dateParts(endIso);

  const programTitle = str(doc.programDescriptionTitle);
  body.programDescription = {
    ...body.programDescription,
    titleLines: programTitle ? [programTitle] : body.programDescription.titleLines,
    body: str(doc.programDescriptionBody)
  };

  body.description = {
    left: {
      title: str(doc.topicsLeftTitle) || body.description.left.title,
      bodies: strList(doc.topicsLeftBodies)
    },
    right: {
      title: str(doc.topicsRightTitle) || body.description.right.title,
      bodies: strList(doc.topicsRightBodies)
    }
  };

  const highlightItems = Array.isArray(doc.highlightItems) ? doc.highlightItems : [];
  const highlights = highlightItems
    .map((item, index) => {
      const row = asObject(item);
      return {
        num: str(row?.num) || String(index + 1).padStart(2, "0"),
        body: str(row?.body)
      };
    })
    .filter((item) => item.body);
  if (str(doc.highlightsTitle) || highlights.length) {
    body.highlights = {
      ...body.highlights,
      title: str(doc.highlightsTitle) || body.highlights.title,
      items: highlights.length ? highlights : body.highlights.items
    };
  }

  const checkItems = strList(doc.checkItems);
  if (str(doc.checksChip) || checkItems.length) {
    body.checks = {
      ...body.checks,
      chip: str(doc.checksChip) || body.checks.chip,
      items: checkItems.length ? checkItems : body.checks.items
    };
  }

  const brochureUrl = str(doc.brochureDownloadUrl);
  body.brochure = {
    ...body.brochure,
    title: str(doc.brochureTitle) || (brochureUrl ? body.brochure.title : ""),
    subtitle: str(doc.brochureSubtitle),
    ctaLabel: str(doc.brochureCtaLabel) || body.brochure.ctaLabel,
    badgeLabel: str(doc.brochureBadgeLabel),
    downloadUrl: brochureUrl
  };

  const factsRaw = Array.isArray(doc.awardingFacts) ? doc.awardingFacts : [];
  const facts = factsRaw
    .map((item) => {
      const row = asObject(item);
      return { title: str(row?.title), body: str(row?.body) };
    })
    .filter((f) => f.title);
  body.awarding = {
    ...body.awarding,
    title: str(doc.awardingTitle),
    body: str(doc.awardingBody),
    logo: urlForImage(doc.awardingLogo as never),
    logoAlt: str(doc.awardingLogoAlt),
    photo: urlForImage(doc.awardingPhoto as never),
    photoAlt: str(doc.awardingPhotoAlt),
    facts: facts.length ? facts : body.awarding.facts,
    rankings: {
      titleLines: strList(doc.rankingTitleLines),
      bodies: strList(doc.rankingBodies)
    },
    accreditation: {
      titleLines: strList(doc.accreditationTitleLines),
      logos: (Array.isArray(doc.accreditationLogos) ? doc.accreditationLogos : [])
        .map((item) => {
          const row = asObject(item);
          const src = urlForImage(row?.image as never);
          if (!src) return null;
          return {
            src,
            alt: str(row?.alt),
            width: typeof row?.width === "number" ? row.width : 80,
            height: typeof row?.height === "number" ? row.height : 40
          };
        })
        .filter((row): row is NonNullable<typeof row> => Boolean(row))
    }
  };

  const stepsRaw = Array.isArray(doc.applySteps) ? doc.applySteps : [];
  const option1Steps = stepsRaw
    .map((item) => {
      const row = asObject(item);
      if (!row) return null;
      return {
        title: str(row.title),
        body: str(row.body),
        linkText: str(row.linkText),
        linkHref: str(row.linkHref),
        bodyAfter: str(row.bodyAfter)
      };
    })
    .filter((s): s is NonNullable<typeof s> => Boolean(s?.title));

  const opt2 = asObject(doc.applyOption2);
  body.apply = {
    ...body.apply,
    title: str(doc.applyTitle),
    subtitle: str(doc.applySubtitle),
    eligibilityChips: strList(doc.eligibilityChips),
    option1Steps: option1Steps.length ? option1Steps : body.apply.option1Steps,
    option2: opt2
      ? {
          title: str(opt2.title),
          bodyBefore: str(opt2.bodyBefore),
          linkText: str(opt2.linkText),
          linkHref: str(opt2.linkHref),
          bodyAfter: str(opt2.bodyAfter)
        }
      : body.apply.option2
  };

  body.certificate = {
    ...body.certificate,
    headline: str(doc.certificateHeadline),
    checks: strList(doc.certificateChecks).length ? strList(doc.certificateChecks) : body.certificate.checks,
    mock: {
      ticket: str(doc.mockTicket),
      programTitle: str(doc.mockProgramTitle) || title,
      nameLabel: str(doc.mockNameLabel),
      nameValue: str(doc.mockNameValue),
      dateLabel: str(doc.mockDateLabel),
      dateValue: str(doc.mockDateValue),
      awardingLabel: str(doc.mockAwardingLabel),
      awardingValue: str(doc.mockAwardingValue),
      seal: urlForImage(doc.mockSeal as never)
    }
  };

  const photosRaw = Array.isArray(doc.higlightsPhotos) ? doc.higlightsPhotos : [];
  const photos = photosRaw
    .map((item) => {
      const row = asObject(item);
      const src = urlForImage(row?.image as never);
      if (!src) return null;
      return { src, alt: str(row?.alt), crop: cropVariant(row?.crop) };
    })
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (str(doc.higlightsTitle) || photos.length || strList(doc.higlightsLead).length) {
    body.higlights = {
      ...body.higlights,
      title: str(doc.higlightsTitle) || body.higlights.title,
      lead: strList(doc.higlightsLead),
      place: str(doc.higlightsPlace),
      note: str(doc.higlightsNote),
      photos: photos.length ? photos : body.higlights.photos
    };
  }

  body.enroll = {
    ...body.enroll,
    title: str(doc.enrollTitle),
    subtitle: str(doc.enrollSubtitle),
    price: str(doc.enrollPrice),
    accessBadge: str(doc.enrollAccessBadge),
    earlyBird: str(doc.enrollEarlyBird),
    breakdownLeft: linesToBreakdown(strList(doc.breakdownLeftLines)),
    breakdownRight: linesToBreakdown(strList(doc.breakdownRightLines)),
    housingLabel: str(doc.housingLabel),
    housingPrice: str(doc.housingPrice),
    housingApprox: str(doc.housingApprox),
    paymentTitle: str(doc.paymentTitle),
    paymentBody: str(doc.paymentBody)
  };

  const quotes = strList(doc.learnersQuotes);
  if (
    str(doc.learnersLead) ||
    str(doc.learnersPhotoAlt) ||
    urlForImage(doc.learnersPhoto as never) ||
    quotes.some(Boolean)
  ) {
    body.learners = {
      ...body.learners,
      lead: str(doc.learnersLead) || body.learners.lead,
      badge: str(doc.learnersBadge) || body.learners.badge,
      bodyBefore: str(doc.learnersBodyBefore),
      bodyBoldPgs: str(doc.learnersBodyBoldPgs),
      bodyMid: str(doc.learnersBodyMid),
      bodyBold3x: str(doc.learnersBodyBold3x),
      bodyAnd: str(doc.learnersBodyAnd),
      bodyBoldSkills: str(doc.learnersBodyBoldSkills),
      bodyAfter: str(doc.learnersBodyAfter),
      photoSrc: urlForImage(doc.learnersPhoto as never),
      photoAlt: str(doc.learnersPhotoAlt),
      quoteMob: str(doc.learnersQuoteMob),
      cards: [
        { quoteDesk: quotes[0] ?? "" },
        { quoteDesk: quotes[1] ?? "" },
        { quoteDesk: quotes[2] ?? "" }
      ],
      bio: {
        name: str(doc.learnersBioName),
        role: str(doc.learnersBioRole),
        location: str(doc.learnersBioLocation)
      }
    };
  }

  const faqTabsRaw = Array.isArray(doc.faqTabs) ? doc.faqTabs : [];
  const faqTabs = faqTabsRaw
    .map((tab, index) => {
      const row = asObject(tab);
      if (!row) return null;
      const itemsRaw = Array.isArray(row.items) ? row.items : [];
      const items = itemsRaw
        .map((item) => {
          const q = asObject(item);
          return q ? { question: str(q.question), answer: str(q.answer) } : null;
        })
        .filter((i): i is { question: string; answer: string } => Boolean(i?.question));
      if (!items.length) return null;
      return {
        id: str(row.id) || `tab-${index + 1}`,
        label: str(row.label) || `Tab ${index + 1}`,
        items
      };
    })
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  const legacyFaqQ = str(doc.faqQuestion);
  const legacyFaqA = str(doc.faqAnswer);

  if (str(doc.faqHeading) || faqTabs.length || legacyFaqQ || legacyFaqA) {
    body.faq = {
      ...body.faq,
      heading: str(doc.faqHeading) || body.faq.heading,
      defaultTabId: faqTabs[0]?.id ?? "general",
      tabs:
        faqTabs.length > 0
          ? faqTabs
          : [
              {
                id: "general",
                label: "General",
                items: [{ question: legacyFaqQ || "Question", answer: legacyFaqA }]
              }
            ]
    };
  }

  const fixture = coursesDetailBodyToFixture(body);
  if (!fixture) {
    const { schemaVersion: _v, ...rest } = body;
    void _v;
    return rest as ProgramsCoursesFixture;
  }
  return fixture;
}
