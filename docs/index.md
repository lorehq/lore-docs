---
title: Home
---

# Lore

**Your coding agent forgets everything between sessions. Lore fixes that.**

Lore is a lightweight framework that gives coding agents persistent memory. Install it, work normally, and your agent starts building knowledge that compounds across sessions.

## What You Get

- **Self-Learning** — Your agent captures gotchas as reusable skills and maps your context through docs. API quirks, auth tricks, encoding issues — all persist across sessions.
- **Delegation** — An orchestrator/worker pattern where the main model dispatches execution to cheaper models that run in parallel. Less token spend, cleaner context windows.
- **Work Continuity** — Roadmaps and plans persist across sessions and surface at startup, so long-running projects pick up where they left off.

## Quick Start

Install with `npx create-lore my-project` and check the [Getting Started](getting-started.md) guide.

No configuration required. The framework activates through hooks when you start your agent. Customize `docs/context/agent-rules.md` to teach the agent about your project.

## Learn More

- [Getting Started](getting-started.md) — install and first session walkthrough
- [How It Works](how-it-works.md) — architecture, knowledge capture, session acceleration
- [Working with Lore](guides/interaction.md) — tips, commands, and effective use
