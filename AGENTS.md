# Agent guidance – wp-module-onboarding

This file gives AI agents a quick orientation to the repo. For full detail, see the **docs/** directory.

## What this project is

- **wp-module-onboarding** – Next-generation WordPress onboarding for Newfold Digital sites. Registers with the Newfold Module Loader; uses onboarding-data, patterns, facebook, migration, Mustache, and wp-config-transformer. Maintained by Newfold Labs.

- **Stack:** PHP 7.3+. See docs/dependencies.md.

- **Architecture:** Registers with the loader; provides onboarding flow and templates. See docs/integration.md.

## Key paths

| Purpose | Location |
|---------|----------|
| Bootstrap | `bootstrap.php` |
| Includes | `includes/` |
| Tests | `tests/` |

## Essential commands

```bash
composer install
composer run lint
composer run fix
composer run test
```

## Documentation

- **Full documentation** is in **docs/**. Start with **docs/index.md**.
- **CLAUDE.md** is a symlink to this file (AGENTS.md).

---

## Keeping documentation current

When you change code, features, or workflows, update the docs. Keep **docs/index.md** current: when you add, remove, or rename doc files, update the table of contents (and quick links if present). When adding or changing dependencies, update **docs/dependencies.md**. When cutting a release, update **docs/changelog.md**.
