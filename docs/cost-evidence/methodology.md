---
title: Methodology
---

# Methodology

## Objective

Measure the API-equivalent cost and execution time of completing a task in Claude Code under five conditions — one baseline (raw Claude Code) and four progressive Lore knowledge states — to quantify the value of delegation, knowledge capture, and runbook-driven execution.

## Task

Determine whether current inventory can fill all orders from last week. Two mock API services with deliberate gotchas:

- **Orders service** (`localhost:8787`): `/api/orders` returns a hint pointing to the versioned path `/api/v1/orders`. Both `from` and `to` date params are required.
- **Inventory service** (`localhost:8791`): `/api/inventory/stock` returns a 404 with a hint to use `/api/v2/inventory/availability`. Requires `X-Warehouse: primary` header and `sku` query param.

Services are open source: [lore-gotcha-demo](https://github.com/lorehq/lore-gotcha-demo).

## Conditions

Five conditions, same task, same day (2026-02-22), 10 sessions each:

| Condition | N | Workspace | Framework | Orchestrator | Workers | Prior Knowledge |
|-----------|---|-----------|-----------|-------------|---------|-----------------|
| Raw Cold | 10 | test/control-01 | None | Opus 4.6 | — (inline) | None |
| Lore Cold | 10 | test/lore-01..10 | Lore v0.11.0 | Opus 4.6 | Haiku 4.5 | None |
| Lore Warm | 10 | test/lore-01..10 | Lore v0.11.0 | Opus 4.6 | Haiku 4.5 | Skills + env docs from cold |
| Lore Hot | 10 | test/lore-01..10 | Lore v0.11.0 | Opus 4.6 | varies | Skills + env docs, writes runbook |
| Lore Runbook | 10 | test/lore-01..10 | Lore v0.11.0 | Opus 4.6 | Haiku 4.5 | Full knowledge + runbook |

### Condition Details

**Raw Cold** — 10 fresh sessions in a single control workspace. Static CLAUDE.md containing a TypeScript API project description (serves as a cache-breaker — ensures the model's prompt cache doesn't carry over task-relevant context). No framework, no hooks, no knowledge base. All compute runs on Opus 4.6 inline.

**Lore Cold** — One fresh session per instance (lore-01 through lore-10). Clean knowledge base with only the Lore framework hooks and scripts active. The orchestrator runs on Opus 4.6 and delegates API exploration to Haiku 4.5 workers. Knowledge capture (skills, environment docs) happens at the end of each session when the operator approves.

**Lore Warm** — One session per instance. The knowledge captured during the cold session persists — skills documenting API gotchas and environment docs mapping endpoints, params, and headers. No additional capture in most sessions.

**Lore Hot** — One session per instance. Knowledge from both cold and warm persists. After answering the task, the session creates a runbook — a step-by-step procedure for the full operation. This is the capture investment phase.

**Lore Runbook** — One session per instance. Full knowledge stack: skills, environment docs, and the runbook from the hot session. No capture — pure execution. This represents the steady-state cost of a recurring task.

## Pricing Model

Cache-aware API rates (as of Feb 2026). Tests ran on Claude Max (flat-rate subscription) — cost figures represent API-equivalent spend, not actual charges.

| Model | Input | Output | Cache Read | Cache Create |
|-------|-------|--------|------------|--------------|
| Opus 4.6 | $5.00/MTok | $25.00/MTok | $0.50/MTok | $6.25/MTok |
| Sonnet 4.6 | $1.50/MTok | $7.50/MTok | $0.15/MTok | $1.875/MTok |
| Haiku 4.5 | $1.00/MTok | $5.00/MTok | $0.10/MTok | $1.25/MTok |

Source: [Anthropic API Pricing](https://docs.anthropic.com/en/docs/about-claude/pricing)

## Execution Time

Execution time uses `durationMs` from `system` events in the orchestrator JSONL — Claude Code's per-turn active processing timer. This directly measures agent execution time without idle-subtraction heuristics.

Time is split into answer and capture phases using the same boundary as cost (earliest Write/Edit to capture paths). `durationMs` events before the boundary = answer time; after = capture time.

**Fallback:** Some capture turns lack a `durationMs` event (5/50 sessions). In those cases, capture time uses wall-clock timestamps: start = first user event at/after the capture boundary, end = last event before an idle gap (>120s, or >3s before a user event).

**Missing data:** 1/50 sessions (rb-04) has no `durationMs` events at all. This session is excluded from timing statistics.

## Cost Split

Each session's cost is split into "answer" (getting the result) and "capture" (writing knowledge for future reuse).

The split boundary is the timestamp of the **earliest** Write or Edit operation targeting `/skills/`, `/knowledge/environment/`, or `/knowledge/runbooks/` — scanned across both the orchestrator JSONL and all subagent JSONL files. Everything before that timestamp is answer cost; everything after is capture cost.

Sessions with no qualifying writes have zero capture cost.

## Session Matching

Sessions are identified by the `customTitle` field in the JSONL log. When a session has multiple `custom-title` entries (from renames), the **last** entry is used. This handles sessions that were renamed after creation.

## Token Deduplication

Claude Code emits duplicate usage entries during streaming (one per content block in multi-block responses). Usage entries are deduplicated by a composite key: `requestId + message.id + input_tokens + output_tokens + cache_read_input_tokens + cache_creation_input_tokens`.

## Limitations

- **One task type.** API exploration with mock services. Results may differ for code generation, refactoring, debugging, or other task patterns.
- **One model family.** Tested on Claude (Opus 4.6 orchestrator, Haiku 4.5 workers). Other model combinations may produce different results.
- **Subscription pricing.** Tests ran on Claude Max (flat-rate). Cost figures are API-equivalent estimates.
- **No cross-tool validation.** Knowledge captured on Claude Code should benefit Cursor and OpenCode sessions — not yet tested.
