/**
 * explore Countries country switcher — E2.
 * Desktop `17056:19694` · Mobile card `466:7966` + chips `466:8007`.
 * Owned CSS only. Bands >1366 desk · ≤600 phone · iPad = desk body.
 * Chip click updates title + CTA href (legacy Hostinger behavior).
 * Second Mauritius stack deferred. CTA label stays Figma/legacy “UK 101…”.
 */
"use client";

import Link from "next/link";
import { useState } from "react";
import {
  EXPLORE_COUNTRIES_PRIMARY_DESK,
  EXPLORE_COUNTRIES_PRIMARY_MOB,
  EXPLORE_COUNTRIES_SWITCHER,
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
    <div className={className} role="listbox" aria-label="Study destinations">
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

export function ExploreCountriesSwitcher() {
  const s = EXPLORE_COUNTRIES_SWITCHER;
  const [activeId, setActiveId] = useState<string>(s.defaultId);
  const active =
    EXPLORE_COUNTRIES_PRIMARY_DESK.find((c) => c.id === activeId) ??
    EXPLORE_COUNTRIES_PRIMARY_DESK[2];

  const onSelect = (c: ExploreCountryOption) => {
    setActiveId(c.id);
  };

  return (
    <section
      className="explore-countries-switcher"
      data-pgs-module="explore-countries-switcher"
      data-block-gate="e2"
      aria-label="Explore study destinations"
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
              <Link href={active.href} className="explore-countries-switcher__cta">
                {s.ctaLabel}
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
            countries={EXPLORE_COUNTRIES_PRIMARY_DESK}
            activeId={activeId}
            onSelect={onSelect}
            className="explore-countries-switcher__chips explore-countries-switcher__chips--desk"
          />
        </div>

        <ChipList
          countries={EXPLORE_COUNTRIES_PRIMARY_MOB}
          activeId={activeId}
          onSelect={onSelect}
          className="explore-countries-switcher__chips explore-countries-switcher__chips--mob"
        />
      </div>
    </section>
  );
}
