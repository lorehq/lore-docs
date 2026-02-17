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
    index.md         # Docs homepage
    environment/     # Environmental knowledge (filled in as you work)
    work/            # Roadmaps, plans, brainstorms
  hooks/             # Session start, tool use, and edit hooks
  scripts/           # Validation and registry generation
  CLAUDE.md          # Agent instructions (loaded automatically)
  mkdocs.yml         # Docs site config
```

## First Session

Start your agent in the project directory:

```bash
claude
```

Work normally. Lore's hooks reinforce knowledge capture as you go — prompting the agent to extract gotchas into skills and document environmental knowledge.

After substantive work, run `/capture` to trigger a full knowledge capture pass. The agent will:

1. Review what it learned during the session
2. Create skills for any gotchas encountered
3. Update environmental docs with new knowledge
4. Validate consistency across registries and navigation

## Building Knowledge

The first few sessions are discovery-heavy. By session 5-10, meaningful context accumulates and the agent starts working faster — correct parameters on the first try, delegation to domain agents, less rediscovery.

See [How It Works](how-it-works.md) for the full picture of how knowledge compounds.

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
