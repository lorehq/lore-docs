---
title: OpenCode
---

# OpenCode

!!! warning "Experimental"
    OpenCode support is experimental. See [Platform Overview](index.md#platform-maturity) for what this means.

## Plugins

Seven long-lived ESM plugins:

| Plugin | Event | Purpose |
|--------|-------|---------|
| `session-init.js` | `experimental.chat.system.transform` | Inject dynamic session banner on first LLM call |
| `protect-memory.js` | `tool.execute.before` | Block reads/writes to `MEMORY.md` |
| `convention-guard.js` | `tool.execute.before` | Enforce conventions before file writes |
| `harness-guard.js` | `tool.execute.before` | Enforce hub vs. linked-repo guardrails |
| `knowledge-tracker.js` | `tool.execute.after` | Escalating capture reminders after tool use |
| `context-path-guide.js` | `tool.execute.before` | Show knowledge map tree on writes under `docs/` |
| `search-guard.js` | `tool.execute.before` | Nudge semantic search over speculative file reads |

## Plugin Architecture

OpenCode plugins differ from Claude Code and Cursor hooks in several ways:

- **Long-lived processes** — plugins load once and persist across the session, unlike Claude Code's subprocess-per-event model.
- **Closure-based state** — plugins maintain state in closures rather than writing to disk. The first LLM call injects the full banner (~14K chars); subsequent calls are silent (no injection).
- **System prompt injection** — `session-init.js` modifies the system prompt via `chat.system.transform`; other plugins use `tool.execute.before`/`tool.execute.after` to intercept tool calls.
- **`createRequire` bridge** — ESM plugins use `createRequire` to import the shared CommonJS `lib/` modules.

### Compaction Resilience

OpenCode fires an `experimental.session.compacting` event before context compaction. The `session-init.js` plugin listens for this event and re-injects the full banner on the next LLM call, restoring context that compaction may have removed.

!!! note "Experimental API hooks"
    Both `experimental.chat.system.transform` and `experimental.session.compacting` are experimental OpenCode APIs. They function correctly in current versions but may change or be renamed in future releases. Lore will track any API changes and update plugins accordingly via `/lore-update`.

## Configuration

**Config:** `opencode.json` — registers instructions and MCP server. Plugins are auto-discovered from `.opencode/plugins/`.

**Plugins:** `.opencode/plugins/` — ESM module files.

**Instructions:** `.lore/instructions.md` — read directly by OpenCode (no generated copy needed).

## Coverage Gaps

| Gap | Impact | Mitigation |
|-----|--------|------------|
| No per-prompt ambiguity detection | No automatic scan for ambiguous user requests | The banner includes knowledge-base-first instructions that partially compensate |
| No MCP tools | No on-demand context or write-guard tools | All context is injected via system prompt; write guards fire via plugin hooks |
