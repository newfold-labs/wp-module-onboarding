# Pull request: Make onboarding brand-agnostic

Use this as the GitHub PR body (English).

## Summary

- Resolve the active brand from the module loader via `Brands::set_current_brand()` and `NFD_ONBOARDING_PLUGIN_BRAND`.
- Replace legacy `Data\Bluehost` with `Data\BrandConfig` for dashboard URLs and plugin lists.
- Enable the module for every brand defined in `Brands::get_brands()` (not only Bluehost slugs).
- Add `BrandLogo` in the SPA so the header uses `runtime.currentBrand` for name, URL, and artwork.

## Why

HostGator, Web.com, Crazy Domains, and other Newfold brand plugins must not ship Bluehost-only gating or UI.

## Test plan

- [ ] `composer run test` (wpunit) — includes `BrandConfigWPUnitTest` and updated redirect tests.
- [ ] `npm run build` — verify `build/<version>/onboarding.js` includes `BrandLogo`.
- [ ] On a Bluehost dev site: open `index.php?page=nfd-onboarding`, confirm logo/link and chat flow.
- [ ] (Optional) Symlink this module into a non-Bluehost brand plugin and confirm `ModuleController` activates when the brand slug exists in `Brands::get_brands()`.

## Docs

- [docs/integration.md](integration.md) — Multi-brand behavior and gating.
- [docs/overview.md](overview.md) — product scope updated.

## Breaking changes

- Removed `includes/Data/Bluehost.php`. Use `BrandConfig` and `Brands` instead.
- Onboarding module activation now follows the full `Brands::get_brands()` registry; confirm product intent for each brand before release.
