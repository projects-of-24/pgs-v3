/**
 * Title + Important Alerts + helper.
 * Family A (locked): desktop `18375:11615` · mobile `217:4374`.
 * Family B (Premium): desktop `17041:15265` · mobile `217:2622` — same layout, no frost.
 * Alerts are never frosted (table frost = Family A A2 only). Owned CSS only.
 */
import Image from "next/image";
import {
  UPLOAD_DOCS_ALERTS,
  UPLOAD_DOCS_ALERTS_EMPTY,
  UPLOAD_DOCS_HELPER_BODY,
  UPLOAD_DOCS_HELPER_LEAD
} from "./content";
import "./upload-your-docs-hero.css";

const STICKER_SRC = "/assets/img/bell.gif";

type UploadYourDocsHeroProps = {
  /** Family A locked page vs Family B premium — layout family only; no alerts frost. */
  locked?: boolean;
  alertItems?: readonly string[];
};

export function UploadYourDocsHero({
  locked = true,
  alertItems
}: UploadYourDocsHeroProps) {
  const wired = alertItems !== undefined;
  const lines = wired
    ? alertItems.length > 0
      ? alertItems
      : [UPLOAD_DOCS_ALERTS_EMPTY]
    : [...UPLOAD_DOCS_ALERTS];

  return (
    <section
      className="uyd-hero"
      data-pgs-module="upload-your-docs-hero"
      data-docs-family={locked ? "locked" : "premium"}
      data-alerts-source={wired ? "student_alerts" : "fixture"}
      data-figma-desktop="18375:11615"
      data-figma-mobile="217:4374"
      data-block-gate="a1"
    >
      <div className="uyd-hero__cluster">
        <h1 className="uyd-hero__title">
          upload
          <br />
          your
          <br />
          docs
        </h1>

        <article className="uyd-hero__alerts" aria-label="Important Alerts">
          <div className="uyd-hero__alerts-head">
            <span className="uyd-hero__sticker" aria-hidden="true">
              <Image src={STICKER_SRC} alt="" width={38} height={38} unoptimized />
            </span>
            <h2 className="uyd-hero__alerts-title">Important Alerts</h2>
          </div>
          <ol className="uyd-hero__alerts-list">
            {lines.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>
        </article>
      </div>

      <p className="uyd-hero__helper">
        <span className="uyd-hero__helper-lead">{UPLOAD_DOCS_HELPER_LEAD}</span>
        <span className="uyd-hero__helper-line">{UPLOAD_DOCS_HELPER_BODY}</span>
      </p>
    </section>
  );
}
