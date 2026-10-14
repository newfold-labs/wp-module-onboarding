---
name: wp-module-onboarding
title: Release process
description: Release lines, Prepare Release workflow, and version bump.
updated: 2026-10-13
---

# Release process

This module follows the standard Newfold release process using a reusable workflow (`newfold-labs/workflows` `reusable-module-prep-release.yml`).

## Release lines

| Branch | Line |
|--------|------|
| `main` | Current (**v4**). Default for new releases. |
| `v3` | v3 LTS. |
| `main-networksolutions` | v4 line for Network Solutions. |

Choose the line with the **module-branch** input when running the workflow.

## Build step required

The module has a frontend. The workflow runs the build (`npm run build`) and the build output is committed under `build/<version>/`. If releasing manually, run `npm install && npm run build`, verify `build/<new_version>/` exists, and remove the previous version's build folder.

## Hardcoded versions to bump

The workflow bumps versions in the files configured in `.github/workflows/newfold-prep-release.yml`:

- `package.json` (`version`, the `json-file` input)
- `bootstrap.php` (`NFD_ONBOARDING_VERSION`, the `php-file` input)

These must match because the build folder name is derived from them.

## Prepare release (recommended)

1. **Run the Newfold Prepare Release workflow**
   - In GitHub: **Actions** → **Newfold Prepare Release** → **Run workflow**.
   - Choose the **level**: `patch`, `minor`, or `major`.
   - Choose **module-branch**: `main`, `v3`, or `main-networksolutions`.
   - The workflow bumps the version, runs a fresh build, updates language files, and opens a pull request with the changes.

2. **Review and merge** the prep-release PR. Pull requests to `main`, `main-networksolutions`, and `v3` also run the Playwright suite inside the Bluehost plugin.

3. **Tag and publish** a GitHub release (tag = new version, title `Version <tag>`, generated notes). Publishing triggers `satis-update.yml`, which updates Newfold Satis. Confirm the tag appears on GitHub and Satis.

4. **Bump the brand plugin.** In the brand plugin (e.g. `bluehost-wordpress-plugin`), update `newfold-labs/wp-module-onboarding` in `composer.json` and `composer.lock` (`composer update newfold-labs/wp-module-onboarding`), open a PR, and confirm its tests pass. If tests fail, fix them in the module and re-release.

## Manual release (fallback)

Bump the version in `package.json` and `bootstrap.php`, run `npm install && npm run build`, run `composer run i18n`, then commit, tag, and release. Prefer the workflow for consistency.

## After each release

- Confirm the release notes on the GitHub release describe the changes. This repository does not keep a `docs/changelog.md`.
