"use client";

/**
 * Finance FAQ accordion — F5.
 * Desktop Figma `17041:17716` · Mobile `323:2781`.
 * Owned CSS; continuous slider = decorative rail (visual only). Motion polish deferred.
 * FIGMA ACCESSIBILITY ADAPTATION: answer text Figma 12px → 14px readable floor.
 */
import { useId, useState } from "react";
import { FINANCE_FAQ } from "./content";
import "./finance-faq.css";

export function FinanceFaq() {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number>(FINANCE_FAQ.defaultOpenIndex);

  return (
    <section
      className="finance-faq"
      data-pgs-module="finance-faq"
      data-block-gate="f5"
      aria-labelledby="finance-faq-title"
    >
      <div className="finance-faq__inner">
        <h2 id="finance-faq-title" className="finance-faq__title">
          {FINANCE_FAQ.heading}
        </h2>

        <div className="finance-faq__row">
          <div className="finance-faq__list">
            {FINANCE_FAQ.items.map((item, index) => {
              const open = openIndex === index;
              const panelId = `${baseId}-panel-${index}`;
              const buttonId = `${baseId}-button-${index}`;

              return (
                <div
                  key={`${item.question}-${index}`}
                  className={`finance-faq__item${open ? " is-open" : ""}`}
                >
                  <h3 className="finance-faq__item-heading">
                    <button
                      type="button"
                      id={buttonId}
                      className="finance-faq__trigger"
                      aria-expanded={open}
                      aria-controls={panelId}
                      onClick={() => setOpenIndex(open ? -1 : index)}
                    >
                      <span className="finance-faq__question">{item.question}</span>
                      <span className="finance-faq__icon" aria-hidden="true">
                        +
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    aria-hidden={!open}
                    className={`finance-faq__panel${open ? " is-open" : ""}`}
                  >
                    <div className="finance-faq__panel-inner">
                      <p className="finance-faq__answer">{item.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div
            className="finance-faq__slider"
            aria-hidden="true"
            data-open-index={openIndex}
          >
            <span className="finance-faq__slider-cap" />
            <span className="finance-faq__slider-track" />
            <span className="finance-faq__slider-dot" />
          </div>
        </div>
      </div>
    </section>
  );
}
