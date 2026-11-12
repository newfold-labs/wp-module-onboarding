---
name: wp-module-onboarding
title: main-networksolutions release line
description: Branch ownership, comparison with main, maintenance, backports, and checklists for NS and regional host brands.
updated: 2026-11-04
---

# `main` vs `main-networksolutions`

Single reference for how the **Network Solutions and regional brands release line** relates to **`main`**, what changed on each branch, and how to work without cross-contaminating the two lines.

Analysis baseline: **2026-11-04**, merge base `bd901d8e`.

---

## Branch ownership (read this first)

| Branch | Owns | Do **not** put here |
|--------|------|---------------------|
| **`main`** | v4 onboarding for **Bluehost-line** host plugins (Bluehost, HostGator, Crazy Domains, Web.com/`webcom` as already defined on `main`, etc.) | **NS/regional brand work**: BigRock, Vodien, WebHostBox, Netsol-specific CI, `+ns` onboarding-data coupling, wizard-only NS UX |
| **`main-networksolutions`** | **All** onboarding changes for Network Solutions, BigRock, Vodien, WebHostBox, and related NS/regional brands—SPA assets, `BrandLogo` / `BrandLoader`, Playwright matrix against `wp-plugin-web` / `-bigrock` / `-vodien` / `-webhostbox`, composer pin to **`wp-module-onboarding-data` `+ns`**, 3.x wizard line (today **3.3.7**) | Bluehost-only v4 features meant only for `main`; wholesale merges from `main` without a dedicated upgrade plan |

**`wp-module-onboarding-data`:** brand registry rows for NS/regional slugs live on that repo’s **`main-networksolutions`** branch (Satis **`+ns`**), not on onboarding-data **`main`**.

**Direction of work:**

