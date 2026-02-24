---
title: Home
---

# Lore

**Your coding agent forgets everything between sessions. Lore fixes that.**

Lore is a harness for AI coding agents. It wraps your agent to manage persistent memory, enforce conventions, orchestrate delegation, and track work — so every session builds on the last.

## What You Get

- **Knowledge Capture** — Gotchas, API quirks, and environment details persist as searchable skills and docs. See [How It Works](how-it-works.md#1-knowledge-capture).
- **Semantic Search & Docs UI** — Local semantic search and a live docs UI via Docker sidecar. See [Docs UI & Semantic Search](guides/docs-ui.md).
- **Delegation** — Orchestrator/worker pattern that dispatches work to cheaper models in parallel. See [How Delegation Works](how-delegation-works.md).
- **Work Continuity** — Roadmaps and plans surface at session start so long-running projects pick up where they left off. See [How Delegation Works: Session Acceleration](how-delegation-works.md#session-acceleration).

## Quick Start

Install with `npx create-lore my-project` and check the [Getting Started](getting-started.md) guide.

No configuration required. The harness activates through hooks when you start your agent. Customize `docs/context/agent-rules.md` to teach the agent about your project.

## Learn More

- [Getting Started](getting-started.md) — install and first session walkthrough
- [How It Works](how-it-works.md) — architecture, knowledge capture, session acceleration
- [Working with Lore](guides/interaction.md) — tips, commands, and effective use
