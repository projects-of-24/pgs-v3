/**
 * Country destination tab chips — C2 / CS0.
 * iPad Figma `26:2808` · Study Cost active frame `29:4773`.
 * Controlled by parent body for Study 101 ↔ Cost panel switch.
 */
"use client";

import {
  USA_DESTINATION_TABS,
  type CountriesDestinationTab
} from "./content";
import "./countries-destination-tabs.css";

type Props = {
  tabs?: readonly CountriesDestinationTab[];
  activeId: string;
  onChange: (id: string) => void;
};

export function CountriesDestinationTabs({
  tabs = USA_DESTINATION_TABS,
  activeId,
  onChange
}: Props) {
  return (
    <section
      className="countries-destination-tabs"
      data-pgs-module="countries-destination-tabs"
      data-block-gate="c2"
      data-figma-ipad="26:2808"
      data-figma-phone="503:5082"
      aria-label="Country page sections"
    >
      <div className="countries-destination-tabs__panel" role="tablist">
        {tabs.map((tab) => {
          const selected = tab.id === activeId;
          const isCta = tab.emphasis === "cta";
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`cd-panel-${tab.id}`}
              id={`cd-tab-${tab.id}`}
              data-label={tab.label}
              className={
                isCta
                  ? "countries-destination-tabs__tab countries-destination-tabs__tab--cta"
                  : selected
                    ? "countries-destination-tabs__tab is-selected"
                    : "countries-destination-tabs__tab"
              }
              onClick={() => onChange(tab.id)}
            >
              <span className="countries-destination-tabs__label">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
