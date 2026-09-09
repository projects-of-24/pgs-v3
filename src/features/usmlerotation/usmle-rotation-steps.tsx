/**
 * Book Your USCE in 3 Easy Steps.
 * Desktop Figma 18760:12557 · mobile 18760:11574 (owner B: horizontal snap-scroll).
 */
import { USMLE_ROTATION_STEPS } from "./content";
import "./usmle-rotation-steps.css";

const CHECK = "/assets/img/usmlerotation/step-check.svg";

export function UsmleRotationSteps() {
  const c = USMLE_ROTATION_STEPS;

  return (
    <section
      className="usmle-steps"
      data-pgs-module="usmle-rotation-steps"
      aria-labelledby="usmle-steps-heading"
    >
      <div className="usmle-steps__head">
        <h2 id="usmle-steps-heading" className="usmle-steps__title">
          {c.title}
        </h2>
        <button type="button" className="usmle-steps__cta">
          {c.ctaLabel}
        </button>
      </div>

      <ol className="usmle-steps__track" aria-label="Three easy steps">
        {c.items.map((step) => (
          <li key={step.label} className="usmle-steps__card">
            <p className="usmle-steps__label">{step.label}</p>
            <h3 className="usmle-steps__card-title">
              {step.titleLines.map((line, i) => (
                <span key={`${step.label}-${i}`} className="usmle-steps__card-title-line">
                  {line}
                </span>
              ))}
            </h3>
            <ul className="usmle-steps__bullets">
              {step.bullets.map((bullet) => (
                <li key={bullet} className="usmle-steps__bullet">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className="usmle-steps__check"
                    src={CHECK}
                    alt=""
                    width={22}
                    height={22}
                  />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
