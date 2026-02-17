---
title: Home
---

# Lore

**Your coding agent forgets everything between sessions. Lore fixes that.**

Lore is a lightweight framework that gives coding agents persistent memory. Install it, work normally, and your agent starts building knowledge that compounds across sessions.

## What You Get

- **Self-Learning** — Your agent captures gotchas as reusable skills and maps your environment through docs. API quirks, auth tricks, encoding issues — all persist across sessions.
- **Delegation** — An orchestrator/agent pattern where the main model dispatches domain work to cheaper, faster models. Less token spend, cleaner context windows.
- **Work Continuity** — Roadmaps and plans persist across sessions and surface at startup, so long-running projects pick up where they left off.

## Quick Start

```bash
npx create-lore my-project
cd my-project
claude  # or your preferred agent
```

No configuration needed. The framework activates through hooks and conventions automatically.

## How It Works

| Component | Location | What it does |
|-----------|----------|--------------|
| **Hooks** | `hooks/` | Fire on session start, tool use, and edits. Reinforce capture habits and route knowledge. |
| **Skills** | `.claude/skills/` | Non-obvious knowledge captured from real work — gotchas, tricks, patterns. |
| **Agents** | `.claude/agents/` | Domain-specific workers. One agent per domain, created as skills accumulate. |
| **Docs** | `docs/` | Environmental knowledge, runbooks, and work tracking. Your agent's long-term memory. |
| **Scripts** | `scripts/` | Validation, registry generation, nav building. Keeps knowledge consistent as it grows. |

## Learn More

- [Getting Started](getting-started.md) — install and first session walkthrough
- [How It Works](how-it-works.md) — architecture, knowledge capture, session acceleration
- [Working with Lore](guides/interaction.md) — tips for effective use
- [Commands](guides/commands.md) — slash command reference
