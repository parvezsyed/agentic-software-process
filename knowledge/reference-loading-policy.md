---
type: Process Policy
title: Reference Loading Policy
description: How agents should load this repository without wasting context.
tags: [context, progressive-disclosure, reference]
timestamp: 2026-06-14T00:00:00Z
---

# Policy

Do not load the full process manual or full lifecycle JSON by default. Use progressive disclosure.

# Loading Order

1. Read `AGENT-ENTRYPOINT.md`.
2. Read `knowledge/index.md`.
3. Open only the relevant policy, schema, and example files for the selected scale mode.
4. Use `rg` to find specific sections in `agentic-software-delivery-process.md` or `agentic-software-delivery-process.json` when the smaller files are insufficient.

# When To Load The Full Reference

Load the full reference only for deep, enterprise, security-sensitive, architecture-heavy, or process-maintenance work.

# Required Behavior

If an agent summarizes or extracts part of the full reference, it should state which sections or line ranges it used.
