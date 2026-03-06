---
title: "Global and Project Directories"
---

# Global and Project Directories

Lore separates machine-global knowledge (the `~/.lore/` directory) from project instances. This separation keeps private context out of project repositories while sharing it across every project on the machine.

## The Global Directory (~/.lore/)

The global directory is a directory in your home folder. It stores knowledge that applies across all your projects:

```
~/.lore/
├── config.json          ── Global config (memoryEngineUrl)
├── docker-compose.yml   ── Memory engine service definition
├── .harness/            ─┐
│   ├── SKILLS/          ─┤ System content (binary-managed,
│   ├── RULES/           ─┤ overwritten on every session init)
│   └── AGENTS/          ─┘
├── AGENTIC/             ─┐
│   ├── SKILLS/          ─┤ Behavioral spec
│   ├── RULES/           ─┤ (operator-managed)
│   └── AGENTS/          ─┘
└── MEMORY/              ─┐
    ├── DATABANK/        ─┤ Persistent databank (write-guarded)
    │   ├── environment/     External world: services, platforms, tooling
    │   ├── fieldnotes/      Captured snags and gotchas
    │   ├── imports/         Staging area for unsorted incoming docs
    │   ├── machine/         This host: hardware, OS, runtimes (sticky profile)
    │   ├── operator/        Operator identity & preferences (sticky profile)
    │   ├── runbooks/        Multi-step procedures
    │   └── workspace/       Operator/agent collaboration
    │       ├── drafts/          Brainstorms (folder-per) and notes (flat files)
    │       ├── projects/        Session log archives (per-project history)
    │       └── work-items/      Jira-like hierarchy (initiatives > epics > items)
    └── HOT/             ── Hot memory persistence (Docker mount)
```

The global directory is operator-managed. You maintain it with Git like any other repo. The harness-guard hook gates agent writes to `~/.lore/` — prompting the operator for approval. Agents read freely; writes to the Databank go through operator-gated processes like `/lore memory burn`. The only unguarded writes are to hot memory, which agents use as working memory via MCP tools.

### What the Global Directory Contains

The global directory has three conceptual layers:

**AGENTIC Content** — Rules, skills, and agents in `~/.lore/AGENTIC/` (operator-managed) and `~/.lore/.harness/` (binary-managed). Rules govern behavior, skills provide capabilities, and agents define specialized personas. System files (prefixed `lore-*`) live in `.harness/` and are overwritten by the binary on every session init; everything in `AGENTIC/` is operator-managed. See [Agentic System](agentic-system.md) for details.

**The Databank** — Structured markdown files with write-guard protection. Seven root areas organized into three layers: **Identity** (`operator/`, `machine/` — sticky profiles with supporting docs), **Knowledge** (`environment/`, `fieldnotes/`, `runbooks/`), and **Work** (`workspace/` — drafts, projects, work-items). Plus `imports/` as a staging area for unsorted docs. Agents propose changes via burn; the operator approves.

**Hot Cache Data** — Redis persistence directory (`MEMORY/HOT/`), mounted by the Docker memory engine. Stores transient session facts with heat-based decay. Data survives container restarts because it lives in the global `~/.lore/` filesystem, not the container.

## Project Instances

Each project repository carries its own `.lore/` directory with project-specific content:

```
my-project/
├── .lore/
│   ├── config.json      # Project config (overrides global)
│   ├── AGENTIC/
│   │   ├── SKILLS/      # Project-specific skills
│   │   ├── RULES/       # Project-specific rules
│   │   └── AGENTS/      # Project-specific agents
│   ├── MEMORY.md        # Session scratchpad (gitignored)
│   └── LORE.md          # Project instructions (projected into platform files)
├── src/                 # Project codebase
└── CLAUDE.md            # Generated platform projection
```

## Merge Behavior

When `lore generate` runs, the CLI merges three layers of AGENTIC content:

