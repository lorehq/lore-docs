---
title: Claude Code
---

# Claude Code

Claude Code is Lore's primary platform — fully tested, with cost and token evidence measured against it.

## Hooks

Eight hooks cover all lifecycle events:

| Hook | Event | Purpose |
|------|-------|---------|
| `session-init.js` | `SessionStart` | Inject dynamic session banner (active work, knowledge map, skill registry) |
| `prompt-preamble.js` | `UserPromptSubmit` | Knowledge-base-first search prompt + ambiguity scan |
| `protect-memory.js` | `PreToolUse` | Block reads/writes to `MEMORY.md` |
| `convention-guard.js` | `PreToolUse` | Enforce conventions before file writes |
| `harness-guard.js` | `PreToolUse` | Enforce hub vs. linked-repo guardrails |
| `context-path-guide.js` | `PreToolUse` | Show knowledge map tree on writes under `docs/` |
| `search-guard.js` | `PreToolUse` | Nudge semantic search over speculative file reads |
| `knowledge-tracker.js` | `PostToolUse` + `PostToolUseFailure` | Escalating capture reminders after tool use |

### Hook Lifecycle

See [Hook Architecture](../hook-architecture.md) for the static vs. dynamic banner split and hook lifecycle details.

### JSON Control Flow

Claude Code hooks communicate via JSON on stdout. A hook can:

- Inject text into the agent's conversation (`result` field)
- Block a tool call (`decision: "block"`)
- Allow silently (empty output or `decision: "allow"`)

See [Hook Architecture](../hook-architecture.md) for the full module layout and shared lib reference.

## Configuration

**Settings:** `.claude/settings.json` — hooks are registered here.

**Instructions:** `CLAUDE.md` (generated from `.lore/instructions.md` by `sync-platform-skills.sh`).

**Agents:** `.claude/agents/` — generated from `.lore/agents/` with platform-specific frontmatter (model aliases).

**MCP:** `.mcp.json` at project root — configures the semantic search MCP server (`lore_search`, `lore_read`, `lore_health`).

## Cloud Deployments (Foundry / Bedrock / Vertex)

When running Claude Code through a cloud provider deployment (Microsoft Foundry, AWS Bedrock, Google Vertex), worker tier model selection requires additional env vars in `~/.claude/settings.json`. Claude Code resolves the short aliases (`haiku`, `sonnet`, `opus`) through these env vars at runtime:

```json
{
  "env": {
    "CLAUDE_CODE_USE_FOUNDRY": "1",
    "ANTHROPIC_FOUNDRY_RESOURCE": "your-resource-name",
    "ANTHROPIC_DEFAULT_HAIKU_MODEL": "your-haiku-deployment-name",
    "ANTHROPIC_DEFAULT_SONNET_MODEL": "your-sonnet-deployment-name",
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "your-opus-deployment-name"
  }
}
```

All three `ANTHROPIC_DEFAULT_*_MODEL` vars must be set. Without them, Claude Code uses its own hardcoded model IDs which may not match your deployment names, causing workers to either fall back to the orchestrator's model or return a 404 from the deployment API.

See [Configuration: subagentDefaults](../configuration.md#subagentdefaults) for how to set matching deployment names in `.lore/config.json`.

## Cost Evidence

Claude Code is the platform used for all cost evidence measurements. See [Cost Evidence](../../cost-evidence/index.md) for measured delegation results.
