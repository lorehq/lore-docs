---
title: Changelog
---

# Changelog

All notable changes to Lore are documented here. See [Production Readiness](production-readiness.md) for versioning policy. For full commit history, see [GitHub Releases](https://github.com/lorehq/lore/releases).

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

## v0.8.1 — 2026-02-19

CI stabilization and release automation.

- Fixed shellcheck errors, prettier drift, version mismatch (0.7.0 → 0.8.1)
- Added macOS shellcheck install to CI
- Resolved macOS test flakiness (`/var/folders/` → `/private/var/folders/` symlink)
- All 4 CI matrix jobs green (Ubuntu + macOS, Node 18 + 20)
- Tag-driven release automation via GitHub Actions
- `bump-version.sh` — single command to update all version references across repos
- Expanded `check-version-sync.sh` to catch package-lock.json and SECURITY.md drift

## v0.6.0 — 2026-02-18

Knowledge architecture restructure and platform parity.

**Knowledge architecture:**

- Split `docs/context/` into `context/` (rules, conventions) + `knowledge/` (reference material)
- Broader environment subdirs: `inventory/`, `decisions/`, `reference/`, `diagrams/`
- Nav reorder: Work → Knowledge → Context → Guides

**Platform parity:**

- OpenCode context-path-guide plugin (matches Claude Code's PreToolUse hook)
- Cursor condensed banner on every prompt (compaction resilience)
- Cursor knowledge capture reminders via `beforeSubmitPrompt`
- Cursor `.plans/` routing rule

**Quality:**

- Safe `.gitignore` unlink with BEGIN/END markers in `lore-link.sh`
- Debug logging (`LORE_DEBUG=1`) replaces silent `catch {}` blocks
- Version sync CI check, nav staleness CI guard
- Pinned Docker deps for reproducible docs builds
- 107 tests passing (up from 69)

## v0.5.0 — 2026-02-17

Standardization and knowledge architecture groundwork.

- `lore-` prefix on all user-invocable skills
- Configurable `treeDepth` via `.lore-config`
- Archives visible in nav, archive cleanup in `/lore-consolidate`
- 156 tests passing

## v0.4.0 — 2026-02-16

Cursor support and cross-repo linking.

- Cursor hooks: `sessionStart`, `beforeSubmitPrompt`, `beforeReadFile`, `afterFileEdit`, `afterShellExecution`
- Vendor-agnostic instructions: `.lore/instructions.md` as canonical source
- Platform-neutral skills and agents: `.lore/` canonical, platform copies generated
- `lore-link` — hub-spoke cross-repo hook generation for all three platforms

## v0.3.0 — 2026-02-15

OpenCode support via shared lib architecture.

- Shared core logic: `lib/banner.js`, `lib/tracker.js`, `lib/memory-guard.js`
- OpenCode plugins: three ESM adapters in `.opencode/plugins/`
- Claude Code hooks refactored to thin CJS adapters
- Configurable escalation thresholds via `.lore-config`
- 69 tests passing

## v0.2.0 — 2026-02-14

Framework hardening.

- Dynamic nav generation with auto-scaffolding
- Agent rules extraction (`docs/context/agent-rules.md`)
- Community health files (CONTRIBUTING.md, CODE_OF_CONDUCT.md, SECURITY.md)
- Knowledge map in session banner
- Tests for hooks and scripts (24 tests)
- Versioning and upgrade path (`.lore-config`, `sync-framework.sh`, `/lore-update`)

## v0.1.0 — 2026-02-14

Initial release. GitHub org, domains, licensing, security baseline.
