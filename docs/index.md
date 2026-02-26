---
title: Home
---

# Lore

**Your coding agent forgets everything between sessions. Lore fixes that.**

Lore is a harness for AI coding agents. It wraps your agent to manage persistent memory, enforce rules, orchestrate delegation, and track work — so every session builds on the last.

<div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; max-width: 100%; margin: 1.5em 0;">
  <iframe src="https://www.youtube.com/embed/u2rkR1XeHZk" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allowfullscreen></iframe>
</div>

*Two different agents, one knowledge base. What one learns, the other knows.*

## What You Get

- **Knowledge Capture** — Gotchas, API quirks, and environment details persist as searchable fieldnotes and docs.
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
