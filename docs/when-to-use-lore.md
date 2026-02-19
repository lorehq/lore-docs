---
title: When to Use Lore
---

# When to Use Lore

Lore isn't for every project. This page helps you decide if it fits your workflow.

## Good Fit

**You work with coding agents regularly and notice them rediscovering the same things.**

- You've explained your project's auth quirks, deployment process, or API patterns to the agent more than once
- You have a growing project where context matters — service relationships, config conventions, infrastructure details
- You want the agent to get better over time without manual prompt engineering

**You use multiple repos or services that share context.**

- The agent needs to know about your infrastructure, CI setup, or cross-repo relationships
- You link work repos to a central knowledge hub so every project benefits from shared knowledge

**You want structured work tracking inside the agent's workflow.**

- Roadmaps and plans that survive session boundaries
- The agent sees active work items at startup and picks up where it left off

## Poor Fit

**Your projects are short-lived or disposable.**

- One-off scripts, throwaway prototypes, hackathon projects — the knowledge capture overhead isn't worth it when there's no "next session" to benefit from

**You don't use coding agents.**

- Lore is specifically for AI coding agents (Claude Code, Cursor, OpenCode). It has no value without one.

**You need team-wide real-time collaboration.**

- Lore is single-agent, single-user. Team workflows use git (branches, PRs, merges). There's no live sync, no conflict resolution beyond git, no multi-user access control.

**Your environment prohibits local file writes.**

- Lore stores everything as files in your git repo. Sandboxed environments, read-only containers, or restricted CI runners won't work.

## Team Workflows

Lore is designed for individual developers with coding agents, but teams can adopt it.

### One Instance Per Developer

Each developer maintains their own Lore instance. Knowledge captures reflect individual discoveries. Sharing happens through git — push your instance, teammates pull useful skills or docs into theirs.

**Pros:** No conflicts, each developer's agent learns their patterns.
**Cons:** Knowledge doesn't automatically propagate across the team.

### Shared Instance

The team shares a single Lore instance in a dedicated repo. Everyone commits knowledge to the same `docs/` and `.lore/skills/`. Standard git workflow applies — branches, PRs, code review.

**Pros:** Knowledge compounds across the whole team. New members benefit from day one.
**Cons:** Merge conflicts in docs. Capture conventions need team agreement. More noise in the knowledge base.

### Hub Per Team, Link Per Repo

A team maintains one Lore hub with shared knowledge. Each developer uses `lore link` to connect their work repos to the hub. The hub holds skills, conventions, and context. Work repos get hooks that point back to the hub.

**Pros:** Centralized knowledge, decentralized work. Each repo stays clean.
**Cons:** Hub maintenance is a team responsibility. Breaking changes in the hub affect all linked repos.

## Comparison With Alternatives

| Approach | Persistent? | Structured? | Agent-integrated? |
|----------|-------------|-------------|-------------------|
| **MEMORY.md** (platform built-in) | Partial — platforms overwrite between sessions | No — free-form text blob | Yes |
| **CLAUDE.md / .cursorrules** | Yes — git-tracked | Minimal — single file | Yes |
| **Custom system prompts** | Yes — but manual maintenance | Your structure | Depends on platform |
| **Lore** | Yes — git-tracked, multi-file | Yes — skills, agents, docs, conventions | Yes — hooks reinforce capture |

Lore's main value over simpler approaches is **compounding structure**. A `CLAUDE.md` file works fine at 50 lines. At 500 lines it becomes a wall of text the agent skims past. Lore routes knowledge to the right location (skill, doc, convention, runbook) and loads it on demand instead of dumping everything into every session.

If your project fits in a single `CLAUDE.md` and you're happy with it, you don't need Lore.

## Migration

### From CLAUDE.md / .cursorrules

1. Install Lore: `npx create-lore my-project`
2. Move project-specific rules to `docs/context/agent-rules.md`
3. Move coding conventions to `docs/context/conventions/`
4. Move gotchas and tricks to skills via `/lore-create-skill`
5. Move environment details (URLs, services, relationships) to `docs/knowledge/environment/`
6. Delete the old file — Lore generates `CLAUDE.md` from `.lore/instructions.md`

### From Scratch Notes / No System

1. Install Lore: `npx create-lore my-project`
2. Work normally. Hooks will nudge the agent to capture knowledge as it discovers things.
3. Run `/lore-capture` after substantive sessions to ensure nothing was missed.
4. Knowledge accumulates naturally. Review `docs/` periodically to prune noise.

### Uninstalling

Lore is just files. Delete the Lore directories and you're back to a normal project:

```bash
rm -rf .lore .claude .cursor .opencode hooks lib scripts
rm CLAUDE.md opencode.json mkdocs.yml .lore-config
```

Your `docs/` directory contains your accumulated knowledge — keep it or delete it. Nothing external to clean up. No accounts, no services, no subscriptions.
