#!/usr/bin/env bash
# Prepare Playwright Auth storage states for CI @auth-regression.
# Soft-skips when preview fixture secrets are not configured (exit 0).
# Never prints secret values. Never uploads .auth/ artifacts.
set -euo pipefail

write_output() {
  local key="$1"
  local value="$2"
  if [[ -n "${GITHUB_OUTPUT:-}" ]]; then
    echo "${key}=${value}" >> "${GITHUB_OUTPUT}"
  fi
}

AUTH_DIR="${PLAYWRIGHT_AUTH_STATE_DIR:-${GITHUB_WORKSPACE:-.}/.auth/phase36}"
export PLAYWRIGHT_AUTH_STATE_DIR="${AUTH_DIR}"
export PLAYWRIGHT_BASE_URL="${PLAYWRIGHT_BASE_URL:-http://127.0.0.1:7100}"
export PGS_PREVIEW_FIXTURE_ROLES="${PGS_PREVIEW_FIXTURE_ROLES:-standard-student,premium-student,mentor,super-admin}"

if [[ -z "${NEXT_PUBLIC_SUPABASE_URL:-}" ]]; then
  echo "Auth fixtures skipped: NEXT_PUBLIC_SUPABASE_URL is not set."
  write_output prepared false
  exit 0
fi

if [[ -z "${NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:-}" && -z "${NEXT_PUBLIC_SUPABASE_ANON_KEY:-}" ]]; then
  echo "Auth fixtures skipped: Supabase publishable/anon key is not set."
  write_output prepared false
  exit 0
fi

if [[ -z "${PGS_PREVIEW_FIXTURE_PASSWORD:-}" \
   && -z "${PGS_PREVIEW_STANDARD_PASSWORD:-}" \
   && -z "${PGS_PREVIEW_PREMIUM_PASSWORD:-}" ]]; then
  echo "Auth fixtures skipped: fixture password secret(s) not set."
  write_output prepared false
  exit 0
fi

pnpm fixtures:auth-states

# Only export paths that exist — partial fixture runs must not point Playwright at missing files.
declare -a prepared_roles=()
if [[ -n "${GITHUB_ENV:-}" ]]; then
  if [[ -f "${AUTH_DIR}/standard-student.json" ]]; then
    echo "PLAYWRIGHT_STANDARD_STUDENT_STORAGE_STATE=${AUTH_DIR}/standard-student.json" >> "${GITHUB_ENV}"
    prepared_roles+=("standard-student")
  fi
  if [[ -f "${AUTH_DIR}/premium-student.json" ]]; then
    echo "PLAYWRIGHT_PREMIUM_STUDENT_STORAGE_STATE=${AUTH_DIR}/premium-student.json" >> "${GITHUB_ENV}"
    prepared_roles+=("premium-student")
  fi
  if [[ -f "${AUTH_DIR}/mentor.json" ]]; then
    echo "PLAYWRIGHT_MENTOR_STORAGE_STATE=${AUTH_DIR}/mentor.json" >> "${GITHUB_ENV}"
    prepared_roles+=("mentor")
  fi
  if [[ -f "${AUTH_DIR}/super-admin.json" ]]; then
    echo "PLAYWRIGHT_SUPER_ADMIN_STORAGE_STATE=${AUTH_DIR}/super-admin.json" >> "${GITHUB_ENV}"
    prepared_roles+=("super-admin")
  fi
fi

if [[ ${#prepared_roles[@]} -eq 0 ]]; then
  echo "Auth fixtures produced no storage-state files under ${AUTH_DIR}."
  write_output prepared false
  exit 0
fi

write_output prepared true
echo "Auth fixtures prepared under ${AUTH_DIR} for roles: ${prepared_roles[*]}"
