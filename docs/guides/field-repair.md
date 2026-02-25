---
title: Field Repair
---

# Field Repair

When something breaks — a hook error, a script crash, bad agent behavior — your agent has a structured workflow to diagnose it, fix it in source, test it, and sync the fix back to your instance.

Tell your agent: "something is broken" and describe the symptom. Or say `/lore-field-repair` for the guided workflow.

## When to Use

- A hook throws an error or produces wrong output
- A script crashes or behaves unexpectedly
- Agent behavior degrades (missed captures, wrong conventions loading, broken delegation)
- Another deployed instance reports a failure

Field repair is for harness bugs — not feature requests, config changes, or application code.

## How It Works

Your agent follows a structured convention:

1. **Reproduce** — recreate the failure in the current instance before touching source
2. **Isolate** — instrument the failing path, read debug output, form a hypothesis
3. **Fix in source** — apply the fix in the repo that owns the broken code
4. **Test** — copy the fix into the instance, verify it works, revert the copy
5. **Push and sync** — commit in source, then update the instance through the official sync path
6. **Report** — open a GitHub issue documenting the root cause
7. **Capture** — turn the fix into a skill, environment doc, or runbook update

## What You Do

You're the agent's eyes. Hooks and platform behavior aren't always visible to the agent — it will ask you to confirm what you see in the terminal, UI, or editor. Describe symptoms precisely and confirm when fixes work.

The agent handles everything else: reading code, instrumenting, writing fixes, testing, committing, syncing.

## Key Principles

These are worth knowing even though the agent follows them automatically:

- **Fix in source, not the instance.** Patching the instance directly creates drift. The fix goes in the source repo and reaches the instance through `/lore-update`.
- **Debug to `/tmp`, never stderr.** Stderr output corrupts hook responses on all platforms.
- **Sync through the official path.** Never run sync scripts ad-hoc — always use the update command from the instance.

## Repo Ownership

When the agent asks which repo likely owns the issue:

| Repo | Scope |
|------|-------|
| **lore** | Hooks, lib, scripts, skills, conventions, templates |
| **create-lore** | Installer, `npx` entry point |
| **lore-docker** | Docker image, semantic search, docs UI |
| **lore-docs** | Public documentation site |

## The Bigger Picture

Field repair today is a single-instance workflow — your agent fixes a bug in your instance and pushes it to source. But the architecture is designed for something more ambitious.

Every Lore instance encounters its own cross-platform nuances, edge cases, and environment-specific failures. Each fix represents hard-won knowledge. The goal is a **field fix contribution pipeline** where deployed instances automatically package fixes with structured metadata — root cause, affected platforms, reproduction steps — and submit them to the source repo as PRs. AI triage on the source side classifies, deduplicates, and groups incoming fixes. Maintainer intervention becomes review and approval, not discovery and implementation.

The result is a self-evolving ecosystem: the more instances deployed across different platforms and environments, the faster the framework improves — with fixes flowing from the field to source and back out to all instances through normal updates. Every deployed instance becomes a contributor.

## See Also

- [Troubleshooting](../reference/troubleshooting.md) — fix-by-symptom reference for common issues
- [Upgrading](upgrading.md) — how fixes reach your instance after they're merged
- [Commands](../reference/commands.md) — `/lore-field-repair` and other commands
