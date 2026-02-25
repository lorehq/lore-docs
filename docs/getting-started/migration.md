---
title: Migration & Uninstalling
---

# Migration & Uninstalling

## Migration

### From CLAUDE.md / .cursorrules

1. Install Lore: `npx create-lore my-project`
2. Move project-specific rules to `docs/context/agent-rules.md`
3. Move coding conventions to `docs/context/conventions/`
4. Move gotchas and tricks to skills via `/lore-create-skill`
5. Move environment details (URLs, services, relationships) to `docs/knowledge/environment/`
6. Delete the old file — Lore generates `CLAUDE.md` from `.lore/instructions.md`

### From Scratch Notes / No System

1. Install Lore: `npx create-lore my-project`
2. Work normally. Hooks will nudge the agent to capture knowledge as it discovers things.
3. Run `/lore-capture` after substantive sessions to ensure nothing was missed.
4. Knowledge accumulates naturally. Review `docs/` periodically to prune noise.

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
