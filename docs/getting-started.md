---
title: Getting Started
---

# Getting Started

## Prerequisites

- **Node.js 18+** — for the installer
- **Claude Code** — or another coding agent that supports hooks and `CLAUDE.md`

## Install

```bash
npx create-lore my-project
cd my-project
```

This scaffolds a Lore project with hooks, scripts, starter docs, and the skill/agent framework.

## What You Get

```
my-project/
  .claude/
    skills/          # Skills live here (created as you work)
    agents/          # Domain agents live here (created as skills accumulate)
    settings.json    # Hook configuration
  docs/
    context/         # Project context, conventions, inventory (filled in as you work)
    work/            # Roadmaps, plans, brainstorms
  hooks/             # Session start, tool use, and edit hooks
  scripts/           # Validation and registry generation
  CLAUDE.md          # Agent instructions (loaded automatically)
  mkdocs.yml         # Docs site config
```

## Customize Your Project Context

Open `docs/context/agent-rules.md` and describe your project. This file is injected into every agent session as project context:

- **About** — what the project does, what domain it's in
- **Agent Behavior** — communication style, preferences, constraints
- **Conventions** — coding patterns, tooling choices, naming rules

The agent sees this before your first prompt every session.

## First Session

Start your agent in the project directory:

```bash
claude
```

Work normally. Lore's hooks reinforce knowledge capture as you go — prompting the agent to extract gotchas into skills and document context knowledge.

After substantive work, run `/capture` to trigger a full knowledge capture pass. The agent will:

1. Review what it learned during the session
2. Create skills for any gotchas encountered
3. Update context docs with new knowledge
4. Validate consistency across registries and navigation

## Working Across Repos

Lore is designed as a central hub. Launch your agent from the Lore project, then work on any repo from there. Knowledge captures back to Lore, work repos stay clean.

See [Working Across Repos](guides/cross-repo-workflow.md) for the full pattern.

## Building Knowledge

The first few sessions are discovery-heavy. By session 5-10, meaningful context accumulates and the agent starts working faster — correct parameters on the first try, delegation to domain agents, less rediscovery.

See [How It Works](how-it-works.md) for the full picture of how knowledge compounds.

## Checking Status and Updating

Verify your Lore instance is healthy:

```
/lore-status
```

This shows your Lore version, hook health, skill/agent counts, and active work items.

To pull the latest framework updates without touching your docs, skills, or agents:

```
/lore-update
```

The agent will show you what changed and ask for approval before syncing.

## Browsing Your Knowledge Base

Lore includes a local docs server to browse your accumulated knowledge:

```
/serve-docs
```

This starts an MkDocs server at `localhost:8000` with live reload. Use `/stop-docs` to shut it down.

If you prefer Docker (no Python required):

```
/serve-docs-docker
```
