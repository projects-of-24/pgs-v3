/**
 * Isolated QC page for modular country hero + badges.
 * Not linked from nav. Live: `/countriesuk` uses the same module.
 */
import {
  CountryHeroFigma,
  COUNTRY_HERO_FIGMA_USA_DEFAULTS
} from "@/features/countries/country-hero-figma";

export const dynamic = "force-dynamic";

export default function CountryHeroFigmaPreviewPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        margin: 0,
        padding: "24px 16px 48px",
        background: "#ffffff",
        boxSizing: "border-box"
      }}
    >
      <h1
        style={{
          margin: "0 0 8px",
          fontFamily: "system-ui, sans-serif",
          fontSize: 18,
          fontWeight: 600,
          color: "#000"
        }}
      >
        Preview — country hero + badges (Figma modular)
      </h1>
      <p
        style={{
          margin: "0 0 24px",
          fontFamily: "system-ui, sans-serif",
          fontSize: 14,
          lineHeight: 1.4,
          color: "#333",
          maxWidth: 640
        }}
      >
        QC only. Same module as live `/countriesuk`. Resize: &gt;1366 · 601–1366 ·
        ≤600.
      </p>
      <CountryHeroFigma images={COUNTRY_HERO_FIGMA_USA_DEFAULTS} />
    </main>
  );
}
