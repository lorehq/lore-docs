---
title: "Heat-Based Memory Tiering"
---

# Heat-Based Memory Tiering

Lore implements **Automated Storage Tiering** (AST) to manage agent context. This biological-style architecture ensures that your agent stays high-signal by distinguishing between volatile experiences and permanent knowledge.

## 1. The Hot Tier (Experiences)
Powered by **Redis Stack**, the Hot Tier (Short-Term Memory) is a high-speed sandbox for session-scoped facts. It uses a "Leaky Integrator" model where facts naturally fade unless reinforced.

- **TTL (Time-To-Live)**: Facts have a sliding 24-hour expiration.
- **Reinforcement**: Every access or query resets the TTL clock.
- **Heat Threshold**: Facts that are accessed frequently reach "Peak Heat."

## 2. The Persistent Tier (Knowledge)
The **Local Intelligence Enclave** (~/.lore/) and project `docs/` represent the Persistent Tier (Long-Term Knowledge). These are curated, versioned Markdown files.

## 3. The Memprint Mechanism
**Memprint** is the functional act of imprinting a volatile experience into permanent tissue. When you run `/lore-memprint`, the engine performs **Cache De-staging**:

1. It scans the Hot Tier for facts at "Peak Heat."
2. It presents these "Print-Ready" candidates to the operator.
3. Upon approval, it "burns" them into the permanent KB and clears them from the cache.

## The Analogy: Biological Imprinting
In nature, **imprinting** is a phase-sensitive learning process that is rapid and independent of the consequences of behavior. In the human brain, high-heat experiences (those with high emotional or survival significance) are instantly prioritized for **System Consolidation**.

Lore's **Memprint** mirrors this process:
- **Synaptic (Hot)**: A new fact is like a temporary synaptic connection. It's fast but fragile.
- **The Heat**: Frequent use creates "Heat" (LTP - Long Term Potentiation), signaling to the system that this fact is vital.
- **The Imprint**: Running `/lore-memprint` is like the transition from hippocampal cache to cortical storage. It "burns" the pattern into the permanent structure of the brain, making it part of your agent's fundamental nature.
