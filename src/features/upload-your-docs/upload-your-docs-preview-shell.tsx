/**
 * Family A body — anon + standard (same structure).
 * OWNER LOCKED — do not reopen A1–A4 unless owner unlocks Family A.
 * A1 hero + A2 Resource List + A3 Additional + A4 media.
 * Desktop `18375:11615` · Mobile `217:4374`.
 * Premium = separate Family B shell — do not mix CMS shapes.
 */
import { UploadYourDocsAdditional } from "./upload-your-docs-additional";
import { UploadYourDocsHero } from "./upload-your-docs-hero";
import { UploadYourDocsMedia } from "./upload-your-docs-media";
import { UploadYourDocsTableStub } from "./upload-your-docs-table-stub";
import "./upload-your-docs-preview.css";

export function UploadYourDocsPreviewShell() {
  return (
    <div
      className="uyd-preview-shell"
      data-pgs-module="upload-your-docs-preview"
      data-docs-family="locked"
      data-family-lock="owner-qc-passed"
      data-figma-desktop-locked="18375:11615"
      data-figma-mobile-locked="217:4374"
      data-shell-gate="p0"
      data-block-gate="family-a-locked"
    >
      <div className="uyd-preview-shell__body">
        <UploadYourDocsHero locked />
        <UploadYourDocsTableStub locked />
        <UploadYourDocsAdditional locked />
        <UploadYourDocsMedia />
      </div>
    </div>
  );
}
