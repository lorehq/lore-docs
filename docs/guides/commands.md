---
title: Commands
---

# Commands

Lore uses slash commands to trigger common operations. Type them in your agent's chat.

## Knowledge Capture

| Command | What it does |
|---------|-------------|
| `/capture` | Review session work, capture skills, update registries, validate consistency |
| `/consolidate` | Deep health check — find stale items, semantic overlaps, knowledge drift |

`/capture` is the primary end-of-session command. It prompts the agent to extract gotchas into skills, update environmental docs, and run consistency checks.

`/consolidate` is a deeper pass for periodic maintenance — finding duplicate skills, stale documentation, and opportunities to simplify.

## Work Management

| Command | What it does |
|---------|-------------|
| `/create-roadmap` | Create a strategic roadmap (weeks to months) |
| `/create-plan` | Create a tactical plan (days to weeks) |
| `/create-brainstorm` | Create a brainstorm for exploratory discussion |
| `/archive-item` | Archive a completed or cancelled roadmap/plan |

See [Roadmaps & Plans](roadmaps-and-plans.md) for details on format and workflow.

## Docs Server

| Command | What it does |
|---------|-------------|
| `/serve-docs` | Start local MkDocs server at localhost:8000 with live reload |
| `/serve-docs-docker` | Start via Docker — no Python required |
| `/stop-docs` | Stop the docs server |

The docs server lets you browse your knowledge base (skills, environment docs, runbooks, work items) in a web UI.
