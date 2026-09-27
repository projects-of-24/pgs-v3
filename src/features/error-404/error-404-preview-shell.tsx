/**
 * Error 404 modular body shell — VISUAL LOCKED (owner 2026-09-22).
 * Desktop Figma `18153:10852` · Mobile `1285:7623`.
 * Preview + desk + mob body. Chrome LOCKED. No Hostinger body.
 * NEVER black side-test banner — pull-up to closed #toggleBtn.
 */
import { Error404Body } from "./error-404-body";
import "./error-404-preview-shell.css";

type Error404PreviewShellProps = {
  /** Live route — same body as preview; marks `data-cutover=LIVE`. */
  live?: boolean;
};

export function Error404PreviewShell({ live = false }: Error404PreviewShellProps) {
  return (
    <div
      className="error-404-preview-shell"
      data-pgs-module="error-404-preview"
      data-error-404-family="public"
      data-figma-desktop="18153:10852"
      data-figma-mobile="1285:7623"
      data-shell-gate="p1"
      data-block-gate="desk+mob"
      data-visual-lock="locked"
      data-cutover={live ? "LIVE" : "preview"}
    >
      <div className="error-404-preview-shell__body">
        <Error404Body />
      </div>
    </div>
  );
}
