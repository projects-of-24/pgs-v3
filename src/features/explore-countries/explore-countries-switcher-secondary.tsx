/**
 * explore Countries secondary country switcher — E2b (Mauritius stack).
 * Desktop `17056:19615` · Mobile card+chips in `471:4755` (bento in that frame = next gate).
 * Chip click updates title + CTA label + href. Desk CTA authority: `{CODE} 101: What to Know`.
 */
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  EXPLORE_COUNTRIES_SECONDARY,
  EXPLORE_COUNTRIES_SWITCHER_SECONDARY,
  type ExploreCountryOption
} from "./content";
import "./explore-countries-switcher.css";

function CountryTitleLines({ lines }: { lines: readonly string[] }) {
  return (
    <span className="explore-countries-switcher__country">
      {lines.map((line, i) => (
        <span key={line} className="explore-countries-switcher__country-line">
          {line}
          {i < lines.length - 1 ? (
            <span className="explore-countries-switcher__country-space"> </span>
          ) : null}
        </span>
      ))}
    </span>
  );
}

function ChipList({
  countries,
  activeId,
  onSelect,
  className
}: {
  countries: readonly ExploreCountryOption[];
  activeId: string;
  onSelect: (c: ExploreCountryOption) => void;
  className: string;
}) {
  return (
    <div
      className={className}
      role="listbox"
      aria-label="More study destinations"
    >
      {countries.map((c) => {
        const selected = c.id === activeId;
        return (
          <button
            key={c.id}
            type="button"
            role="option"
            aria-selected={selected}
            className={
              selected
                ? "explore-countries-switcher__chip is-selected"
                : "explore-countries-switcher__chip"
            }
            onClick={() => onSelect(c)}
          >
            {c.label}
          </button>
        );
      })}
    </div>
  );
}

function ctaLabelFor(c: ExploreCountryOption, suffix: string): string {
  const code = c.ctaCode ?? c.label.toUpperCase();
  return `${code} ${suffix}`;
}

export function ExploreCountriesSwitcherSecondary() {
  const s = EXPLORE_COUNTRIES_SWITCHER_SECONDARY;
  const [activeId, setActiveId] = useState<string>(s.defaultId);
  const active =
    EXPLORE_COUNTRIES_SECONDARY.find((c) => c.id === activeId) ??
    EXPLORE_COUNTRIES_SECONDARY[2];

  return (
    <section
      className="explore-countries-switcher explore-countries-switcher--secondary"
      data-pgs-module="explore-countries-switcher-secondary"
      data-block-gate="e2b"
      data-figma-desktop="17056:19615"
      data-figma-mobile="471:4755"
      data-figma-ipad="22:1817"
      aria-label="Explore more study destinations"
    >
      <div className="explore-countries-switcher__inner">
        <div className="explore-countries-switcher__row">
          <div className="explore-countries-switcher__card">
            <div className="explore-countries-switcher__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.photoSrc} alt={s.photoAlt} />
            </div>
            <div className="explore-countries-switcher__body">
              <div className="explore-countries-switcher__titles">
                <p className="explore-countries-switcher__study-in">{s.studyIn}</p>
                <p
                  key={activeId}
                  className="explore-countries-switcher__country-wrap"
                >
                  <CountryTitleLines lines={active.countryLines} />
                </p>
              </div>
              <Link
                key={`${activeId}-cta`}
                href={active.href}
                className="explore-countries-switcher__cta"
              >
                {ctaLabelFor(active, s.ctaSuffix)}
              </Link>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="explore-countries-switcher__swipe"
              src={s.swipeSrc}
              alt=""
              aria-hidden="true"
            />
          </div>

          <ChipList
            countries={EXPLORE_COUNTRIES_SECONDARY}
            activeId={activeId}
            onSelect={(c) => setActiveId(c.id)}
            className="explore-countries-switcher__chips explore-countries-switcher__chips--desk"
          />
        </div>

        <ChipList
          countries={EXPLORE_COUNTRIES_SECONDARY}
          activeId={activeId}
          onSelect={(c) => setActiveId(c.id)}
          className="explore-countries-switcher__chips explore-countries-switcher__chips--mob"
        />
      </div>
    </section>
  );
}
