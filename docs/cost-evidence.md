---
title: Cost Evidence
---

# Cost Evidence

This page presents cost data from a controlled comparison between raw Claude Code and Lore on the same task. Raw cold has N=10 runs for statistical confidence. Lore conditions are preliminary (N=1) with full N=10 in progress.

If you're skeptical, good. Read the [limitations](#limitations) first, then decide if the methodology is credible enough to run your own comparison.

## Methodology

**Task:** Determine whether current inventory can fill all orders from last week. Two mock APIs (orders and inventory) with deliberate gotchas — version traps, required headers, non-obvious query parameters.

**Four conditions**, same task, same day:

| Condition | N | Framework | Orchestrator | Workers | Prior Knowledge |
|-----------|---|-----------|-------------|---------|-----------------|
| Raw Cold | 10 | None | Opus 4.6 | — (inline) | None |
| Lore Cold | 1* | Lore v0.11.0 | Opus 4.6 | Haiku 4.5 | None |
| Lore Warm | 1* | Lore v0.11.0 | Opus 4.6 | varies | Skills + env docs from cold run |
| Lore Hot | 1* | Lore v0.11.0 | Opus 4.6 | varies | Full knowledge from cold + warm |

*N=10 in progress. Preliminary results shown.

"Cold" means no prior knowledge of the APIs. "Warm" means knowledge captured from one prior session. "Hot" means knowledge from two prior sessions — all gotchas documented, no new exploration needed.

**Pricing basis:** Cache-aware API rates. These tests ran on Claude Max (flat-rate subscription), so cost figures represent what the compute *would* cost at API rates.

| Model | Input | Output | Cache Read | Cache Create |
|-------|-------|--------|------------|--------------|
| Opus 4.6 | $5.00/MTok | $25.00/MTok | $0.50/MTok | $6.25/MTok |
| Sonnet 4.6 | $1.50/MTok | $7.50/MTok | $0.15/MTok | $1.875/MTok |
| Haiku 4.5 | $1.00/MTok | $5.00/MTok | $0.10/MTok | $1.25/MTok |

Source: [Anthropic API Pricing](https://docs.anthropic.com/en/docs/about-claude/pricing)

**Timing:** Execution time only — wall time minus operator idle gaps (>3s between assistant and user events). Tool permission approvals (<1s) pass through.

## Results

### Raw Cold Baseline (N=10)

All compute on Opus 4.6. No delegation, no knowledge base, no subagents.

| Metric | Min | Max | Mean | Median |
|--------|-----|-----|------|--------|
| Requests | 17 | 32 | 24.1 | 24.5 |
| Exec time | 2m 7s | 4m 36s | 3m 2s | 3m 0s |
| **Cost** | **$0.30** | **$0.61** | **$0.45** | **$0.45** |

High variance — the same task on the same model ranges 2x in cost. This is the nature of LLM-driven exploration without structure.

### Lore Pilot (N=1, preliminary)

Cost split into "getting the answer" vs "capturing knowledge" to quantify the investment ROI.

| | Answer (Orch) | Answer (Workers) | Answer Total | Capture | Grand Total |
|---|---|---|---|---|---|
| **Lore Cold** | $0.2536 (Opus) | $0.0717 (Haiku) | $0.3253 | $0.0599 | **$0.3852** |
| **Lore Warm** | $0.2768 (Opus) | — | $0.2768 | $0.0869 | **$0.3636** |
| **Lore Hot** | $0.2410 (Opus) | $0.0274 (Sonnet) | $0.2684 | — | **$0.2684** |

| | Cost | vs Raw Cold Mean | Exec Time | vs Raw Cold Mean |
|---|---|---|---|---|
| **Raw Cold** (mean, N=10) | $0.4542 | — | 3m 2s | — |
| **Lore Cold** (answer only) | $0.3253 | **-28%** | 2m 38s | -13% |
| **Lore Hot** | $0.2684 | **-41%** | 1m 12s | **-60%** |

### Key Findings

**Delegation alone is cheaper.** Even on a cold run with zero prior knowledge, the answer-only cost ($0.33) is 28% cheaper than raw Claude ($0.45). No knowledge base needed. The savings come entirely from routing API exploration to Haiku workers ($0.10/MTok cache read) instead of running it inline on Opus ($0.50/MTok cache read).

**Knowledge eliminates exploration.** By the hot run, workers don't explore — they have endpoints, parameters, and required headers from captured knowledge. Opus cache read drops from ~577k tokens (raw) to 157k (hot). 41% cheaper, 60% faster.

**Context accumulation is the hidden cost driver.** Raw Claude accumulates all curl results in one growing Opus context (~577k cache read tokens on average). Lore keeps workers in isolated cheap-model contexts and the orchestrator's context stays small. This is a structural advantage, not a tuning knob.

## Capture ROI

| Metric | Value |
|--------|-------|
| Total capture investment (cold + warm) | $0.1468 |
| Answer savings per hot run vs raw cold | $0.1858 |
| **Break-even** | **1st hot run** (nets +$0.04) |
| Savings after 5 hot runs | $0.78 |
| Savings after 10 hot runs | $1.71 |

The capture investment pays for itself on the first reuse. Every subsequent run saves ~$0.19 at near-zero marginal cost.

## Where the Savings Come From

| Mechanism | What It Does | Impact |
|-----------|-------------|--------|
| Model tiering | Worker compute on Haiku/Sonnet instead of Opus | 5–10x cheaper per worker token |
| Context isolation | Workers run in fresh contexts; raw Claude accumulates all tool results in one growing context | 73% less Opus cache read by hot run |
| Knowledge reuse | Hot workers skip exploration entirely | 60% faster execution |
| Structured delegation | Orchestrator reasons, workers execute | Expensive model does less busy-work |

Model tiering and context isolation are structural — they apply from the first run. Knowledge reuse compounds over time as the knowledge base grows.

For how these mechanisms work, see [How It Works: Delegation](how-it-works.md#2-delegation) and [Configuration](guides/configuration.md).

## Limitations

!!! warning "Work in progress"

    Raw cold has N=10. Lore conditions are N=1 (pilot from a single instance). Full N=10 per condition is in progress.

- **Lore N=1.** The pilot results are directional. Patterns may shift as more instances complete. Raw cold showed 2x variance ($0.30–$0.61) — Lore conditions may too.
- **One task type.** API exploration with mock services. Results may differ for code generation, refactoring, debugging, or other task patterns.
- **Subscription pricing.** Tests ran on Claude Max (flat-rate), not metered API. Cost figures are API-equivalent estimates, relevant for API users and for understanding relative efficiency.
- **No cross-tool validation.** Knowledge captured on Claude Code should benefit Cursor and OpenCode sessions — not yet tested.
- **Worker tier variance.** The hot run used Sonnet instead of Haiku for its worker. Whether the framework consistently picks optimal tiers needs more data.

## Reproduce It

Run the same comparison on your own tasks:

1. Pick a task that involves API exploration or multi-step tool use
2. Run it on raw Claude Code (no framework) and note the token count from the UI
3. Install Lore (`npx create-lore`), run the same task, and compare
4. Run a second Lore session after knowledge capture to measure the warm delta
5. Use the [session token usage runbook](https://github.com/lorehq/lorehq) to compute cache-aware costs from JSONL logs
