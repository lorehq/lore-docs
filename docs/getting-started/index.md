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

Start a session and tell the agent about your project — what it does, what domain it's in, how you like to work. The agent writes `docs/context/agent-rules.md` from your description. This file is injected into every session as project context.

!!! tip "What to customize now vs. later"
    `docs/context/` benefits from early setup — agent-rules, conventions, and operator-profile all shape how the agent behaves from day one. `docs/knowledge/` is different: the agent builds it as it learns, not pre-structured by hand. Don't create folders or files there manually. Let the agent populate it during environment mapping, then tell it to run [knowledge defrag](first-session/knowledge-worker.md#phase-7-knowledge-defrag) to organize by content.

The installer also scaffolds `.mcp.json` at the instance root for the MCP search server — used by Claude Code (and Cursor via `.cursor/mcp.json`) when the Docker sidecar is running. See [Docs UI & Search](../guides/docs-ui.md) for setup details.

## Start the Docker Sidecar

Tell your agent to start the docs sidecar — it handles Docker setup, port assignment, and health checks. **Highly recommended — start it before your first session.**

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

Lore's hooks reinforce knowledge capture as you go. After substantive work, ask your agent to run a capture pass. To open a work repo in your IDE, see [/lore-link](../guides/working-across-repos.md#ide-workflow-lore-link).

## Next Steps

- [Working Across Repos](../guides/working-across-repos.md) — hub pattern and IDE linking
- Ask your agent to check status or update to the latest version. See [Commands](../reference/commands.md) for the full list.
