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

The Knowledge Base is persistent structured storage at `~/.lore/knowledge-base/`. It is write-guarded — agents propose changes, the operator approves during [burn](#graduation-path-via-lore-burn).

Contents:

- **`operator-profile.md`** — operator identity and preferences, injected at session start with a cyan marker
- **`work-items/`** — Jira-aligned tracking (initiatives, epics, items)
- **`drafts/`** — brainstorms and notes for operator-agent collaboration, quick captures to revisit later
- **`environment/`** — host machine info, service endpoints, file locations, network diagrams, SCM URLs, app inventory

The Knowledge Base loads every session. It contains fieldnotes, runbooks, environment facts, and work items. Rules, skills, and agents also live in the global directory but outside the KB — see [Agentic System](agentic-system.md).

## Tier 3: Session Scratchpad (memory.local.md)

A per-repo fallback when the Docker sidecar is unavailable. The file `.lore/memory.local.md` is gitignored and local to the machine. It provides basic scratchpad functionality but is not the primary memory path — use the hot cache when available.

## Graduation Path (via /lore memory burn)

Knowledge moves up the tiers through a deliberate process:

1. **Session discovery** — the agent encounters a non-obvious fact during work
2. **Hot capture** — the fact is written to the Hot Cache (Redis)
3. **Heat accumulation** — repeated access across sessions increases the heat score
4. **Burn review** — the operator runs `/lore memory burn` to review high-heat facts
5. **Promotion** — approved facts become: KB environment entries, work item updates, or fieldnotes

Not everything graduates. Most session context is disposable. The heat model ensures only genuinely useful knowledge persists.

## MCP Tools

The sidecar exposes its capabilities through MCP (Model Context Protocol) tools. When the MCP server is configured, agents interact with memory and search directly:

| Tool | Purpose |
|------|---------|
| `lore_search` | Semantic search across the knowledge base |
| `lore_read` | Read a knowledge base file by path |
| `lore_health` | Check sidecar availability |
| `lore_hot_write` | Write a fact to the hot cache |
| `lore_hot_recall` | List hot memory facts with scores |
| `lore_hot_fieldnote` | Draft a fieldnote in the hot cache for later graduation |

When the sidecar is offline, agents fall back to `memory.local.md` for session notes and Glob/Grep for search.
