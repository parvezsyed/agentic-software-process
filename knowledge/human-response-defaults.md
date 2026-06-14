---
type: Process Policy
title: Human Response Defaults
description: Default behavior when a human decision is needed but no response arrives.
tags: [escalation, timeout, human-review]
timestamp: 2026-06-14T00:00:00Z
---

# Default Rule

Proceed only on reversible, low-risk technical assumptions. Pause on product, budget, security, privacy, data, architecture, vendor, deadline, or rollout decisions.

# Timeout Defaults

| Situation | Default |
| --- | --- |
| Low-risk implementation detail | Proceed with explicit assumption and record it |
| Unclear product behavior | Pause and ask |
| Security/privacy/data decision | Pause and require named approval |
| Budget or paid vendor impact | Pause and require named approval |
| Human unavailable during active incident | Follow incident runbook escalation |

# Escalation Packet

When paused, create or update a process exception record with:

- Decision needed.
- Why the agent cannot safely decide.
- Recommended default.
- Risk of waiting.
- Risk of proceeding.
- Next check-in time or owner.
