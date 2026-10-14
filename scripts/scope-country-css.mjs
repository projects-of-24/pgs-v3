/**
 * Scope / audit countries-destination-{slug} CSS under
 * :where([data-country="{slug}"]).
 *
 * Usage:
 *   node scripts/scope-country-css.mjs [slug|all] [--check|--fix]
 * Default: --check (exit 1 on violations).
 * --fix: incrementally scope only unscoped/foreign selectors.
 */
import {
  COUNTRIES_DESTINATION_FAMILY,
  auditCss,
  familyForkDir,
  scopeCssIncremental,
  walkCssFiles
} from "./lib/css-fork-scope.mjs";
import fs from "node:fs";

const family = COUNTRIES_DESTINATION_FAMILY;
const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const flags = new Set(process.argv.slice(2).filter((a) => a.startsWith("--")));
const mode = flags.has("--fix") ? "fix" : "check";

const arg = args[0] || "all";
const targets = arg === "all" ? family.slugs : [arg];
if (!targets.every((s) => family.slugs.includes(s))) {
  console.error(
    `Unknown slug. Use one of: ${family.slugs.join(", ")} | all`
  );
  process.exit(1);
}

let violations = 0;

for (const slug of targets) {
  const fork = familyForkDir(family, slug);
  if (!fs.existsSync(fork)) {
    console.error(`missing fork ${fork}`);
    process.exit(1);
  }
  const files = walkCssFiles(fork);
  let fixed = 0;
  let clean = 0;
  let slugFails = 0;

  for (const file of files) {
    const before = fs.readFileSync(file, "utf8");
    if (mode === "fix") {
      const { css, changed } = scopeCssIncremental(before, family, slug);
      if (changed) {
        fs.writeFileSync(file, css);
        fixed += 1;
      } else {
        clean += 1;
      }
      continue;
    }

    const { unscoped, foreign, globalEl } = auditCss(before, family, slug);
    if (unscoped.length || foreign.length || globalEl.length) {
      violations += 1;
      slugFails += 1;
      console.error(`FAIL ${pathRel(file)}`);
      if (unscoped.length) {
        console.error(`  unscoped (${unscoped.length}): ${unscoped[0]}`);
      }
      if (foreign.length) {
        console.error(
          `  foreign (${foreign.length}): ${foreign[0].selector} → ${foreign[0].slugs.join(",")}`
        );
      }
      if (globalEl.length) {
        console.error(`  globalEl (${globalEl.length}): ${globalEl[0]}`);
      }
    } else {
      clean += 1;
    }
  }

  if (mode === "fix") {
    console.log(
      `${slug}: ${fixed} rewritten, ${clean} already clean, ${files.length} css files`
    );
  } else {
    console.log(
      `${slug}: ${clean}/${files.length} clean${slugFails ? ` (${slugFails} FAIL)` : ""}`
    );
  }
}

if (mode === "check" && violations > 0) {
  console.error(`done — ${violations} file(s) with violations`);
  process.exit(1);
}
console.log("done");

function pathRel(file) {
  return file.replace(process.cwd() + "/", "");
}
