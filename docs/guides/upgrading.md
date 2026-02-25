---
title: Upgrading
---

# Upgrading

Upgrading Lore is a two-part process: review the changelog yourself, then tell your agent to perform the update.

## Upgrade Procedure

1. Check the [changelog](../changelog.md) for breaking changes between your current version and the latest — this is operator judgment, not something to delegate
2. Tell your agent to update Lore — it pulls the latest harness files from GitHub, reviews the diff, and commits the result

If something breaks after upgrading, tell your agent to revert the update. All changes are local and reversible.

See [Troubleshooting](../reference/troubleshooting.md) for the fix-by-symptom table.

## What Gets Updated

The update overwrites harness-owned files only:

- `.lore/hooks/`, `.cursor/hooks/`, `.opencode/plugins/` — hook implementations
- `.lore/lib/` — shared library modules
- `.lore/skills/lore-*` — built-in skills (the `lore-` prefix is reserved)
- `docs/context/conventions/system/` — system conventions

**Never touched by an update:**

- `docs/` — your knowledge base, conventions, runbooks, and work items
- `.lore/skills/` entries without the `lore-` prefix — your operator skills
- `docs/context/conventions/` files you own — operator conventions

## After Upgrading

If you have linked repos, tell your agent to refresh them — it will regenerate their configs with the latest hooks.

## See Also

- [Changelog](../changelog.md) — version history and breaking changes
- [Troubleshooting](../reference/troubleshooting.md) — fix-by-symptom table
- [Stability Policy](../concepts/production-readiness.md) — what can and cannot break between versions
