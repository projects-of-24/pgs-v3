"use client";

/**
 * #premiumNonMedical FAQ — N15.
 * Desktop `17055:11339` · phone `430:4278`.
 * Page-owned. Do not import shared premium-faq.
 * Same question ×5. Click shows owner placeholder answer. No purple slider.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: border rgba(0,0,0,0.33) · phone question ~14–15
 * ISSUE: border fails 3:1 · phone below type floor
 * PGS IMPLEMENTATION: border #8a8a8a · phone question 16. Bebas stays.
 */
import { useId, useState } from "react";
import { PREMIUM_NONMEDICAL_FAQ } from "./content";
import "./premium-nonmedical-faq.css";

export function PremiumNonmedicalFaq() {
  const baseId = useId();
  const c = PREMIUM_NONMEDICAL_FAQ;
  const [open, setOpen] = useState<boolean[]>(() => Array.from({ length: c.count }, () => false));

  return (
    <section
      className="premium-nonmedical-faq"
      data-pgs-module="premium-nonmedical-faq"
      data-block-gate="n15"
      data-figma-desktop="17055:11339"
      data-figma-mobile="430:4278"
      aria-labelledby="premium-nonmedical-faq-title"
    >
      <div className="premium-nonmedical-faq__inner">
        <h2 className="premium-nonmedical-faq__title" id="premium-nonmedical-faq-title">
          {c.title}
        </h2>
        <ul className="premium-nonmedical-faq__list">
          {open.map((isOpen, index) => {
            const buttonId = `${baseId}-q-${index}`;
            const regionId = `${baseId}-a-${index}`;

            return (
              <li key={index} className={`premium-nonmedical-faq__item${isOpen ? " is-open" : ""}`}>
                <h3 className="premium-nonmedical-faq__heading">
                  <button
                    type="button"
                    id={buttonId}
                    className="premium-nonmedical-faq__trigger"
                    aria-expanded={isOpen}
                    aria-controls={regionId}
                    onClick={() =>
                      setOpen((current) =>
                        current.map((value, itemIndex) => (itemIndex === index ? !value : value))
                      )
                    }
                  >
                    <span className="premium-nonmedical-faq__question">{c.question}</span>
                    <span className="premium-nonmedical-faq__mark" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div
                  id={regionId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className="premium-nonmedical-faq__answer"
                >
                  {c.answer.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
