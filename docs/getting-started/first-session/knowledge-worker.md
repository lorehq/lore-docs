---
title: First Session Setup
---

# First Session Setup

This guide covers what to do in your first working session — after installation, before any project work. The goal is to ground the agent in who you are, what tools you have, and what you're working on.

**Run this once per Lore instance.** A well-configured instance collaborates differently than a cold one.

!!! tip "Your agent can help with all of this"
    Everything on this page can be done conversationally once you've run `npx create-lore` and launched your agent. Ask it to walk you through first-session setup, or jump to any specific phase — "help me configure model tiers", "set up my keystore", "map my environment." The guide below explains what happens and why, but you don't need to follow it manually.

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

**Operator profile** — Tell the agent your name, role, org, and how you like to work. It will ask follow-up questions for anything it needs (accounts, preferences, constraints). The profile it writes (`docs/knowledge/local/operator-profile.md`, gitignored) gives the agent operator context — without it, the agent knows the knowledge base but not who it's working for.

**Machine inventory** — Tell the agent to discover your local machine. It can detect hostname, OS, installed runtimes, CLI tools, and shell environment on its own. It writes `docs/knowledge/local/machine.md` (gitignored).

**Agent rules** — Tell the agent what this instance is for: its name, scope, and any behavioral rules you want. Describe it conversationally — "this instance covers our cloud infra, always use the prod AWS account by default, never auto-commit." The agent writes `docs/context/agent-rules.md`, which is injected as PROJECT context every session.

---

## Phase 3: Model Configuration

**Goal:** Wire the three-tier worker system correctly before any delegation happens.

Tell your agent which models to use for each tier (fast, default, powerful) and it will configure `~/.claude/settings.json` and regenerate agent frontmatter. On the direct Anthropic API, short aliases work as-is. On hosted inference (Foundry, Bedrock, Vertex), tell the agent your deployment names.

The settings it writes look like this:

    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "<fast-model>",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "<default-model>",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "<powerful-model>"

This step is critical — Claude Code only accepts short aliases (`haiku`/`sonnet`/`opus`) in agent frontmatter. If frontmatter contains full model IDs or deployment names, Claude Code silently ignores the value and all workers run at the orchestrator's tier with no error. The agent handles this correctly.

Verify by asking the agent to run a quick worker test. Each tier should report the model it's running on.

---

## Phase 4: Keystore

**Goal:** Establish a secret store before ingesting any credentials.

**Rule:** Secrets never go in the knowledge base. The knowledge base documents item names and what they're for — never values.

Common options: [Vaultwarden](https://github.com/dani-garcia/vaultwarden) (self-hosted), 1Password CLI, Bitwarden (cloud), cloud KMS (AWS/Azure/GCP), or `pass` (GPG-based).

Authenticate the CLI yourself — keystore auth is interactive. Once authenticated, the agent discovers the configuration and documents items automatically.

---

## Phase 5: CLI Authentication

**Goal:** Authenticate external tooling in dependency order — keystore first, then tools that need keys from it.

CLI auth is interactive — do it yourself in order: VCS CLI first (`gh`, `glab`), then cloud provider (`az login`, `aws configure`, `gcloud auth`), then token-based tools (retrieve keys from the keystore).

!!! note "VCS CLI ≠ cloud CLI"
    Version control and cloud provider auth are separate systems. `az login` grants Azure access but not Azure DevOps — ADO requires its own PAT.

After authenticating, the agent verifies each tool and documents what it finds automatically.

---

## Phase 6: Environment Mapping

**Goal:** Map the services the agent will interact with. Don't rely on what you can recall.

Tell your agent to map your environment. It checks browser bookmarks/history, Docker inventory, repo scans, and company wikis rather than relying on your memory. It proposes doc structure, populates what it finds, and asks you to fill gaps.

Once mapped, tell the agent about your current initiatives. If your org uses a goal-tracking system (Workday, Lattice, Notion OKRs, Linear, etc.), export your goals as input — goals map to roadmaps, milestones map to plans.

---

## Phase 7: Knowledge Defrag

**Run this after the environment is substantially documented — not before.**

First-run generates environment docs fast. The result is usually a flat accumulation. Once Phases 2–6 are complete, tell your agent to run the knowledge defrag runbook. It handles everything: parallel inventory workers, structure proposal with operator review, execution, link repair, validation, and commit.

---

## Verification

Ask your agent to verify setup is complete — it checks profile, agent rules, worker tiers, keystore access, CLI auth, environment docs, semantic search, and active work items.
