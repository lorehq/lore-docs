---
title: Getting Started
---

# Getting Started

## Prerequisites

- **Node.js 18+** — for the installer
- **A supported coding agent** — Claude Code, Cursor, or OpenCode

## Install

```bash
npx create-lore my-project
cd my-project
```

## What You Get

The installer creates a `.lore/` directory with skills, agents, and instructions; per-platform directories (`.claude/`, `.cursor/`, `.opencode/`) with hooks and configs; and a `docs/` tree for context, knowledge, and work tracking. See [Platform Support](guides/platform-support.md) for a full breakdown of hook directories.

## Customize Your Project Context

Open `docs/context/agent-rules.md` and describe your project. This file is injected into every agent session as project context:

- **About** — what the project does, what domain it's in
- **Agent Behavior** — communication style, preferences, constraints

Coding and docs conventions go in `docs/context/conventions/` — also injected every session as a separate section.

The agent sees both before your first prompt every session.

For personal preferences that shouldn't be shared via git, edit `docs/knowledge/local/operator-profile.md`. This file is gitignored and injected into every session alongside project context. The default template is ignored until you customize it.

## First Session

Start your agent in the project directory:

```bash
claude       # Claude Code
cursor .     # Cursor (open the project)
opencode     # OpenCode
```

Work normally. Lore's hooks reinforce knowledge capture as you go. If you prefer opening a work repo in your IDE instead of the Lore instance directory, see [lore link](guides/cross-repo-workflow.md#ide-workflow-lore-link) for an alternative that keeps hooks active.

After substantive work, run `/lore-capture` to trigger a full knowledge capture pass.

## Working Across Repos

See [Working Across Repos](guides/cross-repo-workflow.md) for the hub pattern and IDE linking.

## Checking Status and Updating

Use `/lore-status` to verify your instance is healthy and `/lore-update` to pull the latest framework updates. See [Commands](guides/interaction.md#command-reference) for the full list, including `/lore-ui` for browsing your knowledge base.
