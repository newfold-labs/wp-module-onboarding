---
name: wp-module-onboarding
title: Data and options
description: Options, runtime data, brands, plugin lists, events, and other static data in includes/Data.
updated: 2026-10-13
---

# Data and options

These classes live in `includes/Data/` under the namespace `NewfoldLabs\WP\Module\Onboarding\Data\`. They replaced the separate `wp-module-onboarding-data` package used by v3 (see the eager-load note in [integration.md](integration.md)).

## `Options`

Maps logical keys to WordPress option names, prefixed with `nfd_module_onboarding_` (use `Options::get_option_name( 'key' )`). Origin options use the `nfd_origin_` prefix (`Options::get_origin_option_name()`).

Notable keys:

| Key | Option suffix | Notes |
|-----|---------------|-------|
| `redirect` | `should_redirect` | `1` forces the login redirect, `0` disables it. |
| `activate` / `activate_param` | `activate` | Query param and transient that force-enable the module. |
| `status`, `start_time`, `completed_time` | same | Onboarding lifecycle (`started`, `completed`, `abandoned`). |
| `compatibility_results`, `core_update_referrer` | same | Safe Mode / compatibility. |
| `state_input`, `state_logogen`, `state_blueprints` | same | Persisted Redux slices. |
| `sitegen_site_id`, `sitegen_current_id`, `sitegen_previous_ids`, `sitegen_site_type`, `sitegen_enhanced_prompt`, `sitegen_discovery_data`, `sitegen_previews`, `sitegen_regenerated_homepages` | same | Sitegen state. |
| `cleared_onboarding` | same | Set once generated content has been cleared for this run. |
| `site_info` | same | Snapshot saved when onboarding completes. |
| `wc_*` | WooCommerce option names | Store address, currency, tax settings (registered with `show_in_rest`). |

Origin options: `nfd_origin_prompt`, `nfd_origin_prompt_completed`, `nfd_origin_chat_history`, `nfd_origin_chat_history_completed`. If present on load, the SPA starts directly in chat mode; `ResetService` clears them.

`Options::get_initialization_options()` provides defaults applied by `SettingsService::initialize()` (comment limits, auto-updates, `/%postname%/` permalinks).

## `Runtime`

`Runtime::get_data()` builds `window.nfdOnboarding.runtime`: `buildUrl`, `siteUrl`, `restUrl`, `adminUrl`, `status`, `pluginInstallHash`, `languages`, `currentUserDetails`, `isFreshInstallation`, `aiPlatformUrl`, `sentryInitDsnURL`, `currentBrand`. It also exposes helpers `is_fresh_installation()` and `coming_soon()` (both read container services).

## `Config`

- `wp-config.php` initialization constants (`AUTOSAVE_INTERVAL`, `WP_POST_REVISIONS`, ...), applied with `wp-config-transformer`.
- Site capability helpers backed by `wp-module-data` `SiteCapabilities`: `has_ai_sitegen()`, `can_migrate_site()`, `has_solution()`, `get_site_capability()`. Capability reads only work for admins during an onboarding request, a REST request, or in wp-admin.
- `is_onboarding_request()` checks the referer for `page=nfd-onboarding`.

## `Brands` and `Bluehost`

- `Bluehost` – eligible brands (`bluehost`, `bluehost-india`), the brand plugin dashboard URL (`admin.php?page=bluehost`), and dashboard redirect params (`referrer=nfd-onboarding`). Used for gating and exit redirects.
- `Brands` – per-brand display and config data (names, URLs, social links, `config` feature flags such as `enabled_flows`, `canMigrateSite`) for `bluehost`, `bluehost-india`, `webcom`, `crazy-domains`, `hostgator-br`, `hostgator-us`. Only the Bluehost brands are eligible for onboarding in v4; the others are retained data. The selected brand comes from `NFD_ONBOARDING_PLUGIN_BRAND`, falling back to `bluehost`, and `Brands::get_default_brand()` for unknown values.

## `Plugins`

Plugin install lists consumed by `PluginService` and the installer module:

- `default`: Endurance page cache, Jetpack, Icon Block, Yoast SEO, WPForms Lite, MonsterInsights, OptinMonster.
- `site-capabilities`: extra plugins gated by Hiive capability flags (e.g. `hasEcomdash` adds the Ecomdash plugin).
- `ecommerce`: WooCommerce for ecommerce sites, with optional per-brand extras. Retired YITH extended plugins are no longer installed.

`get_init()` merges these, honors capabilities, and de-duplicates by slug (keeping `activate: true`).

## `Events`

Allowlist of valid analytics `actions` and event categories (`wonder_start`, `experiment`). The events controller rejects anything not listed. When adding a new tracked action in the SPA, add it here and in `src/app/utils/analytics/hiive/constants.js`.

## `Languages`

Available WordPress translations (with an offline fallback of `en_US`, `es_ES`, `fr_FR`, `de_DE`) exposed to the SPA. Filter: `newfold/onboarding/filter/languages`.
