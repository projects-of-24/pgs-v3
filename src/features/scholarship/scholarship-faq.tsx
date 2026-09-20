"use client";

/**
 * Scholarship FAQ — S6.
 * Desktop `17041:18838` · Mobile `331:3296` / `331:3329`.
 * Owned CSS. Tabs + accordion. Process/Timeline + Q2 answer deferred (no invent).
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: answer ~12.8px #666
 * ISSUE: below readable floor
 * PGS IMPLEMENTATION: answer ≥14px · inactive tab stays #555 (nearest ≥4.5:1 vs #666 risk)
 */
import { useId, useState } from "react";
import { SCHOLARSHIP_FAQ } from "./content";
import "./scholarship-faq.css";

export function ScholarshipFaq() {
  const baseId = useId();
  const [tabId, setTabId] = useState(SCHOLARSHIP_FAQ.defaultTabId);
  const [openIndex, setOpenIndex] = useState(SCHOLARSHIP_FAQ.defaultOpenIndex);

  const activeTab =
    SCHOLARSHIP_FAQ.tabs.find((t) => t.id === tabId) ?? SCHOLARSHIP_FAQ.tabs[0];

  function selectTab(nextId: string) {
    setTabId(nextId);
    setOpenIndex(
      nextId === SCHOLARSHIP_FAQ.defaultTabId
        ? SCHOLARSHIP_FAQ.defaultOpenIndex
        : -1
    );
  }

  return (
    <section
      className="scholarship-faq"
      data-pgs-module="scholarship-faq"
      data-block-gate="s6"
      aria-labelledby="scholarship-faq-heading"
    >
      <div className="scholarship-faq__inner">
        <h2 id="scholarship-faq-heading" className="scholarship-faq__heading">
          {SCHOLARSHIP_FAQ.heading}
        </h2>

        <div className="scholarship-faq__layout">
          <div
            className="scholarship-faq__tablist"
            role="tablist"
            aria-label="Scholarship FAQ topics"
            aria-orientation="vertical"
          >
            {SCHOLARSHIP_FAQ.tabs.map((tab) => {
              const selected = tab.id === activeTab.id;
              const tabBtnId = `${baseId}-tab-${tab.id}`;
              const panelId = `${baseId}-panel-${tab.id}`;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={tabBtnId}
                  className={`scholarship-faq__tab${selected ? " is-active" : ""}`}
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectTab(tab.id)}
                  onKeyDown={(e) => {
                    const tabs = SCHOLARSHIP_FAQ.tabs;
                    const i = tabs.findIndex((t) => t.id === tab.id);
                    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                      e.preventDefault();
                      const next = tabs[(i + 1) % tabs.length];
                      selectTab(next.id);
                      document.getElementById(`${baseId}-tab-${next.id}`)?.focus();
                    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                      e.preventDefault();
                      const prev = tabs[(i - 1 + tabs.length) % tabs.length];
                      selectTab(prev.id);
                      document.getElementById(`${baseId}-tab-${prev.id}`)?.focus();
                    } else if (e.key === "Home") {
                      e.preventDefault();
                      selectTab(tabs[0].id);
                      document.getElementById(`${baseId}-tab-${tabs[0].id}`)?.focus();
                    } else if (e.key === "End") {
                      e.preventDefault();
                      const last = tabs[tabs.length - 1];
                      selectTab(last.id);
                      document.getElementById(`${baseId}-tab-${last.id}`)?.focus();
                    }
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div
            className="scholarship-faq__panel"
            role="tabpanel"
            id={`${baseId}-panel-${activeTab.id}`}
            aria-labelledby={`${baseId}-tab-${activeTab.id}`}
          >
            {activeTab.items.length === 0 ? null : (
              <div className="scholarship-faq__accordion">
                {activeTab.items.map((item, index) => {
                  const open = openIndex === index;
                  const buttonId = `${baseId}-acc-btn-${activeTab.id}-${index}`;
                  const regionId = `${baseId}-acc-region-${activeTab.id}-${index}`;
                  const hasAnswer = item.answer.trim().length > 0;

                  return (
                    <div
                      key={item.question}
                      className={`scholarship-faq__item${open ? " is-open" : ""}`}
                    >
                      <h3 className="scholarship-faq__item-heading">
                        <button
                          type="button"
                          id={buttonId}
                          className="scholarship-faq__trigger"
                          aria-expanded={open}
                          aria-controls={regionId}
                          onClick={() => setOpenIndex(open ? -1 : index)}
                        >
                          <span className="scholarship-faq__question">
                            {item.question}
                          </span>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            className="scholarship-faq__icon"
                            src={
                              open
                                ? SCHOLARSHIP_FAQ.minusIconSrc
                                : SCHOLARSHIP_FAQ.plusIconSrc
                            }
                            alt=""
                            width={14}
                            height={14}
                          />
                        </button>
                      </h3>
                      <div
                        id={regionId}
                        role="region"
                        aria-labelledby={buttonId}
                        aria-hidden={!open}
                        className={`scholarship-faq__answer-wrap${open ? " is-open" : ""}`}
                      >
                        {hasAnswer ? (
                          <p className="scholarship-faq__answer">{item.answer}</p>
                        ) : null}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
