---
title: Roo Code
---

# Roo Code

!!! warning "Experimental"
    Roo Code support is experimental. See [Platform Overview](index.md#platform-maturity) for what this means.

Roo Code (formerly Roo Cline) is a highly flexible VS Code extension that supports Custom Instructions and native MCP integration.

## Configuration

**Instructions:** `.clinerules` — generated from the core Lore instructions, static banner, and project rules.

## Features

- **Passive Enforcement:** The `.clinerules` file includes Lore's standard guardrails for Ambiguity Scanning and Search Discipline.
- **MCP Tools:** Roo Code can natively connect to Lore's `lore-server.js` to provide `lore_check_in` and `lore_context` tools.

## Setup

The `.clinerules` file is automatically generated when you run the platform sync script (`/lore-update` or `sync-harness.sh`).
