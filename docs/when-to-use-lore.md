---
title: When to Use Lore
---

# When to Use Lore

## Good Fit

**You work with coding agents regularly and notice them rediscovering the same things.**

- You've explained your project's auth quirks, deployment process, or API patterns to the agent more than once
- You have a growing project where context matters — service relationships, config conventions, infrastructure details
- You want the agent to get better over time without manual prompt engineering

**You use multiple repos or services that share context.**

- The agent needs to know about your infrastructure, CI setup, or cross-repo relationships
- You link work repos to a central Lore instance so every project benefits from shared knowledge

**You want structured work tracking inside the agent's workflow.**

- Roadmaps and plans that survive session boundaries
- The agent sees active work items at startup and picks up where it left off

## Poor Fit

**Your projects are short-lived or disposable.**

- One-off scripts, throwaway prototypes, hackathon projects — the knowledge capture overhead isn't worth it when there's no "next session" to benefit from

**You don't use coding agents.**

- Lore is specifically for AI coding agents (Claude Code, Cursor, OpenCode). It has no value without one.

**You need team-wide real-time collaboration.**

- Lore is single-agent, single-user. Team workflows use git (branches, PRs, merges). There's no live sync, no conflict resolution beyond git, no multi-user access control. See [Cross-Repo Workflow](guides/cross-repo-workflow.md) for team topology options.

**Your environment prohibits local file writes.**

- Lore stores everything as files in your git repo and won't work in read-only or sandboxed environments.

## Comparison With Alternatives

| Approach | Persistent? | Structured? | Agent-integrated? |
|----------|-------------|-------------|-------------------|
| **MEMORY.md** (platform built-in) | Partial — platforms overwrite between sessions | No — free-form text blob | Yes |
| **CLAUDE.md / .cursorrules** | Yes — git-tracked | Minimal — single file | Yes |
| **Custom system prompts** | Yes — but manual maintenance | Your structure | Depends on platform |
| **Lore** | Yes — git-tracked, multi-file | Yes — skills, agents, docs, conventions | Yes — harness hooks reinforce capture |

A `CLAUDE.md` file works fine at 50 lines. At 500 lines the file becomes a wall of text the agent skims past. Lore routes knowledge to the right location (skill, doc, convention, runbook) and loads it on demand instead of dumping everything into every session. For measured cost data, see [Cost Evidence](cost-evidence/index.md). For migration from existing setups, see [Getting Started: Migration](getting-started.md#migration).
