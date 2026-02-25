---
title: Getting Started
---

# Getting Started

## Prerequisites

- **Node.js 18+** — for the installer
- **A supported coding agent** — Claude Code, Cursor, or OpenCode
- **Docker** (Docker Desktop or Engine) — highly recommended for semantic search and docs UI; not required

## Install

```bash
npx create-lore my-project
cd my-project
```

## Customize Your Project Context

Open `docs/context/agent-rules.md` and describe your project. This file is injected into every agent session as project context:

- **About** — what the project does, what domain it's in
- **Agent Behavior** — communication style, preferences, constraints

The agent loads your project identity, conventions, and knowledge map at session start.

!!! tip "What to customize now vs. later"
    `docs/context/` is meant to be edited upfront — agent-rules, conventions, and operator-profile all benefit from early customization. `docs/knowledge/` is different: it's built by the agent as it learns, not pre-structured by hand. Don't create folders or files there manually before running first-session setup. Let the agent populate it during environment mapping, then run the [knowledge defrag runbook](first-session/knowledge-worker.md#phase-7-knowledge-defrag) to organize by content.

The installer also scaffolds `.mcp.json` at the instance root for the MCP search server — used by Claude Code (and Cursor via `.cursor/mcp.json`) when the Docker sidecar is running. See [Docs UI & Search](../guides/docs-ui.md) for setup details.

## Start the Docker Sidecar

Run `/lore-docker` to start semantic search and a live docs UI. **Highly recommended — start it before your first session.**

See [Docs UI & Semantic Search](../guides/docs-ui.md) for setup, configuration, and details.

## First Session

**Before your first real working session, ground the agent in your environment.** Ask your agent:

> "Walk me through first-session setup."

The agent will follow the [First Session Setup guide](first-session/index.md) phase by phase — operator profile, model configuration, keystore, CLI auth, environment mapping, and more. A well-grounded instance collaborates differently than a cold one.

**For ongoing sessions**, start your agent normally:

```bash
claude       # Claude Code
cursor .     # Cursor (open the project)
opencode     # OpenCode
```

Lore's hooks reinforce knowledge capture as you go. After substantive work, run `/lore-capture` for a full capture pass. To open a work repo in your IDE, see [/lore-link](../guides/working-across-repos.md#ide-workflow-lore-link).

## Next Steps

- [Working Across Repos](../guides/working-across-repos.md) — hub pattern and IDE linking
- Use `/lore-status` to verify your instance is healthy and `/lore-update` to pull the latest harness updates. See [Commands](../reference/commands.md) for the full list.
