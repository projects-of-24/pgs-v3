import type { ElementType } from "react";

export function looksLikeHtml(value: string | null | undefined): boolean {
  if (!value) return false;
  return /<[a-z][\s\S]*>/i.test(value);
}

/** Split newline CMS fields; HTML stays as one block (junior preview maps). */
export function splitCmsLines(value: string | null | undefined): string[] {
  if (!value) return [];
  if (looksLikeHtml(value)) return [value];
  return value.split("\n").filter(Boolean);
}

type CmsHtmlProps = {
  html: string;
  className?: string;
  as?: ElementType;
  preWrap?: boolean;
};

/** Safe plain-text fallback — strips HTML instead of rendering unsanitized markup. */
export function CmsHtml({ html, className, as: Tag = "div" }: CmsHtmlProps) {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return <Tag className={className}>{text}</Tag>;
}

export function sanitizeCmsHtml(dirty: string): string {
  return dirty.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
