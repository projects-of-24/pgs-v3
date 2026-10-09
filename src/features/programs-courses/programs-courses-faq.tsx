"use client";

/**
 * Courses FAQ — C13.
 * Desktop `17072:11640` · Mobile `551:9580`.
 * COURSE2d-D4b: prop-driven from course.faq (CMS editable).
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: inactive tab / answer #666; mob answer 12px
 * ISSUE: #666 borderline AA; 12px below readable floor
 * PGS IMPLEMENTATION: muted #555 · answer ≥14px
 */
import { useId, useState } from "react";
import { COURSES_FAQ } from "./programs-courses-faq-content";
import type { CoursesFaqBody } from "./courses-cms-shared-defaults";
import "./programs-courses-faq.css";

type ProgramsCoursesFaqProps = {
  data?: CoursesFaqBody;
};

export function ProgramsCoursesFaq({ data }: ProgramsCoursesFaqProps = {}) {
  const faq = data ?? {
    heading: COURSES_FAQ.heading,
    plusIconSrc: COURSES_FAQ.plusIconSrc,
    minusIconSrc: COURSES_FAQ.minusIconSrc,
    defaultTabId: COURSES_FAQ.defaultTabId,
    defaultOpenIndex: COURSES_FAQ.defaultOpenIndex,
    tabs: COURSES_FAQ.tabs.map((tab) => ({
      id: tab.id,
      label: tab.label,
      items: tab.items.map((item) => ({ question: item.question, answer: item.answer }))
    }))
  };
  const baseId = useId();
  const [tabId, setTabId] = useState<string>(faq.defaultTabId || faq.tabs[0]?.id || "");
  const [openIndex, setOpenIndex] = useState<number>(faq.defaultOpenIndex);

  const activeTab = faq.tabs.find((t) => t.id === tabId) ?? faq.tabs[0];

  function selectTab(nextId: string) {
    setTabId(nextId);
    setOpenIndex(nextId === faq.defaultTabId ? faq.defaultOpenIndex : -1);
  }

  if (!activeTab) {
    return (
      <section id="pc-c13" className="pc-faq" aria-labelledby="pc-c13-heading">
        <div className="pc-faq__inner">
          <h2 id="pc-c13-heading" className="pc-faq__heading">
            {faq.heading}
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section
      id="pc-c13"
      className="pc-faq"
      data-pgs-module="programs-courses-faq"
      data-block-gate="c13"
      data-figma-desktop="17072:11640"
      data-figma-mobile="551:9580"
      aria-labelledby="pc-c13-heading"
    >
      <div className="pc-faq__inner">
        <h2 id="pc-c13-heading" className="pc-faq__heading">
          {faq.heading}
        </h2>

        <div className="pc-faq__layout">
          <div
            className="pc-faq__tablist"
            role="tablist"
            aria-label="Course FAQ topics"
            aria-orientation="vertical"
          >
            {faq.tabs.map((tab) => {
              const selected = tab.id === activeTab.id;
              const tabBtnId = `${baseId}-tab-${tab.id}`;
              const panelId = `${baseId}-panel-${tab.id}`;

              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  id={tabBtnId}
                  className={`pc-faq__tab${selected ? " is-active" : ""}`}
                  aria-selected={selected}
                  aria-controls={panelId}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => selectTab(tab.id)}
                  onKeyDown={(e) => {
                    const tabs = faq.tabs;
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
            className="pc-faq__panel"
            role="tabpanel"
            id={`${baseId}-panel-${activeTab.id}`}
            aria-labelledby={`${baseId}-tab-${activeTab.id}`}
          >
            {activeTab.items.length === 0 ? null : (
              <div className="pc-faq__accordion">
                {activeTab.items.map((item, index) => {
                  const open = openIndex === index;
                  const buttonId = `${baseId}-acc-btn-${activeTab.id}-${index}`;
                  const regionId = `${baseId}-acc-region-${activeTab.id}-${index}`;
                  const hasAnswer = item.answer.trim().length > 0;

                  return (
                    <div key={`${item.question}-${index}`} className={`pc-faq__item${open ? " is-open" : ""}`}>
                      <h3 className="pc-faq__item-heading">
                        <button
                          type="button"
                          id={buttonId}
                          className="pc-faq__trigger"
                          aria-expanded={open}
                          aria-controls={regionId}
                          onClick={() => setOpenIndex(open ? -1 : index)}
                        >
                          <span className="pc-faq__question">{item.question}</span>
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            className="pc-faq__icon"
                            src={open ? faq.minusIconSrc : faq.plusIconSrc}
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
                        className={`pc-faq__answer-wrap${open ? " is-open" : ""}`}
                      >
                        {hasAnswer ? <p className="pc-faq__answer">{item.answer}</p> : null}
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
