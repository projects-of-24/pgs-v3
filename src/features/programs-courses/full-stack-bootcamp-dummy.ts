/**
 * COURSE2d-D2 — Full Stack dummy detail_body for Ops Preview QC (course 64).
 * Not the Surgery Week lab fixture. Placeholder copy + reusable public image paths
 * until staff replace media via C1/C7/C10 uploads.
 */
import type { CoursesTemplateBodyV1 } from "./courses-template-schema";
import { PROGRAMS_COURSES_FIXTURE } from "./content";
import { defaultCoursesFaq, emptyCoursesLearners } from "./courses-cms-shared-defaults";

const pin = "/assets/img/premium-highlights/pin-place.svg";
const photoA = "/assets/img/premium-highlights/highlight-hallway.jpg";
const photoB = "/assets/img/premium-highlights/highlight-posters.jpg";
const photoC = "/assets/img/premium-highlights/highlight-presenter.jpg";

/** Schema-valid Full Stack dummy body (id overridden by seed / Save Draft). */
export function buildFullStackBootcampDummyBody(id = "64"): CoursesTemplateBodyV1 {
  const icons = PROGRAMS_COURSES_FIXTURE;
  return {
    schemaVersion: 1,
    id,
    titleLines: ["FULL STACK WEB DEVELOPMENT BOOTCAMP", "JAN 2026"],
    whoIsItFor: "An intensive Full Stack Bootcamp for students and career switchers",
    whoForNote: "Bring curiosity and consistent practice — mentors guide the rest.",
    partnership:
      "#PGS presents an intensive Full Stack Web Development Bootcamp for students ready to build portfolio-ready apps.",
    typeLabel: "Type",
    typeValue: "Certificate",
    durationLabel: "Duration",
    durationValue: "6 weeks",
    fillingBadge: "Filling Fast",
    fillingIcon: icons.fillingIcon,
    modeLabel: "#inCampus",
    tags: ["#Tech", "#FullStack"],
    locationNote: "Campus + live mentor labs",
    bookingCta: "Book Your Seat",
    bookingUrl: "",
    heroImage: "",
    heroImageAlt: "Full Stack Bootcamp hero",
    partnerLogo: "",
    shareIcon: icons.shareIcon,
    start: { day: "15", month: "Jan", year: "26", time: "10am to 1 pm" },
    end: { day: "28", month: "Feb", year: "26", time: "10am to 1 pm" },
    description: {
      left: {
        title: "Who's It For?",
        bodies: [
          "Undergrads in CS, IT, or related fields",
          "Career switchers with basic programming",
          "Anyone who has completed HTML/CSS or intro JS"
        ]
      },
      right: {
        title: "Program Topics",
        bodies: [
          "Frontend: HTML/CSS, React, accessibility",
          "Backend: Node/Next.js APIs, Postgres, validation",
          "DevOps basics and deploy to the cloud"
        ]
      }
    },
    programDescription: {
      titleLines: ["Program", "Description"],
      body: "Build real web apps from day one: HTML/CSS fundamentals, React and TypeScript, REST APIs, PostgreSQL, auth basics, and deploy to the cloud. Mentor-led labs, code reviews, and a capstone project you can show employers. No prior professional experience required — bring curiosity and consistent practice.",
      icon: icons.programDescription.icon
    },
    highlights: {
      title: "BUILD A CAPSTONE APP: AUTH, CRUD, AND RESPONSIVE UI – PORTFOLIO-READY",
      icon: icons.highlights.icon,
      items: [
        { num: "01", body: "Daily labs with mentor feedback; weekly code review sessions" },
        { num: "02", body: "Ship a capstone with auth, CRUD, and responsive UI" },
        { num: "03", body: "Certificate of completion plus project showcase on #PGS network" }
      ]
    },
    checks: {
      chip: "Small cohort size for personalized mentor time",
      items: [
        "Structured curriculum — no random YouTube rabbit holes",
        "Safe sandbox for mistakes before employer interviews",
        "Peer study group optional via #PGS",
        "Career office time on CV and GitHub"
      ],
      icon: icons.checks.icon
    },
    brochure: {
      title: "Need a downloadable course copy?",
      subtitle: "Grab the brochure and dive into the details.",
      ctaLabel: "Download Here",
      downloadUrl: "",
      badgeLabel: "Duolingo enthusiast",
      translateIcon: icons.brochure.translateIcon
    },
    awarding: {
      title: "Learn more about the awarding body",
      body: "This program is delivered in partnership with an accredited training partner and #PGS mentor network. You receive a certificate of completion after capstone review.",
      logo: "",
      logoAlt: "Training partner logo",
      photo: "",
      photoAlt: "Mentor network photo",
      facts: [
        { title: "Industry-aligned curriculum", body: "Updated each cohort with mentor and employer input." },
        { title: "Capstone review" },
        { title: "Certificate of completion", body: "Issued after attendance and project pass criteria." }
      ],
      rankings: {
        titleLines: ["Rankings &", "Reputation"],
        bodies: [
          "Curriculum aligned to common junior full stack job descriptions.",
          "Focus on demonstrable projects, not theory-only certificates."
        ]
      },
      accreditation: {
        titleLines: ["Accreditation", "and Membership"],
        logos: []
      }
    },
    apply: {
      title: "How to Apply",
      subtitle: "The admission process for the Full Stack Bootcamp can be completed in the following ways:",
      eligibilityLabel: "Eligibility",
      eligibilityChips: [
        "CS / IT undergrads",
        "Career switchers",
        "HTML/CSS or intro JS complete",
        "Ready for a 6-week intensive"
      ],
      optionLabel: "Option",
      arrowIcon: icons.apply.arrowIcon,
      option1Steps: [
        {
          title: "Submit Application",
          bodyBefore: "Fill the form in the course intro button or ",
          linkText: "apply here",
          linkHref: "#pc-c1",
          bodyAfter: "."
        },
        {
          title: "Wait for a follow up",
          body: "Get on a call with our counselor & clear doubts."
        },
        {
          title: "Get Payment Link",
          body: "Complete the payment, and get the welcome email."
        }
      ],
      option2: {
        title: "Pay via the enroll button",
        bodyBefore: "Skip the wait — pay directly in the Program Fee section ",
        linkText: "below",
        linkHref: "#pc-c11",
        bodyAfter: " to enroll and get your welcome email."
      }
    },
    certificate: {
      headline: "Upon successful completion, you’ll be awarded a #PGS Full Stack certificate",
      whyTitle: "Why It Matters",
      checkIcon: icons.certificate.checkIcon,
      checks: [
        "Marks your portfolio-ready full stack training",
        "Recognized by mentors and hiring partners in the #PGS network",
        "Adds real weight to your CV and GitHub"
      ],
      mock: {
        ticket: "Certificate",
        programTitle: "FULL STACK WEB DEVELOPMENT BOOTCAMP JAN 2026",
        nameLabel: "Name",
        nameValue: "Your Name",
        dateLabel: "Date",
        dateValue: "Feb 2026",
        awardingLabel: "Awarding Body",
        awardingValue: "#PGS",
        seal: icons.certificate.mock.seal
      }
    },
    higlights: {
      title: "#higlights",
      lead: [
        "Learners, in action",
        "demoing capstone apps",
        "at a #PGS showcase",
        "night."
      ],
      place: "Campus lab / live online",
      pinSrc: pin,
      note: "Our Full Stack cohort demoed auth, CRUD, and responsive UIs to mentors — solid portfolio proof, good feedback loops, and a strong addition to each learner’s GitHub.",
      photos: [
        { src: photoA, alt: "Learners collaborating in the lab", crop: 1 },
        { src: photoB, alt: "Capstone demo boards", crop: 2 },
        { src: photoC, alt: "Learner presenting a project", crop: 3 },
        { src: photoA, alt: "", crop: 1 },
        { src: photoB, alt: "", crop: 2 },
        { src: photoC, alt: "", crop: 3 },
        { src: photoA, alt: "Seventh showcase slot", crop: 1 }
      ]
    },
    enroll: {
      title: "Enrollment Fee",
      subtitle: "Full Stack Web Development Bootcamp",
      price: "GBP 1200",
      ctaLabel: "Enroll Now",
      ctaHref: "",
      accessBadge: "Includes full program access",
      earlyBird: "Early Bird Fee (valid till Dec 20)",
      breakdownTitle: "course breakdowns:",
      checkIcon: icons.enroll.checkIcon,
      breakdownLeft: [
        { text: "Mentor-led labs 4 days/week" },
        { text: "Capstone project with code review" },
        { text: "Certificate of completion" },
        { text: "Study materials & deploy checklist" },
        { text: "Portfolio polish sessions ", bold: "(by #PGS)" },
        { text: "Alumni community access ", bold: "(by #PGS)" }
      ],
      breakdownRight: [
        { text: "Optional peer study group ", bold: "(by #PGS)" },
        { text: "& More" }
      ],
      otherExpensesTitle: "Other expenses (optional)",
      housingLabel: "Housing & Stay",
      housingPrice: "GBP 0",
      housingApprox: "*if campus track",
      paymentTitle: "Payment Methods",
      paymentBody: "Pay via Credit/Debit Card, UPI, or Bank Transfer"
    },
    learners: {
      ...emptyCoursesLearners(),
      lead: "A word from",
      badge: "Our learners",
      bodyBefore: "Also at ",
      bodyBoldPgs: "#PGS",
      bodyMid: ", we believe that with the right prep, skills, and a solid game plan, most students ",
      bodyBold3x: "3x their portfolio ",
      bodyAnd: "and",
      bodyBoldSkills: " gain real-world skills",
      bodyAfter: " along the way.",
      photoSrc: "/assets/img/learner-words/raina.jpg",
      photoAlt: "Full Stack learner portrait",
      quoteMob:
        "I've picked up a really valuable skill set that makes my CV stand out. Mentors pushed me to ship a real capstone.",
      cards: [
        {
          quoteDesk:
            "I've picked up a really valuable skill set that makes my CV stand out. Mentors pushed me to ship a real capstone with auth and CRUD."
        },
        { quoteDesk: "I've picked up a really valuable skill set that makes my CV stand out." },
        {
          quoteDesk:
            "I've picked up a really valuable skill set that makes my CV stand out. I realized you don't always have to keep applying everywhere."
        }
      ],
      bio: { name: "Raina Venkatesh", role: "Full Stack learner", location: "Remote / Campus" }
    },
    faq: {
      ...defaultCoursesFaq(),
      tabs: [
        {
          id: "programme-details",
          label: "Programme Details",
          items: [
            {
              question: "1. Who is this program for?",
              answer:
                "Undergrads, career switchers, and anyone with HTML/CSS or intro JS ready for a 6-week Full Stack intensive."
            },
            {
              question: "2. What kind of certification will I get after completion of this course?",
              answer: "A #PGS Full Stack certificate after attendance and capstone pass criteria."
            }
          ]
        },
        { id: "learning", label: "Programme Learning Experience", items: [] },
        { id: "refund", label: "Refund Policy/Financials", items: [] }
      ]
    }
  };
}
