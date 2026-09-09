import { describe, expect, it } from "vitest";
import { withPreviewLoginReturn } from "./preview-login-return";

describe("withPreviewLoginReturn", () => {
  it("adds redirect back to preview path on Login anchors", () => {
    const html = '<a href="/login" class="btn btn-login">Login</a><a href="/Login">Login</a>';
    const out = withPreviewLoginReturn(html, "/preview/upload-your-docs-premium");
    expect(out).toContain('href="/login?redirect=%2Fpreview%2Fupload-your-docs-premium"');
    expect(out).not.toContain('href="/login"');
    expect(out).not.toContain('href="/Login"');
  });

  it("ignores non-preview paths", () => {
    const html = '<a href="/login">Login</a>';
    expect(withPreviewLoginReturn(html, "/upload_your_doc")).toBe(html);
  });
});
