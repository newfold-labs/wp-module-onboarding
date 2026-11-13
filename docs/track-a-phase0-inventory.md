---
name: wp-module-onboarding
title: Track A — Phase 0 inventory
description: Snapshot for 3.3.x NS line maintenance (2026-11-12).
updated: 2026-11-12
---

# Track A — Phase 0 inventory

Baseline for **main-networksolutions** maintenance (no merge from `main`).

## Module (`wp-module-onboarding`)

| Item | Value |
|------|--------|
| `main` @ fetch | `a0cfb66e45d7bc668b930213c928362feff57030` |
| `main-networksolutions` @ fetch | `0428edab529a8deefd4138db28bc5ec3d999de01` |
| Merge base | `bd901d8e549295f381279e69c2193a21c07f221c` |
| Commits `main-networksolutions..main` | 327 |
| Commits `main..main-networksolutions` | 59 |
| Module version (NS branch) | **3.3.7** (`package.json`, `build/3.3.7/`) |
| Module version (`main`) | **4.0.10** (per [merge plan](main-networksolutions-merge-plan.md)) |
| Onboarding-data constraint (module) | `^1.2.27+ns` |

## Onboarding-data (`wp-module-onboarding-data`)

| Item | Status |
|------|--------|
| Branch | `main-networksolutions` (Satis **`+ns`**) |
| vs module pin | Module requires **`^1.2.27+ns`**; verify latest published `1.2.x+ns` on Satis before host bumps |
| Local clone | Not present under `~/Sites` — confirm in data repo / Satis UI |

## Host plugin Composer pins (local clones)

Captured **2026-11-12** from machines with sibling repos; **re-verify on each host `main`/`develop` before release.**

| Host plugin | `wp-module-onboarding` | `wp-module-onboarding-data` | Notes |
|-------------|------------------------|----------------------------|--------|
| `wp-plugin-web` (Netsol) | `^3.3.6` | `^1.2.23` | Satis may resolve `+ns` build; bump toward **3.3.7** after module release |
| `wp-plugin-webhostbox` | `dev-main-networksolutions` | `^1.2.28+ns` | VCS repo override for module branch |
| `wp-plugin-bigrock` | *(not in `composer.json` local copy)* | — | Confirm onboarding dep on release branch in GitHub |
| `wp-plugin-vodien` | *(no local clone)* | — | CI uses `newfold-labs/wp-plugin-vodien` |

**A4 follow-up:** open small PRs per host plugin to document pins in README or comment block; align Netsol data constraint to `^1.2.27+ns` when data team confirms.

## CI — NS-only workflows (must keep on `main-networksolutions`)

| Workflow | NS-specific behavior |
|----------|----------------------|
| `brand-plugin-test-playwright.yml` | netsol, bigrock, vodien, webhostbox (+ dev); PR target **`main-networksolutions`** |
| `newfold-prep-release.yml` | Default release line **`main-networksolutions`** |
| `lint-check-php.yml` / `lint-check-spa.yml` | PR/push scoped to **`main-networksolutions`** |
| `codecoverage-main.yml` | Disabled for NS 3.x (per merge plan) |
| `auto-translate.yml` | Push on **`main-networksolutions`** |
| `i18n-crowdin-*.yml` | NS branch defaults |

**Do not backport from `main`:** replacing NS Playwright matrix with Bluehost-only jobs; removing Crowdin workflows without NS auto-translate parity; v4-only `ai-code-review.yml` unless requested.

## Brand slug verification (0.5)

| Host | Data key | Module assets | Runtime check |
|------|----------|---------------|---------------|
| Netsol / Web.com | `web` | `src/Brands/networksolutions/` | `wp-plugin-web` default `mm_brand` → **`web`** (`bootstrap.php`) |
| BigRock India | `bigrock-in` | `src/Brands/bigrock/` | Host plugin on GitHub |
| Vodien | `vodien` | `src/Brands/vodien/` | Host plugin on GitHub |
| WebHostBox | `webhostbox` | `src/Brands/webhostbox/` | `wp-plugin-webhostbox` |

**Product sign-off:** slug map unchanged unless onboarding-data PR is merged first.

## Track A implementation log

| Phase | Status |
|-------|--------|
| Phase 0 | Documented (this file) |
| A3 workflow hardening | Done |
| Drift: composer patterns/migration | Bumped toward `main` (NS data + facebook retained) |
| Drift: npm `@wordpress/*` | **Upgrade-only** bumps vs prior `package.json`/lock (no version floor reductions) |
| Drift: phpcs + composer scripts | Aligned with `main` |
| Drift: shared `includes/` | `LoginRedirect`, `GlobalStylesService`, `I18nService` synced |
| Drift: Playwright helpers | Batched wp-env reset helpers (wizard matrix unchanged) |
| A6 NS v3 runbook | See [ns-v3-runbook.md](ns-v3-runbook.md) |
| A1 Playwright green | Gated on PR CI after workflow PR merges |
| A2 brand/data bumps | No pending brand change in module repo |
| A5 3.3.8+ release | Deferred until wizard fix ships; use Prepare Release |
