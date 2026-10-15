---
name: wp-module-onboarding
title: Development
description: Lint, test, build, i18n, and workflow.
updated: 2026-10-13
---

# Development

## Linting

- **PHP:** `composer run lint`, `composer run fix` (uses `phpcs.xml`: Newfold standard, PHP 7.4- compatibility, WP 6.9+, text domain `wp-module-onboarding`).
- **JS:** `npm run lint:js`, `npm run lint:js:fix` (ESLint via `wp-scripts`, config in `eslint.config.js`), `npm run format`.
- CI runs PHP and SPA lint (`lint-check-php.yml`, `lint-check-spa.yml`) on pull requests.

## Testing

- **PHPUnit in wp-env:** `npm run test:unit` (runs `tests/phpunit` through `wp-env`; `.wp-env.json` sets the tests MySQL port 33306).
- **Codeception wpunit:** `composer run test`, `composer run test-coverage`. Tests are in `tests/wpunit/` and need `.env.testing` (copy `.env.testing.example`).
- **Playwright:** `tests/playwright/` holds the end-to-end smoke spec and helpers. The onboarding UI spec is currently `describe.skip`. In CI these run inside brand plugins through `brand-plugin-test-playwright.yml` (PRs to `main`, `main-networksolutions`, `v3`).

## Build

```bash
npm run start   # watch
npm run build   # production, outputs build/<version>/
```

Keep `package.json` and `bootstrap.php` versions in sync; the PHP side looks for `build/<NFD_ONBOARDING_VERSION>/`. Committed builds live in `build/`.

## i18n

`composer run i18n` regenerates the POT, updates PO files, and builds PHP and JSON translations (also split into `i18n-pot`, `i18n-po`, `i18n-php`, `i18n-json`). The `auto-translate.yml` workflow opens PRs for translation updates. JS strings use the `wp-module-onboarding` text domain and are loaded through `I18nService`.

## Local debugging tips

- Open `wp-admin/index.php?page=nfd-onboarding` as an admin. If the brand is not eligible, add `&nfd_module_onboarding_activate=1` once.
- Force or disable the login redirect with `?nfd_module_onboarding_should_redirect=true|false` on a login or SSO request.
- Point at a different AI platform with `NFD_AI_PLATFORM_BASE_URL` (and `NFD_AI_PLATFORM_SSL_VERIFY=false` for local certs); use `NFD_DATA_WB_DEV_MODE` to hit a local patterns API.
- In `NODE_ENV=development` the prompt view exposes a dev sitekit slug field that is passed to the generate call.
- Reset a site with `POST newfold-onboarding/v1/app/restart` (see [rest-api.md](rest-api.md)).

## Workflow

1. Make changes in `includes/`, `src/`, or `bootstrap.php`.
2. Run `composer run lint`, `npm run lint:js`, and the relevant tests before committing.
3. Rebuild with `npm run build` when frontend files change and commit the build output per the release process.
4. When changing dependencies, update [dependencies.md](dependencies.md). When changing routes, options, or flows, update [rest-api.md](rest-api.md), [data-and-options.md](data-and-options.md), or [architecture.md](architecture.md).
