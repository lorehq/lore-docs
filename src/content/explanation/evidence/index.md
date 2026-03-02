---
title: Cost Evidence
---

# Cost Evidence

!!! warning "Read this first"
    - **Platform:** Claude Code (CLI) only. Cursor and OpenCode are [experimental](../reference/platforms/index.md#platform-maturity) and untested.
    - **Configuration:** Full Lore integration — Docker sidecar running, semantic search enabled, MCP search server configured, all hooks active. This is **not** the out-of-the-box default; it represents a fully configured instance.
    - **Version:** Tested on Lore v0.11.0 (Feb 2026). The current version is newer; results may differ.
    - **Sample size:** N=10 per condition (50 sessions total). Small sample — treat as directional evidence, not definitive benchmarks.
    - **Accuracy:** We believe these numbers are representative but cannot guarantee their accuracy. Cost figures are API-equivalent estimates derived from session logs, not actual invoices.

This page presents cost data from a controlled comparison between raw Claude Code and Lore on the same task. For full details, see:

- [Analysis](analysis.md) — Detailed findings, cost progression, variance, cumulative ROI
- [Methodology](methodology.md) — Test design, pricing basis, measurement approach
- [Raw Session Data](raw-data.md) — Per-session token and cost breakdowns for all 50 sessions
- [Operator Inputs](operator-inputs.md) — Exact operator messages for each condition

If you're skeptical, good. Read the [limitations](#limitations) first, then run the [test yourself](#reproduce-it). We welcome independent verification — see [Contribute](#contribute).

## Methodology

**Task:** Determine whether current inventory can fill all orders from last week. Two mock APIs (orders and inventory) with deliberate gotchas — version traps, required headers, non-obvious query parameters.

**Lore configuration:** All Lore sessions ran with full integration — Docker sidecar deployed (`/lore-docker`), semantic search active, MCP search server configured (`.mcp.json`), standard hook profile with all 8 Claude Code hooks firing. This represents a fully configured instance, not the default post-install state.

**Five conditions**, same task, same day (2026-02-22):

| Condition | N | Harness | Orchestrator | Workers | Prior Knowledge |
|-----------|---|-----------|-------------|---------|-----------------|
| Raw Cold | 10 | None | Opus 4.6 | — (inline) | None |
| Lore Cold | 10 | Lore v0.11.0 | Opus 4.6 | Haiku 4.5 | None |
| Lore Warm | 10 | Lore v0.11.0 | Opus 4.6 | Haiku 4.5 | Fieldnotes + env docs from cold |
| Lore Hot | 10 | Lore v0.11.0 | Opus 4.6 | varies | Fieldnotes + env docs, writes runbook |
| Lore Runbook | 10 | Lore v0.11.0 | Opus 4.6 | Haiku 4.5 | Full knowledge + runbook |

Each Lore condition ran on a separate instance (lore-01 through lore-10), one session per condition per instance. "Cold" = no prior knowledge. "Warm" = knowledge captured from cold. "Hot" = knowledge from cold+warm, writes a runbook. "Runbook" = full knowledge stack, pure execution.

**Pricing basis:** Cache-aware API rates. Tests ran on Claude Max (flat-rate subscription) — cost figures represent API-equivalent spend.

| Model | Input | Output | Cache Read | Cache Create |
|-------|-------|--------|------------|--------------|
| Opus 4.6 | $5.00/MTok | $25.00/MTok | $0.50/MTok | $6.25/MTok |
| Haiku 4.5 | $1.00/MTok | $5.00/MTok | $0.10/MTok | $1.25/MTok |

Source: [Anthropic API Pricing](https://docs.anthropic.com/en/docs/about-claude/pricing)

**Timing:** Execution time from `durationMs` — Claude Code's per-turn active processing timer, which measures actual model computation excluding idle time between turns.

**Cost split:** Each session's cost is split into "getting the answer" (API exploration, reasoning, final output) and "capture" (writing skills, environment docs, runbooks). This isolates the one-time knowledge investment from the recurring answer cost.

## Results

### Summary Table

| Condition | N | Answer (median) | Capture (mean) | Total (median) | vs Raw Cold | Answer Time | Capture Time |
|-----------|---|-----------------|----------------|----------------|-------------|-------------|--------------|
| **Raw Cold** | 10 | $0.4532 | — | $0.4532 | — | 1m 12s | — |
| **Lore Cold** | 10 | $0.3226 | $0.0814 | $0.3941 | -29% | 1m 22s | 0m 35s |
| **Lore Warm** | 10 | $0.2429 | $0.0087 | $0.2429 | -46% | 1m 4s | — |
| **Lore Hot** | 10 | $0.2446 | $0.0795 | $0.3389 | -46% | 0m 57s | 0m 37s * |
| **Lore Runbook** | 10 | $0.1870 | — | $0.1870 | **-59%** | 0m 40s | — |

**\*** Lore Hot capture time is operator-initiated runbook creation — the operator explicitly asked the agent to write a runbook after getting the answer. This is not automatic harness behavior.

### Progression: Each Knowledge Layer Reduces Cost

| Transition | Answer (median) | Reduction | What Changed |
|-----------|----------------|-----------|--------------|
| Raw Cold → Lore Cold | $0.45 → $0.32 | -29% | Delegation to Haiku workers |
| Lore Cold → Lore Warm | $0.32 → $0.24 | -25% | Skills + env docs eliminate API discovery |
| Lore Warm → Lore Runbook | $0.24 → $0.19 | -23% | Runbook provides step-by-step procedure |
| **Raw Cold → Lore Runbook** | **$0.45 → $0.19** | **-59%** | **Full stack: delegation + knowledge + runbook** |

### Key Findings

**Delegation alone is cheaper.** On a cold run with zero prior knowledge, the answer-only median ($0.32) is 29% cheaper than raw Claude ($0.45). The savings come from routing API exploration to Haiku workers ($0.10/MTok cache read) instead of running it inline on Opus ($0.50/MTok cache read). No knowledge base needed.

**Knowledge compounds.** Each layer — skills, environment docs, runbook — removes another chunk of exploration. By the runbook stage, workers don't explore at all. They execute known procedures with known endpoints.

**The steady state is 59% cheaper and 44% faster.** Lore Runbook ($0.19 median, 0m 40s) vs Raw Cold ($0.45 median, 1m 12s). This is the cost of a task after knowledge has been captured — which is the normal operating mode after initial setup.

**Runbook is the most predictable.** Standard deviation drops from $0.11 (raw cold) to $0.04 (runbook). The cost range tightens from 2.0x ($0.30–$0.61) to 1.9x ($0.14–$0.27). Structured knowledge reduces both cost and variance.

## Capture ROI

Capture is a one-time investment that pays off on every subsequent run.

| Phase | Mean Capture Cost | What Was Captured |
|-------|-------------------|-------------------|
| Cold | $0.0814 | Fieldnotes (API gotchas), environment docs (endpoints, params, headers) |
| Warm | $0.0087 | Minor doc updates (1 of 10 sessions) |
| Hot | $0.0795 | Runbook (step-by-step procedure for the full task) |
| **Total investment** | **$0.17** | |

| Metric | Value |
|--------|-------|
| Steady-state savings per run (runbook vs raw cold) | $0.27 |
| **Break-even** | **1st runbook run** (saves $0.27, cost $0.17 to capture) |
| Net savings after 5 runs | $1.16 |
| Net savings after 10 runs | $2.49 |

The capture investment pays for itself on the very first reuse.

## Where the Savings Come From

| Mechanism | First Run | Steady State | Impact |
|-----------|-----------|-------------|--------|
| Model tiering | Yes | Yes | Workers on Haiku ($0.10/MTok cache read) instead of Opus ($0.50/MTok) — 5x cheaper per token |
| Context isolation | Yes | Yes | Workers run in fresh contexts instead of accumulating in one growing Opus thread |
| Knowledge reuse | No | Yes | Workers skip exploration — endpoints and gotchas are documented as fieldnotes |
| Runbook procedure | No | Yes | Orchestrator follows a known procedure instead of reasoning from scratch |

Model tiering and context isolation are structural — they apply from the first run. Knowledge reuse and runbook procedures compound over time.

For how these mechanisms work, see [How Delegation Works](../concepts/delegation.md) and [Configuration](../reference/configuration.md).

## Limitations

!!! warning "Read before citing these numbers"

- **Small sample.** N=10 per condition (50 sessions total). This is directional evidence, not a statistically rigorous benchmark. Variance is reported but confidence intervals are wide at this sample size.
- **One task type.** API exploration with mock services. Results may differ for code generation, refactoring, debugging, or other task patterns. The delegation advantage (routing to cheaper models) should generalize; the knowledge reuse advantage depends on task recurrence.
- **One platform.** Claude Code (CLI) with Claude models (Opus 4.6 orchestrator, Haiku 4.5 workers). Cursor and OpenCode are [experimental platforms](../reference/platforms/index.md#platform-maturity) — untested.
- **Full integration, not default.** The test ran with Docker sidecar, semantic search, MCP server, and all hooks active. Out-of-the-box Lore (no Docker, no semantic search) may show different results — the delegation and knowledge reuse mechanisms still apply, but the search-guard and MCP tools would be absent.
- **Older version.** Tested on Lore v0.11.0 (Feb 2026). Hook behavior, banner size, and capture patterns have changed since then. Results on the current version may differ in either direction.
- **Estimated costs.** Tests ran on Claude Max (flat-rate subscription). Cost figures are API-equivalent estimates calculated from session log token counts, not actual API invoices. We believe the methodology is sound but cannot guarantee perfect accuracy.
- **No cross-tool validation.** Knowledge captured on Claude Code should benefit Cursor and OpenCode sessions — not yet tested.
- **Single operator.** All 50 sessions were run by one person. Operator behavior (clarification style, capture approval timing) may influence results.

## Reproduce It

The test services, verification scripts, full methodology, operator inputs, and calculation runbook are open source:

```bash
git clone https://github.com/lorehq/lore-gotcha-demo.git
cd lore-gotcha-demo

# Start services (separate terminals)
node orders-service.js
node inventory-service.js

# Verify services work
bash verify-fulfillment.sh

# Run the test prompt on raw Claude Code, then with Lore
npx create-lore my-test-instance
```

The [repo README](https://github.com/lorehq/lore-gotcha-demo) contains:

- Full service documentation with all gotchas and expected responses
- Exact operator inputs for each condition
- Calculation runbook (the correct reasoning path)
- Instructions for measuring cost from Claude Code session logs
- Verification scripts for ground truth validation

## Contribute

We are not 100% certain our numbers are accurate. If you reproduce this test — whether you confirm, refute, or improve on our results — we want to hear about it.

- **Verify:** Run the same 5 conditions and compare. Different hardware, network conditions, or Claude Code versions may produce different results.
- **Disprove:** If your numbers don't match, open an issue with your methodology and data. We'll update this page.
- **Optimize:** Found a configuration that performs better? A different hook profile, model combination, or delegation strategy? Contributions are welcome.
- **Expand:** Test on Cursor or OpenCode. Test with different task types. Test with larger knowledge bases.

File issues or PRs at [lorehq/lore](https://github.com/lorehq/lore/issues) or [lorehq/lore-gotcha-demo](https://github.com/lorehq/lore-gotcha-demo/issues).
