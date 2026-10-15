---
name: wp-module-onboarding
title: Architecture
description: v4 end-to-end flow, PHP layout, frontend layout, and state.
updated: 2026-10-15
---

# Architecture

## End-to-end flow

1. **Entry.** An admin logs in and `LoginRedirect` sends them to `index.php?page=nfd-onboarding` (see [integration.md](integration.md)). `WP_Admin` mounts the SPA.
2. **Start.** The SPA calls `POST app/start`. `AppService::start()` marks status `started` (first run only), initializes settings, and queues the default plugin set.
3. **Prompt / migration.** `PromptView` collects a site description. `MigrationView` is offered when the site capability `canMigrateSite` is true (or a migration fallback URL exists).
4. **Handshake + intake.** Browser calls `POST sitegen/handshake` (WordPress proxies to the AI platform and returns a `site_id`), then streams `intake` (SSE) from the AI platform for a short chat. The chat input is only enabled when the agent asks a question.
5. **Discovery + generation.** `useChat.runStream()` streams `generate` (SSE). Discovery tasks: prompt enhance, site type, keywords, brand identity. Generation tasks: sitekit selection, colors, fonts, logo, sitemap, site content, post types. On `sitegen_started` the app calls `app/clear` once to remove prior generated content. If the site type is `eCommerce`, `plugins/initialize-ecommerce` is called. Critical plugins (Jetpack, Icon Block) are ensured in the background via `plugins/ensure-critical`.
6. **Publish.** `usePublish` runs `STEP_RUNNERS` in order: `identity`, `fonts`, `global_styles`, `colors`, `logo`, `pages`, `template_parts`, `articles`, `services`, `products`, `navigation`, `finalize`. Steps mostly call core `wp/v2` endpoints plus the module's REST routes. `finalize` calls `POST app/complete` and `sitegen/report-published`.
7. **Complete.** `AppService::complete()` sets status `completed`, purges caches, and creates the satisfaction survey toast. The `newfold/onboarding/completed` action triggers image sideloading. The user is redirected to the Site Editor.
8. **Design Studio.** In the Site Editor, `onboarding-design-studio.js` registers the `nfd-design-studio` plugin (colors, typography, logo screens) when the referrer allowlist matches.

Restart/reset: `POST app/restart` runs `ResetService::reset()` (deletes generated posts/terms/fonts, resets identity, header/footer, global styles, onboarding options, cron, origin prompt, purges caches). `POST app/clear` only deletes generated posts and terms.

## PHP layout (`includes/`)

| Path | Purpose |
|------|---------|
| `Application.php` | Wires hooks and conditionally boots the REST API and admin. |
| `ModuleController.php` | Enables/disables the module by brand or activation param. |
| `WP_Admin.php` | Admin page, asset registration, `window.nfdOnboarding`, Design Studio enqueue. |
| `LoginRedirect.php`, `ExternalRedirectInterceptor.php`, `Permissions.php` | Redirects and capability helpers. |
| `Compatibility/` | `Scan`, `Status`, `Safe_Mode` (min WP 6.5). |
| `Data/` | Static data: `Options`, `Runtime`, `Config`, `Brands`, `Bluehost`, `Plugins`, `Events`, `Languages`. See [data-and-options.md](data-and-options.md). |
| `RestApi/` | Controllers registered by `RestApi.php`. See [rest-api.md](rest-api.md). |
| `Services/` | Business logic (app/status/reset, plugins, theme, settings, global styles, navigation, media, thumbnails, post types, redux state, events, i18n). |
| `Services/Ai/` | AI platform HTTP clients: `SiteGenServiceRequest` (handshake, report published), `AiServiceRequest` (shared base). |
| `Services/SiteTypes/` | `CommonSiteTypeService`, `BlogSiteTypeService`, `EcommerceSiteTypeService` (articles, categories, WooCommerce setup). |
| `TaskManagers/`, `Tasks/` | Image sideload queue (`ImageSideloadTaskManager`, `ImageSideloadTask`). |
| `Types/` | Value objects: `Color`, `ColorPalette`. |
| `Templates/loading-screen.php` | Loading markup rendered inside the mount node. |
| `WP_CLI.php` | Placeholder; no commands registered. |

### Generated-content conventions

- Custom post type `nfd_service` (slug `services`) is registered for all users (`PostTypeService`).
- Content created by onboarding carries post meta `nfd_onboarding_generated`; image URLs not yet in the media library are kept in `nfd_image_url` and rendered by `ThumbnailService` until sideloaded by `MediaService` / `SiteGenImageService` cron jobs.
- `ResetService` uses these markers to delete only generated content.

## Frontend layout (`src/`)

| Path | Purpose |
|------|---------|
| `src/onboarding.js` | Entry: initializes Sentry, Hiive analytics, PostHog, registers core blocks, renders `App` into `#nfd-onboarding`. |
| `src/app/index.js` | `App` shell: switches views by `useChat().mode`. |
| `src/app/views/` | `PromptView`, `ChatView`, `MigrationView`. |
| `src/app/hooks/` | `useChat` (intake → discovery → generation), `usePublish` + `hooks/publish/{steps,tasks}.js`, `useMessages`, `useTypewriter`, `hooks/chat/tasks.js`. |
| `src/app/components/` | Chat, prompt, and progress UI. |
| `src/app/data/store/` | `@wordpress/data` store `newfold/onboarding` with slices `runtime` and `sitegen`. The `sitegen` slice syncs to WordPress via `POST redux-state/sitegen-slice` (`dbSyncService` in `slices/sitegen.js`). Initial slice data is hydrated from `window.nfdOnboarding.sitegen` on load. |
| `src/app/utils/api/` | `ai-platform.js` (handshake, intake, generate, SSE reader), `onboarding.js`, `wordpress.js`, `wp.js`, `migration.js`. |
| `src/app/utils/analytics/hiive/` | Hiive event wrapper; actions must be present in `Data\Events::$valid_actions`. |
| `src/DesignStudio/` | Site Editor sidebar plugin: `components/Screens/*`, `hooks/*`, `utils/*`. |
| `src/Brands/` | Brand assets (logos, icons). The v4 shell hardcodes the Bluehost logo. |

Styling: Tailwind (`tailwind.config.js`, `nfd-` class prefix) plus SCSS in `src/app/styles/`. UI primitives come from `@newfold/ui-component-library`, `@wordpress/components`, `motion`, and `lucide-react`.

Telemetry: Sentry (DSN provided from `Runtime::get_data()`), Hiive analytics events posted to `events` / `events/batch`, and PostHog.

## State persisted in WordPress

The SPA `sitegen` slice is stored as dedicated options (`sitegen_site_id`, `sitegen_current_id`, `sitegen_previous_ids`, `sitegen_site_type`, `sitegen_enhanced_prompt`, `sitegen_discovery_data`), not a single monolithic `state_sitegen` blob. `ReduxStateService::get( 'sitegen' )` reconstructs the slice for `WP_Admin` and the GET `redux-state/sitegen-slice` route.

Onboarding lifecycle uses `nfd_module_onboarding_status`, `start_time`, and `completed_time`. Origin prompt/chat options (`nfd_origin_*`) control resume-in-chat behavior. See [data-and-options.md](data-and-options.md).

Legacy wizard options (`flow`, `flow_preset`, `theme_settings`) may still exist on older sites; the v4 SPA does not read them. `ResetService` can clear options matching the `nfd_module_onboarding_` prefix when onboarding is reset.
