---
name: wp-module-onboarding
title: Integration
description: How the module registers and integrates.
updated: 2025-03-18
---

# Integration

## How the module registers

The module registers with the Newfold Module Loader via bootstrap.php. It depends on wp-module-onboarding-data for data interface, wp-module-patterns for content, wp-module-facebook and wp-module-migration for optional flows, and Mustache for templating. The host plugin typically registers an onboarding service and renders the onboarding UI.

## Dependencies

See [dependencies.md](dependencies.md).
