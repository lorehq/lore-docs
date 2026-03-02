---
title: CI & Testing
---

# CI & Testing

All three repos run CI on every push and PR:

| Repo | OSes | Node Versions | Key Checks |
|------|------|---------------|------------|
| lore | Ubuntu, macOS, Windows | 18, 20 | Unit tests, ShellCheck, Prettier, ESLint, npm audit, consistency validation |
| create-lore | Ubuntu, macOS, Windows | 18, 20 | Unit tests, E2E scaffolding, consistency validation |
| lore-docs | Ubuntu | -- | `mkdocs build --strict`, markdownlint |

Releases are tag-driven via GitHub Actions. The `create-lore` release workflow verifies a matching `lore` tag exists before publishing to npm.

See [Production Readiness](../concepts/production-readiness.md) for the full production-readiness assessment including test coverage, MEMORY.md protection, and upgrade policy.
