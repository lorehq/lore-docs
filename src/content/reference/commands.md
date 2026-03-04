---
title: "Commands"
---

Slash commands are skills with `user-invocable: true` in their SKILL.md frontmatter. They live in `.lore/skills/<name>/SKILL.md` and are projected into platform-native formats by the projector.

## Available commands

All commands are subcommands of `/lore`:

| Command | Description |
|---------|-------------|
| `/lore` | Show available subcommands. |
| `/lore status` | Show instance health — version, hooks, skills, fieldnotes, active work. |
| `/lore update` | Update harness files to the latest version. |
| `/lore repair` | Guided workflow for diagnosing and fixing harness bugs in deployed instances. |
| `/lore memory` | Start/stop the local Docker sidecar (semantic search + hot memory). |
| `/lore memory burn` | Promote hot cache facts to the persistent knowledge base. |
| `/lore memory rem` | Knowledge defrag — restructure the KB. |

## Commands requiring Docker sidecar

`/lore memory` manages the sidecar directly (`~/.lore/docker-compose.yml`). `/lore memory burn` reads from the hot cache. `/lore status` reports sidecar health.

## Internal skills

The following skills are not directly invocable but are triggered by the harness or other skills:

| Skill | Description |
|-------|-------------|
| `lore-create-fieldnote` | Create a fieldnote when an operation hit a non-obvious snag. |
| `lore-delegate` | Delegation protocol enforcing the Subagent Envelope Contract. |
| `lore-semantic-search` | Query semantic search endpoints when Fetch/WebFetch blocks localhost. |
| `prompt-engineering-principles` | Hardened prompt engineering principles for writing agent prompts. |
