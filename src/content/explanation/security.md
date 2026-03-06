---
title: "Security"
---

# Security

Lore enforces security through multiple layers: write-time guards, prompt-level reminders, and structural protections.

## Guard Hooks

Two hook-based guards protect the environment:

### Harness Guard
Fires before writes to the global directory (`~/.lore/`). Prompts the operator for approval before agents can modify shared knowledge, rules, skills, or agents.

### Memory Guard
Fires before access to `MEMORY.md` at the project root. Denies access and directs agents to `.lore/MEMORY.md` (the gitignored session scratchpad) for session notes, or to fieldnotes/hot memory for knowledge capture.

## Prompt-Level Security

The prompt preamble includes a security reminder on every message: reference secrets by name, never embed values. See [Hooks](hooks.md) for the full color system and tag reference.

## Memory Engine Authentication

The Docker memory engine supports optional `LORE_TOKEN` authentication. If you want API auth, create `~/.lore/.env` with a `LORE_TOKEN` value — never committed to version control.

Memory engine endpoints (semantic search, Redis) are localhost-only by default. No external network exposure.

## Fieldnote Sanitization

When capturing fieldnotes, Lore enforces sanitization:

- Secret values are replaced with references (env var names, vault paths)
- Internal URLs containing auth tokens are stripped
- Connection strings are referenced by name, not by value

The security rule (`security.md`) is included in the static banner at session start and injected into every skill regardless of domain, ensuring agents always have credential protection rules in context.

## Credential Protection Reminders

The core protocol includes credential protection reminders that are injected into every session. Lore reminds agents to reference secrets by name rather than embedding values, and to escalate to the operator when uncertain about sensitive content.

This is the one behavioral directive that is always active regardless of profile — even `minimal` profile sessions receive credential protection guidance.