1. **Harness** (`~/.lore/.harness/`) — system content embedded in the binary, overwritten on every run. Highest priority for `lore-*` prefixed names.
2. **Global** (`~/.lore/AGENTIC/`) — operator's machine-global content.
3. **Project** (`.lore/AGENTIC/`) — project-local overrides (wins for non-`lore-*` names).

| Content | Merge Strategy |
|---------|---------------|
| **Rules** | Global + project loaded. Project rules override global rules with the same name. `lore-*` system rules resolve from harness. |
| **Skills** | All three layers scanned. Same `lore-*` precedence as rules. |
| **Agents** | All three layers scanned. Same `lore-*` precedence as rules. |
| **Fieldnotes** | Global only (`~/.lore/MEMORY/DATABANK/fieldnotes/`). |
| **Runbooks** | Global only (`~/.lore/MEMORY/DATABANK/runbooks/`). |

The merge happens in the `lore` CLI's composition engine during `lore generate`. There is no file copying — the binary reads from all directories and generates platform-native output.

## What Goes Where

| Content | Location | Why |
|---------|----------|-----|
| Snag you'll hit in any project | `~/.lore/MEMORY/DATABANK/fieldnotes/` | Cross-project knowledge |
| Deployment procedure | `~/.lore/MEMORY/DATABANK/runbooks/` | Reusable across projects |
| Your coding standards | `~/.lore/AGENTIC/RULES/coding.md` | Apply everywhere |
| Project-specific lint config | `.lore/AGENTIC/RULES/` | Only this project's conventions |
| Memory engine config | `~/.lore/docker-compose.yml` | One memory engine per machine |
| Operator profile | `~/.lore/MEMORY/DATABANK/operator/operator-profile.md` | Personal, cross-project |
| Machine specs, runtimes | `~/.lore/MEMORY/DATABANK/machine/machine-profile.md` | Host-specific identity |
| Service endpoints, platforms | `~/.lore/MEMORY/DATABANK/environment/` | External world facts |
| Brainstorm or design draft | `~/.lore/MEMORY/DATABANK/workspace/drafts/brainstorms/` | Folder-per-brainstorm |
| Strategic initiative | `~/.lore/MEMORY/DATABANK/workspace/work-items/initiatives/` | Jira-compatible hierarchy |

## Global Directory Setup

The global directory is created automatically. When you run `lore init` or `lore generate`, the CLI creates `~/.lore/` and populates the full directory skeleton if it doesn't already exist.

Without a global `~/.lore/` directory, Lore works fine -- all rules, skills, and agents come from the project's `.lore/AGENTIC/` directory. The global directory adds cross-project persistence.

## Memory Engine (Docker)

The global directory hosts the Docker memory engine — a local service providing semantic search over the databank and hot memory (Redis) for agent scratchpad use.

```
~/.lore/
├── config.json          # Global config (memoryEngineUrl)
├── docker-compose.yml   # Memory engine service definition
├── .env                 # LORE_TOKEN (optional, operator-created)
└── MEMORY/
    ├── DATABANK/        # Persistent databank (write-guarded)
    └── HOT/             # Hot memory persistence (Docker mount)
```

The `docker-compose.yml` is created automatically by `lore init`. To customize ports or resource limits, edit it directly. For API authentication, create `~/.lore/.env` with a `LORE_TOKEN` value.

The memory engine defaults to `http://localhost:9184`. To point at a different URL (remote instance, custom port), set `memoryEngineUrl` in `~/.lore/config.json`.

Agents interact with the memory engine through MCP tools (`lore_search`, `lore_read`, `lore_hot_write`, `lore_hot_recall`, `lore_hot_fieldnote`) or direct HTTP as a fallback. Start and stop the memory engine with `lore memory`.

## Git Versioning

The global directory can be version-controlled with Git. Run `git init` in `~/.lore/` to track changes to fieldnotes, rules, and your operator profile. This gives you a history of your machine-global knowledge and the ability to recover from mistakes.

Project `.lore/` files are part of the project repo and follow its commit history.
