/**
 * Country destination tab panels — CS0 / V0 / ST0 / SC0 / PT0.
 * Study 101 · Cost · Visa · Short-Term · Scholarships · Tracks (PT1+).
 */
"use client";

import { useState } from "react";
import {
  USA_DESTINATION_COST_BUDGETING,
  USA_DESTINATION_COST_SPEND,
  USA_DESTINATION_COST_TOC,
  USA_DESTINATION_SCHOLARSHIP_INTRO,
  USA_DESTINATION_SCHOLARSHIP_TOC,
  USA_DESTINATION_SHORT_INTRO,
  USA_DESTINATION_SHORT_TOC,
  USA_DESTINATION_TRACKS_HEADSUP,
  USA_DESTINATION_TRACKS_INTRO,
  USA_DESTINATION_TRACKS_SECTION1,
  USA_DESTINATION_TRACKS_SECTION2,
  USA_DESTINATION_TRACKS_TOC,
  USA_DESTINATION_VISA_INTRO,
  USA_DESTINATION_VISA_TOC
} from "./content";
import { CountriesDestinationChoose } from "./countries-destination-choose";
import { CountriesDestinationCostCta } from "./countries-destination-cost-cta";
import { CountriesDestinationOverview } from "./countries-destination-overview";
import { CountriesDestinationScholarshipGuide } from "./countries-destination-scholarship-guide";
import { CountriesDestinationScholarshipMajor } from "./countries-destination-scholarship-major";
import { CountriesDestinationShortCta } from "./countries-destination-short-cta";
import { CountriesDestinationShortMentor } from "./countries-destination-short-mentor";
import { CountriesDestinationTabs } from "./countries-destination-tabs";
import { CountriesDestinationToc } from "./countries-destination-toc";
import { CountriesDestinationTracks } from "./countries-destination-tracks";
import { CountriesDestinationTracksHeadsUp } from "./countries-destination-tracks-headsup";
import { CountriesDestinationTracksSection } from "./countries-destination-tracks-section";
import { CountriesDestinationVisaDocs } from "./countries-destination-visa-docs";
import { CountriesDestinationVisaDos } from "./countries-destination-visa-dos";
import { CountriesDestinationVisaHelp } from "./countries-destination-visa-help";
import { CountriesDestinationVisaSteps } from "./countries-destination-visa-steps";
import { CountriesDestinationVisaTypes } from "./countries-destination-visa-types";
import { CountriesDestinationWhy } from "./countries-destination-why";

