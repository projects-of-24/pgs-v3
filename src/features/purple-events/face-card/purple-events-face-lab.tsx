/**
 * Face card lab — open + closed (desk or mob by viewport).
 */
import { FACE_CARD_CLOSED, FACE_CARD_OPEN } from "./content";
import { PurpleEventsFaceCard } from "./purple-events-face-card";
import "./purple-events-face-lab.css";

export function PurpleEventsFaceLab() {
  return (
    <div
      className="pe-face-lab"
      data-pgs-module="purple-events-face-lab"
      data-face-gate="face-locked"
      data-cutover="preview"
      data-figma-desktop="18961:13084"
      data-figma-mobile="1242:7585"
    >
      <div className="pe-face-lab__univ-gap" aria-hidden="true" />
      <section
        className="pe-face-lab__section"
        aria-labelledby="pe-face-lab-heading"
      >
        <header className="pe-face-lab__header">
          <h1 id="pe-face-lab-heading" className="pe-face-lab__heading">
            Face card lab — locked
          </h1>
          <p className="pe-face-lab__note">
            Event face open + closed. Desk 383×592 · Mob 176×761. Centered
            stage. Future faces populate this same preview.
          </p>
        </header>
        <ul className="pe-face-lab__row">
          <li className="pe-face-lab__item">
            <p className="pe-face-lab__state" aria-hidden="true">
              open
            </p>
            <PurpleEventsFaceCard card={FACE_CARD_OPEN} />
          </li>
          <li className="pe-face-lab__item">
            <p className="pe-face-lab__state" aria-hidden="true">
              closed
            </p>
            <PurpleEventsFaceCard card={FACE_CARD_CLOSED} />
          </li>
        </ul>
      </section>
    </div>
  );
}
