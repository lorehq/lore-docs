---
title: First Session Setup — Homelab
---

# First Session Setup: Homelab

!!! note "Coming soon"
    This guide is planned for a future release. In the meantime, [Knowledge Worker](knowledge-worker.md) covers many universal patterns — identity setup, keystore, service mapping, Docker inventory — that apply to homelab deployments.

**Target profile:** Operators managing personal infrastructure — self-hosted services, home automation, local development stacks, NAS, media servers, and similar environments with no enterprise org context.

**What will differ from Knowledge Worker:**

- No corporate cloud CLI — local tooling (Docker, Proxmox, Ansible, Terraform for homelab) instead
- Personal GitHub or self-hosted Gitea rather than enterprise VCS
- Secret store is typically local Vaultwarden or `pass` — no enterprise KMS
- Service mapping focused on local network topology, not cloud architecture
- No org wiki — documentation lives in the instance KB itself
- Work context drawn from personal projects and home infrastructure goals
