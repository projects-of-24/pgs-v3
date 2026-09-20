/**
 * Preview labs: Login must return to the lab URL after auth
 * (default login redirect is live `/student/dashboard` / Hostinger).
 */
export function withPreviewLoginReturn(html: string, previewPath: string): string {
  if (!previewPath.startsWith("/preview/")) return html;
  const href = `/login?redirect=${encodeURIComponent(previewPath)}`;
  return html.replace(
    /(<a\b[^>]*\bhref\s*=\s*)(["'])\/[Ll]ogin(?:\?[^"']*)?\2/gi,
    `$1$2${href}$2`
  );
}
