import { splitCmsLines } from "@/components/CmsHtml";
import type { UsmleExploreCardModel } from "./usmle-explore-types";

const EXPLORE_IMG = "/assets/img/usmlerotation/explore-campus.jpg";
const FIRE = "/assets/img/usmlerotation/filling-fast-fire.gif";
const LOGO = "/assets/img/usmlerotation/partner-logo.jpg";
const QR = "/assets/img/qr-2.png";
const DOWNLOAD = "/assets/img/download.png";

type CourseRow = Record<string, unknown>;

function str(row: CourseRow, key: string, fallback = ""): string {
  const v = row[key];
  if (v == null) return fallback;
  return String(v);
}

function courseDetailHref(row: CourseRow): string {
  const id = row.id;
  if (id == null || id === "" || id === "draft") return "#";
  return `/programsfull/program/${id}`;
}

function cardImageUrl(row: CourseRow): string {
  const fromUrl = str(row, "image_url").trim();
  if (fromUrl) return fromUrl;
  return EXPLORE_IMG;
}

function parseTags(row: CourseRow): string[] {
  const fromText = splitCmsLines(str(row, "tags_text"))
    .map((t) => t.trim())
    .filter(Boolean)
    .map((t) => (t.startsWith("#") ? t : `#${t}`));
  if (fromText.length) return fromText;
  const mode = str(row, "mode");
  return mode ? [mode.startsWith("#") ? mode : `#${mode}`] : [];
}

function exploreBadge(row: CourseRow): string {
  const badge = str(row, "badge").trim();
  if (badge) return badge;
  return "Filling Fast";
}

function exploreBadgeIcon(row: CourseRow): string {
  return str(row, "badge_icon_url").trim() || FIRE;
}

function imageOverlayTag(tags: string[]): string | undefined {
  const hands = tags.find((t) => /handson|hands-on|hands_on/i.test(t));
  if (hands) return hands.startsWith("#") ? hands : `#${hands}`;
  return tags[0];
}

function perksLines(row: CourseRow): { title: string; body: string } {
  const promoTitle = str(row, "card_promo_title").trim();
  const summary = str(row, "short_description").trim();
  const highlight = str(row, "highlight_1").trim();
  if (promoTitle) {
    return {
      title: promoTitle,
      body: str(row, "card_promo_subtitle").trim() || summary || "",
    };
  }
  if (summary) {
    const parts = summary.split(/\n+/).map((s) => s.trim()).filter(Boolean);
    return {
      title: parts[0] ?? "Scholarship",
      body: parts.slice(1).join(" ") || "",
    };
  }
  if (highlight) {
    return { title: highlight, body: "" };
  }
  return { title: "—", body: "" };
}

function promoDate(row: CourseRow): string {
  const custom = str(row, "card_promo_date").trim();
  if (custom) return custom.startsWith("*") ? custom : `*${custom}`;
  const ends = str(row, "ends_on").trim();
  if (!ends) return "*TBA";
  const d = new Date(ends.includes("T") ? ends : `${ends}T12:00:00`);
  if (Number.isNaN(d.getTime())) return "*TBA";
  const day = d.getDate();
  const suffix =
    day % 10 === 1 && day !== 11
      ? "st"
      : day % 10 === 2 && day !== 12
        ? "nd"
        : day % 10 === 3 && day !== 13
          ? "rd"
          : "th";
  return `*${day}${suffix} ${d.toLocaleString("en-US", { month: "long" })} ${d.getFullYear()}`;
}

/** One course → one model; desktop/mobile only differ in presentation. */
export function courseToUsmleExploreCard(row: CourseRow): UsmleExploreCardModel {
  const id = String(row.id ?? "draft");
  const tags = parseTags(row);
  const perks = perksLines(row);
  const speciality =
    str(row, "mode").trim() ||
    str(row, "program_type").trim() ||
    "—";

  return {
    id,
    href: courseDetailHref(row),
    title: str(row, "title", "Untitled course"),
    image: cardImageUrl(row),
    badge: exploreBadge(row),
    badgeIcon: exploreBadgeIcon(row),
    imageTag: imageOverlayTag(tags),
    location: str(row, "location").trim() || "—",
    speciality,
    duration: str(row, "duration").trim() || "—",
    perksTitle: perks.title,
    perksBody: perks.body,
    tags,
    logo: LOGO,
    logoAlt: "Partner",
    datesRail:
      str(row, "card_dates_rail").trim() || "Dates You Should Be Aware off.",
    promoTitle: str(row, "card_promo_title").trim() || "Dates\nExtended",
    promoSubtitle: str(row, "card_promo_subtitle").trim() || "Check\nWith US",
    promoDate: promoDate(row),
    ctaLabel: str(row, "card_cta_label").trim() || "Learn More",
    qrSrc: QR,
    showDownload: true,
    downloadIcon: DOWNLOAD,
    saved: false,
    entityType: "course",
    entityId: id === "draft" ? undefined : id,
  };
}
