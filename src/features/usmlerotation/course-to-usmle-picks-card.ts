/**
 * Maps a courses row → #Pgs picks carousel card.
 * Figma desktop 18760:12936 · mobile 18760:11885.
 */

import type { UsmlePicksCardModel } from "./usmle-picks-types";

const PICKS_FALLBACK_IMG = "/assets/img/usmlerotation/picks-card.jpg";
const CTA_FALLBACK = "For Clinical Rotation Click Here";

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
  return PICKS_FALLBACK_IMG;
}

function blurbDesktop(row: CourseRow): string {
  const summary = str(row, "short_description").trim();
  if (summary) return summary;
  const highlight = str(row, "highlight_1").trim();
  if (highlight) return highlight;
  return str(row, "title", "Course details coming soon.");
}

/** Mobile Figma uses a short line — first sentence / first ~48 chars. */
function blurbMobileFromDesktop(desktop: string): string {
  const firstLine = desktop.split(/\n+/)[0]?.trim() ?? desktop;
  const sentence = firstLine.split(/(?<=[.!?])\s+/)[0]?.trim() ?? firstLine;
  if (sentence.length <= 48) return sentence;
  return `${sentence.slice(0, 45).trimEnd()}…`;
}

export function courseToUsmlePicksCard(row: CourseRow): UsmlePicksCardModel {
  const id = String(row.id ?? "draft");
  const title = str(row, "title", "Untitled course");
  const desktop = blurbDesktop(row);
  const cta = str(row, "card_cta_label").trim() || CTA_FALLBACK;

  return {
    id,
    href: courseDetailHref(row),
    cta,
    blurbDesktop: desktop,
    blurbMobile: blurbMobileFromDesktop(desktop),
    imageSrc: cardImageUrl(row),
    imageAlt: title,
  };
}
