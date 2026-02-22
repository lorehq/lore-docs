---
title: Cost Evidence
---

# Cost Evidence

This page presents cost data from a controlled comparison between raw Claude Code and Lore on the same task. It is directional evidence from a single test, not a statistically validated benchmark. The numbers are real but the sample size is small — treat them as an honest first data point, not a guarantee.

If you're skeptical, good. Read the [limitations](#limitations) first, then decide if the methodology is credible enough to run your own comparison.

## Methodology

**Task:** Determine whether current inventory can fill all orders from last week. Two mock APIs (orders and inventory) with deliberate gotchas — version traps, required headers, non-obvious query parameters.

**Four conditions**, same task, same day:

| Condition | Framework | Orchestrator | Workers | Prior Knowledge |
|-----------|-----------|-------------|---------|-----------------|
| Raw Cold | None | Opus 4.6 | — (inline) | None |
| Raw Warm | None | Opus 4.6 | — (inline) | Claude Code auto-memory from cold run |
| Lore Cold | Lore v0.10.1 | Opus 4.6 | Haiku 4.5 | None |
| Lore Warm | Lore v0.10.1 | Opus 4.6 | Haiku 4.5 | Skills + env docs captured from cold run |

"Cold" means no prior knowledge of the APIs. "Warm" means a previous session interacted with the same APIs.

**Pricing basis:** API-equivalent rates with a blended 75/25 input/output ratio. These tests ran on Claude Max (flat-rate subscription), so cost figures represent what the compute *would* cost at API rates.

| Model | Input | Output | Blended (75/25) |
|-------|-------|--------|-----------------|
| Opus 4.6 | $5.00/MTok | $25.00/MTok | $10.00/MTok |
| Haiku 4.5 | $1.00/MTok | $5.00/MTok | $2.00/MTok |

Source: [Anthropic API Pricing](https://docs.anthropic.com/en/docs/about-claude/pricing)

## Results

### Per-Run Cost

| | Raw Cold | Raw Warm | Lore Cold | Lore Warm |
|---|---|---|---|---|
| Opus tokens | ~60k | ~50k | ~15k | ~15k |
| Haiku tokens | — | — | 37.5k | 31.5k |
| Opus cost | $0.600 | $0.500 | $0.150 | $0.150 |
| Haiku cost | — | — | $0.075 | $0.063 |
| **Answer cost** | **$0.600** | **$0.500** | **$0.225** | **$0.213** |
| vs Raw Cold | — | -17% | -63% | -65% |
| Time | 1m 17s | 56s | 1m 21s | 1m 15s |

Lore Cold includes a one-time capture cost of $0.120 (~12k Opus tokens), bringing total session cost to $0.345 — still 42% cheaper than Raw Cold.

### Key Observations

**Delegation alone is cheaper.** Even on a cold run with zero prior knowledge, the answer cost ($0.225) is 63% cheaper than raw Claude ($0.600). No knowledge base needed. The savings come entirely from routing API exploration to Haiku workers instead of running it inline on Opus.

**Built-in memory doesn't help.** Raw Warm ($0.500) shows no meaningful improvement over Raw Cold ($0.600). Claude Code's auto-memory stores preferences, not operational knowledge — API endpoints, required headers, and gotchas are lost between sessions.

**Knowledge reuse is a secondary lever.** Lore Warm ($0.213) vs Lore Cold ($0.225) saves another 5% by reducing exploration. The primary savings come from delegation and model tiering, not from accumulated knowledge.

## Capture ROI

| Metric | Value |
|--------|-------|
| Capture investment | $0.120 (one-time) |
| Savings vs Raw Cold per warm run | $0.387 |
| Savings vs Raw Warm per warm run | $0.287 |
| **Break-even** | **First warm run** |
| Net ROI after 1 warm run | +$0.167 to +$0.267 (139–223%) |
| Net ROI after 5 warm runs | +$1.315 to +$1.815 |

The $0.120 capture investment pays for itself on the first reuse. Every subsequent run saves $0.29–$0.39 at near-zero marginal cost.

## Where the Savings Come From

| Mechanism | What It Does | Impact |
|-----------|-------------|--------|
| Model tiering | Worker compute on Haiku ($2/MTok) instead of Opus ($10/MTok) | 5x cheaper per worker token |
| Context isolation | Workers run in fresh contexts; raw Claude accumulates all tool results in one growing context | Lower per-call input cost |
| Knowledge reuse | Warm workers skip exploration (14 tool uses vs 47 cold) | 70% fewer round-trips |
| Ambiguity scan | Flags vague inputs before delegating to cheap models | Prevents reasoning errors in workers |

Model tiering and context isolation are structural — they apply from the first run. Knowledge reuse and ambiguity scanning compound over time as the knowledge base grows.

For how these mechanisms work, see [How It Works: Delegation](how-it-works.md#2-delegation) and [Configuration](guides/configuration.md).

## Limitations

!!! warning "This is not a benchmark"

    The following limitations mean these results should inform your expectations, not set them.

- **N=1.** Single run per condition. LLM behavior is probabilistic — the same task produced 15–30 tool uses across different cold runs. Statistical confidence requires 5–10 runs per condition.
- **One task type.** API exploration with mock services. Results may differ for code generation, refactoring, debugging, or other task patterns.
- **Orchestrator tokens estimated.** Only worker token counts were captured from the Claude Code UI. Orchestrator tokens inferred from typical context patterns.
- **Subscription pricing.** Tests ran on Claude Max (flat-rate), not metered API. Cost figures are API-equivalent estimates, relevant for API users and for understanding relative efficiency.
- **No cross-tool validation.** Knowledge captured on Claude Code should benefit Cursor and OpenCode sessions — not yet tested.

## Reproduce It

Run the same comparison on your own tasks:

1. Pick a task that involves API exploration or multi-step tool use
2. Run it on raw Claude Code (no framework) and note the token count from the UI
3. Install Lore (`npx create-lore`), run the same task, and compare
4. Run a second Lore session after knowledge capture to measure the warm delta

Lore logs hook events and worker spawns to the session. Use these to reconstruct token counts per worker and compare against the raw baseline.
