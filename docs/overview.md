---
name: wp-module-onboarding
title: Overview
description: What the module does, how v4 differs from v3, and who maintains it.
updated: 2026-10-13
---

# Overview

## What the module does

**wp-module-onboarding** (v4, current `main`) provides the AI-driven onboarding experience for Newfold host-brand WordPress sites (Bluehost, HostGator, Web.com, Crazy Domains, and other brands defined in `Data\Brands`). A user describes their site in a prompt; the module runs a short chat intake, then generates and publishes a complete site (identity, fonts, colors, logo, pages, header/footer, articles, services, products, navigation) and finally hands the user off to the Site Editor (see `wp-module-editor-chat` module).

The module is a Composer library loaded through the Newfold Module Loader. It ships:

- **PHP backend** (`includes/`): admin page, REST API, login redirect, compatibility gating, post types, image sideloading, reset/cleanup.
- **Onboarding SPA** (`src/app/`): React app mounted on `index.php?page=nfd-onboarding` (prompt, chat, publish, migration views).
- **Design Studio** (`src/DesignStudio/`): a Site Editor sidebar plugin (colors, typography, logo) bundled as a separate script.

## v4 vs v3

v4 replaced the multi-step wizard with a chat/sitegen flow. Anything described for v3 (React Router step flows such as `wp-setup`, `ecommerce`, `sitegen` flows, Wonder Blocks / YITH live previews, per-step Redux data, Facebook integration, and the standalone `wp-module-onboarding-data` package) no longer applies to `main`.

| Area | v3 | v4 (`main`) |
|------|----|-------------|
| UX | Multi-step wizard with several flows | Prompt → AI chat intake → discovery → generation → auto-publish |
| Frontend | React Router steps | Three modes in `useChat`: `prompt`, `chat`, `migration` (no router in the app shell) |
| Data layer | `wp-module-onboarding-data` package | In-module `includes/Data/*` classes (same `Onboarding\Data\` namespace) |
| Brands | Many brand plugins | Enabled for every slug in `Brands::get_brands()` when the host plugin loads the module |
| Composer deps | onboarding-data, facebook, patterns, migration | patterns, migration, install-checker, survey (see [dependencies.md](dependencies.md)) |
| Release lines | single | `main` (v4), `v3` (LTS), `main-networksolutions` |

The `v3` branch still exists as an LTS line. Docs on `main` describe v4 only.

## Who maintains it

- **Newfold Labs** (Newfold Digital). Distributed via Newfold Satis.
