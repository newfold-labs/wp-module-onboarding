---
name: wp-module-onboarding
title: Release process
description: Release process and version bump.
updated: 2025-03-18
---

# Release process

This module follows the standard Newfold release process using a reusable workflow.

## Build step required

See `.github/workflows/newfold-prep-release.yml`: the workflow uses `json-file` and `php-file` inputs. If this module has a frontend (e.g. `package.json` has a `build` script), run `npm run build` before tagging; the workflow runs it automatically. Otherwise no build step is required.

## Hardcoded versions to bump

The workflow bumps the version in the files specified in `.github/workflows/newfold-prep-release.yml` (`json-file` and `php-file`—typically **bootstrap.php** for the PHP version constant (e.g. `NFD_*_MODULE_VERSION`) and **package.json** for the `version` field). If releasing manually, update those files, run any build and i18n commands, then tag and release.

## Prepare release (recommended)

1. **Run the Newfold Prepare Release workflow**
   - In GitHub: **Actions** → **Newfold Prepare Release** → **Run workflow**.
   - Choose the version **level**: `patch`, `minor`, or `major`.
   - The workflow will:
     - Bump the version to the chosen level (in the appropriate files, e.g. `composer.json`, plugin header, or `package.json`).
     - Run a fresh build if the module has frontend assets.
     - Update language files (i18n).
     - Open a pull request with the changes.

2. **Review and merge** the prep-release PR.

3. **Tag and publish** the release (e.g. create a GitHub release from the tag, or follow your team's process for Satis/packagist).

## Manual release (fallback)

If the workflow is unavailable, bump the version manually in the same places the workflow would (see `.github/workflows/newfold-prep-release.yml` inputs for `json-file` and `php-file`), run any build and i18n commands, then tag and release. Prefer using the workflow when possible for consistency.

## After each release

- Update **docs/changelog.md** with the changes in the release.
