---
title: How It Works
---

# How It Works

AI agents are ephemeral — every session starts from zero. Lore wraps your coding agent in a persistent, git-versioned knowledge base so it picks up where it left off.

## System Architecture

```mermaid
flowchart TB
    User([User Request]) --> Orchestrator

    subgraph Orchestrator["Orchestrator"]
        direction TB
        Parse[Parse Intent] --> Registry[Check Agent Registry]
        Registry --> Decide{Domain Match?}
    end

    Decide -->|Yes| Delegate[Delegate to Domain Agent]
    Decide -->|No| Direct[Handle Directly]

    subgraph Agent["Domain Agent"]
        direction TB
        Skills[Load Skills] --> Tools[Call Tools]
        Tools --> Result[Return Result]
    end

    Delegate --> Agent
    Direct --> Tools2[Call Tools Directly]
    Agent --> Respond[Respond to User]
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

## Three Goals

### 1. Knowledge Capture

Every session produces knowledge as a byproduct — endpoints, gotchas, org structure, tool parameters. Post-tool-use reminders encourage the agent to extract this into persistent documentation. When an operation produces non-obvious knowledge, it becomes a skill. When a skill has a clear domain, it gets an agent.

#### The "Don't Ask Twice" Loop

```mermaid
sequenceDiagram
    participant S1 as Session N
    participant Docs as docs/knowledge/
    participant S2 as Session N+1

    Note over S1: User asks about service org structure
    S1->>S1: Discovers org name is case-sensitive
    S1->>S1: Discovers available projects

    Note over S1: Capture checkpoint
    S1->>Docs: Write integration docs + create skill with gotchas

    Note over S2: Different session, same question
    S2->>Docs: Read docs — already knows org, projects, auth
    Note over S2: Minimal rediscovery
    S2->>S2: Execute immediately with correct parameters
```

#### What Gets Captured Where

| Knowledge Type | Destination | Example |
|---------------|-------------|---------|
| API endpoints, URLs, services | `docs/knowledge/environment/` | Service API base URL |
| Tool gotchas, auth quirks | `.lore/skills/` | Case-sensitive org name |
| Dependencies, relationships | `docs/knowledge/environment/` | Which services connect to what |
| Strategic initiatives | `docs/work/roadmaps/` | Cloud migration phases |
| Tactical work | `docs/work/plans/` | Phase 1 networking setup |
| Multi-step procedures | `docs/knowledge/runbooks/` | Deploy to staging |

#### How Skills and Agents Emerge

**Rule: Every gotcha becomes a skill.** Auth quirks, encoding issues, parameter tricks — all skills. Skills must be generic (no context data). Skill creation can trigger agent creation: one agent per domain.

```mermaid
flowchart TD
    op[Operation Completed] --> gotcha{Hit any\ngotchas?}
    gotcha -->|No| skip[No skill needed]
    gotcha -->|Yes| createSkill[Create skill]
    createSkill --> domainClear{Clear domain?}
    domainClear -->|No| unassigned[Skill stays unassigned]
    domainClear -->|Yes| agentExists{Agent exists?}
    agentExists -->|Yes| addToAgent[Add skill to agent]
    agentExists -->|No| createAgent[Create agent + add skill]
```

### 2. Delegation

The orchestrator routes work to domain agents based on a simple rule: **domain = delegation trigger**. Agents own their domain end-to-end and create skills as they need them.

```mermaid
flowchart TD
    Request[Incoming Request] --> Parse[Identify Domain]
    Parse --> Q1{Clear domain?}
    Q1 -->|No| GP[Handle Directly]
    Q1 -->|Yes| Q3{Agent exists?}
    Q3 -->|Yes| Delegate[Delegate to domain agent]
    Q3 -->|No| Create[Handle directly + create agent during capture]
    Delegate --> Review[Review + Respond]
    Create --> Delegate
    GP --> Review
```

| Orchestrator | Domain Agent |
|-------------|-------------|
| Understand user intent | Execute domain tasks |
| Choose which agent(s) | Load and use domain skills |
| Coordinate multi-agent flows | Create new skills when needed |
| Strategic decisions | Domain-specific details |

### 3. Session Acceleration

Session acceleration is the compound effect of knowledge capture and delegation working together. As captured knowledge builds the base and delegation distributes the workload, each session benefits from every previous session's discoveries.

```mermaid
flowchart TB
    subgraph P1["Phase 1: Foundation"]
        P1a[Explore integrations]
        P1b[Hit gotchas, create first skills]
        P1c["Heavy discovery cost"]
    end

    subgraph P2["Phase 2: Specialization"]
        P2a[Agents handle domain work]
        P2b[Context knowledge fills in]
        P2c["Balanced: execute + delegate"]
    end

    subgraph P3["Phase 3: Full Context"]
        P3a[Orchestrator delegates most work]
        P3b[Full context]
        P3c["Minimal discovery, maximum leverage"]
    end

    P1 --> P2 --> P3
