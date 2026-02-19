---
title: Commands
---

# Commands

Lore uses slash commands to trigger common operations. Type them in your agent's chat.

In OpenCode, slash commands are provided by markdown files under `.opencode/commands/`.

## Knowledge Capture

| Command | What it does |
|---------|-------------|
| `/lore-capture` | Review session work, capture skills, update registries, validate consistency |
| `/lore-consolidate` | Deep health check — find stale items, semantic overlaps, knowledge drift |

`/lore-capture` is the primary end-of-session command.

## Work Management

See [Roadmaps & Plans](roadmaps-and-plans.md) for format and workflow.

## Instance Management

| Command | What it does |
|---------|-------------|
| `/lore-status` | Show Lore version, hook health, skill/agent counts, active work |
| `/lore-update` | Pull latest framework files from GitHub without touching operator content |

See [Platform Support: Sync Boundaries](platform-support.md#sync-boundaries) for what `/lore-update` does and doesn't touch.

## Cross-Repo Linking

| Command | What it does |
|---------|-------------|
| `/lore-link <target>` | Link a work repo — hooks fire from hub |
| `/lore-link --unlink <target>` | Remove link from a work repo |
| `/lore-link --list` | Show linked repos with stale detection |
| `/lore-link --refresh` | Regenerate configs in all linked repos |

`/lore-link` lets you open a work repo in your IDE with full file tree, git, and search while Lore hooks still fire from the hub. Run `/lore-link --refresh` after `/lore-update` to regenerate configs with the latest hooks.

See [IDE Workflow: lore link](cross-repo-workflow.md#ide-workflow-lore-link) for full details.

## Docs UI

| Command | What it does |
|---------|-------------|
| `/lore-ui` | Manage docs UI lifecycle (start/stop/status), preferring Docker with local mkdocs fallback |

