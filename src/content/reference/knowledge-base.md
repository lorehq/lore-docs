---
title: "Knowledge Base"
---

# Knowledge Base

The knowledge base at `~/.lore/knowledge-base/` stores persistent knowledge that agents discover at runtime via the session banner and semantic search. Unlike rules, skills, and agents, knowledge base content is not projected into platform files.

## Fieldnotes

Captured snags, gotchas, and patterns from real work. Fieldnotes are the primary output of the knowledge capture process — when an agent hits a non-obvious issue, it becomes a fieldnote so the same mistake isn't repeated.

| Property | Value |
|----------|-------|
| Location | `~/.lore/knowledge-base/fieldnotes/<name>/FIELDNOTE.md` |
| Discovery | Banner name list + semantic search |
| Scope | Global |

**Frontmatter:**
```yaml
---
name: eslint-10-node-18-crash
description: ESLint 10 crashes on Node 18 due to missing structuredClone
captured: 2025-03-15
tags: [eslint, node, compatibility]
---
```

High-heat facts graduate to fieldnotes via `/lore memory burn`. The operator reviews hot cache entries and promotes reusable snags to permanent fieldnotes.

## Runbooks

Multi-step guides for complex operations. Runbooks provide structured autonomy with explicit checkpoints and branching.

| Property | Value |
|----------|-------|
| Location | `~/.lore/knowledge-base/runbooks/**/*.md` |
| Discovery | Banner list + semantic search |
| Scope | Global |

**Frontmatter:**
```yaml
---
name: first-session
description: Guided first session setup for a new project
type: guided
---
```

## Other Knowledge Base Content

| Directory | Purpose |
|-----------|---------|
| `operator-profile.md` | Operator identity and preferences — injected at session start |
| `environment/` | Host machine info, service endpoints, network topology |
| `work-items/` | Initiatives, epics, items |
| `drafts/` | Brainstorms, notes, collaboration scratch |

## How Agents Discover Knowledge

1. **Banner** — fieldnote and runbook names are listed in the session banner at startup, giving agents awareness of what's available
2. **Semantic search** — the Docker sidecar indexes all knowledge base files, enabling natural-language queries via the `lore_search` MCP tool
3. **Direct reads** — agents can read any knowledge base file directly once they know its path

Knowledge base writes are guarded — agents propose changes, the operator approves. The harness-guard hook blocks direct agent writes to `~/.lore/`.
