---
title: First Session Setup
---

# First Session Setup

This guide covers what to do in your first working session — after installation, before any project work. The goal is to ground the agent in who you are, what tools you have, and what you're working on.

**Run this once per Lore instance.** A well-configured instance collaborates differently than a cold one.

## How to Run

Ask your agent:

> "Walk me through first-session setup."

The agent will follow this guide phase by phase, pausing at each decision point for your input.

---

## Phase 0: Version Control (Optional)

**Goal:** Decide whether this instance is git-tracked with a remote, or local-only.

A Lore instance is a git repo by default (`create-lore` runs `git init`). If you want to back up your knowledge base, share it across machines, or collaborate — add a remote now, before you start accumulating knowledge.

**Option A — Remote repository:**

Create a private repo on your SCM (GitHub, GitLab, Bitbucket, etc.) and add it as the remote:

    git remote add origin <your-repo-url>
    git push -u origin main

Your knowledge base, skills, conventions, and work tracking are now version-controlled and backed up with every push. This is the recommended path for any instance you rely on.

**Option B — Local-only:**

Skip the remote. The instance stays on your machine only.

!!! warning "Back up regularly"
    A local-only instance has no off-machine backup. Your knowledge base — skills, environment docs, runbooks, work tracking — accumulates real value over time. If you choose to stay local, set up regular external backups (Time Machine, rsync, cloud sync, etc.) so a disk failure doesn't erase months of captured knowledge.

You can always add a remote later. Nothing about the instance structure changes either way.

---

## Phase 1: Identity

**Goal:** Tell the agent who it is and who it serves.

**Operator profile** — Create `docs/knowledge/local/operator-profile.md` (gitignored). Minimum: name, role, org, accounts (VCS logins, cloud accounts), working style preferences, tool and CLI preferences. This is the first thing the agent reads each session — without it, every session starts cold.

**Agent rules** — Edit `docs/context/agent-rules.md`. Minimum: deployment assignment (instance name, operator, org), scope (what domains this instance covers), behavioral rules specific to this deployment (default accounts, constraints, known gotchas). This file is injected as PROJECT context every session.

**Machine inventory** — Create `docs/knowledge/local/machine.md` (gitignored). Capture: hostname, OS, installed runtimes (Node, Python, .NET, Go, etc.), CLI tools, shell environment. Prevents the agent from assuming a generic environment.

---

## Phase 2: Model Configuration

**Goal:** Wire the three-tier worker system correctly before any delegation happens.

Set model aliases in `~/.claude/settings.json` under `env`:

```json
"ANTHROPIC_DEFAULT_HAIKU_MODEL": "<fast-model>",
"ANTHROPIC_DEFAULT_SONNET_MODEL": "<default-model>",
"ANTHROPIC_DEFAULT_OPUS_MODEL": "<powerful-model>"
```

On hosted inference (Foundry, Bedrock, Vertex), these point to deployment names. On the direct Anthropic API, they point to model IDs.

After setting aliases, regenerate agent frontmatter:

```bash
node .lore/lib/generate-agents.js
```

**Do not skip this step.** Claude Code only accepts short aliases (`haiku`/`sonnet`/`opus`) in agent frontmatter. If frontmatter contains full model IDs or deployment names, Claude Code silently ignores the value — all workers run at the orchestrator's tier with no error.

Verify by asking the agent to run a quick worker test. Each tier should report the model it's running on.

---

## Phase 3: Keystore

**Goal:** Establish a secret store before ingesting any credentials.

**Rule:** Secrets never go in the KB. The KB documents item names and what they're for — never values.

