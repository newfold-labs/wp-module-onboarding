---
name: wp-module-onboarding
title: Getting started
description: Prerequisites, install, build, and run.
updated: 2026-10-13
---

# Getting started

## Prerequisites

- **PHP** 7.4+ (`composer.json` platform is 7.4; PHPCS checks code against PHP 7.4-compatible syntax, see `phpcs.xml`).
- **WordPress** 6.5+ (`Compatibility\Scan` puts the module in Safe Mode below this).
- **Composer**.
- **Node** >= 22.11 and **npm** >= 10.9 (see `engines` in `package.json`).

## Install

```bash
composer install
npm install
```

## Build the SPA

The module has two webpack entry groups, built with `wp-scripts`:

- `src/onboarding.js` – the onboarding app (outputs `onboarding.js` / `onboarding.css` + `.asset.php`).
- `src/DesignStudio/onboarding-design-studio.js` and `.css` – the Site Editor Design Studio plugin.

```bash
npm run start   # dev build with watch
npm run build   # production build
```

Output goes to `build/<package.json version>/` (e.g. `build/4.0.9/`). PHP loads it via `NFD_ONBOARDING_BUILD_DIR` / `NFD_ONBOARDING_BUILD_URL`, which are derived from `NFD_ONBOARDING_VERSION` in `bootstrap.php`. The version in `package.json` and `bootstrap.php` must therefore match, or the build folder will not be found.

The `@` import alias resolves to `src/app/` (see `webpack.config.js` and `jsconfig.json`).

## Run tests and lint

See [development.md](development.md).

## Using in a host plugin

1. Require `newfold-labs/wp-module-onboarding` (the host plugin must also provide the Newfold loader, data, and installer modules; see [dependencies.md](dependencies.md)).
2. The module registers itself with the loader. See [integration.md](integration.md).
3. To try it on a site that is not eligible by brand, load any wp-admin page with `?nfd_module_onboarding_activate=1` as an administrator. This is remembered for 30 days via a transient.
4. The app lives at `wp-admin/index.php?page=nfd-onboarding`.
