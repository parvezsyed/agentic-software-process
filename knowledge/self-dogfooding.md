---
type: Playbook
title: Self-Dogfooding
description: How to apply this process when changing the process repository itself.
tags: [process-maintenance, dogfooding, validation]
timestamp: 2026-06-14T00:00:00Z
---

# Classification

Treat changes to this repository as process work:

- Lightweight: typo, broken link, small wording clarification, example copy edit.
- Standard: schema change, new example, validator change, entrypoint change, new knowledge page.
- Deep: lifecycle change, scale-mode change, artifact policy change, security/release gate change, or change that affects multiple artifact types.

# Required Artifacts

For standard changes, create or update:

- Relevant schema or example.
- `knowledge/log.md` or directory `log.md`.
- Validation evidence from `npm test`.

For deep changes, also update:

- `agentic-software-delivery-process.md`.
- `agentic-software-delivery-process.json`.
- At least one representative example.
- Reconciliation notes describing what future agents should read first.

# Stop Conditions

Pause when:

- A schema change would invalidate existing examples without a migration.
- The lightweight path becomes heavier.
- The manual and JSON lifecycle disagree.
- A new rule cannot be validated, exemplified, or tied to a real failure mode.
