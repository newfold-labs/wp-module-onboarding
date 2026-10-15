---
name: wp-module-onboarding
title: Dependencies
description: Composer and npm dependencies.
updated: 2026-10-13
---

# Dependencies

## Composer runtime (`require`)

| Package | Purpose |
|---------|---------|
| **mustache/mustache** | Template rendering. |
| **wp-cli/wp-config-transformer** | `wp-config.php` edits (`Data\Config` constants). |
| **newfold-labs/wp-module-patterns** | Site classification and Wonder Blocks pattern utilities. |
| **newfold-labs/wp-module-migration** | Migration flow (`MigrationView` / migration REST). |
| **newfold-labs/wp-module-install-checker** | Fresh-installation detection. |
| **newfold-labs/wp-module-survey** | Completion toast survey. |
| **wp-forge/helpers** | Helper utilities. |

Removed since v3: `newfold-labs/wp-module-onboarding-data` (now in-module under `includes/Data/`) and `newfold-labs/wp-module-facebook`.

## Provided by the host plugin / transitively

The code also uses classes and container services that are not direct `require` entries. They arrive through the brand plugin and the transitive dependencies in `composer.lock`:

- **newfold-labs/wp-module-loader** and **container**: registration and `Container`.
- **newfold-labs/wp-module-data**: `SiteCapabilities`, `HiiveConnection`, events API.
- **newfold-labs/wp-module-installer**: `PluginInstaller`, plugin data and install queue.
- **newfold-labs/wp-module-features**, **wp-module-context**, **wp-module-pls**: transitive.
- Container services referenced: `isFreshInstallation`, `comingSoon`, `cachePurger`, `survey`.

## Related modules (not dependencies)

- **newfold-labs/wp-module-editor-chat**: not a Composer or code dependency. After onboarding completes, the publish step redirects the user to the Site Editor with `referrer=nfd-editor-chat`, where the editor chat takes over. The two modules are independent and share only that redirect contract, so changing the redirect URL or referrer value in `src/app/components/progress/PublishProgress.jsx` requires a matching change in the editor chat module.

## Composer dev (`require-dev`)

- **newfold-labs/wp-php-standards** – PHPCS ruleset (`phpcs.xml`).
- **johnpbloch/wordpress**, **wp-phpunit/wp-phpunit**, **yoast/phpunit-polyfills** – WordPress core and PHPUnit for tests.
- **lucatume/wp-browser**, **phpunit/phpcov** – Codeception `wpunit` suite and coverage.
- **wp-cli/i18n-command** – i18n tooling.

## npm

Key runtime packages (bundled into the SPA):

- **React / WordPress**: `@wordpress/element`, `data`, `api-fetch`, `i18n`, `url`, `blocks`, `block-library`, `interface`, `dom-ready`, plus editor packages used by the Design Studio and SPA: `components`, `block-editor`, `core-data`, `editor`, `plugins`, `blob`. Install with `npm install --legacy-peer-deps` (eslint 10 peer conflicts with some WordPress lint plugins).
- **UI**: `@newfold/ui-component-library`, `lucide-react`, `motion`, `canvas-confetti`.
- **Telemetry**: `@newfold/js-utility-ui-analytics` (Hiive events), `@sentry/react`, `posthog-js`.

Dev: `@wordpress/scripts`, `@wordpress/env`, `tailwindcss`, `eslint`, `eslint-import-resolver-alias`, `webpack-merge`.

When adding or bumping dependencies, update this file.
