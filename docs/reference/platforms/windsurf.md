---
title: Windsurf
---

# Windsurf

!!! warning "Experimental"
    Windsurf support is experimental. See [Platform Overview](index.md#platform-maturity) for what this means.

Windsurf is a "High-Trust" integration that relies on its powerful "Cascade" engine and a single global rule file.

## Configuration

**Instructions:** `.windsurfrules` — generated from the core Lore instructions, static banner, and project rules.

## Passive Enforcement Rules

Because Windsurf currently lacks active lifecycle hooks (like `BeforeTool`), the `.windsurfrules` file includes embedded guardrails:

- **Ambiguity Guard:** Commands the agent to scan for vague terms (like "large files") and ask for concrete bounds before acting.
- **Search Discipline:** Enforces the "Semantic -> Glob -> Grep" strategy to prevent Cascade from needlessly reading the entire codebase when answers exist in the Knowledge Base.

## Setup

The `.windsurfrules` file is automatically generated when you run the platform sync script (`/lore-update` or `sync-harness.sh`).
