import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypeScript from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTypeScript,
  {
    linterOptions: {
      // Modular Figma bodies keep many eslint-disable-next-line @next/next/no-img-element
      // comments; after turning the rule off, those directives would fail --max-warnings=0.
      reportUnusedDisableDirectives: "off"
    },
    rules: {
      "@next/next/no-css-tags": "off",
      "import/no-anonymous-default-export": "off",
      // Figma/modular public bodies intentionally keep raw <img> for parity + asset control.
      "@next/next/no-img-element": "off"
    }
  },
  globalIgnores([
    ".next/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    "public/assets/**",
    ".ref/**"
  ])
]);
