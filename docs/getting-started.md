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

Coding and docs conventions go in `docs/context/conventions/` — also injected every session as a separate section.

The agent sees both before your first prompt every session.

For personal preferences that shouldn't be shared via git, edit `docs/knowledge/local/operator-profile.md`. This file is gitignored and injected into every session alongside project context. The default template is ignored until you customize it.

The installer also scaffolds `.mcp.json` at the instance root for the MCP search server — used by Claude Code (and Cursor via `.cursor/mcp.json`) when the Docker sidecar is running. See [Configuration: MCP Search Server](guides/configuration.md#mcp-search-server).

## Start the Docker Sidecar

Run `/lore-docker` to start semantic search and a live docs UI. **Highly recommended — start it before your first session.**

See [Docs UI & Semantic Search](guides/docs-ui.md) for setup, configuration, and details.

## First Session

**Before your first real working session, ground the agent in your environment.** Ask your agent:

> "Walk me through first-session setup."

It will follow the [First Session Setup guide](guides/first-session-setup.md) phase by phase — operator profile, model configuration, keystore, CLI auth, environment mapping, and more. A well-grounded instance collaborates differently than a cold one.

**For ongoing sessions**, start your agent normally:

```bash
claude       # Claude Code
cursor .     # Cursor (open the project)
opencode     # OpenCode
```

Lore's hooks reinforce knowledge capture as you go. After substantive work, run `/lore-capture` for a full capture pass. To open a work repo in your IDE, see [/lore-link](guides/cross-repo-workflow.md#ide-workflow-lore-link).

## Working Across Repos

See [Working Across Repos](guides/cross-repo-workflow.md) for the hub pattern and IDE linking.

## Checking Status and Updating

Use `/lore-status` to verify your instance is healthy and `/lore-update` to pull the latest harness updates. See [Commands](guides/interaction.md#command-reference) for the full list.
