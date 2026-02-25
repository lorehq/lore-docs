---
title: Home
---

# Lore

**Your coding agent forgets everything between sessions. Lore fixes that.**

Lore is a harness for AI coding agents. It wraps your agent to manage persistent memory, enforce conventions, orchestrate delegation, and track work — so every session builds on the last.

## What You Get

- **Knowledge Capture** — Gotchas, API quirks, and environment details persist as searchable skills and docs.
- **Semantic Search & Docs UI** — Local semantic search and a live docs UI via Docker sidecar.
- **Delegation** — Orchestrator/worker pattern that dispatches work to cheaper models in parallel.
- **Work Continuity** — Roadmaps and plans surface at session start so long-running projects pick up where they left off.

## Get Started

```bash
npx create-lore my-project
```

No configuration required. The harness activates through hooks when you start your agent. Customize `docs/context/agent-rules.md` to teach the agent about your project.

- [Getting Started](getting-started/index.md) — install, customize, first session
- [How It Works](concepts/how-it-works.md) — architecture, knowledge capture, session acceleration
- [Working with Lore](guides/working-with-lore.md) — tips, commands, and effective use
