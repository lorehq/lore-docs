---
title: Upgrading
---

# Upgrading

Upgrading Lore is a four-step process: check the changelog, run the update command, review what changed, and commit.

## Upgrade Procedure

1. Check the [changelog](../changelog.md) for breaking changes between your current version and the latest
2. Run `/lore-update` from your Lore instance — this pulls the latest harness files from GitHub
3. Review the diff — only `lore-*` files and harness internals are touched; your docs, skills, and conventions are never modified
4. Commit the update

If something breaks after upgrading, `git checkout` the previous state. All changes are local and reversible.

See [Troubleshooting](../reference/troubleshooting.md) for the fix-by-symptom table.

## What Gets Updated

`/lore-update` overwrites harness-owned files only:

- `.lore/hooks/`, `.cursor/hooks/`, `.opencode/plugins/` — hook implementations
- `.lore/lib/` — shared library modules
- `.lore/skills/lore-*` — built-in skills (the `lore-` prefix is reserved)
- `docs/context/conventions/system/` — system conventions

**Never touched by `/lore-update`:**

- `docs/` — your knowledge base, conventions, runbooks, and work items
- `.lore/skills/` entries without the `lore-` prefix — your operator skills
- `docs/context/conventions/` files you own — operator conventions

## After Upgrading

If you have linked repos, run `/lore-link --refresh` to regenerate their configs with the latest hooks.

## See Also

- [Changelog](../changelog.md) — version history and breaking changes
- [Troubleshooting](../reference/troubleshooting.md) — fix-by-symptom table
- [Stability Policy](../concepts/production-readiness.md) — what can and cannot break between versions
