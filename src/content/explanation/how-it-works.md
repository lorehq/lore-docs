---
title: How It Works
---

# How It Works

Every session starts from zero. Lore is the harness that changes that.

## Harness Engineering

Prompt engineering optimizes a single interaction. Context engineering optimizes a single session. Harness engineering optimizes **all sessions** — the system that makes every future session better than the last.

The harness is everything that wraps the agent: hooks, delegation patterns, worker tiers, capture lifecycle, semantic search, the skill system, and the rules governing how they interact. A single `npx create-lore` gives you the scaffolding.

| What Lore does | How |
|---|---|
| Make knowledge findable | Git-tracked knowledge base (`docs/`), semantic search, session banner with knowledge map |
| Enforce rules mechanically | Pre-tool-use hooks validate before writes land; `validate-consistency.sh` catches drift |
| Delegate with focused context | Orchestrator routes to tiered workers (Opus reasons, Haiku executes) — [59% cheaper](../evidence/index.md) at steady state |
| Load knowledge on demand | Skills and docs load when needed; only the knowledge map appears at session start |
| Capture knowledge automatically | Gotchas become fieldnotes, environment facts become docs, procedures become runbooks — all git-tracked |
| Manage entropy | Consistency validation, rule guards, escalating capture reminders |

!!! note "Further reading"
    The term gained traction in early 2026: [OpenAI's Codex team](https://openai.com/index/harness-engineering/) on designing environments over writing code, [Birgitta Bockeler](https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html) on context engineering + architectural constraints + entropy management, [Anthropic](https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents) on subagent architectures and progressive disclosure, and [Karpathy](https://karpathy.bearblog.dev/year-in-review-2025/) on the LLM-as-operating-system metaphor.

## Four Primitives

The industry has converged on three primitives for coding agents: rules, skills, and agents. Every major tool uses some version of this — `.cursorrules`, `CLAUDE.md`, Aider's `CONVENTIONS.md`, Windsurf's `.windsurfrules`. Lore uses the same primitives but adds a fourth — fieldnotes — and differentiates on how they interact:

1. **Auto-capture loop** — fieldnotes (environmental gotchas) are captured during work and reinjected by relevance in future sessions
2. **Separation of operator-authored rules from system-captured fieldnotes** — your coding standards never get tangled with machine-generated knowledge
3. **Tiered cost-optimized delegation** — workers at different price points (fast/cheap to slow/powerful) spawned per-task
4. **Cross-session compound learning** — every session makes the next one better, with knowledge accumulating in git
5. **Pre-write enforcement hooks** — rules are enforced at write time, not just loaded at session start

**Rules** are the operator's concern. Coding standards, security policies, documentation guidelines — written and revised by the operator, loaded by name or injected by the harness before relevant actions. Most tools put these in a single rules file (`.cursorrules`, `CLAUDE.md`, custom instructions). Lore separates them from system-captured knowledge so operator-authored standards stay clean.

**Skills** are procedural capabilities managed by the system. Step-by-step instructions for specific operations — how to deploy, how to run a field repair, how to construct a worker prompt. Skills are loaded on demand when the orchestrator delegates related tasks.

**Fieldnotes** are environmental knowledge captured automatically. When the agent hits a gotcha — an API that returns 403 because path segments need URL-encoded slashes, a CLI flag that silently breaks on macOS — that fix becomes a fieldnote. Fieldnotes aren't written by the operator. They emerge from work, grow the knowledge base, and get reinjected in future sessions when semantically relevant. The operator can review and browse them in the docs UI or through conversation with the agent.

**Agents** are managed by the system. Tiered workers (from fast/cheap to slow/powerful) that the orchestrator spawns per-task with curated skills, rules, and fieldnotes. Dynamic and ephemeral — created for a task, dissolved after. The operator doesn't configure or manage agents — the harness handles delegation.

| Primitive | Source | Lifecycle | Loaded |
|-----------|--------|-----------|--------|
| Rules | Authored by the operator | Stable — updated deliberately | Lazy-loaded by name or injected before relevant actions |
| Skills | Defined by the harness | Procedural — loaded on demand | Per delegation, by task relevance |
| Fieldnotes | Captured during work | Growing — system-captured from gotchas | On demand, by semantic relevance |
| Agents | Defined by the harness | Dynamic — spawned and dissolved per-task | Per delegation |

Rules make the agent consistent. Skills give it capabilities. Fieldnotes prevent repeated failures. Agents make it scalable.

## System Architecture

```mermaid
flowchart TB
    User([User Request]) --> Orchestrator

    subgraph Orchestrator["Orchestrator"]
        direction TB
        Parse[Parse Intent] --> Decide{Delegate?}
        Decide -->|Yes| Select[Select skills from registry]
    end

    Decide -->|No| Direct[Handle Directly]
    Select --> Spawn[Spawn Worker Agent]

    subgraph Worker["Worker Agent"]
        direction TB
        Load[Load skills + rules] --> Tools[Call Tools]
        Tools --> Result[Return Result]
    end

    Spawn --> Worker
    Direct --> Tools2[Call Tools Directly]
    Worker --> Respond[Respond to User]
    Tools2 --> Respond

    Respond --> Capture

    subgraph Capture["Knowledge Capture"]
        direction TB
        H1[Capture Knowledge] --> H2[Evaluate Skills]
        H2 --> H3[Check Consistency]
    end

    Capture --> KB[(Knowledge Base)]
    KB -.->|Next Session| Parse
```

## Knowledge Capture

Every session produces knowledge as a byproduct — endpoints, gotchas, org structure, tool parameters. Post-tool-use reminders encourage the agent to extract that knowledge into persistent documentation. When an operation produces non-obvious environmental knowledge, it becomes a fieldnote. When it produces a reusable procedure, it becomes a skill. The orchestrator finds relevant fieldnotes and skills by name and description when delegating related tasks.

### The Capture-and-Reuse Loop

```mermaid
sequenceDiagram
    participant S1 as Session N
    participant Docs as docs/knowledge/
    participant S2 as Session N+1

    Note over S1: User asks about service org structure
    S1->>S1: Discovers org name is case-sensitive
    S1->>S1: Discovers available projects

    Note over S1: Capture checkpoint
    S1->>Docs: Write integration docs + create fieldnote with gotchas

    Note over S2: Different session, same question
    S2->>Docs: Read docs — already knows org, projects, auth
    Note over S2: Minimal rediscovery
    S2->>S2: Execute immediately with correct parameters
```

### Ownership

See [Platform Overview: Sync Boundaries](../reference/platforms/index.md#sync-boundaries) for the `lore-*` prefix convention and what sync overwrites.

### How Fieldnotes Grow

Fieldnotes are created from gotchas encountered during work. Lore ships with built-in workers (`lore-worker` tiers and `lore-explore`) — dynamic, ephemeral agents that are spawned per-task with specific rules, skills, and fieldnotes to load, then dissolved after the task completes.

```mermaid
flowchart TD
    op[Operation Completed] --> gotcha{"Hit any<br/>gotchas?"}
    gotcha -->|No| skip[No fieldnote needed]
    gotcha -->|Yes| createFieldnote[Create fieldnote]
    createFieldnote --> registry[Update registries]
    registry --> done["Fieldnote available for<br/>worker delegation"]
```

For the full capture routing table, see [Knowledge Routing Reference](../reference/commands.md).

See [How Delegation Works](delegation.md) for the orchestrator-worker model, worker tiers, and session acceleration.

## Context Efficiency

Lore uses indirection — telling the agent *where to find things* rather than loading all knowledge into context at session start.

| Layer | What It Contains |
|-------|------------------|
| `.lore/instructions.md` | Harness rules, knowledge routing, naming conventions |
| Session start: harness | Operating principles, available workers, active roadmaps/plans |
| Session start: project context | Operator customization from `docs/context/agent-rules.md` |
| Session start: operator profile | Identity and preferences from `docs/knowledge/local/operator-profile.md` (gitignored) |
| Session start: rules | Coding and docs standards from `docs/context/rules/` |
| Session start: knowledge map | Directory tree of `docs/` and `.lore/skills/` |
| Session start: local memory | Scratch notes from `.lore/memory.local.md` (gitignored) |
| Per-prompt reinforcement | Delegation + knowledge discovery + work tracking nudges |
| Post-tool-use reinforcement | Capture reminders with escalating urgency |
| Skills and docs | Loaded on-demand when invoked or needed |

**Static vs. dynamic banner split:** Rules, agent-rules, and project context are baked into `CLAUDE.md` at generation time — these are stable and benefit from prompt cache hits. Active work items, the knowledge map, and the fieldnote/skill registries are injected by the `SessionStart` hook each session, so they stay current without regenerating `CLAUDE.md`.

When the Docker sidecar is running, the session banner includes a semantic search URL. Agents query by topic to find relevant docs and skills without loading the full directory tree.

## Hook Architecture

Hooks fire at key lifecycle events — session start, prompt submit, pre-tool-use, post-tool-use, and post-tool-use-failure. Shared logic in `.lore/lib/` keeps behavior consistent; each platform has thin adapters that translate between its hook API and the shared modules. Hook implementations vary by platform — see [Hook Architecture](hook-architecture.md) for the shared lib deep-dive and [Platform Overview](../reference/platforms/index.md) for per-platform specifics.

For limitations and known gaps, see [Production Readiness](production-readiness.md#known-limitations).

## See Also

- [Delegation](delegation.md) — orchestrator-worker model and session acceleration
- [Hook Architecture](hook-architecture.md) — lifecycle events, shared lib, platform adapters
- [Security](security.md) — how security is enforced across every write
- [Getting Started](../getting-started/index.md) — hands-on introduction
