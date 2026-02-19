---
title: Home
---

# Lore

**Your coding agent forgets everything between sessions. Lore fixes that.**

Lore is a lightweight framework that gives coding agents persistent memory. Install it, work normally, and your agent starts building knowledge that compounds across sessions.

## What You Get

- **Self-Learning** — Your agent captures gotchas as reusable skills and maps your context through docs. API quirks, auth tricks, encoding issues — all persist across sessions.
- **Delegation** — An orchestrator/agent pattern where the main model dispatches domain work to cheaper models that run in parallel. Less token spend, cleaner context windows.
- **Work Continuity** — Roadmaps and plans persist across sessions and surface at startup, so long-running projects pick up where they left off.

## Quick Start

```bash
npx create-lore my-project
cd my-project
```

Then start your agent:

```bash
claude       # Claude Code
cursor .     # Cursor (open the project)
opencode     # OpenCode
```

No configuration required. The framework activates through hooks automatically. Customize `docs/context/agent-rules.md` to teach the agent about your project.

## How It Works

| Component | Location | What it does |
|-----------|----------|--------------|
| **Hooks** | `hooks/`, `.cursor/hooks/`, `.opencode/plugins/` | Fire on session start, prompt submit, and tool use. Reinforce knowledge capture, delegation, and work tracking. |
| **Skills** | `.lore/skills/` | Non-obvious knowledge captured from real work — gotchas, tricks, patterns. `lore-*` = framework, rest = yours. |
| **Agents** | `.lore/agents/` | Domain-specific workers. One agent per domain. `lore-*` = framework, rest = yours. |
| **Docs** | `docs/` | Context knowledge, runbooks, and work tracking. Your agent's long-term memory. |
| **Scripts** | `scripts/` | Validation, registry generation, nav building. Keeps knowledge consistent as it grows. |

## Learn More

- [Getting Started](getting-started.md) — install and first session walkthrough
- [How It Works](how-it-works.md) — architecture, knowledge capture, session acceleration
- [Working with Lore](guides/interaction.md) — tips for effective use
- [Commands](guides/commands.md) — slash command reference
