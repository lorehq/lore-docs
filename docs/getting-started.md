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

This scaffolds a Lore project with hooks, scripts, starter docs, and the skill/agent framework.

## What You Get

```
my-project/
  .lore/
    skills/          # Skills live here (canonical — created as you work)
    agents/          # Domain agents (canonical — created as skills accumulate)
    instructions.md  # Agent instructions (canonical source)
  .claude/           # Claude Code platform copies (auto-generated)
  .cursor/
    hooks/           # Cursor hooks (fire on session start, read, edit, shell events)
    hooks.json       # Cursor hook configuration
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
  .cursorrules       # Generated from .lore/instructions.md
  mkdocs.yml         # Docs site config
```

## Customize Your Project Context

Open `docs/context/agent-rules.md` and describe your project. This file is injected into every agent session as project context:

- **About** — what the project does, what domain it's in
- **Agent Behavior** — communication style, preferences, constraints

Coding and docs conventions go in `docs/context/conventions/` — also injected every session as a separate section.

The agent sees both before your first prompt every session.

## First Session

Start your agent in the project directory:

```bash
claude       # Claude Code
cursor .     # Cursor (open the project)
opencode     # OpenCode
```

Work normally. Lore's hooks reinforce knowledge capture as you go — prompting the agent to extract gotchas into skills and document context knowledge. If you prefer working from your application repo in an IDE (rather than the Lore project directory), see [lore link](guides/cross-repo-workflow.md#ide-workflow-lore-link) for an alternative that keeps hooks active without opening the Lore project.

After substantive work, run `/lore-capture` to trigger a full knowledge capture pass. The agent will review the session, surface what it found (gotchas, new context, stale work items), and ask which items to act on before making changes.

## Working Across Repos

Lore is designed as a central hub. Launch your agent from the Lore project, then work on any repo from there. Knowledge captures back to Lore, work repos stay clean. For IDE workflows, `lore link` lets you open a work repo directly with hooks pointing back to the hub.

See [Working Across Repos](guides/cross-repo-workflow.md) for the full pattern.

## Building Knowledge

The first few sessions are discovery-heavy. As context accumulates, each session gets faster — the agent spends less time re-discovering your environment and more time acting on it.

See [How It Works](how-it-works.md) for the full picture of how knowledge compounds.

## Checking Status and Updating

Verify your Lore instance is healthy:

```
/lore-status
```

This shows your Lore version, hook health, skill/agent counts, linked repos, and active work items.

To pull the latest framework updates without touching your docs, skills, or agents:

```
/lore-update
```

The agent will show you the version change and which file categories will be synced, then ask for approval.

## Browsing Your Knowledge Base

Lore includes a local docs server to browse your accumulated knowledge:

```
/lore-serve-docs
```

This starts an MkDocs server at `localhost:8000` with live reload. Use `/lore-stop-docs` to shut it down.

If you prefer Docker (no Python required):

```
/lore-serve-docs-docker
```
