---
name: wp-module-onboarding
title: Integration
description: How the module registers, gates itself, and integrates with the host plugin and other modules.
updated: 2026-10-13
---

# Integration

## How the module registers

`bootstrap.php` (autoloaded via Composer `files`):

1. Eager-loads `includes/Data/{Brands,Plugins,Languages,Options,Config,Runtime,Events,BrandConfig}.php`. Brand plugins may still pull in the legacy `wp-module-onboarding-data` package, which uses the same `NewfoldLabs\WP\Module\Onboarding\Data\` namespace; requiring our files first makes our classes win. Remove once brand plugins drop that dependency.
2. Hooks `nfd_wp_module_onboarding_register()` on `plugins_loaded`, which calls the loader's `register()` with `name => onboarding`, `isActive => true`, `isHidden => true`.
3. In the module callback it defines constants, runs the compatibility scan, then instantiates `Application`.
4. Calls `ModuleController::init()` and registers completion/cron hooks (below).

### Constants

| Constant | Meaning |
|----------|---------|
| `NFD_ONBOARDING_VERSION` | Module version. Selects the `build/<version>` folder. |
| `NFD_ONBOARDING_DIR` | Module directory. |
| `NFD_ONBOARDING_BUILD_DIR` / `NFD_ONBOARDING_BUILD_URL` | Built asset path/URL (URL assumes `vendor/newfold-labs/wp-module-onboarding` inside the host plugin). |
| `NFD_ONBOARDING_PLUGIN_URL`, `NFD_ONBOARDING_PLUGIN_DIRNAME` | Host plugin URL / folder name (used for language file loading). |
| `NFD_ONBOARDING_PLUGIN_BRAND` | Normalized brand slug from `Brands::set_current_brand( $container )` (e.g. `bluehost`, `hostgator-us`). |
| `NFD_ONBOARDING_BLUEHOST_BRAND` | Legacy: raw `$container->plugin()->brand` for backward compatibility. |
| `NFD_MODULE_DATA_EVENTS_API` | `/newfold-data/v1/events`, the data module events endpoint. |

## Multi-brand behavior

On registration the module calls `Brands::set_current_brand( $container )` (same pattern as `wp-module-help-center`). That defines `NFD_ONBOARDING_PLUGIN_BRAND` using the host plugin container (`plugin->brand`, with HostGator region suffixes when applicable).

`Data\BrandConfig` is the PHP entry point for the active brand slug and dashboard URLs. `Data\Runtime::current_brand()` merges the matching row from `Brands::get_brands()` and is exposed to the SPA as `window.nfdOnboarding.runtime.currentBrand` (name, url, `pluginDashboardPage`, migration links, and per-brand `config`).

The React shell uses `BrandLogo` to render the correct logo from `src/Brands/<asset-dir>/` and link to `currentBrand.url`. Do not hardcode a single host name in UI strings; use `currentBrand.name` or translated `sprintf` patterns.

## Gating: who gets onboarding

`ModuleController::module_switcher()` runs on `after_setup_theme` and activates or deactivates the module:

- Active if the `nfd_module_onboarding_activate` query param was passed by an admin (stored as a 30-day transient), or
- Active if the current brand slug exists in `Brands::get_brands()` (`BrandConfig::is_known_brand()`).

Otherwise the module is deactivated in the loader registry.

`Compatibility\Scan` / `Status` / `Safe_Mode`: if WordPress is older than 6.5 the scan result is `unsupported-wp`, and `Safe_Mode` replaces the app with a core-update screen. After a core update succeeds the stored result is reset and the user is sent back to onboarding.

## What `Application` wires up

Always: `PostTypeService` (registers `nfd_service` CPT and image meta), `ThumbnailService`, login redirect filters, compatibility reset on core update, and `WP_CLI` (currently an empty stub).

Only for authorized admins (`manage_options`, in wp-admin or REST): `RestApi`, `WP_Admin`, `ExternalRedirectInterceptor`. In wp-admin also `StatusService::track()` and `EventService::init()`.

Extension points fired: actions `nfd_module_onboarding_pre_init`, `nfd_module_onboarding_post_init`; filter `nfd_module_onboarding_should_redirect_disable` (disables the login redirect action).

## Login redirect

`LoginRedirect` filters `login_redirect` and `newfold_sso_success_url`. Admins are redirected to `index.php?page=nfd-onboarding` when:

- the `nfd_module_onboarding_should_redirect` option is `1` (set with `?nfd_module_onboarding_should_redirect=true`), or
- the option is unset, the site is a fresh installation (`isFreshInstallation` in the container), and Coming Soon mode is still on.

The option set to `0` (or `staging` `WP_ENVIRONMENT_TYPE`) disables redirecting.

## Admin page and assets

`WP_Admin` registers a hidden submenu page (`nfd-onboarding`, under the Dashboard parent), hides wp-admin chrome, and mounts `<div id="nfd-onboarding">`. On load it:

- optionally runs `PluginService::initialize()` when `?nfd_plugins=true`,
- installs/activates the default theme via `ThemeService` (exits to the brand dashboard on failure),
- ensures a sitegen site id (`ReduxStateService::ensure_sitegen_site_id()` calls the handshake route),
- enqueues the SPA and exposes `window.nfdOnboarding` (`runtime`, `sitegen`, `cleared_onboarding`, `origin.prompt`, `origin.chat_history`).

`WP_Admin::enqueue_site_editor_assets()` also enqueues the Design Studio bundle on `site-editor.php` when `referrer` is `nfd-onboarding` or `nfd-plugin`. Note that the publish step redirects to `site-editor.php?...&referrer=nfd-editor-chat`, which is not in that allowlist; `nfd-editor-chat` is handled outside this module.

`ExternalRedirectInterceptor` blocks `wp_redirect()` on the onboarding page unless the target is the brand plugin dashboard or carries `referrer=nfd-onboarding`.

## Other modules and services it talks to

- **Container services** (from the host/loader): `isFreshInstallation`, `comingSoon`, `cachePurger`, `survey`.
- **wp-module-data**: `SiteCapabilities` (`hasAISiteGen`, `canMigrateSite`, `hasSolution`, ...), `HiiveConnection` auth token for AI platform requests, events API.
- **wp-module-installer**: `PluginInstaller` (plugin install queue/hash) used by `PluginsController`, `PluginService`, and runtime data.
- **wp-module-patterns**: site classification and Wonder Blocks template transient filtering.
- **wp-module-survey**: toast survey created on completion (`AppService::complete()`).
- **AI platform** (`https://ai-platform.hiive.cloud` by default; override with `NFD_AI_PLATFORM_BASE_URL`; `NFD_AI_PLATFORM_SSL_VERIFY` toggles SSL verification): sitegen handshake/intake/generate (SSE) from the browser, plus logo generation via PHP.
- **Hiive patterns API** (`patterns.hiive.cloud`, sic; `NFD_DATA_WB_DEV_MODE` switches to a local dev host): color palettes and font pairs (`DesignController`, Design Studio font previews).

## Hooks fired on completion

`newfold/onboarding/started` and `newfold/onboarding/completed`. In `bootstrap.php`, `completed`:

- deletes the `nfd_site_capabilities` transient,
- schedules sideloading of generated-content images (`SiteGenImageService`).

Cron hooks: `nfd_process_image_sideload_queue`, `nfd_module_onboarding_sideload_pending_images`, and a daily `nfd_module_onboarding_daily_image_sync`.

See also [architecture.md](architecture.md), [rest-api.md](rest-api.md), and [dependencies.md](dependencies.md).
