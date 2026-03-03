---
title: "Memory Model"
---

# Memory Model

Lore uses a three-tier memory model that moves knowledge from volatile session context to permanent record. The tiers reflect how long a fact should live and how much operator oversight it needs.

## Tier 1: Hot Cache (Redis)

The Hot Cache is the primary working memory. Agents freely read and write to Redis throughout a session — no approval needed. Data persists across sessions via the Docker sidecar, with Redis data mounted from the global directory (`~/.lore/redis-data/`).

**How heat works:**

- Every fact enters Redis with a base heat score.
- Each access (query, read, reference) increments the heat score and resets the decay timer.
- Unused facts decay exponentially (7-day half-life) — accessed once and forgotten, they fade over time.
- High-heat facts surface prominently in the session banner; low-heat facts fade and eventually expire.

The hot cache is ideal for:

- Active debugging context ("the API returns 403 when path contains slashes")
- Session tracking, task logs, and fieldnote drafts
- Current sprint knowledge ("deploy target is staging-east-2")
- Temporary environment facts that may or may not be worth keeping

Agents should default to the hot cache for any transient knowledge capture.

## Tier 2: Knowledge Base (~/.lore/)

The Knowledge Base is persistent structured storage at `~/.lore/knowledge-base/`. It is write-guarded — agents propose changes, the operator approves during [memprint](#graduation-path-via-lore-memprint).

Contents:

- **`operator-profile.md`** — operator identity and preferences, injected at session start with a cyan marker
- **`work-items/`** — Jira-aligned tracking (initiatives, epics, items)
- **`drafts/`** — brainstorms and notes for operator-agent collaboration, quick captures to revisit later
- **`environment/`** — host machine info, service endpoints, file locations, network diagrams, SCM URLs, app inventory

The Knowledge Base loads every session. It contains fieldnotes, runbooks, environment facts, and work items. Rules, skills, and agents also live in the global directory but outside the KB — see [Agentic System](agentic-system.md).

## Tier 3: Session Scratchpad (memory.local.md)

A per-repo fallback when the Docker sidecar is unavailable. The file `.lore/memory.local.md` is gitignored and local to the machine. It provides basic scratchpad functionality but is not the primary memory path — use the hot cache when available.

## Graduation Path (via /lore-memprint)

Knowledge moves up the tiers through a deliberate process:

1. **Session discovery** — the agent encounters a non-obvious fact during work
2. **Hot capture** — the fact is written to the Hot Cache (Redis)
3. **Heat accumulation** — repeated access across sessions increases the heat score
4. **Memprint review** — the operator runs `/lore-memprint` to review high-heat facts
5. **Promotion** — approved facts become: KB environment entries, work item updates, or fieldnotes

Not everything graduates. Most session context is disposable. The heat model ensures only genuinely useful knowledge persists.

## Activity Tracking

The sidecar records every knowledge-path file access (fieldnotes, KB docs, skills). The `knowledge-tracker` hook pings the Docker sidecar's `/activity` endpoint on each access:

- Each access increments the heat score and resets the decay timer
- Frequently accessed facts surface prominently in the session banner
- Unused facts fade and eventually expire

This data drives the graduation logic. Facts that agents keep reaching for accumulate heat; facts that go untouched decay into irrelevance.
