---
title: "Global and Project Directories"
---

# Global and Project Directories

Lore separates machine-global knowledge (the `~/.lore/` directory) from project instances. This separation keeps private context out of project repositories while sharing it across every project on the machine.

## The Global Directory (~/.lore/)

The global directory is a Git repository in your home folder. It stores knowledge that applies across all your projects:

```
~/.lore/
├── config.json
├── docker-compose.yml   ── Sidecar service definition
├── .env                 ── LORE_TOKEN (auto-generated)
├── skills/              ─┐
├── rules/               ─┤ Behavioral spec
├── agents/              ─┘ (optional, user-defined)
├── knowledge-base/      ── Persistent KB (write-guarded)
│   ├── fieldnotes/          Captured snags and gotchas
│   ├── runbooks/            Multi-step procedures
│   ├── operator-profile.md  Operator identity & preferences
│   ├── work-items/          Initiatives, epics, items
│   ├── drafts/              Brainstorms, notes, collaboration scratch
│   └── environment/         Host machine, services, endpoints, network topology
└── redis-data/          ── Hot Cache persistence (Docker mount)
```

The global directory is operator-managed. You maintain it with Git like any other repo. The harness-guard hook blocks direct agent writes to `~/.lore/`. Agents read freely; writes to the Knowledge Base go through operator-gated processes like `/lore memory burn`. The only unguarded writes are to the Hot Cache (Redis), which agents use as working memory.

### What the Global Directory Contains

The global directory has three conceptual layers:

**Rules, Skills, and Agents** — The three standard components of the agentic framework. Rules govern behavior, skills provide capabilities, and agents define specialized personas. These are version-controlled, operator-managed, and projected into platform-native formats. See [Agentic System](agentic-system.md) for details.

**The Knowledge Base** — Structured markdown files with write-guard protection. Contains: `fieldnotes/` (captured snags and gotchas), `runbooks/` (multi-step procedures), `operator-profile.md` (injected at session start), `work-items/` (Jira-aligned tracking), `drafts/` (brainstorms and notes), and `environment/` (host machine info, service endpoints, network topology). Agents propose changes via burn; the operator approves.

**Hot Cache Data** — Redis persistence directory (`redis-data/`), mounted by the Docker sidecar. Stores transient session facts with heat-based decay. Data survives container restarts because it lives in the global `~/.lore/` filesystem, not the container.

## Project Instances

Each project repository carries its own `.lore/` directory with project-specific content:

```
my-project/
├── .lore/
│   ├── config.json      # Project config (overrides global)
│   ├── instructions.md  # Core protocol
│   ├── harness/         # Hooks, scripts, templates
│   ├── skills/          # Project-specific skills
│   ├── rules/           # Project-specific rules
│   └── memory.local.md  # Session scratchpad (gitignored)
├── src/                     # Project codebase
└── CLAUDE.md            # Generated platform projection
```

## Merge Behavior

At runtime, the harness merges global and project content. The project takes precedence:

| Content | Merge Strategy |
|---------|---------------|
| **Config** | Deep merge. Project fields override global fields. |
| **Rules** | Both loaded. Global rules + project rules, deduplicated by filename. |
| **Skills** | Both scanned. Project skills appear alongside global skills. |
| **Fieldnotes** | Global only (`~/.lore/knowledge-base/fieldnotes/`). |
| **Runbooks** | Global only (`~/.lore/knowledge-base/runbooks/`). |

The merge happens in `banner.js` (for session banners) and `projector.js` (for platform projections). There is no file copying — the harness reads from both directories at runtime.

## What Goes Where

| Content | Location | Why |
|---------|----------|-----|
| Snag you'll hit in any project | `~/.lore/knowledge-base/fieldnotes/` | Cross-project knowledge |
| Deployment procedure | `~/.lore/knowledge-base/runbooks/` | Reusable across projects |
| Your coding standards | `~/.lore/AGENTIC/rules/coding.md` | Apply everywhere |
| Project-specific lint config | `.lore/AGENTIC/rules/` | Only this project's conventions |
| Sidecar config | `~/.lore/docker-compose.yml` | One sidecar per machine |
| Operator profile | `~/.lore/knowledge-base/operator-profile.md` | Personal, cross-project |
| Service endpoints, host info | `~/.lore/knowledge-base/environment/` | Machine-specific facts |

## Global Directory Setup

The global directory is created automatically. When you run `create-lore` to scaffold a new project, it creates `~/.lore/` and populates the full directory skeleton if it doesn't already exist. Running `/lore update` on an existing project also creates and migrates the global directory.

Without a global `~/.lore/` directory, the harness works fine — all rules, skills, and agents come from the project's `.lore/` directory. The global directory adds cross-project persistence.

## Structural Versioning

The global directory has a structural version tracked in `~/.lore/config.json` as `globalStructureVersion`. This version is managed automatically by the migration system — you never edit it manually.

When the harness adds new subdirectories or seed files to the global directory layout, it ships a numbered migration file (e.g. `001-initial.js`, `002-add-templates.js`). Each migration is idempotent and runs only once. The version is bumped after each successful migration, so interrupted runs resume correctly.

**How migrations run:**

| Entry point | When | Action |
|---|---|---|
| `create-lore` | New project | Creates `~/.lore/` and runs all migrations |
| `/lore update` | Harness upgrade | Migrates `~/.lore/` to match the new harness version |
| Session start | Every session | **Warns only** — prints a red block if the global directory is outdated, never auto-migrates |

If your global directory is behind the harness version, you'll see a `[LORE-GLOBAL-VERSION-MISMATCH]` warning at session start. Run `/lore update` to resolve it.

## Sidecar (Docker)

The global directory hosts the Docker sidecar — a local service providing semantic search over the knowledge base and hot memory (Redis) for agent scratchpad use.

```
~/.lore/
├── docker-compose.yml   # Sidecar service definition
├── .env                 # LORE_TOKEN (auto-generated)
└── redis-data/          # Hot Cache persistence (Docker mount)
```

The `docker-compose.yml` and `.env` are created automatically by `create-lore` or `/lore update` (via migration 002). To customize ports, resource limits, or add services, edit `docker-compose.yml` directly — there is no config.json indirection.

The sidecar listens on port `9185` by default. If you change the port in `docker-compose.yml`, set `sidecarPort` in `~/.lore/config.json` to match so the harness probes the correct port.

Agents interact with the sidecar through MCP tools (`lore_search`, `lore_read`, `lore_hot_write`, `lore_hot_recall`, `lore_hot_fieldnote`) or direct HTTP as a fallback. Start and stop the sidecar with `/lore memory`.

## Git Versioning

The global directory is a standard Git repo. Commit after adding fieldnotes, updating rules, or changing your operator profile. This gives you a history of your machine-global knowledge and the ability to recover from mistakes.

Project `.lore/` files are part of the project repo and follow its commit history.