```

**Phase 1 (Foundation):** First sessions discover everything — org names, auth flows, tool parameters. Capture extracts each gotcha as a skill or doc.

**Phase 2 (Specialization):** Domain agents handle routine work. The orchestrator delegates more than it executes. Context knowledge fills in.

**Phase 3 (Full Context):** Most requests dispatch directly to agents. Strong context. Novel work is the primary remaining discovery cost.

## Context Efficiency

A persistent knowledge base needs to be *available* every session without being *loaded* every session. Lore resolves this with **indirection** — telling the agent *where to find things* rather than loading everything into context. At session start, the agent receives a structured banner: framework rules, your project context, and a knowledge map showing what exists. Skills and docs are loaded on-demand.

| Layer | What It Contains |
|-------|------------------|
| `.lore/instructions.md` (~80 lines) | Framework rules, knowledge routing, naming conventions |
| Session start: framework | Operating principles, active agents, active roadmaps/plans |
| Session start: project context | Operator customization from `docs/context/agent-rules.md` (project identity, agent behavior) |
| Session start: conventions | Coding and docs standards from `docs/context/conventions/` — injected every session |
| Session start: knowledge map | ASCII tree of docs/, skills/, and agents/ — current structure at a glance |
| Session start: local memory | Scratch notes from `MEMORY.local.md` (gitignored) — included when non-empty |
| Per-prompt reinforcement | Delegation reminder + task-list guidance (every prompt) |
| Post-tool-use reinforcement | Capture reminders with escalating urgency (after bash commands and file edits) |
| Skills and docs | Loaded on-demand when invoked or needed |

Things that grow fastest (docs, skills) have zero baseline cost. Things with nonzero cost (agents, active roadmaps) grow slowly.

## Hook Architecture

Lore hooks into the agent's lifecycle at four points. Shared logic lives in `lib/`, with thin adapters for each platform.

### Hook Lifecycle

```mermaid
sequenceDiagram
    participant User
    participant Agent
    participant Hooks
    participant KB as Knowledge Base

    Note over Hooks: SessionStart
    Hooks->>KB: ensureStickyFiles()
    Hooks->>KB: Read agent-rules, conventions, work items
    Hooks->>Agent: Inject session banner

    loop Every Prompt
        User->>Agent: Message
        Note over Hooks: UserPromptSubmit
        Hooks->>Agent: Delegation reminder
        Agent->>Agent: Work (tool calls)

        Note over Hooks: PreToolUse
        Hooks->>Agent: Memory guard (block MEMORY.md)
        Hooks->>Agent: Context path guide (show tree)

        Note over Hooks: PostToolUse
        Hooks->>Agent: Capture reminder (escalating)
        Hooks->>Hooks: Set nav-dirty flag if docs/ changed
    end
```

### Module Layout

```mermaid
flowchart TB
    subgraph lib["lib/ (shared core)"]
        banner["banner.js<br/>Banner assembly"]
        tree["tree.js<br/>ASCII tree builder"]
        config["config.js<br/>Config reader"]
        sticky["sticky.js<br/>Sticky file scaffold"]
        tracker["tracker.js<br/>Tool classification"]
        guard["memory-guard.js<br/>MEMORY.md protection"]
        debug["debug.js<br/>Debug logging"]
    end

    subgraph claude["Claude Code (hooks/)"]
        cc_si[session-init.js]
        cc_pp[prompt-preamble.js]
        cc_pm[protect-memory.js]
        cc_kt[knowledge-tracker.js]
        cc_cp[context-path-guide.js]
    end

    subgraph cursor["Cursor (.cursor/hooks/)"]
        cu_si[session-init.js]
        cu_pp[prompt-preamble.js]
        cu_pm[protect-memory.js]
        cu_kt[knowledge-tracker.js]
    end

    subgraph opencode["OpenCode (.opencode/plugins/)"]
        oc_si[session-init.js]
        oc_pm[protect-memory.js]
        oc_kt[knowledge-tracker.js]
        oc_cp[context-path-guide.js]
    end

    cc_si & cu_si & oc_si --> banner
    banner --> tree & config & sticky
    cc_kt & cu_kt & oc_kt --> tracker
    cc_pm & cu_pm & oc_pm --> guard
    cc_cp & oc_cp --> tree & config
    tracker & guard & tree & config --> debug
```

### Platform Adapters

Each platform has a different hook API. Adapters are thin — they translate between the platform's interface and the shared `lib/` functions.

| Hook Point | Claude Code | Cursor | OpenCode |
|-----------|-------------|--------|----------|
| Session start | `SessionStart` subprocess → stdout JSON | `sessionStart` subprocess → stdout | `session.created` event → `client.session.prompt()` |
| Per-prompt reminder | `UserPromptSubmit` → stdout | `beforeSubmitPrompt` → stdout | `experimental.chat.system.transform` → system prompt |
| Memory guard | `PreToolUse` → stdin JSON, stdout JSON | `beforeReadFile` → exit code | `tool.execute.before` → async handler |
| Knowledge tracker | `PostToolUse` → stdin JSON, stdout | `afterFileEdit` / `afterShellExecution` → stdout | `tool.execute.after` → async handler |
| Context path guide | `PreToolUse` → stdin JSON, stdout JSON | — | `tool.execute.before` → async handler |
| Compaction resilience | N/A (context preserved) | Condensed banner every prompt | `experimental.session.compacting` → re-inject |

## Limitations

- **AI compliance**: Reinforcement prompts encourage capture and delegation but cannot force it. The agent may skip reminders in long sessions.
- **Operator involvement**: Running `/lore-capture` after substantive work improves capture rates. The system works best as a collaboration.
- **Knowledge completeness**: Early sessions have gaps. Context accumulates with each session. Quality correlates with capture consistency.
