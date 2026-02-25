---
title: First Session Setup
---

# First Session Setup

This guide covers what to do in your first working session — after installation, before any project work. The goal is to ground the agent in who you are, what tools you have, and what you're working on.

**Run this once per Lore instance.** A well-configured instance collaborates differently than a cold one.

---

## Phase 0: Docs UI & Semantic Search

**Strongly recommended as your first step.** The Docker sidecar gives you semantic search across all knowledge and a live docs UI from the start. Every subsequent phase benefits from it — skills, environment docs, and runbooks you create become instantly searchable.

Tell your agent to start the docs sidecar. It will handle starting the Docker container, computing the port, and confirming when search is available.

On corporate networks, containers may need the org CA cert mounted — mention this to your agent if you're on a managed network. The embedding model (`BAAI/bge-small-en-v1.5`) is bundled in recent lore-docker releases.

If Docker isn't available, skip this and continue — everything works without it, you just lose semantic search and the live docs preview.

---

## Phase 1: Version Control (Optional)

**Goal:** Decide whether this instance is git-tracked with a remote, or local-only.

A Lore instance is a git repo by default (`create-lore` runs `git init`). If you want to back up your knowledge base, share it across machines, or collaborate — add a remote now, before you start accumulating knowledge.

**Option A — Remote repository:**

Create a private repo on your SCM (GitHub, GitLab, Bitbucket, etc.) and add it as the remote — or ask your agent to create one and push. Your knowledge base, skills, conventions, and work tracking are now version-controlled and backed up with every push. This is the recommended path for any instance you rely on.

**Option B — Local-only:**

Skip the remote. The instance stays on your machine only.

!!! warning "Back up regularly"
    A local-only instance has no off-machine backup. Your knowledge base — skills, environment docs, runbooks, work tracking — accumulates real value over time. If you choose to stay local, set up regular external backups (Time Machine, rsync, cloud sync, etc.) so a disk failure doesn't erase months of captured knowledge.

You can always add a remote later. Nothing about the instance structure changes either way.

---

## Phase 2: Identity

**Goal:** Ground the agent in who you are, what you have, and how you work.

**Operator profile** — Tell the agent your name, role, org, and how you like to work. It will ask follow-up questions for anything it needs (accounts, preferences, constraints). The profile it writes (`docs/knowledge/local/operator-profile.md`, gitignored) is the first thing it reads each session — without it, every session starts cold.

**Machine inventory** — Tell the agent to discover your local machine. It can detect hostname, OS, installed runtimes, CLI tools, and shell environment on its own. It writes `docs/knowledge/local/machine.md` (gitignored).

**Agent rules** — Tell the agent what this instance is for: its name, scope, and any behavioral rules you want. Describe it conversationally — "this instance covers our cloud infra, always use the prod AWS account by default, never auto-commit." The agent writes `docs/context/agent-rules.md`, which is injected as PROJECT context every session.

---

## Phase 3: Model Configuration

**Goal:** Wire the three-tier worker system correctly before any delegation happens.

Set model aliases in `~/.claude/settings.json` under `env` — this is system-level configuration outside the agent session, so you do it manually:

    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "<fast-model>",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "<default-model>",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "<powerful-model>"

On hosted inference (Foundry, Bedrock, Vertex), these point to deployment names. On the direct Anthropic API, they point to model IDs.

After setting the aliases, tell your agent to regenerate the agent frontmatter. This step is critical — Claude Code only accepts short aliases (`haiku`/`sonnet`/`opus`) in agent frontmatter. If frontmatter contains full model IDs or deployment names, Claude Code silently ignores the value and all workers run at the orchestrator's tier with no error.

Verify by asking the agent to run a quick worker test. Each tier should report the model it's running on.

---

## Phase 4: Keystore

**Goal:** Establish a secret store before ingesting any credentials.

**Rule:** Secrets never go in the KB. The KB documents item names and what they're for — never values.

| Option | Best for |
|--------|----------|
| [Vaultwarden](https://github.com/dani-garcia/vaultwarden) (self-hosted) | Local / air-gapped; full control |
| 1Password CLI (`op`) | Teams with an existing 1Password subscription |
| Bitwarden (cloud) | Cross-machine sync without self-hosting |
| Cloud KMS (AWS Secrets Manager, Azure Key Vault, GCP Secret Manager) | Existing cloud infrastructure |
| `pass` (GPG-based) | Unix environments; minimal dependencies |

Authenticate the CLI and verify access yourself — keystore auth is interactive and involves credentials. If importing browser-saved passwords, export from your browser, import via the keystore CLI, then delete the export file immediately — it is plaintext.

Once authenticated, the agent can discover the keystore configuration, list items, and document the tool, naming convention, and item index automatically.

---

## Phase 5: CLI Authentication

**Goal:** Authenticate external tooling in dependency order — keystore first, then tools that need keys from it.

CLI authentication is interactive, so you do it directly. Authenticate in this sequence:

1. **Version control CLI** (GitHub CLI, GitLab CLI, Azure DevOps extension) — foundational; needed for all repo work
2. **Cloud provider CLI** (e.g. `az login`, `aws configure`, `gcloud auth login`) — needed before cloud-dependent tools
3. **Token-based tools** — anything needing a PAT or API key: retrieve from the keystore, export as env var or pass as flag

!!! note "VCS CLI ≠ cloud CLI"
    Version control and cloud provider auth are separate systems. For example, `az login` grants Azure Resource Manager access but does not grant Azure DevOps access — ADO requires its own PAT and extension.

After authenticating, the agent can verify each tool works (`gh auth status`, `az account show`, etc.) and document what it finds — auth methods, keystore references, session gotchas — automatically.

---

## Phase 6: Environment Mapping

**Goal:** Map the services the agent will interact with. Don't rely on what you can recall.

Tell your agent to map your environment. It knows to check multiple sources rather than relying on your memory:

- **Browser bookmarks** — groups services you've used enough to bookmark
- **Browser history** — surfaces the full range of tools and services you interact with
- **Docker inventory** — reveals running services, stopped dev stacks, and available MCP images
- **Repo scan** — surfaces active service domains and technology patterns across your VCS
- **Company wiki** — Confluence, Notion, SharePoint — someone may have mapped the architecture already

The agent will propose an environment doc structure, populate it with what it finds, and ask you to fill in gaps it can't discover automatically.

Once the environment is mapped, tell your agent about your current initiatives and goals. If your org uses a goal-tracking system (Workday, Lattice, Notion OKRs, Linear cycles, etc.), export your current goals and share them as input — goals map to roadmaps, milestones map to plans. The agent will create the appropriate work tracking structure.

---

## Phase 7: Knowledge Defrag

**Run this after the environment is substantially documented — not before.**

First-run generates environment docs fast. The result is usually a flat accumulation. Once Phases 2–6 are complete, tell your agent to run the knowledge defrag runbook. It handles everything: parallel inventory workers, structure proposal with operator review, execution, link repair, validation, and commit.

---

## Verification

Ask your agent to verify the setup is complete. It will check:

- Operator profile and agent rules reflect current deployment
- Worker tiers (fast/default/powerful) route to the expected models
- Keystore accessible — agent can retrieve a test item
- VCS CLI authenticated and verified
- Cloud CLI authenticated (if applicable)
- All active services documented in `docs/knowledge/environment/`
- Semantic search returning results
- Active roadmaps and plans created for current initiatives
