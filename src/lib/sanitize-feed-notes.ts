/**
 * Purple #feed Notes sanitize — plain text only (Junior notes_html ADAPT, hardened).
 * Used on staff write and again on student read (defense in depth).
 */
export const FEED_NOTES_MAX_LENGTH = 20_000;

/**
 * Strip markup, bound length, allow empty (→ fixture on read).
 * Keeps newlines for multi-paragraph Notes.
 */
export function sanitizeFeedNotesBody(value: unknown): string {
  if (value == null) return "";
  if (typeof value !== "string") throw new Error("Enter valid Notes text.");
  let text = value.replace(/\u0000/g, "");
  text = text
    .replace(/<\s*script[^>]*>[\s\S]*?<\s*\/\s*script\s*>/gi, "")
    .replace(/<\s*style[^>]*>[\s\S]*?<\s*\/\s*style\s*>/gi, "")
    .replace(/on\w+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/<\/?[^>]+>/g, "");
  text = text.replace(/\r\n?/g, "\n").trim();
  if (text.length > FEED_NOTES_MAX_LENGTH) {
    throw new Error(`Notes must be at most ${FEED_NOTES_MAX_LENGTH} characters.`);
  }
  return text;
}
