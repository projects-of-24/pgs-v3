/**
 * Country destination template — shared public body.
 *
 * ≤1366: modular iPad/phone lab (Figma `26:2456` / wide `27:2999`) — LOCKED.
 * >1366: desk body forked into `./desk` (full fork for `europe`).
 * Full template fork for `europe` (2026-10-10). Edit this folder only for this country.
 * Modular + desk both live in this folder; content still cloned fixtures until content pass.
 */
import { CountryHeroFigma } from "./desk/country-hero-figma";
import { CountryUkBodyShell } from "./desk/country-uk-body-shell";
import { getCountryContent } from "./desk/content";
import { CountriesDestinationBody } from "./countries-destination-body";
import { CountriesDestinationHero } from "./countries-destination-hero";
import "./countries-destination-preview-shell.css";

/** This fork = `europe` only (full template copy). */
export type CountriesDestinationCountrySlug = "europe";

type CountriesDestinationPreviewShellProps = {
  /** Live route — same body as preview; marks `data-cutover=LIVE`. */
  live?: boolean;
  /** Locked to this fork's country. */
  country?: CountriesDestinationCountrySlug;
  /**
   * Body rail width (modular path only).
   * - `narrow` — Figma `26:2456` (LOCKED `/preview/countries`)
   * - `wide` — Figma `27:2999` (`/preview/countries-2`)
   */
  rail?: "narrow" | "wide";
};

export function CountriesDestinationPreviewShell({
  live = false,
  country = "europe",
  rail = "narrow"
}: CountriesDestinationPreviewShellProps) {
  const figmaIpad = rail === "wide" ? "27:2999" : "26:2456";
  const ukContent = getCountryContent("uk");
  if (!ukContent) {
    throw new Error("countries-destination-europe desk: missing CountryPage content");
  }

  return (
    <div
      className="countries-destination-preview-shell"
      data-pgs-module="countries-destination-preview"
      data-countries-destination-family="public"
      data-country={country}
      data-rail={rail}
      data-figma-ipad={figmaIpad}
      data-shell-gate="p0"
      data-block-gate="v6"
      data-cutover={live ? "LIVE" : "preview"}
    >
      {/*
        Desk >1366 — About method: 1:1 QC React body from /countriesuk + owned CSS.
        Do not nest inside modular sleeve (UK owns 75% / 964).
      */}
      <div
        className="countries-destination-preview-shell__desk-qc"
        data-desk-source="fork-desk-europe"
        data-desk-method="about-1-1"
      >
        <div
          className="countries-destination-preview-shell__univ-gap"
          aria-hidden="true"
        />
        <CountryHeroFigma
          images={{ destinationName: ukContent.intro.titleLine1 }}
        />
        <CountryUkBodyShell content={ukContent} />
      </div>

      {/* ≤1366 — modular lab · iPad LOCKED */}
      <div
        className="countries-destination-preview-shell__modular"
        data-modular-bands="ipad-phone"
      >
        <div className="countries-destination-preview-shell__body">
          <div
            className="countries-destination-preview-shell__univ-gap"
            aria-hidden="true"
          />
          <CountriesDestinationHero />
          <CountriesDestinationBody />
        </div>
      </div>
    </div>
  );
}
