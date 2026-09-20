"use client";

/**
 * About Us FAQ — A13.
 * Desktop `17057:14559` · Mobile `517:6340`.
 * Figma-visible Programme Details copy only.
 * Learning / Refund tabs empty (no invent). Q2 answer empty (closed in Figma).
 * Desk Q2 used (not mob scholarship paste).
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: inactive tab / answer #666; mob answer 12px
 * ISSUE: #666 borderline AA; 12px below readable floor
 * PGS IMPLEMENTATION: muted #555 · answer ≥14px
 */
import { useId, useState } from "react";
import { ABOUT_FAQ } from "./content";
import "./about-faq.css";

export function AboutFaq() {
  const baseId = useId();
  const [tabId, setTabId] = useState(ABOUT_FAQ.defaultTabId);
  const [openIndex, setOpenIndex] = useState(ABOUT_FAQ.defaultOpenIndex);

  const activeTab =
    ABOUT_FAQ.tabs.find((t) => t.id === tabId) ?? ABOUT_FAQ.tabs[0];

  function selectTab(nextId: string) {
    setTabId(nextId);
    setOpenIndex(
      nextId === ABOUT_FAQ.defaultTabId ? ABOUT_FAQ.defaultOpenIndex : -1
    );
  }

  return (
    <section
      className="about-faq"
      data-pgs-module="about-faq"
      data-block-gate="a13"
      data-figma-desktop="17057:14559"
      data-figma-mobile="517:6340"
      aria-labelledby="about-faq-heading"
    >
      <div className="about-faq__inner">
        <h2 id="about-faq-heading" className="about-faq__heading">
          {ABOUT_FAQ.heading}
        </h2>

        <div className="about-faq__layout">
          <div
            className="about-faq__tablist"
            role="tablist"
            aria-label="About FAQ topics"
            aria-orientation="vertical"
          >
            {ABOUT_FAQ.tabs.map((tab) => {
              const selected = tab.id === activeTab.id;
              const tabBtnId = `${baseId}-tab-${tab.id}`;
              const panelId = `${baseId}-panel-${tab.id}`;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={tabBtnId}
                  className={`about-faq__tab${selected ? " is-active" : ""}`}
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectTab(tab.id)}
                  onKeyDown={(e) => {
                    const tabs = ABOUT_FAQ.tabs;
                    const i = tabs.findIndex((t) => t.id === tab.id);
                    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
                      e.preventDefault();
                      const next = tabs[(i + 1) % tabs.length];
                      selectTab(next.id);
                      document
                        .getElementById(`${baseId}-tab-${next.id}`)
                        ?.focus();
                    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
                      e.preventDefault();
                      const prev = tabs[(i - 1 + tabs.length) % tabs.length];
                      selectTab(prev.id);
                      document
                        .getElementById(`${baseId}-tab-${prev.id}`)
                        ?.focus();
                    } else if (e.key === "Home") {
                      e.preventDefault();
                      selectTab(tabs[0].id);
                      document
                        .getElementById(`${baseId}-tab-${tabs[0].id}`)
                        ?.focus();
                    } else if (e.key === "End") {
                      e.preventDefault();
                      const last = tabs[tabs.length - 1];
                      selectTab(last.id);
                      document
                        .getElementById(`${baseId}-tab-${last.id}`)
                        ?.focus();
                    }
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div
            className="about-faq__panel"
            role="tabpanel"
            id={`${baseId}-panel-${activeTab.id}`}
            aria-labelledby={`${baseId}-tab-${activeTab.id}`}
          >
            {activeTab.items.length === 0 ? null : (
              <div className="about-faq__accordion">
                {activeTab.items.map((item, index) => {
                  const open = openIndex === index;
                  const buttonId = `${baseId}-acc-btn-${activeTab.id}-${index}`;
                  const regionId = `${baseId}-acc-region-${activeTab.id}-${index}`;
                  const hasAnswer = item.answer.trim().length > 0;

                  return (
                    <div
                      key={item.question}
                      className={`about-faq__item${open ? " is-open" : ""}`}
                    >
                      <h3 className="about-faq__item-heading">
                        <button
                          type="button"
                          id={buttonId}
                          className="about-faq__trigger"
                          aria-expanded={open}
                          aria-controls={regionId}
                          onClick={() => setOpenIndex(open ? -1 : index)}
                        >
                          <span className="about-faq__question">
                            {item.question}
                          </span>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            className="about-faq__icon"
                            src={
                              open
                                ? ABOUT_FAQ.minusIconSrc
                                : ABOUT_FAQ.plusIconSrc
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
                        className={`about-faq__answer-wrap${open ? " is-open" : ""}`}
                      >
                        {hasAnswer ? (
                          <p className="about-faq__answer">{item.answer}</p>
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
