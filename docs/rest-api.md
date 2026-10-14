---
name: wp-module-onboarding
title: REST API
description: Routes registered under newfold-onboarding/v1 and the core endpoints the SPA uses.
updated: 2026-10-13
---

# REST API

All custom routes use the namespace **`newfold-onboarding/v1`** and are registered by `includes/RestApi/RestApi.php` only for authorized admins (`manage_options`). Every route uses `Permissions::rest_is_authorized_admin` unless noted. In the SPA the REST base is `window.nfdOnboarding.runtime.restUrl` (the `index.php?rest_route=` form).

`EDITABLE` below means `POST`/`PUT`/`PATCH`; `CREATABLE` means `POST`.

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
| `ReduxStateController` | `/redux-state/input-slice` | READABLE, EDITABLE | Persist the `input` slice. |
| | `/redux-state/sitegen-slice` | READABLE, EDITABLE | Persist the `sitegen` slice. |
| | `/redux-state/logogen-slice` | READABLE, EDITABLE | Persist the `logogen` slice. |
| | `/redux-state/blueprints-slice` | READABLE, EDITABLE | Persist the `blueprints` slice. |
| `EventsController` | `/events` | CREATABLE | Send an analytics event to the data module (validated against `Data\Events`). |
| | `/events/batch` | CREATABLE | Send a batch of events. |
| `LogoGenController` | `/logogen/generate`, `/generate/status`, `/generate/more`, `/generate/select` | CREATABLE | Logo generation via the AI image service (`LogoGenerationService`). |
| `BlueprintsController` | `/blueprints/get-blueprints`, `/install-required-plugins`, `/import-blueprint` | CREATABLE | Blueprint listing, plugin install, and import. |

The logo generation and blueprint routes (and their JS helpers in `src/app/utils/api/onboarding.js`) remain in the codebase. The current v4 app shell does not drive them; the logo comes from AI platform generation data (`generationData.site_logo`). Confirm usage before removing.

## Core WordPress endpoints used by the SPA

`src/app/utils/api/wordpress.js` calls `wp/v2` for settings, `media`, `pages`, `posts`, `nfd_service`, `navigation`, `templates`, and `template-parts`. Pages are created with the `page-no-title` template and `nfd_onboarding_generated` meta.

## AI platform (called from the browser)

Base URL from `runtime.aiPlatformUrl` (`https://ai-platform.hiive.cloud` unless `NFD_AI_PLATFORM_BASE_URL` is set):

- `POST /api/v1/sitegen/intake` – SSE stream for the chat intake.
- `POST /api/v1/sitegen/generate` – SSE stream for discovery and generation. Events include `sitegen_started`, `sitegen_discovery_*_completed`, `sitegen_discovery_completed`, and content generation item events.

Server-side requests (`handshake`, logo generation) authenticate with the Hiive connection token.
