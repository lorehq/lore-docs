---
title: Troubleshooting
---

# Troubleshooting

## Installation

### `npx create-lore` fails with "Could not find remote branch"

The installer clones a specific version tag from GitHub. If the tag doesn't exist, the clone fails.

```
fatal: Remote branch v0.8.1 not found in upstream origin
```

**Fix:** Update to the latest version of create-lore:

```bash
npx create-lore@latest my-project
```

If the problem persists, [open an issue](https://github.com/lorehq/create-lore/issues).

### `npx create-lore` fails with a network error

```
fatal: unable to access 'https://github.com/lorehq/lore.git/': Could not resolve host: github.com
```

**Fix:** Check your internet connection and DNS. The installer needs to reach `github.com` to clone the template. Firewalls, VPNs, and corporate proxies can block git access.

### Node version errors

Lore requires Node.js 18 or later.

```bash
node --version  # must be >= 18
```

## Hooks

### Hooks aren't firing

**Claude Code:** Check that `hooks/` exists and contains `.js` files. Run `claude` from the project root.

**Cursor:** Check that `.cursor/hooks.json` exists and references files in `.cursor/hooks/`. Open the project folder directly in Cursor (not a parent directory).

**OpenCode:** Check that `opencode.json` exists and `.opencode/plugins/` contains `.js` files.

For all platforms, verify with:

```bash
bash scripts/validate-consistency.sh
```

### "MEMORY.md is intercepted" warning

Lore blocks writes to `MEMORY.md` in the project root because platform-level memory features overwrite it between sessions. Use the persistent alternatives:

- **Scratch notes:** `MEMORY.local.md` (gitignored, survives sessions)
- **Structured knowledge:** `docs/knowledge/` (git-tracked, shared)

### Escalating capture reminders are too aggressive

The knowledge tracker counts consecutive tool uses without capture and escalates nudges. Configure thresholds in `.lore-config`:

```json
{
  "nudgeThreshold": 5,
  "warnThreshold": 10
}
```

Higher values = fewer reminders. See [Configuration](guides/configuration.md) for details.

## Consistency

### `validate-consistency.sh` fails

This script runs 11 cross-reference checks. Common failures:

| Failure | Fix |
|---------|-----|
| Platform copies out of sync | `bash scripts/sync-platform-skills.sh` |
| Registry stale | `bash scripts/generate-registries.sh` |
| Nav stale | `bash scripts/generate-nav.sh` |
| Instructions out of sync | `bash scripts/sync-framework.sh` (via `/lore-update`) |

### `mkdocs.yml` nav is stale after adding docs

The nav is auto-generated. Regenerate it:

```bash
bash scripts/generate-nav.sh
```

## Updates

### `/lore-update` shows conflicts

`/lore-update` only touches framework-owned files (`lore-*` prefix). If you see conflicts, you may have modified a `lore-*` file directly. Framework files are overwritten on sync — move your changes to an operator-owned file (no `lore-` prefix).

### Version mismatch after update

Check that `.lore-config` and `package.json` agree:

```bash
bash scripts/check-version-sync.sh
```

If they diverge, the update didn't complete cleanly. Run `/lore-update` again.

## Still Stuck?

- Check the [guides](guides/interaction.md) for detailed walkthroughs
- [Open an issue](https://github.com/lorehq/lore/issues) with reproduction steps
- For security issues, see [SECURITY.md](https://github.com/lorehq/lore/blob/main/SECURITY.md)
