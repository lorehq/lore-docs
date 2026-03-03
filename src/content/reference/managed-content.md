---
title: "What Lore Manages"
---

# What Lore Manages

Lore centrally manages the three standard components of an agentic framework: **rules**, **skills**, and **agents**. These are the building blocks that enable AI agents to operate autonomously — rules govern behavior, skills provide capabilities, and agents define specialized personas for delegation.

Every agentic coding platform (Claude Code, Cursor, Gemini CLI) uses these constructs natively but in platform-specific formats. Lore manages them once in `.lore/` and projects them into each platform's native format automatically.

## Rules

Policies, guardrails, and constraints that govern agent behavior. Rules ensure compliance with security standards, coding conventions, and operational boundaries.

| Property | Value |
|----------|-------|
| Location | `.lore/rules/*.md` |
| Loaded | Contextually — injected before file writes via the rule-guard hook |
| Scope | Global (`~/.lore/`) or project-local |

Rules are the "must" and "must not" layer. The `security.md` rule fires on every write. Other rules fire based on the file path being written (e.g., documentation rules fire for `docs/` writes).

## Skills

Modular, reusable instructions that equip agents with specific capabilities. Skills range from procedural commands (invoked via `/skill-name`) to domain expertise (loaded automatically when relevant).

| Property | Value |
|----------|-------|
| Location | `.lore/skills/<skill-name>/SKILL.md` |
| Loaded | On invocation, at session start, or when the agent determines relevance |
| Scope | Global (`~/.lore/`) or project-local |

**Frontmatter:**
```yaml
---
name: coding-principles
description: Coding principles — surface confusion early, write less code, prove it works
user-invocable: false
---
```

Key fields:
- `user-invocable` — appears in the slash command list when `true`
- `allowed-tools` — constrains which tools the skill can use

Lore ships example skills (`coding-principles`, `documentation-principles`, `docs-nav-design`, `prompt-engineering-principles`) alongside harness skills (`lore-status`, `lore-docker`, `lore-memprint`, etc.). Operators add their own skills for project-specific workflows.

## Agents

Autonomous, goal-driven personas configured for specific types of work. Each agent specifies which skills it loads and how it should approach tasks.

| Property | Value |
|----------|-------|
| Location | `.lore/agents/<name>.md` |
| Loaded | When the platform delegates a task to the agent |
| Scope | Global (`~/.lore/`) or project-local |

**Frontmatter:**
```yaml
---
name: software-engineer
description: Software engineering specialist. Use for implementation, bug fixes, refactoring, and code review.
skills:
  - coding-principles
---
```

Lore ships example agents (`software-engineer`, `technical-writer`, `prompt-engineer`) that demonstrate how to pair agents with skills. Operators create their own agents for domain-specific delegation patterns.

## Projection

The projector transforms rules, skills, and agents into platform-native formats:

| Component | Claude Code | Cursor | Gemini CLI |
|-----------|------------|--------|------------|
| Rules | `CLAUDE.md` | `.cursor/rules/*.mdc` | `GEMINI.md` |
| Skills | `.claude/skills/` | `.cursor/rules/*.mdc` | `GEMINI.md` |
| Agents | `.claude/agents/` | — | — |

Write once in `.lore/`, use everywhere. See [Platform Projections](../explanation/projections.md) for details.