| Option | Best for |
|--------|----------|
| [Vaultwarden](https://github.com/dani-garcia/vaultwarden) (self-hosted) | Local / air-gapped; full control |
| 1Password CLI (`op`) | Teams with an existing 1Password subscription |
| Bitwarden (cloud) | Cross-machine sync without self-hosting |
| Cloud KMS (AWS Secrets Manager, Azure Key Vault, GCP Secret Manager) | Existing cloud infrastructure |
| `pass` (GPG-based) | Unix environments; minimal dependencies |

Authenticate the CLI, verify access, and document the tool name and item naming convention in `docs/knowledge/environment/identity/`.

If importing browser-saved passwords, export from your browser and import via the keystore CLI. Delete the export file immediately — it is plaintext.

After setup, add a table to the keystore environment doc: item names, types, and purposes. This is the index the agent uses to know what's retrievable at runtime.

---

## Phase 4: CLI Authentication

**Goal:** Authenticate external tooling in dependency order — keystore first, then tools that need keys from it.

Authenticate in this sequence:

1. **Version control CLI** (GitHub CLI, GitLab CLI, Azure DevOps extension) — foundational; needed for all repo work
2. **Cloud provider CLI** (e.g. `az login`, `aws configure`, `gcloud auth login`) — needed before cloud-dependent tools
3. **Token-based tools** — anything needing a PAT or API key: retrieve from the keystore, export as env var or pass as flag

For each tool, document in `docs/knowledge/environment/`:

- Auth method and command
- Keystore item name (if credentials are stored there)
- Session management gotchas (expiry, CLI vs. SDK auth differences, multi-account switching)

!!! note "VCS CLI ≠ cloud CLI"
    Version control and cloud provider auth are separate systems. For example, `az login` grants Azure Resource Manager access but does not grant Azure DevOps access — ADO requires its own PAT and extension.

---

## Phase 5: Environment Mapping

**Goal:** Map the services the agent will interact with. Don't rely on what you can recall.

Document each service in `docs/knowledge/environment/<topic>/<service>.md`. Group by concern: `source-control/`, `cloud/`, `identity/`, `developer-tools/`, etc.

### Discovery Techniques

Don't rely on memory. These surface the full environment faster than asking:

**Browser bookmarks** — JSON files, readable while the browser is closed. Parse with Python's `json` module. Groups services you've used enough to bookmark.

**Browser history** — SQLite, accessible even after the browser is uninstalled:

```bash
# Use Python's built-in sqlite3 — no CLI install required
python -c "
import sqlite3, os
db = os.path.expanduser('~/path/to/History')
con = sqlite3.connect(db)
rows = con.execute('SELECT url, title, visit_count FROM urls ORDER BY visit_count DESC LIMIT 500').fetchall()
for r in rows: print(r[2], r[1], r[0])
"
```

**Docker inventory** — reveals running services, stopped dev stacks, and available MCP images:

```bash
docker ps -a --format "table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}"
docker images --format "table {{.Repository}}\t{{.Tag}}\t{{.Size}}"
```

Stopped containers = local dev stacks. Present images = available MCP servers. Both are faster than trying to recall what's running.

**Repo scan** — scan your VCS for active service domains and technology patterns:

```bash
# GitHub CLI
gh repo list <org> --limit 200 --json name,description,updatedAt
# GitLab, ADO: equivalent list commands
```

**Company wiki** — before writing any environment docs, search your org's wiki (Confluence, Notion, SharePoint) for domain models, architecture decisions, and system inventories. Someone may have done the work already.

**Generate a bookmarks file** — once the environment is mapped, ask the agent to generate a structured HTML bookmarks file grouped by category, ready for browser import.

### Active Work Context

After the environment is mapped, capture what you're actively working on:

- Ask about current initiatives, goals, and roadmaps
- If your org uses a goal-tracking system (Workday, Lattice, Notion OKRs, Linear cycles, etc.), export your current goals and pass them to the agent as input. Goals map directly to roadmaps; milestones map to plans.
- Create `docs/work/roadmaps/` for strategic initiatives (weeks to months)
- Create `docs/work/plans/` for tactical work in flight

---

## Phase 6: Semantic Search

```bash
/lore-docker
```

Or start manually:

```bash
docker compose -f .lore/docker-compose.yml up -d
curl http://localhost:9185/health
curl "http://localhost:9185/search?q=test&k=3"
```

On corporate networks, containers may need the org CA cert mounted. The embedding model (`BAAI/bge-small-en-v1.5`) is bundled in recent lore-docker releases.

---

## Phase 7: Repo Linking

```bash
/lore-link
```

Link each active application repo. Creates `.lore/links/` entries the agent uses to navigate between repos without losing KB context.

---

## Phase 8: Knowledge Defrag

**Run this after the environment is substantially documented — not before.**

First-run generates environment docs fast. The result is usually a flat accumulation. Once Phases 1–5 are complete, run the knowledge defrag runbook to restructure `docs/knowledge/` by content rather than creation order.

```bash
git checkout -b knowledge-defrag-$(date +%Y%m%d)
# Then ask:
# "Run the knowledge defrag runbook"
```

The runbook (`docs/knowledge/runbooks/system/knowledge-defrag.md`) handles everything: parallel inventory workers, structure proposal with operator review, execution, link repair, validation, and commit.

---

## Verification Checklist

- [ ] Operator profile and agent rules reflect current deployment
- [ ] Worker tiers (fast/default/powerful) route to the expected models
- [ ] Keystore accessible — agent can retrieve a test item
- [ ] VCS CLI authenticated and verified
- [ ] Cloud CLI authenticated (if applicable)
- [ ] All active services documented in `docs/knowledge/environment/`
- [ ] Semantic search returning results
- [ ] Active roadmaps and plans created for current initiatives

---

## Gotchas

These surfaced across multiple first-run deployments:

- **Keystore before credentials** — configure the keystore in Phase 3 before authenticating CLIs. Credentials ingested before a keystore exists have nowhere secure to go.
- **Worker tier routing** — Claude Code silently ignores full model IDs in agent frontmatter. Must use short aliases (`haiku`/`sonnet`/`opus`) and regenerate with `generate-agents.js` after any alias change.
- **VCS ≠ cloud auth** — version control and cloud provider CLI auth are independent. Authenticating one does not grant access to the other.
- **TLS required for localhost secret stores** — `bw` CLI 2026.x raises `InsecureUrlNotAllowedError` for localhost HTTP. Self-hosted Vaultwarden must serve TLS; a self-signed cert is sufficient.
- **Windows Git Bash path corruption** — strings with path-like segments (e.g. `-subj "/CN=localhost"`) are corrupted by Git Bash's automatic path conversion. Prefix with `MSYS_NO_PATHCONV=1`.
- **Env vars don't cross process boundaries** — variables set in one shell session don't propagate to the agent's shell. Re-export in the same process, or use the keystore CLI directly.
- **Browser history survives uninstall** — the SQLite `History` file remains in the user profile after a browser is uninstalled. Python's built-in `sqlite3` is sufficient to read it; no additional CLI required.
- **`docker ps -a` beats memory** — stopped containers reveal local dev stacks faster than trying to recall what you had running.
