---
title: Troubleshooting
---

# Troubleshooting

!!! tip "Your agent can diagnose most issues"
    For anything after installation, describe the symptom to your agent and it will diagnose and fix. The reference below explains what goes wrong and why — useful context, but you rarely need to follow these steps manually.

## Installation

### `npx create-lore` fails with "Could not find remote branch"

The installer clones a specific version tag from GitHub. If the tag doesn't exist, the clone fails with an error like:

```
fatal: Remote branch vX.Y.Z not found in upstream origin
```

**Fix:** Update to the latest version of create-lore:

```bash
npx create-lore@latest my-project
```

If the problem persists, [open an issue](https://github.com/lorehq/create-lore/issues).

### `npx create-lore` fails with a network error

```
fatal: unable to access 'https://github.com/lorehq/lore.git/': Could not resolve host: github.com
```

**Fix:** Check your internet connection and DNS. The installer needs to reach `github.com` to clone the template. Firewalls, VPNs, and corporate proxies can block git access.

### Node version errors

Lore requires Node.js 18 or later.

```bash
node --version  # must be >= 18
```

## Hooks

### Hooks aren't firing

Tell your agent: "My hooks don't seem to be firing — can you run diagnostics?"

Your agent will check the right things for your platform:

- **Claude Code:** Whether `.lore/hooks/` exists and contains `.js` files, and whether `claude` is being run from the project root.
- **Cursor:** Whether `.cursor/hooks.json` exists and references files in `.cursor/hooks/`, and whether the project folder is opened directly (not a parent directory).
- **OpenCode:** Whether `opencode.json` exists and `.opencode/plugins/` contains `.js` files.

### "MEMORY.md is intercepted" warning

Lore blocks `MEMORY.md` to prevent platform-level memory from overwriting knowledge — the agent routes persistent knowledge to skills or docs instead. This is intentional. See [Production Readiness: MEMORY.md Protection](../concepts/production-readiness.md#memorymd-protection) for details and alternatives.

### Escalating capture reminders are too aggressive

Tell your agent to adjust the capture thresholds — it knows where `nudgeThreshold` and `warnThreshold` live and what values make sense. See [Configuration: Hook Profile](configuration.md#hook-profile) for profile options.

## Worker Tiers

### All workers run on the same model (not their configured tier)

Worker agents inherit the orchestrator's model when Claude Code ignores the `model:` field in their agent frontmatter. This happens in two scenarios:

**Scenario 1 — Using a cloud deployment (Foundry, Bedrock, Vertex):** Claude Code resolves short aliases (`haiku`, `sonnet`, `opus`) through `ANTHROPIC_DEFAULT_*_MODEL` env vars. If those vars aren't set, it falls back to its own hardcoded model IDs. Set all three in `~/.claude/settings.json`:

```json
{
  "env": {
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "your-haiku-deployment",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "your-sonnet-deployment",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "your-opus-deployment"
  }
}
```

**Scenario 2 — Full deployment names in config:** If `subagentDefaults.claude` contains full model IDs (e.g. `claude-opus-4-6`) instead of short aliases, Claude Code ignores the generated frontmatter value and workers inherit the orchestrator's model. Lore's `generate-agents.js` correctly stamps short aliases into `.claude/agents/` frontmatter. If you are on an older version, tell your agent to run an update.

### `opus` tier returns a 404 deployment error

Claude Code maps `opus` to its internal default opus model ID, which may not exist in your deployment. Fix: set `ANTHROPIC_DEFAULT_OPUS_MODEL` in `~/.claude/settings.json` to match your deployed model name. Restart Claude Code after changing settings.

## Consistency

### Validation checks fail

Tell your agent: "The consistency checks are failing — can you run a capture pass and fix what's out of sync?" Your agent will diagnose which checks failed (platform copies, nav, instructions) and apply the right fixes.

### Update shows conflicts

Harness updates only touch harness-owned files (`lore-*` prefix). If you see conflicts, you may have modified a `lore-*` file directly. Harness files are overwritten on sync — move your changes to an operator-owned file (no `lore-` prefix), then tell your agent to run the update again.

### Version mismatch after update

Tell your agent: "There's a version mismatch after the update — can you check version sync?" If `.lore/config.json` and `package.json` disagree, the update didn't complete cleanly and your agent can re-run it.

## Still Stuck?

- Check the [guides](../guides/working-with-lore.md) for detailed walkthroughs
- [Open an issue](https://github.com/lorehq/lore/issues) with reproduction steps
- For security issues, see [SECURITY.md](https://github.com/lorehq/lore/blob/main/SECURITY.md)
