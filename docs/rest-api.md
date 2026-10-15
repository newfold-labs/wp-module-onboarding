---
name: wp-module-onboarding
title: REST API
description: Routes registered under newfold-onboarding/v1 and the core endpoints the SPA uses.
updated: 2026-10-15
---

# REST API

All custom routes use the namespace **`newfold-onboarding/v1`** and are registered by `includes/RestApi/RestApi.php` only for authorized admins (`manage_options`). Every route uses `Permissions::rest_is_authorized_admin` unless noted. In the SPA the REST base is `window.nfdOnboarding.runtime.restUrl` (the `index.php?rest_route=` form).

`EDITABLE` below means `POST`/`PUT`/`PATCH`; `CREATABLE` means `POST`.

Controllers registered in `RestApi.php`: `AppController`, `PluginsController`, `ReduxStateController`, `SettingsController`, `EventsController`, `DesignController`, `GlobalStylesController`, `SiteContentController`, `SiteGenAiController`.

## Routes

| Controller | Route | Methods | Purpose |
|------------|-------|---------|---------|
| `AppController` | `/app/start` | EDITABLE | `AppService::start()`: set status `started`, initialize settings and plugins (first run). |
| | `/app/complete` | EDITABLE | `AppService::complete()`: mark completed, purge caches, create survey toast. |
| | `/app/enable-jetpack-modules` | EDITABLE | Enable Jetpack Forms and Blocks modules. |
| | `/app/clear` | EDITABLE | Delete generated posts/terms; sets `cleared_onboarding`. |
| | `/app/restart` | EDITABLE | Full `ResetService::reset()`. |
| `SiteGenAiController` | `/sitegen/handshake` | CREATABLE | Proxies to the AI platform with the site domain; returns `site_id`. 502 on failure. |
| | `/sitegen/report-published` | CREATABLE | Reports the published site to the AI platform. |
| `PluginsController` | `/plugins/initialize` | CREATABLE | Queue the default plugin set. Permission: `PluginInstaller::check_install_permissions`. |
| | `/plugins/initialize-ecommerce` | CREATABLE | Queue ecommerce plugins (WooCommerce, brand extras). |
| | `/plugins/ensure-critical` | CREATABLE | Synchronous install/activation of critical plugins (Jetpack, Icon Block). |
| `SettingsController` | `/settings` | READABLE, EDITABLE | Read/update site and WooCommerce settings (see allowed options in the controller). |
| | `/settings/initialize` | EDITABLE | Apply initialization options (see `Data\Options`, `Data\Config`). |
| `GlobalStylesController` | `/global-styles/set-color-palette` | EDITABLE | Set theme palette in global styles. |
| | `/global-styles/install-fonts` | EDITABLE | Download font pair files and register font faces. |
| | `/global-styles/set-global-styles` | EDITABLE | Merge typography/styles into global styles. |
| `DesignController` | `/design/color-palettes` | READABLE | Paginated palettes from the Hiive patterns API (cached). Used by Design Studio. |
| | `/design/font-pairs` | READABLE | Paginated font pairs from the Hiive patterns API (cached). |
| `SiteContentController` | `/site-content/publish-products` | EDITABLE | Create WooCommerce products. |
| | `/site-content/publish-articles` | EDITABLE | Create blog posts. |
| | `/site-content/setup-nav-menu` | CREATABLE | Build the primary navigation via `SiteNavigationService`. |
| `ReduxStateController` | `/redux-state/sitegen-slice` | READABLE, EDITABLE | Read/update the `sitegen` Redux slice. GET reconstructs from `sitegen_*` options; POST writes `sitegen_site_id`, `sitegen_current_id`, `sitegen_previous_ids`, `sitegen_site_type`, `sitegen_enhanced_prompt`, `sitegen_discovery_data`. |
| `EventsController` | `/events` | CREATABLE | Send an analytics event to the data module (validated against `Data\Events`). |
| | `/events/batch` | CREATABLE | Send a batch of events. |

## Core WordPress endpoints used by the SPA

`src/app/utils/api/wordpress.js` calls `wp/v2` for settings, `media`, `pages`, `posts`, `nfd_service`, `navigation`, `templates`, and `template-parts`. Pages are created with the `page-no-title` template and `nfd_onboarding_generated` meta.

Module helpers in `src/app/utils/api/onboarding.js` call the routes above for app lifecycle, global styles, sitegen slice sync, navigation setup, and `sitegen/report-published`.

## AI platform (called from the browser)

Base URL from `runtime.aiPlatformUrl` (`https://ai-platform.hiive.cloud` unless `NFD_AI_PLATFORM_BASE_URL` is set):

- `POST /api/v1/sitegen/intake` – SSE stream for the chat intake.
- `POST /api/v1/sitegen/generate` – SSE stream for discovery and generation. Events include `sitegen_started`, `sitegen_discovery_*_completed`, `sitegen_discovery_completed`, and content generation item events.

Logos and site content in v4 come from generation data in those streams and are applied during publish (for example `generationData.site_logo` via the media API). Server-side AI platform calls from WordPress are limited to `sitegen/handshake` and `sitegen/report-published` (`SiteGenServiceRequest`), using the Hiive connection token.
