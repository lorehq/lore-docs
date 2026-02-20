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

```
my-project/
  .lore/
    skills/          # Skills (canonical). lore-* = framework, rest = yours
    agents/          # Agents (canonical). lore-* = framework, rest = yours
    instructions.md  # Agent instructions (canonical source)
  .claude/           # Claude Code platform copies (auto-generated)
  .cursor/
    hooks/           # Cursor hooks (session start, read, edit, shell, compaction, failure events)
    hooks.json       # Cursor hook configuration
    mcp/             # Cursor MCP server (on-demand context and nudges)
    rules/           # Cursor-specific rules (always-apply behavioral overrides)
  .opencode/
    plugins/         # OpenCode plugins (fire on lifecycle events)
  docs/
    context/         # Rules and conventions (injected every session)
    knowledge/       # Environment details, runbooks, scratch notes (on-demand)
    work/            # Roadmaps, plans, brainstorms
  hooks/             # Claude Code hooks (fire on session start, prompt submit, tool use)
  lib/               # Shared hook logic (all platforms use this)
  scripts/           # Validation, registry generation, platform sync
  CLAUDE.md          # Generated from .lore/instructions.md
  mkdocs.yml         # Docs site config
```

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

Use `/lore-status` to verify your instance is healthy and `/lore-update` to pull the latest framework updates. See [Commands](guides/interaction.md#command-reference) for the full list.

## Browsing Your Knowledge Base

Lore includes a local docs UI command to browse your accumulated knowledge:

```
/lore-ui
```

Use `/lore-ui stop` to shut it down and `/lore-ui status` to check what mode is active.
