---
type: Architecture Map
title: Agentic Process Repository
description: Example architecture map for the process repository itself.
tags: [architecture, process, examples]
timestamp: 2026-06-14T00:00:00Z
---

# Overview

The repository has three layers:

- Reference process: long-form human and machine-readable process definitions.
- Validated contracts: JSON schemas and examples for execution packets.
- Agent knowledge: compact entrypoints, indexes, logs, and examples that support progressive disclosure.

# Components

| Component | Purpose |
| --- | --- |
| `agentic-software-delivery-process.md` | Full human-readable manual |
| `agentic-software-delivery-process.json` | Machine-readable lifecycle metadata |
| `schema/` | Validated execution contracts |
| `examples/` | Representative packets and OKF-style docs |
| `scripts/validate.mjs` | Local validation entrypoint |

# Boundaries

JSON packets are for contracts that automation validates. Markdown documents are for durable knowledge humans and agents read directly.

# Citations

[1] [Open Knowledge Format specification](https://github.com/GoogleCloudPlatform/knowledge-catalog/blob/main/okf/SPEC.md)
