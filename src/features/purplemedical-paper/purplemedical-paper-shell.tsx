/**
 * Purple Medical Paper body lab — chrome-adjacent shell.
 * Body = attached Paper 2VH-0 JSX only. No desk/phone module mount.
 */
import { PaperUsmleIpadBody } from "./paper-usmle-ipad-body";

export function PurplemedicalPaperShell() {
  return (
    <div
      className="purplemedical-paper"
      data-pgs-module="purplemedical-paper"
      data-paper-node="2VH-0"
      aria-label="Purple Medical iPad body from Paper"
    >
      <div className="purplemedical-paper__rail">
        <div className="purplemedical-paper__stage">
          <PaperUsmleIpadBody />
        </div>
      </div>
    </div>
  );
}
