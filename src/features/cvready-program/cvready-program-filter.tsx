/**
 * CV Ready Program filter / sort — CR2 / CR-OPEN.
 * Desk overlay `19055:12410` on video · mob below `19055:13357` (2 cols).
 * Standalone = yellow hint after hero (controls live on video).
 * Hint copy Figma desk `19050:12043` · mob `19055:12562` · arrow Group 49.
 *
 * FIGMA ACCESSIBILITY ADAPTATION
 * ORIGINAL: selected chip ~12.8 · inactive ~10.75–11.2
 * OWNER 2026-09-24: Filter/Sort chip + label floor 14px (was 16)
 * PGS IMPLEMENTATION: chip label 14px; pill padding/radius stay Figma
 */
"use client";

import { useState } from "react";
import { CVREADY_PROGRAM_FILTER } from "./content";
import "./cvready-program-filter.css";

type ChipRowProps = {
  label: string;
  chips: readonly string[];
  selected: string;
  onSelect: (chip: string) => void;
  labelledBy: string;
};

function ChipRow({ label, chips, selected, onSelect, labelledBy }: ChipRowProps) {
  return (
    <div className="cvready-program-filter__row">
      <p id={labelledBy} className="cvready-program-filter__label">
        {label}
      </p>
      <div
        className="cvready-program-filter__chips"
        role="group"
        aria-labelledby={labelledBy}
      >
        {chips.map((chip) => {
          const isSelected = chip === selected;
          return (
            <button
              key={chip}
              type="button"
              className={
                isSelected
                  ? "cvready-program-filter__chip cvready-program-filter__chip--selected"
                  : "cvready-program-filter__chip"
              }
              aria-pressed={isSelected}
              onClick={() => onSelect(chip)}
            >
              {chip}
            </button>
          );
        })}
      </div>
    </div>
  );
}

type CvreadyProgramFilterProps = {
  /**
   * `overlay` — white card on desk video (no hint).
   * `below` — mob two-column card under video (no hint).
   * `standalone` — hint only after hero (controls on video).
   */
  variant?: "overlay" | "below" | "standalone";
};

export function CvreadyProgramFilter({
  variant = "standalone"
}: CvreadyProgramFilterProps) {
  const c = CVREADY_PROGRAM_FILTER;
  const [filter, setFilter] = useState<string>(c.defaultFilter);
  const [sort, setSort] = useState<string>(c.defaultSort);
  const isOverlay = variant === "overlay";
  const isBelow = variant === "below";
  const showHint = variant === "standalone";
  const suffix =
    variant === "overlay" ? "-overlay" : variant === "below" ? "-below" : "";

  const className = isOverlay
    ? "cvready-program-filter cvready-program-filter--overlay"
    : isBelow
      ? "cvready-program-filter cvready-program-filter--below"
      : "cvready-program-filter cvready-program-filter--standalone";

  return (
    <section
      className={className}
      data-pgs-module="cvready-program-filter"
      data-block-gate="cr2"
      data-filter-variant={variant}
      data-figma-desktop={isOverlay ? "19055:12410" : "19050:12043"}
      data-figma-mobile={isBelow ? "19055:13357" : "19055:12561"}
      aria-label="Program filters"
    >
      {(isOverlay || isBelow) && (
        <div className="cvready-program-filter__controls">
          <ChipRow
            label={c.filterLabel}
            chips={c.filterChips}
            selected={filter}
            onSelect={setFilter}
            labelledBy={`cvready-program-filter-label${suffix}`}
          />
          <ChipRow
            label={c.sortLabel}
            chips={c.sortChips}
            selected={sort}
            onSelect={setSort}
            labelledBy={`cvready-program-sort-label${suffix}`}
          />
        </div>
      )}

      {showHint ? (
        <div className="cvready-program-filter__hint">
          <p className="cvready-program-filter__hint-text">{c.hintText}</p>
          <img
            className="cvready-program-filter__arrow"
            src={c.arrowSrc}
            alt={c.arrowAlt}
            width={82}
            height={82}
            decoding="async"
            aria-hidden="true"
          />
        </div>
      ) : null}
    </section>
  );
}
