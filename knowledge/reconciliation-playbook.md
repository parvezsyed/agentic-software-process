---
type: Playbook
title: Reconciliation Playbook
description: Concrete Phase 17 checklist for keeping docs, packets, and shipped reality aligned.
tags: [phase-17, reconcile, memory]
timestamp: 2026-06-14T00:00:00Z
---

# Trigger

Run reconciliation after merge, release, incident closure, abandoned exploration, or at least weekly during active development.

# Checklist

- Mark completed Task Graph tasks.
- Update drifted or blocked tasks with current status.
- Link merged PRs and verification evidence.
- Supersede ADRs when decisions changed.
- Update Architecture Map when boundaries, dependencies, or flows changed.
- Update runbooks when operation or rollback changed.
- Add memory entries for repeated mistakes, useful commands, and discarded attempts.
- Create automation candidates for any repeated manual check.

# Evidence

Record:
- What shipped.
- What changed from the plan.
- What remains open.
- What future agents should read first.

# Stop Conditions

Pause reconciliation if shipped behavior is unknown, required evidence is missing, or a decision changed without approval.
