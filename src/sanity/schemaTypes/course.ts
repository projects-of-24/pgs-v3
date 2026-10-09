import { defineArrayMember, defineField, defineType } from "sanity";
import { courseFieldGroups } from "./courseGroups";

/**
 * Trial Course document — field groups mirror Ops `/ops/cms/courses` C1–C13.
 */
export const courseType = defineType({
  name: "course",
  title: "Course (Sanity trial)",
  type: "document",
  groups: [...courseFieldGroups],
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      group: "basics",
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "slug",
      title: "Slug (preview URL)",
      type: "slug",
      group: "basics",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required()
    }),
    defineField({
      name: "partnership",
      title: "Short description / partnership line",
      type: "text",
      rows: 2,
      group: "basics",
      description: "Ops: short_description"
    }),
    defineField({
      name: "durationValue",
      title: "Duration",
      type: "string",
      group: "basics"
    }),
    defineField({
      name: "modeLabel",
      title: "Mode",
      type: "string",
      group: "basics",
      description: 'e.g. "#Online" or "#inCampus"'
    }),
    defineField({
      name: "tags",
      title: "Tags",
      type: "array",
      group: "basics",
      of: [defineArrayMember({ type: "string" })],
      options: { layout: "tags" }
    }),
    defineField({ name: "startsOn", title: "Start date", type: "date", group: "basics" }),
    defineField({ name: "endsOn", title: "End date", type: "date", group: "basics" }),
    defineField({
      name: "heroImage",
      title: "Hero image",
      type: "image",
      group: "basics",
      options: { hotspot: true }
    }),
    defineField({ name: "heroImageAlt", title: "Hero image alt", type: "string", group: "basics" }),
    defineField({
      name: "brochureDownloadUrl",
      title: "Brochure PDF URL",
      type: "url",
      group: "basics",
      description: "Ops: brochure file — paste https URL to enable Download on C6",
      validation: (rule) => rule.uri({ allowRelative: true, scheme: ["http", "https"] })
    }),

    defineField({ name: "whoIsItFor", title: "Who is it for (subhead)", type: "string", group: "c1" }),
    defineField({ name: "whoForNote", title: "Who-for note", type: "string", group: "c1" }),
    defineField({ name: "typeValue", title: "Type value", type: "string", group: "c1" }),
    defineField({ name: "fillingBadge", title: "Filling badge", type: "string", group: "c1" }),
    defineField({ name: "locationNote", title: "Location note", type: "string", group: "c1" }),
    defineField({ name: "bookingCta", title: "Booking CTA label", type: "string", group: "c1", initialValue: "Book Your Seat" }),
    defineField({
      name: "bookingUrl",
      title: "Booking URL",
      type: "url",
      group: "c1",
      validation: (rule) => rule.uri({ allowRelative: true, scheme: ["http", "https"] })
    }),
    defineField({ name: "partnerLogo", title: "Partner logo (left of photo)", type: "image", group: "c1" }),

    defineField({ name: "topicsLeftTitle", title: "Left title", type: "string", group: "c2" }),
    defineField({
      name: "topicsLeftBodies",
      title: "Left bodies (one per line)",
      type: "array",
      group: "c2",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({ name: "topicsRightTitle", title: "Right title", type: "string", group: "c2" }),
    defineField({
      name: "topicsRightBodies",
      title: "Right bodies (one per line)",
      type: "array",
      group: "c2",
      of: [defineArrayMember({ type: "string" })]
    }),

    defineField({
      name: "programDescriptionTitle",
      title: "Program description title",
      type: "string",
      group: "c3"
    }),
    defineField({
      name: "programDescriptionBody",
      title: "Program description body",
      type: "text",
      rows: 6,
      group: "c3",
      description: "Ops: Description field"
    }),

    defineField({ name: "highlightsTitle", title: "Section title", type: "string", group: "c4" }),
    defineField({
      name: "highlightItems",
      title: "Highlights",
      type: "array",
      group: "c4",
      of: [
        defineArrayMember({
          type: "object",
          name: "highlightItem",
          fields: [
            defineField({ name: "body", title: "Body", type: "text", rows: 2 }),
            defineField({ name: "num", title: "Number (optional)", type: "string" })
          ],
          preview: { select: { title: "body", subtitle: "num" } }
        })
      ]
    }),

    defineField({ name: "checksChip", title: "Chip text", type: "string", group: "c5" }),
    defineField({
      name: "checkItems",
      title: "Checklist items",
      type: "array",
      group: "c5",
      of: [defineArrayMember({ type: "string" })]
    }),

    defineField({ name: "brochureTitle", title: "Title", type: "string", group: "c6" }),
    defineField({ name: "brochureSubtitle", title: "Subtitle", type: "string", group: "c6" }),
    defineField({ name: "brochureCtaLabel", title: "Button label", type: "string", group: "c6" }),
    defineField({ name: "brochureBadgeLabel", title: "Badge label", type: "string", group: "c6" }),

    defineField({ name: "awardingTitle", title: "Title", type: "string", group: "c7" }),
    defineField({ name: "awardingBody", title: "Body", type: "text", rows: 4, group: "c7" }),
    defineField({ name: "awardingLogo", title: "Logo (left box)", type: "image", group: "c7" }),
    defineField({ name: "awardingLogoAlt", title: "Logo alt", type: "string", group: "c7" }),
    defineField({ name: "awardingPhoto", title: "Photo (right area)", type: "image", group: "c7" }),
    defineField({ name: "awardingPhotoAlt", title: "Photo alt", type: "string", group: "c7" }),
    defineField({
      name: "awardingFacts",
      title: "Facts",
      type: "array",
      group: "c7",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "body", type: "string", title: "Body (optional)" })
          ]
        })
      ]
    }),
    defineField({
      name: "rankingTitleLines",
      title: "Rankings title lines",
      type: "array",
      group: "c7",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({
      name: "rankingBodies",
      title: "Rankings bodies",
      type: "array",
      group: "c7",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({
      name: "accreditationTitleLines",
      title: "Accreditation title lines",
      type: "array",
      group: "c7",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({
      name: "accreditationLogos",
      title: "Accreditation logos (up to 6)",
      type: "array",
      group: "c7",
      validation: (rule) => rule.max(6),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "image", type: "image", title: "Logo" }),
            defineField({ name: "alt", type: "string", title: "Alt" }),
            defineField({ name: "width", type: "number", title: "Width", initialValue: 80 }),
            defineField({ name: "height", type: "number", title: "Height", initialValue: 40 })
          ]
        })
      ]
    }),

    defineField({ name: "applyTitle", title: "Title", type: "string", group: "c8" }),
    defineField({ name: "applySubtitle", title: "Subtitle", type: "string", group: "c8" }),
    defineField({
      name: "eligibilityChips",
      title: "Eligibility chips",
      type: "array",
      group: "c8",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({
      name: "applySteps",
      title: "Option 1 steps",
      type: "array",
      group: "c8",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", title: "Title" }),
            defineField({ name: "body", type: "string", title: "Body before link" }),
            defineField({ name: "linkText", type: "string", title: "Link text" }),
            defineField({ name: "linkHref", type: "string", title: "Link URL" }),
            defineField({ name: "bodyAfter", type: "string", title: "Text after link" })
          ]
        })
      ]
    }),
    defineField({
      name: "applyOption2",
      title: "Option 2",
      type: "object",
      group: "c8",
      fields: [
        defineField({ name: "title", type: "string", title: "Title" }),
        defineField({ name: "bodyBefore", type: "string", title: "Text before link" }),
        defineField({ name: "linkText", type: "string", title: "Link text" }),
        defineField({ name: "linkHref", type: "string", title: "Link URL" }),
        defineField({ name: "bodyAfter", type: "string", title: "Text after link" })
      ]
    }),

    defineField({ name: "certificateHeadline", title: "Headline", type: "string", group: "c9" }),
    defineField({
      name: "certificateChecks",
      title: "Why it matters (one per line)",
      type: "array",
      group: "c9",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({ name: "mockTicket", title: "Ticket label", type: "string", group: "c9" }),
    defineField({ name: "mockProgramTitle", title: "Program title on card", type: "string", group: "c9" }),
    defineField({ name: "mockNameLabel", title: "Name label", type: "string", group: "c9" }),
    defineField({ name: "mockNameValue", title: "Name value", type: "string", group: "c9" }),
    defineField({ name: "mockDateLabel", title: "Date label", type: "string", group: "c9" }),
    defineField({ name: "mockDateValue", title: "Date value", type: "string", group: "c9" }),
    defineField({ name: "mockAwardingLabel", title: "Awarding label", type: "string", group: "c9" }),
    defineField({ name: "mockAwardingValue", title: "Awarding value", type: "string", group: "c9" }),
    defineField({ name: "mockSeal", title: "Seal image", type: "image", group: "c9" }),

    defineField({ name: "higlightsTitle", title: "Title", type: "string", group: "c10", initialValue: "#higlights" }),
    defineField({
      name: "higlightsLead",
      title: "Lead lines",
      type: "array",
      group: "c10",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({ name: "higlightsPlace", title: "Place", type: "string", group: "c10" }),
    defineField({ name: "higlightsNote", title: "Note", type: "text", rows: 3, group: "c10" }),
    defineField({
      name: "higlightsPhotos",
      title: "Photos (up to 7)",
      type: "array",
      group: "c10",
      validation: (rule) => rule.max(7),
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "image", type: "image", title: "Photo" }),
            defineField({ name: "alt", type: "string", title: "Alt" }),
            defineField({
              name: "crop",
              type: "number",
              title: "Crop variant (1–3)",
              validation: (rule) => rule.min(1).max(3)
            })
          ]
        })
      ]
    }),

    defineField({ name: "enrollTitle", title: "Title", type: "string", group: "c11" }),
    defineField({ name: "enrollSubtitle", title: "Subtitle", type: "string", group: "c11" }),
    defineField({ name: "enrollPrice", title: "Price", type: "string", group: "c11" }),
    defineField({ name: "enrollAccessBadge", title: "Access badge", type: "string", group: "c11" }),
    defineField({ name: "enrollEarlyBird", title: "Early bird", type: "string", group: "c11" }),
    defineField({
      name: "breakdownLeftLines",
      title: "Breakdown left (one per line; use || for bold tail)",
      type: "array",
      group: "c11",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({
      name: "breakdownRightLines",
      title: "Breakdown right (one per line)",
      type: "array",
      group: "c11",
      of: [defineArrayMember({ type: "string" })]
    }),
    defineField({ name: "housingLabel", title: "Housing label", type: "string", group: "c11" }),
    defineField({ name: "housingPrice", title: "Housing price", type: "string", group: "c11" }),
    defineField({ name: "housingApprox", title: "Housing note", type: "string", group: "c11" }),
    defineField({ name: "paymentTitle", title: "Payment title", type: "string", group: "c11" }),
    defineField({ name: "paymentBody", title: "Payment body", type: "text", rows: 2, group: "c11" }),

    defineField({ name: "learnersLead", title: "Lead", type: "string", group: "c12" }),
    defineField({ name: "learnersBadge", title: "Badge", type: "string", group: "c12" }),
    defineField({ name: "learnersBodyBefore", title: "Intro before bold", type: "string", group: "c12" }),
    defineField({ name: "learnersBodyBoldPgs", title: "Bold #PGS", type: "string", group: "c12" }),
    defineField({ name: "learnersBodyMid", title: "Intro mid", type: "string", group: "c12" }),
    defineField({ name: "learnersBodyBold3x", title: "Bold 3x line", type: "string", group: "c12" }),
    defineField({ name: "learnersBodyAnd", title: "And", type: "string", group: "c12" }),
    defineField({ name: "learnersBodyBoldSkills", title: "Bold skills", type: "string", group: "c12" }),
    defineField({ name: "learnersBodyAfter", title: "Intro after", type: "string", group: "c12" }),
    defineField({ name: "learnersPhoto", title: "Learner photo", type: "image", group: "c12" }),
    defineField({ name: "learnersPhotoAlt", title: "Photo alt", type: "string", group: "c12" }),
    defineField({ name: "learnersQuoteMob", title: "Mobile quote", type: "text", rows: 3, group: "c12" }),
    defineField({
      name: "learnersQuotes",
      title: "Desk quotes (3 cards)",
      type: "array",
      group: "c12",
      validation: (rule) => rule.max(3),
      of: [defineArrayMember({ type: "text", rows: 3 })]
    }),
    defineField({ name: "learnersBioName", title: "Bio name", type: "string", group: "c12" }),
    defineField({ name: "learnersBioRole", title: "Bio role", type: "string", group: "c12" }),
    defineField({ name: "learnersBioLocation", title: "Bio location", type: "string", group: "c12" }),

    defineField({ name: "faqHeading", title: "Heading", type: "string", group: "c13" }),
    defineField({
      name: "faqTabs",
      title: "FAQ tabs",
      type: "array",
      group: "c13",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "id", type: "string", title: "Tab id (slug)" }),
            defineField({ name: "label", type: "string", title: "Tab label" }),
            defineField({
              name: "items",
              type: "array",
              title: "Q&A",
              of: [
                defineArrayMember({
                  type: "object",
                  fields: [
                    defineField({ name: "question", type: "string", title: "Question" }),
                    defineField({ name: "answer", type: "text", rows: 3, title: "Answer" })
                  ]
                })
              ]
            })
          ],
          preview: { select: { title: "label", subtitle: "id" } }
        })
      ]
    })
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current", media: "heroImage" }
  }
});
