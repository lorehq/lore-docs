---
title: Production Readiness
---

# Production Readiness

Lore is pre-1.0 software.

## Stability Policy

Lore follows [semantic versioning](https://semver.org/). During 0.x:

- **Patch releases** (0.8.0 → 0.8.1) — bug fixes, CI improvements, docs. No breaking changes.
- **Minor releases** (0.8.x → 0.9.0) — new features, new hooks, new lib modules. May include breaking changes to hook output format or config fields. Release notes document what changed and how to migrate.
- **`/lore-update`** — the built-in update command. It syncs framework files (`lore-*` prefix) while preserving your operator-owned content (skills, agents, docs, conventions).

**What can break between minor versions:**

- Hook output format (the JSON structure hooks emit to agents)
- `.lore-config` fields (new fields, renamed fields)
- Script CLI arguments
- Generated file layout (`.claude/`, `.cursor/rules/`, `.opencode/`)

**What won't break:**

- Your docs (`docs/`), operator skills, operator agents, conventions
- The `lore-*` / non-`lore-*` ownership boundary
- Git-tracked knowledge (Lore never deletes operator content)

**Post-1.0:** minor versions will be non-breaking. Breaking changes will require a major version bump.

## Security and Trust Model

### What Hooks Can Do

Lore hooks are plain JavaScript files that run as child processes of your coding agent. They have the same permissions as the agent itself — they can read and write files in your project directory.

**Hooks do:**

- Read `.lore-config`, `docs/`, `.lore/`, registry files, and `.git/` (state files) to build the session banner
- Write state files to `.git/` (tracker counters, nav-dirty flags, hook event logs)
- Write to stdout (injecting context into the agent's conversation)
- Scaffold sticky files (`MEMORY.local.md`, `.gitignore` entries) if missing

**Hooks do not:**

- Make network requests
- Execute shell commands or spawn child processes
- Read or write files outside the project directory (except via `LORE_HUB` for linked repos)
- Access environment variables beyond `LORE_HUB`, `LORE_DEBUG`, and `LORE_HOOK_LOG`
- Modify your application code

### Supply Chain

Lore has **zero npm runtime dependencies**. All `lib/` modules use only Node.js built-ins (`fs`, `path`, `os`, `crypto`, `util`). Dev dependencies (eslint, prettier) are not installed by `create-lore` and do not run in hooks.

The installer (`create-lore`) clones the lore repo at a pinned version tag — no transitive dependency tree to audit.

### How to Audit

All hook source is in your repo after install:

```
hooks/                    # Claude Code hooks
.cursor/hooks/            # Cursor hooks
.opencode/plugins/        # OpenCode hooks
lib/                      # Shared logic (all hooks import from here)
```

Every file is plain JavaScript, under 100 lines, with no minification or bundling. Read them directly. The total hook + lib codebase is approximately 1,200 lines.

```bash
# Count all hook and lib code
wc -l hooks/*.js .cursor/hooks/*.js .opencode/plugins/*.js lib/*.js
```

### MEMORY.md Protection

Hooks actively block reads and writes to `MEMORY.md` at the project root. This prevents the agent's platform-level memory feature from overwriting knowledge that should be routed to skills or docs. Access attempts are redirected to `MEMORY.local.md` (gitignored scratch space) or the appropriate knowledge route.

## Known Limitations

- **AI compliance is probabilistic.** Hooks inject reminders, not commands. The agent may skip capture in long sessions or under heavy tool use. Running `/lore-capture` after substantive work improves consistency.
- **Single-developer origin.** Lore was built and tested by one developer. The test suite covers hooks, lib modules, and the scaffolder across 3 OSes and 2 Node versions, but edge cases in team workflows are untested.
- **No access control.** Anyone with repo access can read and modify all knowledge, skills, and agents. Lore trusts the git permission model.
- **Shell scripts require bash.** Core scripts (`validate-consistency.sh`, `generate-nav.sh`, etc.) require bash. Windows users need Git Bash, WSL, or equivalent. Hooks themselves are pure Node.js and work everywhere.
- **Context window cost is unmeasured.** Hook injections consume tokens from the agent's context window. Measure your own instance with `LORE_HOOK_LOG=1` — see [Hook Event Logging](guides/configuration.md#hook-event-logging).

## Non-Goals

These are explicitly out of scope for Lore:

- **Hosted knowledge storage.** Knowledge lives in your git repo. No cloud sync, no external database.
- **Multi-user real-time collaboration.** Lore is single-agent-at-a-time. Team workflows use git branches and merges, same as code.
- **Plugin ecosystem.** Skills and agents are plain markdown files, not installable packages. Sharing happens via copy-paste or git.
- **Model training or fine-tuning.** Lore works through prompt engineering (hook-injected context), not model modification.

## CI and Test Coverage

All three repos run CI on every push and PR:

| Repo | OSes | Node Versions | Key Checks |
|------|------|---------------|------------|
| lore | Ubuntu, macOS, Windows | 18, 20 | Unit tests, ShellCheck, Prettier, ESLint, npm audit, consistency validation |
| create-lore | Ubuntu, macOS, Windows | 18, 20 | Unit tests, E2E scaffolding, consistency validation |
| lore-docs | Ubuntu | -- | `mkdocs build --strict`, markdownlint |

Releases are tag-driven via GitHub Actions. The `create-lore` release workflow verifies a matching `lore` tag exists before publishing to npm.

## Upgrade Policy

1. Check the [changelog](changelog.md) for breaking changes
2. Run `/lore-update` from your Lore instance
3. Review the diff — only `lore-*` files are touched
4. Run `bash scripts/validate-consistency.sh` to confirm health
5. Commit the update

If something breaks, `git checkout` the previous state. All changes are local and reversible.
