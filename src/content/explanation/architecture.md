---
title: "Architecture"
---

# Architecture

![Lore v2 Architecture](/lore-v2-architecture.png)

Lore is a decentralized intelligence layer for AI coding agents.

## 1. The Secure Enclave
At the bottom of the stack is your private machine-global enclave. This is where your personal identity, machine facts, and every snag you've ever hit live securely in an air-gapped environment.

## 2. Project Shells
Lore snaps onto any codebase (from ASP.NET to Terraform) via a minimal `.lore/` directory. It aggregates your global intelligence with project-specific documentation.

## 3. The Sidecar
Spanning the entire lifecycle is the Lore Sidecar, providing high-speed Redis-backed memory and semantic search to ensure your agent stays grounded and fast.
