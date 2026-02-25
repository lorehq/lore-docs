---
title: Changelog
---

# Changelog

All notable changes to Lore are documented here. For full commit history, see [GitHub Releases](https://github.com/lorehq/lore/releases).

## v0.13.0 — 2026-02-24

Platform docs restructure, cost evidence transparency, Docker nav fix.

**Documentation:**

- Split `platform-support.md` into 4-page section: platform overview, Claude Code, Cursor, OpenCode
- Platform maturity levels: Claude Code (Supported), Cursor and OpenCode (Experimental)
- Feature parity matrix across all three platforms
- Cost evidence page: added full caveats (Claude Code only, full integration not OOTB, small sample N=10, estimated costs, v0.11.0), contribute section inviting independent verification
- `lore-gotcha-demo` README expanded with full methodology, exact operator inputs, calculation runbook, and verification scripts
- First-session guide: added Phase 0 for optional version control / remote setup with backup advice for local-only instances
- General pages (`how-it-works`, `hook-architecture`) made platform-agnostic — implementation details moved to per-platform pages

**Docker runtime (`lorehq/lore-docker`):**

- Fix Docs nav link pointing to `localhost` instead of external GitHub Pages URL — introduced `SITE_URL` separation from `DOCS_EXTERNAL_URL`

**Housekeeping:**

- Flagged `docs-code-alignment-sweep` runbook as a seed example with highlights
- Removed leaked internal runbook from source repo
- Platform table in README now shows maturity column

## v0.12.9 — 2026-02-24

Harness rename, first-session guides, Docker runtime fixes.

**Naming:**

- Reframed from "coding agent framework" to "coding agent harness" throughout — `framework-guard` → `harness-guard`, `sync-framework.sh` → `sync-harness.sh`, all instructions and banner text updated

**First-session experience:**

- Fresh instances now guided to first-session setup instead of pre-structuring the knowledge base
- Added first-session setup runbooks as seeds (knowledge-worker, homelab, personal)

**Skills and agents:**

- All skills now synced to `.claude/skills/` (previously only `type: command` skills were copied)
- `user-invocable` field now required on all skill frontmatter
- Config-driven model stamping for all agents across all platforms
- New built-in skills: `mcp-stdio-content-length-framing`, `node-macos-stdin-fd`

**Docker runtime (`lorehq/lore-docker`):**

- Fix panzoom plugin assets lost on `mkdocs serve` livereload — assets now staged into docs workdir
- Fix `site_url` subpath breaking all local asset resolution — defaults to `localhost` for dev serving
- Header subtitle now shows instance version from config

**Release pipeline:**

- `release.sh` now tags `lore-docker` alongside `lore` and `create-lore`
- `bump-version.sh` regenerates derived files after version update
- Added prompt-engineering convention as seed template

## v0.12.0 — 2026-02-23

OpenCode config fix, search-guard hook, notes support.

- Fix `opencode.json`: use OpenCode's `mcp` key and command array format (was `mcpServers` — caused "Unrecognized key" validation error)
- Add `search-guard` PreToolUse hook — nudges semantic search before speculative file reads when Docker sidecar is configured
- Add `lore-create-note` skill for lightweight capture during deep work
- Add OpenCode `/lore-ui` command stub
- Add direction guard to `sync-framework.sh` (prevents backwards sync)
- Fix Docker config: static default ports, clean template, opt-in dynamic ports

## v0.11.1 — 2026-02-22

Default config template and MCP tool renames.

- Default `config.json` template now ships with docker ports (9184/9185), `standard` profile, `subagentDefaults`, and semantic search settings
- Static/dynamic banner split: conventions and project context baked into `CLAUDE.md` at generation time; active work items and knowledge map injected by `SessionStart` hook each session
- MCP search server tools renamed: `lore_search`, `lore_read`, `lore_health`

## v0.11.0 — 2026-02-22

Worker agent tier naming simplification.

**Worker agents:**

- `lore-worker-agent` renamed to `lore-worker`
- `lore-worker-default` variant removed — `lore-worker` is now the single standard worker
- `lore-worker-fast` and `lore-worker-powerful` are only generated when the corresponding tier key is present in `subagentDefaults.claude`

**Configuration:**

- Flat `subagentDefaults` schema removed — no backward compatibility provided
- New nested schema: `subagentDefaults.claude = { fast?, default?, powerful? }`
- `lore-worker` uses `claude.default` model if set, otherwise omits the model field (platform picks its own default)

## v0.10.0 — 2026-02-21

Hook profiles, operator.gitignore persistence, and framework consolidation.

**Configuration:**

- Hook profiles (`minimal`, `standard`, `discovery`) — configurable via `profile` in `.lore/config.json`
- Bash tracking now threshold-only: silent below nudge threshold, emits only at crossing points
- `discovery` profile: nudge=5, warn=10 (aggressive capture for exploration-heavy work)
- `standard` profile: nudge=15, warn=30 (default)

**Operator gitignore persistence:**

- `sync-framework.sh` now merges `.lore/operator.gitignore` into `.gitignore` on every update
- Operator-added ignore rules survive framework updates — no more re-adding after `/lore-update`
- Bootstraps an empty `.lore/operator.gitignore` template on first sync

**New skills:**

- `/lore-docker` — start, stop, and inspect the local docs UI (Docker + mkdocs fallback)
- `/lore-delegate` — delegation recipe: how to construct worker prompts with context, scope, return contract

**Framework layout:**

- All framework dirs consolidated under `.lore/` (hooks, lib, scripts, skills, agents)
- `ensure-structure.sh` — idempotent structure init for new instances
- `docker-compose.yml` moved into `.lore/` and synced as framework-owned

## v0.9.0 — 2026-02-20

Health sweep, code hardening, and messaging sync.

**Docs:**

- Full health sweep across all 19 doc pages (reduce, verify, polish)
- Merged `commands.md` into `interaction.md`
- Verified 373 doc claims against source code — fixed 11 wrong/outdated items
- Standardized terminology ("Lore instance" not "Lore project"), command style (`/lore-link` not `lore link`)

**Code:**

- `analyze-hook-logs.sh`: consolidated 6 Node processes into one, fixed shell injection risk by passing log path via `process.argv`
- `generate-nav.sh`: warns to stderr when auto-creating missing `index.md` instead of silently scaffolding
- `create-lore`: added path traversal guard — rejects target directories outside cwd
- Prettier formatting fixes across 6 files

**Messaging:**

- Synced all READMEs and launch content to current worker delegation model
- Removed stale `domain` field references and old "skills get agents" language
- Updated technical claims with current banner format and function references

Older entries: [Changelog Archive](changelog-archive.md)
