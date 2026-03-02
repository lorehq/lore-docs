---
title: "Architecture"
---

# Architecture

```text
                                 [ LORE SIDE-CAR ]
                                 ( LAM RUNTIME )
                                 ║
                                 ╠═[ Short-Term Memory ] (Redis)
                                 ║   Fast session context
                                 ║
                                 ╠═[ Activity Scoring ]  (SQLite)
                                 ║   Heat & Decay Engine
                                 ║
                                 ╚═[ Semantic Search ]
                                     Local knowledge API


 [ PROJECT INSTANCES ]
 ( Multi-Platform Projections )
 ║
 ╠══[ Cloud-Infra ] (Terraform)
 ║   ./codebase/src/*.tf
 ║   ./.lore/ (Project Rules)
 ║
 ╚══[ Legacy-API ]  (ASP.NET)
     ./codebase/src/*.cs
     ./.lore/ (Project Skills)


 [ THE LOCAL ENCLAVE ]
 ( ~/.lore/ - Private Git Repo )
 ║
 ╠═[ Canonical Primitives ]
 ║   Rules, Skills, Agents,
 ║   Primers, Runbooks, Fieldnotes
 ║
 ╚═[ Personal Identity ]
     User, Operator, Machine
```

Lore is a decentralized intelligence layer for AI coding agents. It uses **Project Decoupling** to keep your private machine-global knowledge separate from your project codebases.

## 1. The Local Enclave (~/.lore/)
At the base of the stack is the **Local Intelligence Enclave**. This is a private, logically isolated Git repository on your machine. It houses your canonical identity, global behavioral rules, and the "Fieldnotes" (snags and gotchas) you've collected across all projects.

## 2. Project Shells
Individual repositories only carry what is specific to that codebase. Lore "snaps" onto these repos, aggregating your global enclave knowledge with local documentation at runtime.

## 3. The Sidecar
Spanning the entire ecosystem is the Lore Sidecar. It provides the high-speed volatile memory (Redis) and activity tracking (SQLite) that allows Lore to promote "Hot" context automatically while letting irrelevant facts fade.
