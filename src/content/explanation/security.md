---
title: "Security"
---

# Security

The harness enforces security through multiple layers: write-time guards, prompt-level reminders, and structural protections.

## Guard Hooks

Two hook-based guards protect the environment:

### Harness Guard
Fires before writes to the global directory (`~/.lore/`). Prevents agents from modifying shared knowledge, rules, skills, or agents without operator approval.

### Protect Memory
Fires before access to `MEMORY.md`. Redirects agents to `.lore/memory.local.md` (the gitignored session scratchpad) and prevents overwriting curated knowledge without going through the capture workflow.

## Prompt-Level Security

The prompt preamble includes a security reminder on every message: reference secrets by name, never embed values. See [Hooks](hooks.md) for the full color system and tag reference.

## Sidecar Authentication

The Docker sidecar uses a `LORE_TOKEN` environment variable for API authentication. The token is generated during `lore-docker` setup and stored in the local environment — never committed to version control.

Sidecar endpoints (semantic search, Redis) are localhost-only by default. No external network exposure.

## Fieldnote Sanitization

When capturing fieldnotes, the harness enforces sanitization:

- Secret values are replaced with references (env var names, vault paths)
- Internal URLs containing auth tokens are stripped
- Connection strings are referenced by name, not by value

The security rule (`security.md`) is included in the static banner at session start and injected into every skill regardless of domain, ensuring agents always have credential protection rules in context.

## Credential Protection Reminders

The `instructions.md` core protocol includes credential protection reminders that are injected into every session. The harness reminds agents to reference secrets by name rather than embedding values, and to escalate to the operator when uncertain about sensitive content.

This is the one behavioral directive that is always active regardless of profile — even `minimal` profile sessions receive credential protection guidance.
