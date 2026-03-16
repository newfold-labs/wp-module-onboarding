# Release process

This module follows the standard Newfold release process using a reusable workflow.

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
