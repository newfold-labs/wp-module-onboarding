# Agent guidance – wp-module-onboarding

This file gives AI agents a quick orientation to the repo. For full detail, see the **docs/** directory.

## What this project is

- **wp-module-onboarding** (v4, `main`) – AI-driven WordPress onboarding for Newfold Digital (Bluehost) sites. A user writes a prompt, chats through intake, and the module generates and publishes a full site, then sends them to the Site Editor. Registers with the Newfold Module Loader. Maintained by Newfold Labs.

- **Stack:** PHP 7.4+ backend (REST API, admin page, services) and a React SPA built with `@wordpress/scripts`. WordPress 6.5+. See docs/dependencies.md.

- **Architecture:** `bootstrap.php` registers the module; `Application` boots REST/admin for admins; the SPA (`src/app/`) drives the prompt → chat → generate → publish flow against the AI platform and this module's `newfold-onboarding/v1` routes; `src/DesignStudio/` is a Site Editor sidebar plugin. See docs/architecture.md and docs/integration.md.

- **Branches:** `main` is v4; `v3` is the LTS line; `main-networksolutions` is the Network Solutions line.

## Key paths

| Purpose | Location |
|---------|----------|
| Bootstrap | `bootstrap.php` |
| PHP backend | `includes/` (`RestApi/`, `Services/`, `Data/`, `Compatibility/`) |
| Onboarding SPA | `src/app/` (entry `src/onboarding.js`) |
| Design Studio | `src/DesignStudio/` |
| Built assets | `build/<version>/` (version from `package.json` / `bootstrap.php`) |
| PHP tests | `tests/wpunit/`, `tests/phpunit/` |
| E2E tests | `tests/playwright/` |

## Essential commands

```bash
composer install && npm install
npm run start        # dev build
npm run build        # production build
composer run lint && composer run fix
npm run lint:js && npm run lint:js:fix
composer run test    # Codeception wpunit
npm run test:unit    # PHPUnit via wp-env
composer run i18n
```

Keep the version in sync in `package.json` and `bootstrap.php` (`NFD_ONBOARDING_VERSION`).

## Documentation

- **Full documentation** is in **docs/**. Start with **docs/index.md**.
- **CLAUDE.md** is a symlink to this file (AGENTS.md).

---

## Keeping documentation current

When you change code, features, or workflows, update the docs. Keep **docs/index.md** current: when you add, remove, or rename doc files, update the table of contents (and quick links if present). When adding or changing dependencies, update **docs/dependencies.md**. When adding or changing REST routes, update **docs/rest-api.md**; options or static data, **docs/data-and-options.md**; flow or layout, **docs/architecture.md**. Release notes live on GitHub releases (there is no `docs/changelog.md`).
