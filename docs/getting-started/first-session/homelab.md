---
title: First Session Setup — Homelab
---

# First Session Setup: Homelab

This guide covers first-session setup for operators managing personal infrastructure — Proxmox clusters, self-hosted services, home automation, NAS, media servers. The goal is to ground the agent in your network, your hardware, and your services before any project work.

**Run this once per Lore instance.** A well-configured instance knows your VLANs, your hypervisors, and your service stack — a cold one asks you to explain your network every session.

!!! tip "Your agent can help with all of this"
    Everything on this page can be done conversationally. Ask it to walk you through first-session setup, or jump to any phase — "map my network," "inventory my Proxmox cluster," "set up my keystore." The guide explains what happens and why, but you don't need to follow it manually.

!!! info "Where this guide came from"
    Lore was born in a homelab. The phases below trace the actual path walked during the project's first 131 commits — network topology first, then hardware, then services. It's not a theoretical framework; it's the sequence that worked.

---

## Phase 0: Docs Sidecar & Semantic Search

**Strongly recommended as your first step.** The Docker sidecar gives you semantic search across all knowledge and a live docs UI from the start. Every skill, environment doc, and runbook you create in later phases becomes instantly searchable.

Tell your agent to start the docs sidecar. It handles starting the Docker container, computing the port, and confirming when search is available.

If Docker isn't available on the machine running your agent, skip this and continue — everything works without it, you just lose semantic search and the live docs preview.

---

## Phase 1: Identity & Agent Rules

**Goal:** Ground the agent in who you are, what you're running, and what it should never do without asking.

**Operator profile** — Tell the agent your name, what your homelab is for (learning, media, home automation, development, all of the above), and how you prefer to manage infrastructure. Ansible? Terraform? Click-ops in the Proxmox UI? No judgment — the agent adapts to your workflow. It writes `docs/knowledge/local/operator-profile.md` (gitignored).

**Machine inventory** — The agent discovers the machine it's running on: hostname, OS, installed tools, shell environment. This is the management workstation, not the homelab nodes — those come in Phase 4. It writes `docs/knowledge/local/machine.md` (gitignored).

**Agent rules** — Tell the agent what this instance covers and set behavioral boundaries. Homelab instances need one critical rule that enterprise instances don't:

!!! warning "Destructive operations require confirmation"
    Your agent can SSH into hypervisors, call Proxmox APIs, and modify firewall rules. Set an explicit rule: **never auto-apply destructive changes** — reboots, VM destruction, firewall modifications, storage pool changes — without confirmation. Write this into `docs/context/agent-rules.md` so it's injected every session.

---

## Phase 2: Keystore

**Goal:** Establish a secret store before ingesting any credentials.

**Rule:** Secrets never go in the knowledge base. The knowledge base documents item names and what they're for — never values.

Homelab operators typically use one of:

- **Vaultwarden** (self-hosted Bitwarden) — if you're already running it, the `bw` CLI works directly
- **`pass`** (GPG-based) — lightweight, git-friendly, no server needed
- **1Password / Bitwarden cloud** — works fine, the agent just needs the CLI authenticated

Authenticate the CLI yourself — keystore auth is interactive. Once authenticated, tell the agent to discover and document what's stored. It will catalog items like Proxmox API tokens, SSH keys, router admin credentials, service API keys, and DNS provider tokens — names and purposes only, never values.

---

## Phase 3: Network Mapping

**Start with the network.** This is what makes homelab setup fundamentally different from enterprise onboarding. Every subsequent phase — hypervisor discovery, service mapping, storage topology — references network context. Which VLAN? Which subnet? Which interface? Without the network map, the agent asks you these questions repeatedly.

Tell your agent what you're running for routing/firewall — OPNsense, pfSense, OpenWrt, Unifi, MikroTik, or something else — and how to access it. The agent can work from:

- **Config export** — OPNsense XML backup, pfSense config, OpenWrt UCI export
- **API access** — OPNsense/pfSense REST API, Unifi controller API
- **SSH** — direct CLI access to parse running config

From the config, the agent extracts and documents:

- **VLANs** — ID, name, purpose, subnet, gateway, DHCP range
- **Firewall rules** — inter-VLAN policy, port forwards, NAT
- **Switch topology** — which ports on which switches, trunk vs access, VLAN assignments
- **Wireless** — SSIDs, VLAN bindings, AP locations
- **DNS** — upstream resolvers, local overrides, split-horizon if applicable

??? example "What your agent produces"
    ```
    docs/knowledge/environment/network-topology.md
    ```
    A VLAN table, subnet map, physical connectivity summary, and key firewall rules. This becomes the reference document that every later phase links back to.

!!! note "You don't need every detail on day one"
    If your network is simple (flat network, one subnet, consumer router), this phase is quick — the agent documents what's there and moves on. The structure scales with complexity; it doesn't require it.

---

## Phase 4: Infrastructure Inventory

**Goal:** Map the physical and virtual compute layer — what hardware you have, what's running on it, and how storage is organized.

### Hypervisors

