---
title: Production Readiness
---

# Production Readiness

Lore is a pre-1.0 coding agent harness.

## Stability Policy

Lore follows [semantic versioning](https://semver.org/). During 0.x:

- **Patch releases** (0.8.0 → 0.8.1) — bug fixes, CI improvements, docs. No breaking changes.
- **Minor releases** (0.8.x → 0.9.0) — new features, new hooks, new lib modules. May include breaking changes to hook output format or config fields. Release notes document what changed and how to migrate.

**What can break between minor versions:**

- Hook output format (the JSON structure hooks emit to agents)
- `.lore/config.json` fields (new fields, renamed fields)
- Script CLI arguments
- Generated file layout (`.claude/`, `.cursor/rules/`, `.opencode/`)

**What won't break:**

- Your docs (`docs/`), operator skills, operator conventions
- The `lore-*` / non-`lore-*` ownership boundary and the `system/` subdirectory convention
- Git-tracked knowledge (Lore never deletes operator content)

**Post-1.0:** minor versions will be non-breaking. Breaking changes will require a major version bump.

For upgrade steps, see [Upgrading](../guides/upgrading.md).

## Security and Trust Model

### What Hooks Can Do

Lore hooks are plain JavaScript files that run as child processes of your coding agent. They have the same permissions as the agent itself — they can read and write files in your project directory.

**Hooks do:**

- Read `.lore-config`, `docs/`, `.lore/`, registry files, and `.git/` (state files) to build the session banner
- Write state files to `.git/` (tracker counters, nav-dirty flags, hook event logs)
- Write to stdout (injecting context into the agent's conversation)
- Scaffold sticky files ([`sticky.js`](https://github.com/lorehq/lore/blob/main/.lore/lib/sticky.js)) if missing — `MEMORY.local.md`, `.gitignore` entries

### Supply Chain

Lore has **zero npm runtime dependencies**. All [`lib/` modules](https://github.com/lorehq/lore/tree/main/.lore/lib) use only Node.js built-ins (`fs`, `path`, `os`, `crypto`, `util`). Dev dependencies (eslint, prettier) are not installed by `create-lore` and do not run in hooks.

The installer ([`create-lore`](https://github.com/lorehq/create-lore)) clones the lore repo at a pinned version tag — no transitive dependency tree to audit.

### How to Audit

All hook source is in your repo after install:

| Directory | Purpose |
|-----------|---------|
| [`.lore/hooks/`](https://github.com/lorehq/lore/tree/main/.lore/hooks) | Claude Code hooks |
| [`.cursor/hooks/`](https://github.com/lorehq/lore/tree/main/.cursor/hooks) | Cursor hooks |
| [`.opencode/plugins/`](https://github.com/lorehq/lore/tree/main/.opencode/plugins) | OpenCode hooks |
| [`.lore/lib/`](https://github.com/lorehq/lore/tree/main/.lore/lib) | Shared logic (all hooks import from here) |

Every file is plain JavaScript with no minification or bundling. Ask your agent to audit the hook source — line counts, dependency checks, or anything else you want to verify.

### MEMORY.md Protection

Hooks actively block reads and writes to `MEMORY.md` at the project root ([`protect-memory.js`](https://github.com/lorehq/lore/blob/main/.lore/hooks/protect-memory.js)). This prevents the agent's platform-level memory feature from overwriting knowledge that should be routed to skills or docs. Access attempts are redirected to `MEMORY.local.md` (gitignored scratch space) or the appropriate knowledge route.

## Known Limitations

- **AI compliance is probabilistic.** Hooks inject reminders, not commands. The agent may skip capture in long sessions or when tool calls accumulate rapidly. Asking your agent to run a capture pass after substantive work improves consistency.
- **Single-developer origin.** Lore was built and tested by one developer. The test suite covers hooks, lib modules, and the scaffolder across 3 OSes and 2 Node versions, but edge cases in team workflows are untested.
- **No access control.** Anyone with repo access can read and modify all knowledge and skills. Lore trusts the git permission model.
- **Shell scripts require bash.** Shell scripts in `.lore/scripts/` (`validate-consistency.sh`, `generate-nav.sh`, etc.) require bash. Windows users need Git Bash, WSL, or equivalent. Hooks themselves are pure Node.js and work everywhere.
- **Hook injection cost is unmeasured per-instance.** Hook injections consume tokens from the agent's context window. Measure your own instance with `LORE_HOOK_LOG=1` — see [Hook Event Logging](../reference/configuration.md#hook-event-logging).

For CI and test coverage details, see [Reference: CI and Test Coverage](../reference/index.md).

See [When to Use Lore: Poor Fit](when-to-use-lore.md#poor-fit) for what Lore intentionally doesn't do.

## See Also

- [Security](security.md) — the three-layer security model and write-time enforcement
- [When to Use Lore](when-to-use-lore.md) — good fit, poor fit, and intentional limitations
- [Upgrading](../guides/upgrading.md) — step-by-step upgrade process
- [Changelog](../changelog.md) — version history and breaking changes
