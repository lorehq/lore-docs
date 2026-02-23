---
title: Cost Evidence
---

# Cost Evidence

This page presents cost data from a controlled comparison between raw Claude Code and Lore on the same task. Raw cold and all Lore conditions have N=9–10 runs for statistical confidence.

If you're skeptical, good. Read the [limitations](#limitations) first, then run the [test yourself](#reproduce-it).

## Methodology

**Task:** Determine whether current inventory can fill all orders from last week. Two mock APIs (orders and inventory) with deliberate gotchas — version traps, required headers, non-obvious query parameters.

**Five conditions**, same task, same day:

| Condition | N | Framework | Orchestrator | Workers | Prior Knowledge |
|-----------|---|-----------|-------------|---------|-----------------|
| Raw Cold | 10 | None | Opus 4.6 | — (inline) | None |
| Lore Cold | 9 | Lore v0.11.0 | Opus 4.6 | Haiku 4.5 | None |
| Lore Warm | 9 | Lore v0.11.0 | Opus 4.6 | Haiku 4.5 | Skills + env docs from cold |
| Lore Hot | 10 | Lore v0.11.0 | Opus 4.6 | varies | Skills + env docs, writes runbook |
| Lore Runbook | 10 | Lore v0.11.0 | Opus 4.6 | Haiku 4.5 | Full knowledge + runbook |

Each Lore condition ran on a separate instance (lore-01 through lore-10), one session per condition per instance. "Cold" = no prior knowledge. "Warm" = knowledge captured from cold. "Hot" = knowledge from cold+warm, writes a runbook. "Runbook" = full knowledge stack, pure execution.

**Pricing basis:** Cache-aware API rates. Tests ran on Claude Max (flat-rate subscription) — cost figures represent API-equivalent spend.

| Model | Input | Output | Cache Read | Cache Create |
|-------|-------|--------|------------|--------------|
| Opus 4.6 | $5.00/MTok | $25.00/MTok | $0.50/MTok | $6.25/MTok |
| Haiku 4.5 | $1.00/MTok | $5.00/MTok | $0.10/MTok | $1.25/MTok |