Tell your agent how to reach your hypervisor management interface. For Proxmox (the most common case), it can use:

- **Proxmox API** — provide the URL and an API token (stored in the keystore from Phase 2)
- **SSH** — direct access to enumerate via `pvesh` or `/etc/pve`

The agent discovers: nodes, CPU/RAM specs, cluster membership, and HA configuration.

### Storage

Storage topology in a homelab is often the most complex layer. The agent maps:

- **Ceph** — monitors, OSDs, pools, cluster networks, replication factor
- **ZFS** — pools, datasets, compression, snapshots
- **NFS/SMB exports** — what's shared, from where, to which networks
- **Proxmox storage config** — which backends are configured, where VMs and backups land

### Compute

The agent enumerates VMs and containers across all nodes:

- VMID, name, hosting node, allocated resources (CPU, RAM, disk)
- Network interfaces and IPs (cross-referenced with the VLAN map from Phase 3)
- Purpose — the agent asks you to annotate anything it can't infer from the hostname

??? example "What your agent produces"
    ```
    docs/knowledge/environment/hypervisors.md
    docs/knowledge/environment/storage.md
    docs/knowledge/environment/compute-inventory.md
    ```
    Each file covers one layer. The compute inventory cross-references VLANs and storage — "VM 201 runs on node pve-02, uses Ceph pool `fast`, sits on VLAN 30 (services)."

---

## Phase 5: Service Mapping

**Goal:** Enumerate the services running across your infrastructure — containers, orchestration, DNS, reverse proxy, backups, and media.

This phase typically involves the agent SSH-ing into multiple hosts or querying APIs. Tell it which hosts run Docker/Podman and how to reach them.

### Containers

The agent runs `docker ps` (or equivalent) on each host and catalogs: container name, image, ports, volumes, restart policy, and which compose stack it belongs to.

### Orchestration (if applicable)

Running k3s, k8s, or Docker Swarm? The agent maps nodes, namespaces, deployments, services, and ingress rules.

### Reverse Proxy

Whether it's Nginx Proxy Manager, Traefik, or Caddy — the agent enumerates proxy hosts, backends, and SSL certificate status. This ties services to the domain names you actually use.

### DNS

AdGuard Home, Pi-hole, or CoreDNS — the agent documents upstream config, local DNS entries, conditional forwarding, and optionally DHCP leases.

### Backups

Proxmox Backup Server, Borg, Restic, rsync — the agent maps backup schedules, targets, retention policies, and last successful run times.

### Media & Other Stacks

If you're running an Arr stack, Jellyfin/Plex, Immich, Home Assistant, or similar — the agent documents each service's role, what host it runs on, and how it connects to storage and network.

??? example "What your agent produces"
    Service docs in `docs/knowledge/environment/` — one per logical group (containers, dns, backups, media) or one per host, depending on your preference. The agent proposes the structure and you approve before it writes.

!!! tip "Gotchas become skills"
    During service mapping, the agent will inevitably hit quirks — a container that needs a specific network mode, a backup job that fails silently, a DNS rebinding issue. Each of these is a skill candidate. The agent proposes them; you approve.

---

## Phase 6: IaC Bootstrap (Optional)

**Goal:** Connect existing infrastructure-as-code repos or establish a starting point.

**If you already use IaC** (Terraform for Proxmox VMs, Ansible for host configuration, Pulumi, NixOS configs), tell the agent where those repos live. It discovers what's managed vs manual and documents the boundary. Link work repos via `/lore-link`.

**If you don't use IaC yet**, the agent can propose a starting point based on what it discovered in Phases 3–5:

- An Ansible inventory built from discovered hosts and their roles
- Terraform resources for Proxmox VM/container definitions
- A simple shell-based approach if that fits your workflow better

This phase is entirely optional. Plenty of productive homelabs run on manual configuration and that's fine — the agent's value is in documenting what exists, not forcing a workflow change.

---

## Phase 7: First Capture Cycle

**Goal:** Organize what was discovered, verify it's searchable, and establish a working rhythm.

**Review and capture** — The agent reviews everything created in Phases 3–5. Any gotchas discovered during setup become skills. Any procedures that took multiple steps become runbooks.

**Knowledge defrag** — First-run generates docs fast. The result is usually a flat pile of environment files. Tell the agent to run the knowledge defrag runbook — it restructures, deduplicates, and organizes without losing information.

**Verify semantic search** — If you set up the docs sidecar in Phase 0, confirm that key terms return results: your VLAN names, service names, host IPs, storage pool names. If something's missing, the agent indexes it.

**Set up first work item** — If you have a current project (migrating a service, expanding storage, setting up a new backup target), create a plan or roadmap now. The agent has full context to help scope it.

---

## Verification

Ask your agent to verify setup is complete — it checks:

- Operator profile and agent rules are written
- Keystore is authenticated and items are documented
- Network topology is mapped (VLANs, subnets, firewall)
- Hypervisors and compute inventory are current
- Services are cataloged with ports, hosts, and purposes
- Semantic search returns results for infrastructure terms
- Any active work items are tracked
