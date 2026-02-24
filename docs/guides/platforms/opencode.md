---
title: OpenCode
---

# OpenCode

!!! warning "Experimental"
    OpenCode integration is functional but uses experimental plugin API hooks that may change in future OpenCode releases. Core harness features work — session banner, knowledge capture, convention enforcement, delegation.

## Plugins

Six long-lived ESM plugins:

| Plugin | Event | Purpose |
|--------|-------|---------|
| `session-init.js` | `experimental.chat.system.transform` | Inject dynamic session banner on first LLM call |
| `protect-memory.js` | `experimental.chat.system.transform` | Block reads/writes to `MEMORY.md` |
| `convention-guard.js` | `experimental.chat.system.transform` | Enforce conventions before file writes |
| `harness-guard.js` | `experimental.chat.system.transform` | Enforce hub vs. linked-repo guardrails |
| `knowledge-tracker.js` | `experimental.chat.system.transform` | Escalating capture reminders after tool use |
| `context-path-guide.js` | `experimental.chat.system.transform` | Show knowledge map tree on writes under `docs/` |

## Plugin Architecture

OpenCode plugins differ from Claude Code and Cursor hooks in several ways:

- **Long-lived processes** — plugins load once and persist across the session, unlike Claude Code's subprocess-per-event model.
- **Closure-based state** — plugins maintain state in closures rather than writing to disk. The first LLM call injects the full banner (~14K chars); subsequent calls are silent (no injection).
- **System prompt injection** — plugins modify the system prompt via `chat.system.transform` rather than injecting into the conversation history.
- **`createRequire` bridge** — ESM plugins use `createRequire` to import the shared CommonJS `lib/` modules.

### Compaction Resilience

OpenCode fires an `experimental.session.compacting` event before context compaction. The `session-init.js` plugin listens for this event and re-injects the full banner on the next LLM call, restoring context that compaction may have removed.

!!! note "Experimental API hooks"
    Both `experimental.chat.system.transform` and `experimental.session.compacting` are experimental OpenCode APIs. They function correctly in current versions but may change or be renamed in future releases. Lore will track any API changes and update plugins accordingly via `/lore-update`.

## Configuration

**Config:** `opencode.json` — registers plugins and their entry points.

**Plugins:** `.opencode/plugins/` — ESM module files.

**Instructions:** `.lore/instructions.md` — read directly by OpenCode (no generated copy needed).

## Coverage Gaps

| Gap | Impact | Mitigation |
|-----|--------|------------|
| No search-guard | No nudge toward semantic search over speculative reads | Agents can still use semantic search manually; knowledge-base-first instruction is in the banner |
| No per-prompt ambiguity detection | No automatic scan for ambiguous user requests | The banner includes knowledge-base-first instructions that partially compensate |
| No MCP tools | No on-demand context or write-guard tools | All context is injected via system prompt; write guards fire via plugin hooks |
