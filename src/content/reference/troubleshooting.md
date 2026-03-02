---
title: Troubleshooting
---

# Troubleshooting

!!! tip "Your agent can diagnose most issues"
    For anything after installation, describe the symptom to your agent. Hooks not firing, consistency checks failing, version mismatches, capture reminders too aggressive — the agent diagnoses and fixes all of these.

## Installation

These happen before the agent is alive — you fix them yourself.

### `npx create-lore` fails with "Could not find remote branch"

The installer clones a specific version tag. If the tag doesn't exist:

```bash
npx create-lore@latest my-project
```

If the problem persists, [open an issue](https://github.com/lorehq/create-lore/issues).

### Network errors

The installer needs to reach `github.com`. Firewalls, VPNs, and corporate proxies can block git access.

### Node version

Lore requires Node.js 18 or later.

## Worker Tiers Not Routing Correctly

Worker agents inherit the orchestrator's model when Claude Code can't resolve the tier aliases. This is pre-session configuration — set it in `~/.claude/settings.json` before launching:

```json
{
  "env": {
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "your-haiku-deployment",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "your-sonnet-deployment",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "your-opus-deployment"
  }
}
```

On the direct Anthropic API, short aliases (`haiku`, `sonnet`, `opus`) work without env vars. Cloud deployments (Foundry, Bedrock, Vertex) need the env vars above pointing to deployment names. If `opus` returns a 404, your deployment doesn't have that model — set the env var to match what exists.

## MEMORY.md Warning

Lore blocks `MEMORY.md` to prevent platform-level memory from overwriting knowledge. This is intentional — the agent routes persistent knowledge to skills or docs instead. See [Production Readiness: MEMORY.md Protection](../concepts/production-readiness.md#memorymd-protection) for details.

## Harness Bugs

If a hook, script, or skill is broken — not a configuration problem — see [Field Repair](../guides/field-repair.md).

## Still Stuck?

- [Open an issue](https://github.com/lorehq/lore/issues) with reproduction steps
- For security issues, see [SECURITY.md](https://github.com/lorehq/lore/blob/main/SECURITY.md)
