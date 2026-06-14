---
type: Process Policy
title: Target Repo Installation
description: Storage and naming conventions when applying this process to another codebase.
tags: [installation, storage, naming]
timestamp: 2026-06-14T00:00:00Z
---

# Minimal Install

For lightweight use, add:

```text
AGENT-ENTRYPOINT.md
AGENTS.md
docs/execution/
docs/evidence/
schema/
process.config.json
```

`AGENT-ENTRYPOINT.md` explains how to apply this process. `AGENTS.md` is the target repo's durable instruction file for coding agents. In minimal installs, `AGENTS.md` can point back to `AGENT-ENTRYPOINT.md` and list local commands.

Use `process.config.json` only when tool preferences should persist. Omit it for one-off or tool-agnostic work.

# Standard Install

For normal product work, add:

```text
docs/
  intake/
  product/
  architecture/
    adr/
  execution/
  evidence/
  memory/
schema/
examples/
AGENT-ENTRYPOINT.md
AGENTS.md
process.config.json
```

# Naming

- Ready-To-Proceed Packet: `docs/intake/ready-to-proceed-<initiative>.json`
- Execution Brief: `docs/execution/execution-brief-<initiative>.md`
- Task Graph: `docs/execution/task-graph-<initiative>.json`
- PR Task Packet: attach to the draft PR body or store as `docs/execution/pr-task-packet-<pr-or-task>.json`
- ADR: `docs/architecture/adr/0001-<decision>.md`
- Evidence: `docs/evidence/<initiative-or-release>/README.md`

# Linking

Every PR Task Packet should link to its Task Graph task. Every Task Graph should link to its source brief, architecture map, and ADRs when present.