Source: [Anthropic API Pricing](https://docs.anthropic.com/en/docs/about-claude/pricing)

**Timing:** Execution time only — wall time minus operator idle gaps (>3s between assistant and user events).

**Cost split:** Each session's cost is split into "getting the answer" (API exploration, reasoning, final output) and "capture" (writing skills, environment docs, runbooks). This isolates the one-time knowledge investment from the recurring answer cost.

## Results

### Summary Table

| Condition | N | Answer (median) | Capture (mean) | Total (median) | vs Raw Cold | Exec (median) |
|-----------|---|-----------------|----------------|----------------|-------------|---------------|
| **Raw Cold** | 10 | $0.4531 | — | $0.4531 | — | 3m 0s |
| **Lore Cold** | 9 | $0.3395 | $0.0670 | $0.4029 | -11% | 6m 34s |
| **Lore Warm** | 9 | $0.2408 | — | $0.2408 | -47% | 4m 13s |
| **Lore Hot** | 10 | $0.2446 | $0.0795 | $0.3389 | -25% | 6m 55s |
| **Lore Runbook** | 10 | $0.1870 | — | $0.1870 | **-59%** | 1m 46s |

### Progression: Each Knowledge Layer Reduces Cost

| Transition | Answer (median) | Reduction | What Changed |
|-----------|----------------|-----------|--------------|
| Raw Cold → Lore Cold | $0.45 → $0.34 | -25% | Delegation to Haiku workers |
| Lore Cold → Lore Warm | $0.34 → $0.24 | -29% | Skills + env docs eliminate API discovery |
| Lore Warm → Lore Runbook | $0.24 → $0.19 | -22% | Runbook provides step-by-step procedure |
| **Raw Cold → Lore Runbook** | **$0.45 → $0.19** | **-59%** | **Full stack: delegation + knowledge + runbook** |

### Key Findings

**Delegation alone is cheaper.** On a cold run with zero prior knowledge, the answer-only median ($0.34) is 25% cheaper than raw Claude ($0.45). The savings come from routing API exploration to Haiku workers ($0.10/MTok cache read) instead of running it inline on Opus ($0.50/MTok cache read). No knowledge base needed.

**Knowledge compounds.** Each layer — skills, environment docs, runbook — removes another chunk of exploration. By the runbook stage, workers don't explore at all. They execute known procedures with known endpoints.

**The steady state is 59% cheaper and 41% faster.** Lore Runbook ($0.19 median, 1m 46s) vs Raw Cold ($0.45 median, 3m 0s). This is the cost of a task after knowledge has been captured — which is the normal operating mode after initial setup.

**Runbook is the most predictable.** Standard deviation drops from $0.11 (raw cold) to $0.04 (runbook). The cost range tightens from 2.0x ($0.30–$0.61) to 1.9x ($0.14–$0.27). Structured knowledge doesn't just reduce cost — it reduces variance.

## Capture ROI

Capture is a one-time investment that pays off on every subsequent run.

| Phase | Mean Capture Cost | What Was Captured |
|-------|-------------------|-------------------|
| Cold | $0.07 | Skills (API gotchas), environment docs (endpoints, params, headers) |
| Hot | $0.08 | Runbook (step-by-step procedure for the full task) |
| **Total investment** | **$0.15** | |

| Metric | Value |
|--------|-------|
| Steady-state savings per run (runbook vs raw cold) | $0.26 |
| **Break-even** | **1st runbook run** (saves $0.26, cost $0.15 to capture) |
| Net savings after 5 runs | $1.15 |
| Net savings after 10 runs | $2.44 |

The capture investment pays for itself on the very first reuse.

## Where the Savings Come From

| Mechanism | First Run | Steady State | Impact |
|-----------|-----------|-------------|--------|
| Model tiering | Yes | Yes | Workers on Haiku ($0.10/MTok cache read) instead of Opus ($0.50/MTok) — 5x cheaper per token |
| Context isolation | Yes | Yes | Workers run in fresh contexts instead of accumulating in one growing Opus thread |
| Knowledge reuse | No | Yes | Workers skip exploration — endpoints and gotchas are documented |
| Runbook procedure | No | Yes | Orchestrator follows a known procedure instead of reasoning from scratch |

Model tiering and context isolation are structural — they apply from the first run. Knowledge reuse and runbook procedures compound over time.

For how these mechanisms work, see [How It Works: Delegation](how-it-works.md#2-delegation) and [Configuration](guides/configuration.md).

## Limitations

!!! warning "Read before citing these numbers"

- **One task type.** API exploration with mock services. Results may differ for code generation, refactoring, debugging, or other task patterns.
- **One model family.** Tested on Claude (Opus 4.6 orchestrator, Haiku 4.5 workers). Other model combinations may produce different results.
- **Subscription pricing.** Tests ran on Claude Max (flat-rate). Cost figures are API-equivalent estimates, relevant for understanding relative efficiency.
- **Outlier present.** One Lore Hot session (lore-01) had 62m 46s genuine execution time — included in stats but the median is more representative.
- **No cross-tool validation.** Knowledge captured on Claude Code should benefit Cursor and OpenCode sessions — not yet tested.

## Reproduce It

The test services and verification scripts are open source:

```bash
git clone https://github.com/lorehq/lore-gotcha-demo.git
cd lore-gotcha-demo

# Start services
node orders-service.js &
node inventory-service.js &

# Run the test prompt on raw Claude Code
# Then install Lore and run the same prompt
npx create-lore

# Verify results match ground truth
bash verify-fulfillment.sh
```

See the [repo README](https://github.com/lorehq/lore-gotcha-demo) for full setup, ground truth values, and the verification scripts.