export function CountriesDestinationBody() {
  const [activeTab, setActiveTab] = useState("study101");

  return (
    <>
      <CountriesDestinationTabs activeId={activeTab} onChange={setActiveTab} />

      {activeTab === "study101" ? (
        <div
          id="cd-panel-study101"
          role="tabpanel"
          aria-labelledby="cd-tab-study101"
          data-cd-panel="study101"
        >
          <CountriesDestinationToc />
          <CountriesDestinationWhy />
          <CountriesDestinationOverview />
          <CountriesDestinationChoose />
          <CountriesDestinationTracks />
        </div>
      ) : null}

      {activeTab === "cost" ? (
        <div
          id="cd-panel-cost"
          role="tabpanel"
          aria-labelledby="cd-tab-cost"
          data-cd-panel="cost"
          data-block-gate="cs4"
          data-figma-ipad="29:3405"
        >
          <CountriesDestinationToc
            content={USA_DESTINATION_COST_TOC}
            blockGate="cs1"
            figmaIpad="29:4785"
          />
          <CountriesDestinationWhy
            content={USA_DESTINATION_COST_BUDGETING}
            id="cd-cost-budgeting"
            blockGate="cs2"
            figmaIpad="29:4803"
            titleId="countries-destination-cost-budgeting-title"
          />
          <CountriesDestinationChoose
            content={USA_DESTINATION_COST_SPEND}
            id="cd-cost-spend"
            blockGate="cs3"
            figmaIpad="29:4807"
            titleId="countries-destination-cost-spend-title"
          />
          <CountriesDestinationCostCta />
        </div>
      ) : null}

      {activeTab === "visa" ? (
        <div
          id="cd-panel-visa"
          role="tabpanel"
          aria-labelledby="cd-tab-visa"
          data-cd-panel="visa"
          data-block-gate="v6"
          data-figma-ipad="30:4918"
        >
          <CountriesDestinationToc
            content={USA_DESTINATION_VISA_TOC}
            blockGate="v1"
            figmaIpad="30:5056"
          />
          <CountriesDestinationWhy
            content={USA_DESTINATION_VISA_INTRO}
            id="cd-visa-intro"
            blockGate="v2"
            figmaIpad="30:5080"
            titleId="countries-destination-visa-intro-title"
          />
          <CountriesDestinationVisaTypes />
          <CountriesDestinationVisaDocs />
          <CountriesDestinationVisaSteps />
          <CountriesDestinationVisaDos />
          <CountriesDestinationVisaHelp />
        </div>
      ) : null}

      {activeTab === "short-term" ? (
        <div
          id="cd-panel-short-term"
          role="tabpanel"
          aria-labelledby="cd-tab-short-term"
          data-cd-panel="short-term"
          data-block-gate="st4"
          data-figma-ipad="33:5509"
        >
          <CountriesDestinationToc
            content={USA_DESTINATION_SHORT_TOC}
            blockGate="st1"
            figmaIpad="33:5791"
          />
          <CountriesDestinationWhy
            content={USA_DESTINATION_SHORT_INTRO}
            id="cd-short-intro"
            blockGate="st2"
            figmaIpad="33:5809"
            titleId="countries-destination-short-intro-title"
          />
          <CountriesDestinationShortCta />
          <CountriesDestinationShortMentor />
        </div>
      ) : null}

      {activeTab === "scholarships" ? (
        <div
          id="cd-panel-scholarships"
          role="tabpanel"
          aria-labelledby="cd-tab-scholarships"
          data-cd-panel="scholarships"
          data-block-gate="sc4"
          data-figma-ipad="34:6116"
        >
          <CountriesDestinationToc
            content={USA_DESTINATION_SCHOLARSHIP_TOC}
            blockGate="sc1"
            figmaIpad="34:6260"
          />
          <CountriesDestinationWhy
            content={USA_DESTINATION_SCHOLARSHIP_INTRO}
            id="cd-scholarship-intro"
            blockGate="sc2"
            figmaIpad="34:6281"
            ariaLabel="Scholarships introduction"
          />
          <CountriesDestinationScholarshipMajor />
          <CountriesDestinationScholarshipGuide />
        </div>
      ) : null}

      {activeTab === "tracks" ? (
        <div
          id="cd-panel-tracks"
          role="tabpanel"
          aria-labelledby="cd-tab-tracks"
          data-cd-panel="tracks"
          data-block-gate="pt5"
          data-figma-ipad="35:6371"
        >
          <CountriesDestinationToc
            content={USA_DESTINATION_TRACKS_TOC}
            blockGate="pt1"
            figmaIpad="35:6807"
          />
          <CountriesDestinationWhy
            content={USA_DESTINATION_TRACKS_INTRO}
            id="cd-tracks-intro"
            blockGate="pt2"
            figmaIpad="35:6829"
            ariaLabel="Popular study tracks introduction"
          />
          <CountriesDestinationTracksSection
            content={USA_DESTINATION_TRACKS_SECTION1}
            id="cd-tracks-section1"
            blockGate="pt3"
            figmaIpad="35:6834"
            titleId="countries-destination-tracks-section1-title"
          />
          <CountriesDestinationTracksSection
            content={USA_DESTINATION_TRACKS_SECTION2}
            id="cd-tracks-section2"
            blockGate="pt4"
            figmaIpad="35:6913"
            titleId="countries-destination-tracks-section2-title"
          />
          <CountriesDestinationTracksHeadsUp content={USA_DESTINATION_TRACKS_HEADSUP} />
        </div>
      ) : null}

      {activeTab !== "study101" &&
      activeTab !== "cost" &&
      activeTab !== "visa" &&
      activeTab !== "short-term" &&
      activeTab !== "scholarships" &&
      activeTab !== "tracks" ? (
        <div
          id={`cd-panel-${activeTab}`}
          role="tabpanel"
          aria-labelledby={`cd-tab-${activeTab}`}
          data-cd-panel={activeTab}
          data-deferred="true"
          hidden
        />
      ) : null}
    </>
  );
}
