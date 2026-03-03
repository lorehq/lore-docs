---
title: "Security"
---

# Security

The harness enforces security through multiple layers: write-time guards, prompt-level reminders, and structural protections. Security is strongly enforced across every layer of the harness.

## Guard Hooks

Three hook-based guards protect the environment:

### Harness Guard
Fires before writes to `.lore/harness/` files. Prevents agents from accidentally modifying the harness infrastructure. Only operator-initiated changes (via `/lore-field-repair`) bypass this guard.

### Rule Guard
Fires before writes to `.lore/rules/` files. Rules are operator-controlled. Agents read and follow rules; they do not modify them unilaterally.

### Protect Memory
Fires before writes to sensitive memory files. Prevents agents from overwriting curated knowledge without going through the capture workflow.

## Prompt-Level Security

The prompt preamble includes a security reminder on every message: reference secrets by name, never embed values. This reminder uses the highest-priority color tier (red) when a security violation is detected.

The three-tier color system for hook messages:

| Color | ANSI Code | Use |
|-------|-----------|-----|
| Bright Red | `\x1b[91m` | Security violations, credential protection, write-guard failures |
| Bright Yellow | `\x1b[93m` | Core protocol (search-first, capture reminders, checkpoints) |
| Bright Cyan | `\x1b[96m` | Style guidance (coding standards, documentation formatting) |

Red is reserved for genuine safety concerns. Overusing red erodes its signal.

## Sidecar Authentication

The Docker sidecar uses a `LORE_TOKEN` environment variable for API authentication. The token is generated during `lore-docker` setup and stored in the local environment — never committed to version control.

Sidecar endpoints (semantic search, Redis) are localhost-only by default. No external network exposure.

## Fieldnote Sanitization

When capturing fieldnotes, the harness enforces sanitization:

- Secret values are replaced with references (env var names, vault paths)
- Internal URLs containing auth tokens are stripped
- Connection strings are referenced by name, not by value

The security rule (`security.md`) is always loaded before any write operation, ensuring agents see the credential protection rules at the moment they matter most.

## Credential Protection Reminders

The `instructions.md` core protocol includes credential protection reminders that are injected into every session. The harness reminds agents to reference secrets by name rather than embedding values, and to escalate to the operator when uncertain about sensitive content.

This is the one behavioral directive that is always active regardless of profile — even `minimal` profile sessions receive credential protection guidance.
