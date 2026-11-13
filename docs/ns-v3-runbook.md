---
name: wp-module-onboarding
title: Network Solutions v3 onboarding runbook
description: Operate the wizard + onboarding-data +ns line for NS/regional brands.
updated: 2026-11-12
---

# Network Solutions v3 onboarding runbook

Applies to **`main-networksolutions`** only (wizard SPA, **not** v4 chat/sitegen on `main`).

## Stack

1. **`wp-module-onboarding`** branch **`main-networksolutions`** — wizard UI, brand SVGs, `build/3.3.x/`.
2. **`wp-module-onboarding-data`** branch **`main-networksolutions`** — brand flows, URLs, plugin lists (Satis **`+ns`**).
3. **Host plugins** — `wp-plugin-web`, `wp-plugin-bigrock`, `wp-plugin-vodien`, `wp-plugin-webhostbox`.

Brand visuals live in the **module**; redirects, dashboard pages, and feature flags for 3.x live in **onboarding-data**.

## Change a brand (checklist)

1. **Data first** — `wp-module-onboarding-data` `main-networksolutions`: `includes/Brands.php` (and related).
2. **Release data** — publish `1.2.x+ns` to Satis.
3. **Module** — bump `composer.json` constraint to `^1.2.x+ns` if needed; SVGs / `BrandLogo` / `BrandLoader`; `npm run build`; commit `build/3.3.x/`.
4. **Hosts** — `composer update` for module + data; manual smoke + Playwright matrix on module PR.

See also [main-networksolutions-merge-plan.md — NS brand or config change](main-networksolutions-merge-plan.md#ns-brand-or-config-change-default-path).

## Local dev

```bash
git checkout main-networksolutions   # or your PR branch
composer install
npm ci --legacy-peer-deps
npm run build
```

Confirm output under `build/<version>/` matches `package.json` and `bootstrap.php` (`NFD_ONBOARDING_VERSION`).

Load the module through a host plugin (not in isolation). For WebHostBox-style VCS pins, point composer at `dev-main-networksolutions` or a Satis tag.

## CI expectations (module PRs)

- **Lint:** `lint-check-php.yml`, `lint-check-spa.yml` (paths filter on `src/` and PHP).
- **E2E:** `brand-plugin-test-playwright.yml` — eight jobs (four brands × stable + develop).
- **Release:** Actions → **Newfold Prepare Release** → `module-branch: main-networksolutions`.

## Manual smoke (per brand)

1. Open onboarding (`page=nfd-onboarding`).
2. Confirm loader and header logo match brand slug.
3. Complete logo upload step (WP 7.1+ uses `media.id` — fix in **3.3.7**+).
4. Walk primary wizard path to completion or first external redirect defined in data.

## Backport from `main`

Only when the same file exists on 3.x and the fix is not v4-only. See [Backports from main](main-networksolutions-merge-plan.md#backports-from-main). **Never** add NS regional brands to `main`.

## Release

1. Prepare Release workflow (`module-branch: main-networksolutions`).
2. Merge prep PR; tag; confirm Satis.
3. Bump each host plugin’s `newfold-labs/wp-module-onboarding` (and data if needed).
4. Re-run or wait for host plugin CI.

## Related

- [release.md](release.md) — release lines
- [main-networksolutions-merge-plan.md](main-networksolutions-merge-plan.md) — branch ownership and Track A/B
- [track-a-phase0-inventory.md](track-a-phase0-inventory.md) — version snapshot
