/**
 * CV Ready Program pre-selected groups — CR3.
 * Desk panel `17046:10429` + chips `17046:10457`.
 * Mob panel `331:8310` + chips `331:8312`.
 * Groups are tags (catalog `tags[]` later). Single select, visual only until
 * the backend filters rails. Selected = inverse (owner 2026-09-24). No faces.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: mob label 14px
 * ISSUE: below PGS type floor
 * PGS IMPLEMENTATION: mob label 16px; pill padding and # icon stay Figma
 */
"use client";

import { useState } from "react";
import { CVREADY_PROGRAM_PRESETS } from "./content";
import "./cvready-program-presets.css";

export function CvreadyProgramPresets() {
  const c = CVREADY_PROGRAM_PRESETS;
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section
      className="cvready-program-presets"
      data-pgs-module="cvready-program-presets"
      data-block-gate="cr3"
      data-figma-desktop="17046:10457"
      data-figma-mobile="331:8312"
      aria-label={c.label}
    >
      <div className="cvready-program-presets__panel">
        <ul className="cvready-program-presets__list">
          {c.groups.map((group) => {
            const isSelected = group === selected;
            return (
              <li key={group} className="cvready-program-presets__item">
                <button
                  type="button"
                  className={
                    isSelected
                      ? "cvready-program-presets__button cvready-program-presets__button--selected"
                      : "cvready-program-presets__button"
                  }
                  aria-pressed={isSelected}
                  onClick={() => setSelected(isSelected ? null : group)}
                >
                  <img
                    className="cvready-program-presets__hash"
                    src={c.hashIconSrc}
                    alt=""
                    width={15}
                    height={19}
                    decoding="async"
                  />
                  <span className="cvready-program-presets__chip">{group}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
