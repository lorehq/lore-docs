---
title: Migration & Uninstalling
---

# Migration & Uninstalling

## Migration

### From CLAUDE.md / .cursorrules

Install Lore: `npx create-lore my-project`

Then start a session and tell the agent to migrate your old file. Paste the content or point it at the path — the agent reads it, categorizes the content (rules, fieldnotes, environment details), and distributes it into the right Lore locations.

### From Scratch Notes / No System

Install Lore: `npx create-lore my-project`

Work normally. Hooks nudge your agent to capture knowledge as it discovers things — environment facts, gotchas, recurring patterns. Knowledge accumulates naturally. Review `docs/` periodically to prune noise.

## Uninstalling

Lore is plain files. Delete the Lore directories and you're back to a normal project:

```bash
rm -rf .lore .claude .cursor .opencode
rm CLAUDE.md opencode.json mkdocs.yml
```

Your `docs/` directory contains your accumulated knowledge — keep it or delete it. Nothing external to clean up. No accounts, no services, no subscriptions.

## See Also

- [Getting Started](index.md) — install and first run
- [First Session Setup](first-session/index.md) — ground the agent before your first working session
