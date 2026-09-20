"use client";

/**
 * Option A preview shell — full country body + all tabs, shared layout CSS.
 * Preview: `/preview/country-study101-why` (same URL; body now switches tabs).
 * Study 101 Why lead = Figma module. Live country routes untouched.
 */
import { USA_CONTENT } from "./content";
import { CountryPage } from "./CountryPage";
import { CountryStudy101WhyFigma } from "./country-study101-why-figma";
import "./country-body-layout.css";
import "./country-study101-why-figma-usa.css";

export function CountryBodyPreviewShell() {
  const study101 = USA_CONTENT.tabs.find((t) => t.id === "study101");

  return (
    <>
      <p className="country-body-shell-usa__banner" role="status">
        Side-test — country body (all tabs). Desktop + iPad layout LOCKED. Mobile
        ≤600 under QC. Study 101 Why = Figma. Live country pages unchanged.
      </p>
      <CountryPage
        content={USA_CONTENT}
        hideHero
        className="country-body-shell-usa"
        study101Lead={
          study101 && study101.id === "study101" ? (
            <CountryStudy101WhyFigma
              content={{
                title: study101.sidebarLinks[0]?.label,
                paragraphs: study101.whyParagraphs,
              }}
            />
          ) : null
        }
      />
    </>
  );
}

/** @deprecated Use CountryBodyPreviewShell — kept for old imports. */
export function CountryStudy101WhyShell() {
  return <CountryBodyPreviewShell />;
}
