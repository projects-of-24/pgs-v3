"use client";

/**
 * Shared FAQ. Desktop Figma `17055:12897`. Phone is the next pass.
 * Click a row to show the placeholder answer. No scrollbar.
 */
import { useId, useState } from "react";
import { PREMIUM_FAQ } from "./content";
import "./premium-faq.css";

export function PremiumFaq() {
  const baseId = useId();
  const c = PREMIUM_FAQ;
  const [open, setOpen] = useState<boolean[]>(() => Array.from({ length: c.count }, () => false));

  return (
    <section className="premium-faq" data-pgs-module="premium-faq" data-block-gate="u29" aria-labelledby="premium-faq-title">
      <div className="premium-faq__inner">
        <h2 className="premium-faq__title" id="premium-faq-title">
          {c.title}
        </h2>
        <ul className="premium-faq__list">
          {open.map((isOpen, index) => {
            const buttonId = `${baseId}-q-${index}`;
            const regionId = `${baseId}-a-${index}`;

            return (
              <li key={index} className={`premium-faq__item${isOpen ? " is-open" : ""}`}>
                <h3 className="premium-faq__heading">
                  <button
                    type="button"
                    id={buttonId}
                    className="premium-faq__trigger"
                    aria-expanded={isOpen}
                    aria-controls={regionId}
                    onClick={() =>
                      setOpen((current) => current.map((value, itemIndex) => (itemIndex === index ? !value : value)))
                    }
                  >
                    <span className="premium-faq__question">{c.question}</span>
                    <span className="premium-faq__mark" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                </h3>
                <div id={regionId} role="region" aria-labelledby={buttonId} hidden={!isOpen} className="premium-faq__answer">
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