- **NS / regional product changes → `main-networksolutions`** (module + onboarding-data NS branch + host plugins).
- **Optional fixes from `main` → `main-networksolutions`** only via **targeted cherry-picks** when the same file/behavior exists on the NS line (see [Backports from `main`](#backports-from-main)).
- **Do not** open PRs on **`main`** to add BigRock, Vodien, WebHostBox, or Netsol-specific brand data, assets, or Playwright jobs—those belong on **`main-networksolutions`**.

---

## Executive summary

| Item | `main` | `main-networksolutions` |
|------|--------|-------------------------|
| Module version | **4.0.10** | **3.3.7** |
| Architecture | v4 chat / sitegen SPA | v3 multi-step wizard |
| Brand data | In-module `includes/Data/*` | External `wp-module-onboarding-data` **`^1.2.27+ns`** |
| Commits since merge base | **462** ahead of NS line | **59** ahead of `main` |
| Changed paths vs merge base | ~**400** files vs NS | ~**51** files vs `main` |

These are **separate release lines** (see [release.md](release.md)). A straight `git merge main` into `main-networksolutions` would import the entire **v4 rewrite** (wizard removed, onboarding-data removed, new REST and UX). That is a ** deliberate upgrade project on the NS branch**, not routine sync.

**Operating model:**

1. **Maintain NS/regional brands on `main-networksolutions`** (and onboarding-data `main-networksolutions`).
2. **Keep `main` for Bluehost-line v4** without NS-specific commits.
3. **Cherry-pick sparingly** from `main` onto `main-networksolutions` only when a fix still applies to 3.x shared code.
4. **Never** bulk-merge `main` without NS QA across all four brand plugins.

---

## Three-repo stack (NS line)

| Repo | Branch | Role |
|------|--------|------|
| `wp-module-onboarding` | **`main-networksolutions`** | Wizard SPA, `build/3.3.x/`, NS SVGs, logo upload fix, NS Playwright workflows |
| `wp-module-onboarding-data` | **`main-networksolutions`** (+ Satis **`+ns`**) | PHP brand registry (`web`, `bigrock-in`, `vodien`, `webhostbox`, …), flows, plugin lists |
| `wp-plugin-web`, `wp-plugin-bigrock`, `wp-plugin-vodien`, `wp-plugin-webhostbox` | release / `develop` | Composer pins to module + data; capabilities; runtime brand slug |

Module JS supplies **logos/loaders**; URLs, dashboard pages, and feature flags for 3.x come from **onboarding-data NS branch**.

### Brand slug map

| Host | Runtime slug (typical) | onboarding-data key (`main-networksolutions`) | Module SVG folder |
|------|------------------------|-----------------------------------------------|-------------------|
| Network Solutions / Web.com | `web` / `webcom` | **`web`** (NS data uses `web`, not `webcom`) | `networksolutions/` |
| BigRock India | `bigrock-in` | `bigrock-in` | `bigrock/` |
| Vodien | `vodien` | `vodien` | `vodien/` |
| WebHostBox | `webhostbox` | `webhostbox` | `webhostbox/` |

Verify each host plugin’s `NewfoldRuntime.plugin.brand` against the data row key before changing copy or redirects.

---

## What lives only on `main-networksolutions`

### 1. Regional / NS host brands (module SPA)

| Brand | Assets | Wired in |
|-------|--------|----------|
| **bigrock** (`bigrock-in`) | `src/Brands/bigrock/*` | `BrandLogo.js`, `BrandLoader.js` |
| **vodien** | `src/Brands/vodien/*` | same |
| **webhostbox** | `src/Brands/webhostbox/*` | same |
| **Network Solutions** | `src/Brands/networksolutions/*` | same (also present on `main` for `webcom` / networksolutions mapping) |

On **`main`**, v4 uses `brandAssets.js` for Bluehost-line brands only—**no** BigRock, Vodien, or WebHostBox. That is intentional; add those **only** on **`main-networksolutions`**.

### 2. Composer / data package

```json
"newfold-labs/wp-module-onboarding-data": "^1.2.27+ns"
```

`main` removed onboarding-data entirely. The NS line **keeps** the `+ns` package on **`main-networksolutions`**.

### 3. Logo upload fix (3.x wizard)

Commit **`f9ee79fdf`**: `LogoUploadInput.js` completes on **`media.id`** (WordPress 7.1+ client-side media). Included in **3.3.7** on the NS branch. The v3 Logo step does not exist on `main`; this fix is NS-line maintenance only.

### 4. CI / GitHub Actions (NS-only)

| Workflow | Behavior on `main-networksolutions` |
|----------|--------------------------------------|
| `brand-plugin-test-playwright.yml` | **netsol**, **bigrock**, **vodien**, **webhostbox** (+ dev) vs `wp-plugin-*` |
| `newfold-prep-release.yml` | `module-branch: main-networksolutions` |
| `lint-check-*.yml`, `i18n-crowdin-download.yml` | Triggers / defaults for **main-networksolutions** |
| `codecoverage-main.yml` | **Disabled** for NS 3.x (see file header) |
| `auto-translate.yml` | NS branch target |

On **`main`**, Playwright focuses on **Bluehost** (and Bluehost-line brands)—**not** a substitute for NS jobs; NS jobs stay on **`main-networksolutions`**.

### 5. Playwright helpers / specs (3.x)

- `tests/playwright/helpers/index.mjs` — plugin root resolution, NS brand fixtures.
- `tests/playwright/specs/onboarding.spec.mjs` — wizard steps (e.g. “Welcome to WordPress”), timeouts (**`a714c0ccd`**, etc.).

All NS onboarding E2E changes belong on this branch.

### 6. Build artifacts

NS ships **`build/3.3.7/`** (then **3.3.8+**). `main` ships **`build/4.0.x/`**. Never mix version folders across branches.

---

## What `main` has that the NS line lacks

The **462** commits on `main` are mostly **v4 product** for Bluehost-line plugins:

- Chat / sitegen UX; removed wizard, Blueprints, LogoGen, Facebook module, many v3 REST routes.
- In-module `includes/Data/*` instead of onboarding-data.
- Sitegen fixes in **4.0.1–4.0.10** (fonts, nav, regeneration, etc.) on **v4-only** code paths.

**For `main-networksolutions`:** treat these as **not applicable** unless you explicitly upgrade the NS branch to v4 (separate program). Do not copy v4 brand rows onto `main` for NS slugs—keep them on the NS line (data repo + NS module branch).

### Dependency contrast

| Package | `main-networksolutions` | `main` |
|---------|-------------------------|--------|
| `wp-module-onboarding-data` | **Required** `^1.2.27+ns` | Removed |
| `wp-module-facebook` | Required | Removed |
| `wp-module-patterns` | `^2.10.3` | `^2.14.1` |
| `wp-module-migration` | `^1.7.1` | `^1.8.1` |
| `wp-module-install-checker`, `wp-module-survey` | — | Added |

Do not align NS `composer.json` with `main` without a full NS upgrade and regression plan on **`main-networksolutions`**.

---

## Maintaining `main-networksolutions` (3.3.x)

### Release rhythm

1. **Module** — Prepare Release, `module-branch: main-networksolutions` → **3.3.x**, commit `build/3.3.x/`.
2. **Onboarding-data** — Release **`1.2.x+ns`** when brand config changes; bump module constraint.
3. **Host plugins** — `composer update`; green Playwright matrix on module PRs.

### Backports from `main`

Cherry-pick **per commit**, not per release tag:

```text
1. Does the file path exist on main-networksolutions?
2. Is the code structure the same (not removed in v4-only refactor)?
3. Does the NS wizard still use this behavior?
4. NS Playwright + manual smoke per brand after pick?
```

Only **~39** files under `includes/` exist on both branches; most `main` fixes touch v4-only paths.

| Category | Backport to NS line? |
|----------|----------------------|
| v4 sitegen / chat / publish | **No** |
| v4 `includes/Data/*` / editor-chat container | **No** |
| GitHub Actions permissions / timeouts | **Yes**, keep NS Playwright jobs |
| Playwright `PLUGIN_DIR` / plugin root fixes | **Maybe**, if same helper file |
| npm `@wordpress/*` majors | **Careful** — full 3.x build + matrix test |
| NS brand assets / data | **Never from `main`** — edit NS branches only |

**Already on NS (do not re-port from `main`):** logo upload fix **`f9ee79fdf`**, regional SVGs, data **`1.2.27+ns`**.

### Maintenance backlog

| Priority | Work |
|----------|------|
| P0 | Playwright matrix green on PRs to **`main-networksolutions`** |
| P0 | Brand changes in **onboarding-data `main-networksolutions`**, then module constraint bump |
| P1 | Workflow hardening cherry-picked from `main` **without** dropping NS jobs |
| P1 | Document pinned module + data versions in each host plugin |
| P2 | **3.3.8+** patch releases for wizard-only fixes on NS branch |
| P3 | Optional v3 NS runbook section in docs (wizard + onboarding-data) |

### Avoid

- Merging **`main`** wholesale into **`main-networksolutions`**.
- Adding NS brands or NS Playwright jobs on **`main`**.
- Changing brand URLs only in module JS (3.x source of truth is **onboarding-data NS**).
- Enabling NS codecoverage without a separate Codecov project.

---

## Future: v4 for NS brands (still on `main-networksolutions`, not `main`)

If product later wants v4 UX for Netsol / BigRock / Vodien / WebHostBox, that upgrade is a **project on the NS branch** (and NS host plugins), for example:

- Rebase or merge **`main`** into **`main-networksolutions`** once, resolve conflicts, **re-apply** NS brand assets, onboarding-data migration (or inline NS rows only on NS branch), and NS Playwright (rewritten for v4 flows).
- Publish Satis from **`main-networksolutions`** (or a tagged NS v4 line)—**not** by adding NS to **`main`**.

Until that project is approved, NS plugins stay on **3.3.x** from **`main-networksolutions`**.

| Topic | 3.3.x NS today | If NS branch adopts v4 |
|-------|----------------|-------------------------|
| UX | Wizard | Chat / publish (from `main` codebase) |
| Data | onboarding-data `+ns` | Plan data migration on **NS branch only** |
| Tests | Step-based Playwright | Rewrite specs on **NS branch** |
| Facebook / Blueprints | Present on NS composer tree | Product decision before upgrade |

---

## Merge conflict hotspots (if upgrading NS branch to v4)

Expect heavy conflicts in:

- `.github/workflows/*`
- `bootstrap.php`
- `composer.json` / lockfiles
- `src/app/components/BrandLoader/BrandLoader.js` (NS) vs v4 shell
- Most of `includes/` and `src/app/`

---

## Checklists

### NS brand or config change (default path)

- [ ] **`wp-module-onboarding-data`** `main-networksolutions` — `includes/Brands.php` (and related)
- [ ] **`wp-module-onboarding`** `main-networksolutions` — SVGs, `BrandLogo` / `BrandLoader`, build, languages if needed
- [ ] Bump **`^1.2.x+ns`** in module `composer.json` when data releases
- [ ] Host plugin composer update + manual + Playwright matrix

### Optional cherry-pick from `main` → `main-networksolutions`

- [ ] Audit commit against [Backports](#backports-from-main) rules
- [ ] PR to **`main-networksolutions`** only
- [ ] All NS Playwright jobs pass

### Do not do

- [ ] NS/regional brand PRs to **`main`**
- [ ] NS Playwright jobs only on **`main`** (keep on **`main-networksolutions`**)

---

## Verification

**On `main-networksolutions`:**

1. `composer install` && `npm ci` && `npm run build` → `build/3.3.x/`.
2. PHP + SPA lint workflows.
3. Playwright: netsol, bigrock, vodien, webhostbox (stable + dev).
4. Manual: logo upload; loader/header per brand slug.

**On `main`:** Bluehost-line v4 smoke only—**not** a gate for NS regional releases.

---

## Reference commands

```bash
git fetch origin main main-networksolutions
git rev-list --count main-networksolutions..main
git rev-list --count main..main-networksolutions
git diff --stat main...main-networksolutions
git diff --stat main-networksolutions...main
git log --oneline main..main-networksolutions --no-merges
```

---

## Related docs

- [release.md](release.md) — release lines and Prepare Release `module-branch`
- [overview.md](overview.md) — v4 vs v3 (v4 sections describe **`main`** only)
- [dependencies.md](dependencies.md) — **`main`** Composer/npm graph
