---
title: Home
---

# Lore

**Your coding agent forgets everything between sessions. Lore fixes that.**

Lore is a lightweight framework that gives coding agents persistent memory. Install it, work normally, and your agent starts building knowledge that compounds across sessions.

## What You Get

- **Knowledge Capture** — Run `/lore-capture` and the agent documents gotchas as reusable skills and maps your context through docs. API quirks, auth tricks, encoding issues — all persist across sessions.
- **Semantic Search & Docs UI** — Semantic search over your full knowledge base and a live docs UI — both running locally. Run `/lore-docker` to start the sidecar. Agents query by meaning, not just filename, and get ranked results. **Highly recommended.** Without Docker, agents fall back to Grep/Glob.
- **Delegation** — An orchestrator/worker pattern where the main model dispatches execution to cheaper models that run in parallel. Less token spend, cleaner context windows.
- **Work Continuity** — Roadmaps and plans persist across sessions and surface at startup, so long-running projects have persistent context from day one.

## Quick Start

Install with `npx create-lore my-project` and check the [Getting Started](getting-started.md) guide.

No configuration required. The framework activates through hooks when you start your agent. Customize `docs/context/agent-rules.md` to teach the agent about your project.

## Learn More

- [Getting Started](getting-started.md) — install and first session walkthrough
- [How It Works](how-it-works.md) — architecture, knowledge capture, session acceleration
- [Working with Lore](guides/interaction.md) — tips, commands, and effective use
