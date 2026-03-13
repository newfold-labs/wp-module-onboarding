# Getting started

## Prerequisites

- **PHP** 7.3+.
- **Composer.** The module requires mustache, wp-config-transformer, wp-module-onboarding-data, wp-module-patterns, wp-module-facebook, wp-module-migration, wp-forge/helpers.

## Install

```bash
composer install
```

## Run tests

```bash
composer run test
composer run test-coverage
```

## Lint

```bash
composer run lint
composer run fix
```

## Using in a host plugin

1. Depend on `newfold-labs/wp-module-onboarding` (and its dependencies).
2. The module registers with the loader. See [integration.md](integration.md).
