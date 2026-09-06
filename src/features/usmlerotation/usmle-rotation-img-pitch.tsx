/**
 * IMG pitch — 5 numbered points.
 * Figma desktop 18760:12388 · mobile 18760:11398.
 */
import { USMLE_ROTATION_IMG_PITCH } from "./content";
import "./usmle-rotation-img-pitch.css";

const ICON = "/assets/img/usmlerotation/pitch-icon.svg";

export function UsmleRotationImgPitch() {
  const c = USMLE_ROTATION_IMG_PITCH;

  return (
    <div
      className="usmle-pitch"
      data-pgs-module="usmle-rotation-img-pitch"
      role="region"
      aria-label={c.headingCombined}
    >
      <div className="usmle-pitch__inner">
        <h2 className="usmle-pitch__heading">
          <span className="usmle-pitch__heading--split">
            <span>{c.headingLine1}</span>
            <span>{c.headingLine2}</span>
          </span>
          <span className="usmle-pitch__heading--combined">{c.headingCombined}</span>
        </h2>

        <ul className="usmle-pitch__list">
          {c.points.map((point) => (
            <li key={point.num} className="usmle-pitch__item">
              <div className="usmle-pitch__num-row">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  className="usmle-pitch__icon"
                  src={ICON}
                  alt=""
                  width={48}
                  height={48}
                />
                <span className="usmle-pitch__num" aria-hidden="true">
                  {point.num}
                </span>
              </div>
              <p className="usmle-pitch__text">{point.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
