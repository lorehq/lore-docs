---
title: "Memory Model"
---

# Memory Model

Lore uses a three-tier memory model that moves knowledge from volatile session context to permanent record. The tiers reflect how long a fact should live and how much operator oversight it needs.

## Tier 1: Hot Cache (Redis)

The Hot Cache is the primary working memory. Agents freely read and write to Redis throughout a session — no approval needed. Data persists across sessions via the Docker memory engine, with Redis data mounted from the global directory (`~/.lore/MEMORY/HOT/`).

**How heat works:**

- Every fact enters Redis with a base heat score.
- Each access (query, read, reference) increments the heat score and resets the decay timer.
- Unused facts decay exponentially (7-day half-life) — accessed once and forgotten, they fade over time.
- High-heat facts surface prominently in the session banner; low-heat facts fade and eventually expire.

**Key scoping:**

Hot memory keys are scoped to avoid cross-project collisions:

- **Global keys** (`lore:hot:global:{key}`) — facts relevant across all projects
- **Project keys** (`lore:hot:project:{project-name}:{key}`) — facts specific to a single project

The hot cache is ideal for:

- Active debugging context ("the API returns 403 when path contains slashes")
- Session tracking, task logs, and fieldnote drafts
- Current sprint knowledge ("deploy target is staging-east-2")
- Temporary environment facts that may or may not be worth keeping

Agents should default to the hot cache for any transient knowledge capture.

## Tier 2: Databank (~/.lore/)

The Databank is persistent structured storage at `~/.lore/MEMORY/DATABANK/`. It is write-guarded — agents propose changes, the operator approves during [burn](#graduation-path-via-lore-burn).

Seven root areas organized into three layers:

- **Identity** — `operator/` (operator profile + supporting docs), `machine/` (host profile + supporting docs). Both have sticky profiles auto-created if missing.
- **Knowledge** — `environment/` (external world: services, platforms, tooling), `fieldnotes/` (snags and gotchas), `runbooks/` (operational procedures).
- **Work** — `workspace/` containing `drafts/` (brainstorms as folders, notes as flat files), `projects/` (session log archives), and `work-items/` (Jira-like nested hierarchy: initiatives > epics > items).
- **Staging** — `imports/` for unsorted incoming docs.

The Databank loads every session. Rules, skills, and agents also live in the global directory but outside the databank — see [Agentic System](agentic-system.md).

## Tier 3: Session Scratchpad (MEMORY.md)

A per-repo fallback when the Docker memory engine is unavailable. The file `.lore/MEMORY.md` is gitignored and local to the machine. It provides basic scratchpad functionality but is not the primary memory path — use hot memory when available.

## Graduation Path (via /lore memory burn)

Knowledge moves up the tiers through a deliberate process:

1. **Session discovery** — the agent encounters a non-obvious fact during work
2. **Hot capture** — the fact is written to the Hot Cache (Redis)
3. **Heat accumulation** — repeated access across sessions increases the heat score
4. **Burn review** — the operator runs `/lore memory burn` to review high-heat facts
5. **Promotion** — approved facts become: DATABANK environment entries, work item updates, or fieldnotes

Not everything graduates. Most session context is disposable. The heat model ensures only genuinely useful knowledge persists.

## MCP Tools

The memory engine exposes its capabilities through MCP (Model Context Protocol) tools. When the MCP server is configured, agents interact with memory and search directly:

| Tool | Purpose |
|------|---------|
| `lore_search` | Semantic search across the databank |
| `lore_read` | Read a databank file by path |
| `lore_health` | Check memory engine availability |
| `lore_hot_write` | Write a fact to the hot cache |
| `lore_hot_recall` | List hot memory facts with scores |
| `lore_hot_fieldnote` | Draft a fieldnote in hot memory for later graduation |
| `lore_hot_session_note` | Record session context (decisions, scope, current task) |

When the memory engine is offline, agents fall back to `.lore/MEMORY.md` for session notes and Glob/Grep for search.
