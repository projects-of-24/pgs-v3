/**
 * Additional documents — Family A A3 (locked+frost) · Family B B3 (unlocked).
 * Desktop A `18375:11660` · Mobile A `217:4591` · Premium mobile band `217:3920`.
 * Unlocked upload is visual-only until Phase 4D wire.
 */
import Image from "next/image";
import "./upload-your-docs-additional.css";

const LOCK_SRC = "/assets/img/figma-progress/alerts-lock.svg";

type UploadYourDocsAdditionalProps = {
  locked?: boolean;
};

export function UploadYourDocsAdditional({ locked = true }: UploadYourDocsAdditionalProps) {
  const inputId = locked ? "uyd-additional-name-locked" : "uyd-additional-name-premium";

  return (
    <section
      className="uyd-additional"
      data-pgs-module="upload-your-docs-additional"
      data-docs-family={locked ? "locked" : "premium"}
      data-block-gate={locked ? "a3" : "b3"}
      data-figma-desktop="18375:11660"
      data-figma-mobile={locked ? "217:4591" : "217:3920"}
      aria-labelledby="uyd-additional-heading"
    >
      <h2 id="uyd-additional-heading" className="uyd-additional__heading">
        Additional documents, if we asked for them
      </h2>

      <div className="uyd-additional__wrap">
        <div className="uyd-additional__field">
          <label className="uyd-additional__sr-only" htmlFor={inputId}>
            Document name
          </label>
          <input
            id={inputId}
            className="uyd-additional__input"
            type="text"
            name="additional_document_name"
            placeholder="Enter the document name here"
            disabled={locked}
            readOnly={locked}
            tabIndex={locked ? -1 : undefined}
            aria-disabled={locked ? true : undefined}
            autoComplete="off"
          />
          {locked ? (
            <span className="uyd-additional__btn" aria-hidden="true">
              upload
            </span>
          ) : (
            <button type="button" className="uyd-additional__btn">
              upload
            </button>
          )}
        </div>

        {locked ? (
          <div className="uyd-additional__forlocked" aria-hidden="true">
            <Image src={LOCK_SRC} alt="" width={120} height={120} unoptimized />
          </div>
        ) : null}
      </div>
    </section>
  );
}
