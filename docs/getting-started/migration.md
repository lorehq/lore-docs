---
title: Migration & Uninstalling
---

# Migration & Uninstalling

## Migration

### From CLAUDE.md / .cursorrules

Install Lore: `npx create-lore my-project`

Then start a session and tell your agent: "I'm migrating from an existing CLAUDE.md — here's the content. Migrate it into Lore: move project rules to agent-rules, coding conventions to conventions, gotchas and tricks to skills, and environment details to environment docs."

Paste your old file content into the same message. The agent handles the file operations and will ask if anything is unclear.

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
