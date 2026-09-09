/**
 * Family B body — Premium unlocked (separate from Family A).
 * B1–B4 visual LOCKED. W1: Resource List read-only from live requirements when provided.
 * W2: liveRows may include pre-signed `viewHref` (fast new-tab view).
 * Desktop Figma `17041:15265` · Mobile `217:2622`
 */
import type { DocumentRequirement } from "@/lib/premium-workspace";
import { UploadYourDocsAdditional } from "./upload-your-docs-additional";
import { UploadYourDocsHero } from "./upload-your-docs-hero";
import { UploadYourDocsMedia } from "./upload-your-docs-media";
import { mapRequiredRequirementsToRows, type UploadDocsLiveRow } from "./map-requirements";
import { UploadYourDocsTableStub } from "./upload-your-docs-table-stub";
import "./upload-your-docs-preview.css";

type UploadYourDocsPremiumShellProps = {
  /** Live student_alerts when wired; omit = fixtures for visual QC. */
  alertItems?: readonly string[];
  /**
   * W1: live requirements. Used when `liveRows` omitted.
   * `undefined` = fixture Resource List. Pass array (even empty) for live truth.
   */
  requirements?: readonly DocumentRequirement[];
  /** W2: preferred — mapped rows with optional signed `viewHref`. */
  liveRows?: UploadDocsLiveRow[];
  /** Staff View-as-Student preview — block upload/re-upload mutations. */
  readOnly?: boolean;
};

export function UploadYourDocsPremiumShell({
  alertItems,
  requirements,
  liveRows: liveRowsProp,
  readOnly = false
}: UploadYourDocsPremiumShellProps) {
  const liveRows =
    liveRowsProp ??
    (requirements !== undefined ? mapRequiredRequirementsToRows(requirements) : undefined);
  const wired = liveRows !== undefined || requirements !== undefined;

  return (
    <div
      className="uyd-preview-shell uyd-preview-shell--premium"
      data-pgs-module="upload-your-docs-premium"
      data-docs-family="premium"
      data-figma-desktop-premium="17041:15265"
      data-figma-mobile-premium="217:2622"
      data-shell-gate="b0"
      data-block-gate="b4"
      data-wire={wired ? "w3-upload" : undefined}
      data-readonly={readOnly ? "true" : undefined}
    >
      <div className="uyd-preview-shell__body">
        <UploadYourDocsHero locked={false} alertItems={alertItems} />
        <UploadYourDocsTableStub locked={false} liveRows={liveRows} readOnly={readOnly} />
        <UploadYourDocsAdditional locked={false} />
        <UploadYourDocsMedia />
      </div>
    </div>
  );
}
