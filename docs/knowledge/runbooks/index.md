# Runbooks

The `runbooks/` directory holds step-by-step procedures for multi-step operations — deploy sequences, incident response flows, release checklists, and similar repeatable workflows. Runbooks are written during `/lore-capture` when a task required more than a single skill to document correctly.

## System Runbooks

The `system/` subdirectory contains framework-owned runbooks that are overwritten on every `/lore-update`. These provide standard procedures for Lore operations like knowledge defrag and hook testing. Operator runbooks live in the parent directory and are never touched by the framework.
