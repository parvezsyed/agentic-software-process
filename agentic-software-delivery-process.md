# Agentic Software Delivery Process

Version: 1.0  
Date: 2026-06-13  
Purpose: A practical operating model for building and maintaining software with humans and AI agents, optimized for readable systems, easy review, and fast debugging.

## Executive Summary

Effective agentic development is not "let an AI build it." It is a disciplined system where humans set intent, architecture captures tradeoffs, agents execute bounded work, verification is automated, and every shipped change leaves enough evidence for another human or agent to understand it later.

The expected user workflow is:

```text
Human: "I want to build <xyz>. Use this process: <github link>."
Agent: read agent-context-intake.md, interview adaptively, infer from the repo,
       classify risk, draft the required context, and recommend the next phase.
```

The first move is not coding and not template-filling. The first move is adaptive context intake: understand the human's goal, assess how technical the collaboration should be, identify the risk mode, and collect enough context to create only the artifacts that will actually improve execution.

The core flow is:

```text
Vision -> Strategy -> Methods -> Goal -> PRD -> Release Target -> Roadmap
       -> Technology Strategy -> Execution Brief -> Architecture Map -> ADRs
       -> Task Graph -> PR Task Packet -> Agent Implementation -> Verification
       -> Review -> Merge -> Release -> Operate -> Reconcile
```

The most important idea is that every unit of work becomes a reviewable contract before code is written. The contract states why the work matters, what must change, what must not change, how done will be proven, and when the agent must stop instead of guessing.

This process borrows practical patterns from lifecycle planning, plan/act separation, checkpoints, scoped project instructions, strong-model planning, task graphs, verification, project memory, worktrees, and adversarial review.

## Recommended Flow

Start here:

```text
Agent Context Intake -> Ready-To-Proceed Packet -> Mode-specific artifacts
```

Then use the smallest appropriate delivery path:

```text
Discover -> Contract -> Build -> Prove -> Ship/Learn
```

For larger or riskier work, expand that path into the full lifecycle:

A common starting flow is:

```text
PRD -> Execution Document -> ADR per block -> Task Graph -> Build
```

The recommended version is:

```text
Vision -> Strategy -> Methods -> PRD -> Release Target -> Roadmap
    -> Technology Strategy -> Execution Brief -> Architecture Map
    -> ADRs only for consequential decisions -> Task Graph -> PR Task Packets
    -> Build and verify
```

Why:

- Vision should explain the destination and why it matters.
- Strategy should explain the approach to achieving the vision.
- Methods should explain the operating system, principles, timelines, and success criteria used to execute the strategy.
- PRDs should own the why and what.
- Release Targets should define what is in scope for the next shippable increment.
- Roadmaps should define what is intentionally deferred and why.
- Technology Strategy should define approved languages, platforms, vendors, tools, cloud, observability, logging, and cost constraints before implementation planning.
- The Execution Brief should own the first-pass how, scope, risks, and system shape.
- The Architecture Map should explain the main building blocks and boundaries in one readable place.
- ADRs should be written for decisions with real tradeoffs, reversibility concerns, security implications, data-model consequences, vendor lock-in, or operational burden. Do not create one ADR for every block by default.
- The Task Graph should come after enough architecture exists to avoid rework, but before detailed implementation.
- Each PR should be the actual execution envelope for one scoped task.

The rule: document decisions, not ceremony.

## Process Kernel

The everyday process has five stages:

```text
Discover -> Contract -> Build -> Prove -> Ship/Learn
```

- **Discover:** understand the human goal, repo reality, work type, risk mode, and missing decisions.
- **Contract:** create the smallest useful execution contract: Ready-To-Proceed Packet, Mini PR Task Packet, PR Task Packet, or deeper artifacts when triggered.
- **Build:** implement the smallest reviewable change inside explicit boundaries.
- **Prove:** run the agreed checks and attach evidence.
- **Ship/Learn:** review, merge or release, observe reality, and update only the docs or memory that changed.

The expanded lifecycle has 18 numbered steps: Phase 0 intake plus Phases 1-17 for planning, delivery, operation, and reconciliation. It is not the default checklist for every change.

## Scaling Rule

Use the lightest process that preserves reviewability and safety.

| Mode | Use When | Required Artifacts |
| --- | --- | --- |
| Lightweight | Typo, copy change, isolated bug, obvious one-file fix | Mini PR Task Packet, with verification |
| Standard | Normal feature, bug, or refactor touching a few modules | PRD or Brief, Architecture Map update if relevant, Task Graph, PR Task Packet |
| Deep | New product area, cross-service change, data migration, security-sensitive work, unclear architecture | Vision/Strategy/Methods if initiative-level, PRD, Release Target, Roadmap, Technology Strategy, Execution Brief, Architecture Map, ADR review, ADRs when triggered, Task Graph, PR Task Packets, Runbook |
| Enterprise | Production system with customer data, regulated data, money movement, identity, permissions, multi-tenant boundaries, external integrations, or material business risk | Deep artifacts plus Threat Model, Access Review, Security Test Plan, Adversarial Review, Incident/Rollback Plan |

Escalate the mode when:

- The change touches money, permissions, security, privacy, identity, data retention, billing, migrations, or cross-service behavior.
- The implementation spans more than one reviewable PR.
- Rollback is difficult.
- The team cannot explain the failure modes.
- A future engineer would reasonably ask, "Why is it built this way?"
- The release target cannot be explained in one page.
- The release affects authentication, authorization, secrets, customer data, regulated workflows, infrastructure, billing, or external integrations.
- The release introduces a new language, framework, cloud service, vendor, database, queue, workflow tool, observability tool, logging platform, or deployment mechanism.
- The project represents a new company, org, product-line, or multi-quarter method of work rather than a single feature.

De-escalate the mode when:

- The change is obvious.
- The existing architecture already covers it.
- The verification path is simple.
- There is no meaningful decision to preserve.

## Readiness And Done

Definitions of Ready and Done keep agents from starting too early or stopping too soon.

### Definition Of Ready

Lightweight work is ready when:

- The goal is clear.
- Scope and non-scope are explicit.
- Expected write areas are known.
- Verification is defined.
- Stop conditions are known.

Standard work is ready when:

- Lightweight readiness is satisfied.
- Product intent or execution brief is clear enough to plan from.
- Work type and risk mode are classified.
- Dependencies and affected areas are known or explicitly assumed.
- The task graph or task list gives a reviewable PR shape.

Deep and enterprise work is ready when:

- Standard readiness is satisfied.
- Release target and deferrals are explicit.
- Technology constraints are approved.
- Architecture boundaries are understandable.
- Required ADRs are accepted or have owners and dates.
- Security, privacy, data, migration, integration, rollback, and operational gates are identified.
- Blocking human decisions are resolved or the work is paused.

### Definition Of Done

A change is done when:

- The agreed behavior is implemented.
- Scope boundaries were respected or exceptions were approved.
- Required tests and checks passed, or failures are documented with accepted risk.
- Verification evidence is attached.
- Security, privacy, data, migration, and rollback evidence exists when relevant.
- User-facing, operational, architecture, or runbook docs are updated only when they materially changed.
- Follow-up tasks, deferred work, and residual risks have owners.

## Exception Path

The process may be shortened, but shortcuts must be explicit.

Exception record:

```md
# Process Exception: <Initiative or PR>

## Exception
- Artifact, gate, or check skipped:
- Reason:
- Risk accepted:
- Owner accepting risk:
- Expiration or revisit trigger:

## Minimum Evidence Still Required
- Check:
- Result:

## Follow-Up
- Task:
- Owner:
- Due date or trigger:
```

Rules:

- Do not skip security, privacy, permission, payment, migration, infrastructure, customer-data, or rollback gates silently.
- Do not use exceptions to hide unclear product intent.
- Expired exceptions must be reconciled before release or explicitly re-approved.
- Repeated exceptions indicate the process or architecture needs correction.

## Intake And Phase Handoff Protocol

Before Phase 1 begins, the coding agent must run the Agent Context Intake Playbook in `agent-context-intake.md`. The purpose is to gather enough human, business, technical, budget, and operational context that the next phase can start without guessing.

The agent should not ask the human to fill every template. The agent should interview, infer from available sources, summarize, and ask for confirmation. The output of this first step is a Ready-To-Proceed Packet that recommends the correct scale mode, artifact set, assumptions, risks, and next phase.

After intake, use handoff packets at major phase boundaries, risk escalations, or material changes in scope, budget, timeline, or safety. Do not create handoff packets as ceremony when a Mini PR Task Packet is enough.

This protocol applies whether the project has a full team or one person acting as founder, PM, architect, engineer, reviewer, and operator.

### Intake Principles

- Ask for decisions only humans can make.
- Infer routine technical details from the repo when possible.
- Assess the human's desired interaction level: product-level, mixed, or deeply technical.
- Ask questions in focused rounds rather than one giant form.
- Recommend defaults when the human is non-technical, but surface tradeoffs and risks plainly.
- Let expert humans drive architecture preferences, while still challenging risky choices with evidence.
- Separate facts, assumptions, preferences, and open questions.
- Record who provided each decision or constraint.
- State what can proceed, what is blocked, and what is risky.
- Do not start coding until the active phase has a complete-enough Ready-To-Proceed Packet, handoff packet, or PR Task Packet.

### Adaptive Context Intake

The agent starts by collecting just enough context to choose the right process path.

Required early outputs:

- Human interaction level.
- Work type classification.
- Scale mode: Lightweight, Standard, Deep, or Enterprise.
- Recommended artifact set.
- Assumptions the agent can proceed with.
- Decisions only the human can make.
- Risks and mitigation plan.
- Recommended next step.

Human interaction levels:

| Level | Use When | Agent Behavior |
| --- | --- | --- |
| Novice or PM-level | Human knows the outcome but not the implementation details | Use plain language, recommend defaults, infer technical details from the repo, ask before high-impact choices |
| Technical collaborator | Human can discuss architecture and tradeoffs | Ask targeted technical questions, present options, document chosen tradeoffs |
| Expert driver | Human has architecture or implementation preferences | Stay concise, verify assumptions, challenge risk with evidence |

Readiness rule:

- If product intent, risk mode, or stop conditions are unclear, do not code.
- If only routine technical details are missing and the repo can answer them, inspect the repo instead of asking.
- If unresolved questions are non-blocking, proceed with explicit assumptions and revisit triggers.
- If the work touches money, permissions, security, privacy, regulated data, customer data, migrations, infrastructure, or external integrations, require explicit human approval for the risk posture.

### Human Roles

When one person owns multiple roles, record that explicitly rather than pretending the roles do not exist.

| Role | Owns | Can Be Same Person |
| --- | --- | --- |
| Founder/Product | Vision, users, business goals, release priority | Yes |
| PM/Operator | Requirements, acceptance criteria, rollout, support impact | Yes |
| Architect/Engineer | system design, technology choices, implementation risk | Yes |
| Security/Compliance | data, access, threat model, residual risk | Sometimes |
| Reviewer | merge approval, risk acceptance | Sometimes |
| Operator | monitoring, alerts, incident response, rollback | Yes |

If one person owns all roles, the agent should still ask questions by role so decisions are not skipped.

### Initial Intake Packet

The agent may create an Initial Intake Packet when the Ready-To-Proceed Packet shows that durable startup context is needed. For lightweight work, a Mini PR Task Packet can replace this artifact. For standard, deep, and enterprise work, the agent should draft the packet from interview answers and repo evidence, then ask the human to confirm only the decisions and assumptions that matter.

```md
# Initial Intake Packet

## People And Roles
- Decision-maker:
- Product owner:
- Engineering owner:
- Security/compliance owner:
- Operator/on-call owner:
- Reviewer:

## Vision And Business Context
- Vision or company/product strategy:
- Target users/customers:
- Business goal:
- Non-negotiables:
- Anti-goals:

## Current State
- Existing product/system:
- Repository or codebase:
- Current architecture:
- Current tools/vendors/cloud:
- Current pain points:

## Work Type
- Greenfield product/system:
- Brownfield update:
- Feature addition:
- UX-heavy change:
- Dependency-gated work:
- Dependency/platform maintenance:
- Migration/refactor:
- Incident/bug fix:
- Security/compliance change:

## Desired Outcome
- What should exist after this work:
- Success metrics:
- Timeline:
- Important milestones:

## Constraints
- Budget:
- Token/model budget:
- Team/time capacity:
- Existing contracts:
- Approved vendors/tools:
- Compliance/security constraints:
- Data sensitivity:

## Execution Preferences
- Preferred planning model:
- Preferred coding model:
- Preferred review model:
- Preferred test/security model:
- Local/open-source model preference:
- Human review frequency:
- Parallelism comfort:

## Risk Tolerance
- Acceptable production risk:
- Rollback expectations:
- Security review expectations:
- Cost ceiling:
- Schedule flexibility:

## Open Questions
- Question:
- Owner:
- Needed by:
```

### Work Type Classification

The agent must classify the work type during intake because different work types require different evidence. A project may have more than one type.

| Work Type | Use When | Extra Required Evidence |
| --- | --- | --- |
| Greenfield | New product, service, app, or platform | Vision/strategy, technology strategy, architecture map, release target |
| Brownfield Update | Existing system behavior changes | Current-state map, regression risks, compatibility plan, rollback plan |
| Feature Addition | New user or system capability | PRD, acceptance criteria, integration points, release scope |
| UX-Heavy | Interaction, visual design, workflow, accessibility, or usability drives value | User journey, design source, states, accessibility, visual QA, analytics |
| Dependency-Gated | Other teams/vendors/systems must deliver first | Dependency register, owners, due dates, fallback plan, unblock criteria |
| Dependency/Platform Maintenance | Library, framework, runtime, infra, package, or tool update | Changelog, compatibility matrix, security impact, rollout and rollback |
| Migration/Refactor | Internal structure changes without primary user-visible value | Invariants, parity tests, staged migration, performance and rollback |
| Incident/Bug Fix | Known defect or production issue | Repro, root cause, blast radius, regression test, incident notes |
| Security/Compliance | Controls, access, data, audit, privacy, or policy change | Threat model, access review, security tests, residual risk owner |

#### Brownfield Update Requirements

Before changing an existing system, capture:

- Current behavior.
- Desired behavior.
- Known consumers.
- Compatibility requirements.
- Existing tests and gaps.
- Data shape and migrations.
- Operational dependencies.
- Regression risks.
- Rollback path.

Brownfield anti-patterns:

- Rewriting instead of understanding.
- Breaking undocumented consumers.
- Treating old behavior as wrong without evidence.
- Removing workarounds before knowing why they exist.

#### UX-Heavy Requirements

UX-heavy work requires product and design evidence, not just code evidence.

Capture:

- Target user and use case.
- Current journey.
- Desired journey.
- Design source: mock, prototype, screenshot, design system, or written spec.
- Interaction states: loading, empty, error, permission, partial success, offline if relevant.
- Accessibility requirements.
- Responsive breakpoints.
- Copy/content requirements.
- Analytics or success signals.
- Visual regression expectations.

UX verification should include:

- Screenshots for relevant viewports.
- Keyboard navigation when applicable.
- Screen reader/accessibility checks when applicable.
- Visual diff or design review for high-polish surfaces.
- Analytics/event verification when behavior is measured.

#### Dependency-Gated Work

Dependency-gated work should not be hidden inside a task as "waiting." It needs its own register.

Dependency register template:

```md
# Dependency Register: <Initiative>

## Dependency
- ID:
- Description:
- Owner/team/vendor:
- Needed by phase:
- Needed by date:
- Contract/API/artifact expected:
- Status:
- Risk if late:
- Fallback:
- Escalation path:
- Verification when delivered:
```

Rules:

- Every external dependency has an owner and due date.
- The task graph marks blocked tasks explicitly.
- The release target names which dependencies are required for launch.
- Fallbacks are defined before the dependency becomes late.
- Agents may mock or stub a dependency only if the PR packet allows it.
- Integration does not complete until the real dependency is verified.

#### Dependency And Platform Maintenance

Dependency-only work should be treated as production work, not housekeeping.

Required evidence:

- Why the update is needed: security, compatibility, cost, support window, feature need.
- Changelog or release notes reviewed.
- Breaking changes identified.
- Lockfile changes explained.
- Transitive dependency impact reviewed.
- Test matrix selected.
- Rollback or pin strategy defined.
- Security scan before and after when relevant.

Do not combine dependency updates with unrelated feature work unless the PR packet explicitly allows it.

### Phase Handoff Packet

At major checkpoints, risk escalations, or meaningful scope changes, the agent should produce a handoff packet:

```md
# Phase Handoff: <Checkpoint>

## Completed
- Artifact:
- Evidence:

## Decisions Made
- Decision:
- Owner:
- Link:

## Assumptions
- Assumption:
- Confidence:
- Validation plan:

## Open Questions
- Question:
- Owner:
- Blocks next phase: yes/no

## Risks
- Risk:
- Severity:
- Mitigation:

## Budget Status
- Time spent:
- Time remaining:
- Token/model spend:
- Budget remaining:
- Cost risk:

## Next Phase Readiness
- Ready: yes/no
- Why:
- Required human decisions:
- Agent recommendation:
```

Checkpoint rule:

- If the handoff packet has unresolved blocking questions, the next phase does not start.
- If unresolved questions are non-blocking, the next phase may start with explicit assumptions and revisit triggers.
- If budget, timeline, or risk has materially changed, the human decision-maker must approve continuing.

## AI Execution Budget And Model Strategy

Agentic development should budget reasoning, coding, testing, review, and security separately. The strongest model should be used where judgment matters most, not everywhere.

Model strategy template:

```md
# AI Execution Strategy

## Objective
- Outcome:
- Deadline:
- Budget ceiling:

## Model Allocation
| Work Type | Model Class | Why | Budget | Human Gate |
| --- | --- | --- | --- | --- |
| Vision/strategy | strongest reasoning model | strategic tradeoffs |  | human approval |
| PRD/release planning | strongest reasoning model | scope and acceptance clarity |  | human approval |
| Architecture/options | strongest reasoning model | long-term tradeoffs |  | ADR approval |
| Forked exploration | mixed models | compare approaches cheaply |  | decision record |
| Routine coding | coding model or local model | scoped execution |  | PR review |
| Tests | coding/test model | coverage and regression |  | CI/reviewer |
| Security/adversarial | strongest reasoning or security-specialized model | abuse cases and risk |  | security signoff |
| Integration/release | strong reasoning model | coordination and rollback |  | release gate |
| Documentation/reconciliation | lower-cost model with review | durable context |  | reviewer spot-check |

## Budget Controls
- Maximum total spend:
- Maximum spend per phase:
- Maximum parallel agents:
- Maximum retries before human review:
- Maximum timebox per spike:
- Escalation threshold:

## Escalation Rules
- Use stronger model when:
- Use cheaper/local model when:
- Stop and ask human when:

## Reporting
- Cost report cadence:
- Token usage report cadence:
- Time report cadence:
```

Recommended model allocation:

- Use the strongest available reasoning model for vision, strategy, PRD critique, architecture options, ADRs, adversarial review, security review, and final integration/release review.
- Use a coding-specialized or lower-cost model for narrow implementation tasks with strong PR packets.
- Use local or low-cost models for mechanical refactors, test generation drafts, documentation cleanup, and log summarization when quality risk is low.
- Use parallel models for forked exploration only with strict timeboxes and comparison rubrics.
- Escalate to a stronger model when an agent detects scope drift, repeated failures, security risk, architecture ambiguity, or integration uncertainty.

Budget anti-patterns:

- Using the strongest model for every edit.
- Using the cheapest model for architecture or security decisions.
- Running many parallel agents without a comparison rubric.
- Letting retries continue after the same failure repeats.
- Measuring token cost while ignoring review, incident, or rework cost.

## Vision, Strategy, And Methods

Large initiatives should begin with a Vision/Strategy/Methods document before the PRD. This is similar in spirit to V2MOM-style planning: the organization states the destination, the strategy for getting there, the methods used to execute, the obstacles likely to appear, and the measures that prove progress.

The PRD should not replace this document. The PRD should link to it and translate it into a specific product or system initiative.

Template:

```md
# Vision, Strategy, And Methods: <Company, Org, Product Area, or Initiative>

## Vision
What future state should exist if this work succeeds?

## Strategic Context
- Market/customer/problem context:
- Business objective:
- Organizational objective:
- Time horizon:

## Strategies
- Strategy:
- Why this strategy:
- What it enables:
- What it rules out:

## Methods
- Method:
- Operating principle:
- Required capabilities:
- Teams or owners:
- Timeline:
- Success criteria:

## Measures
- Business metric:
- Product metric:
- Technical metric:
- Operational metric:
- Customer/user signal:

## Obstacles And Risks
- Obstacle:
- Mitigation:
- Decision owner:

## Non-Negotiables
- Security:
- Privacy:
- Reliability:
- Cost:
- Brand/customer experience:
- Compliance:

## Anti-Goals
- Tempting direction that should not be pursued:
- Reason:

## Decision Boundaries
- Decisions agents may recommend:
- Decisions humans must make:
- Decisions requiring executive/leadership approval:

## Review Cadence
- Review date:
- Owner:
- Criteria to continue, change, or stop:
```

Use this document when:

- The work is multi-quarter.
- The work spans multiple teams or products.
- The work changes company operating model.
- The work establishes a new platform, product line, or method.
- The work has strategic, budget, brand, compliance, or organizational consequences.

Do not use this document for ordinary features, small fixes, or work where the strategy is already settled.

### PRD Linkage

Every PRD for a strategic initiative should include:

- Linked Vision/Strategy/Methods document.
- Which strategy the PRD advances.
- Which method the PRD implements or depends on.
- Which measure the PRD moves.
- Which anti-goals and non-negotiables constrain the PRD.
- What timeline or milestone the PRD serves.

### Adversarial Review Of Strategy

Vision documents can create false confidence. They should be challenged before agents convert them into plans.

Adversarial questions:

- Is the vision specific enough to guide tradeoffs?
- Are strategies actually strategies, or are they slogans?
- Are methods concrete enough to execute?
- Are measures leading indicators, lagging indicators, or vanity metrics?
- What does the strategy explicitly rule out?
- What would make this strategy wrong?
- Are the timelines realistic for the team, budget, and technical estate?
- Are there hidden dependencies on sales, support, legal, security, operations, or customers?
- Does the strategy assume AI agents can compress work that still requires human judgment?
- Is this initiative trying to solve an org problem with software?
- Can the first release prove or disprove the strategic bet?

If the document cannot survive this review, pause PRD creation and revise the strategy.

## Technology Strategy And Platform Governance

Technology choices are business decisions as much as engineering decisions. Agents may research, compare, and recommend, but humans own choices that create long-term cost, hiring constraints, vendor commitments, security exposure, operational burden, or migration risk.

The Technology Strategy is created after the Release Target and Roadmap and before the Execution Brief. For architecture-heavy initiatives, it may be drafted in parallel with the Architecture Map and finalized before ADRs and task generation.

Technology Strategy template:

```md
# Technology Strategy: <Initiative or Product Area>

## Decision Owner
- Business owner:
- Engineering owner:
- Security owner if needed:
- Operations owner if needed:

## Existing Constraints
- Existing contracts:
- Committed vendors:
- Approved clouds/accounts:
- Required enterprise tools:
- Compliance or data residency constraints:
- Hiring/team skill constraints:
- Budget constraints:

## Preferred Stack
- Languages:
- Frameworks:
- Package managers:
- Databases:
- Queues/streams:
- Search/cache/storage:
- Infrastructure/deployment:
- CI/CD:
- Issue/project tracking:
- Documentation:
- Feature flags/config:
- Secrets management:
- Monitoring:
- Logging:
- Tracing:
- Error tracking:
- Incident management:

## Forbidden Or Approval-Required Choices
- Tool/vendor:
- Reason:
- Approval path:

## Options Considered
| Option | Summary | Security | Delivery Speed | Token/Agent Cost | Cloud/Vendor Cost | Operational Burden | Hiring/Maintenance | Contract Fit | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| A |  |  |  |  |  |  |  |  |  |
| B |  |  |  |  |  |  |  |  |  |

## Selected Baseline
- Selected option:
- Why:
- Tradeoffs accepted:
- Review date:

## Observability And Operations Baseline
- Metrics platform:
- Log platform:
- Trace platform:
- Error tracking:
- Alerting:
- Dashboards:
- SLOs:
- On-call/escalation:
- Audit logging:
- Data retention:

## Agent Rules
- Agents may use:
- Agents must not introduce:
- Agents must ask before:
- Required ADR triggers:
```

Governance rules:

- Agents must not introduce a new language, framework, cloud service, vendor, database, queue, auth provider, logging platform, observability tool, CI/CD system, issue tracker, or paid service without explicit approval.
- Existing contracts and approved vendors should be treated as constraints unless the Technology Strategy says cost reduction, consolidation, or replacement is an objective.
- Cost-saving alternatives must include migration cost, operational risk, support burden, security impact, and contract timing.
- A tool that is technically better but operationally unfamiliar may be the wrong choice.
- A cheaper tool that increases incident risk, support load, or hiring difficulty may be the wrong choice.
- Any approved deviation from the baseline stack should create an ADR.

The agent's role is to surface options and consequences. The human role is to choose the technology posture the organization is willing to live with.

## Release Target And Roadmap Discipline

Every initiative needs a negotiated release target before detailed execution starts. The release target prevents overbuilding by forcing an explicit answer to: what must ship now, what can ship later, and what should not be built at all.

Definitions:

- **Release Target:** the smallest coherent version that produces useful value and can be reviewed, tested, released, and rolled back.
- **Roadmap:** the ordered set of later increments, each tied to a reason, dependency, or learning milestone.
- **Deferral Contract:** a written agreement that a capability is intentionally not included in the current release, including the trigger for revisiting it.

Release target template:

```md
# Release Target: <Initiative> <Version or Milestone>

## Release Objective
What this release must accomplish.

## In Scope
- Capability or behavior included in this release

## Deferred
- Capability:
- Reason for deferral:
- Revisit trigger:
- Owner:

## Explicitly Out Of Scope
- Capability or behavior that should not be built for this initiative

## Release Risks
- Risk
- Mitigation

## Assumptions
- Assumption:
- How it will be validated:
- What changes if false:

## Dependencies
- Dependency:
- Owner:
- Needed by:
- Fallback if late:

## Kill Criteria
- Signal that should stop or materially change the initiative:
- Decision owner:
- Review date:

## Success Criteria
- Product/user outcome
- Technical health condition
- Operational condition

## Release Budget
- Time budget:
- Token/cost budget:
- Complexity budget:
- Performance budget:
- Security/privacy threshold:

## Negotiation Notes
- Human preference:
- Agent recommendation:
- Final decision:
- Tradeoff accepted:
```

Roadmap template:

```md
# Roadmap: <Initiative>

## Now
- Required for first useful release

## Next
- Valuable after first release proves the direction

## Later
- Useful but not required until scale, adoption, or integration pressure appears

## Never / Not Planned
- Tempting idea that should not be built unless strategy changes

## Revisit Triggers
- Metric threshold
- Customer signal
- Operational pain
- Security requirement
- Cost threshold
- Team capacity
```

Negotiation rules:

- The agent must propose at least two release slices when the PRD is broad.
- Each slice must state what is gained, what is deferred, and what risk remains.
- The human decision-maker chooses the release target; the agent may challenge overbroad scope with evidence.
- Deferred work must not be implemented opportunistically.
- A deferred item must have a revisit trigger or be marked "not planned."

Common release slice options:

| Slice | Use When | Includes | Defers |
| --- | --- | --- | --- |
| Learning MVP | Unclear user value | Narrow path, instrumentation, manual fallback | Scale, automation, polish |
| Operational MVP | Internal workflow or platform feature | Core workflow, logs, runbook, rollback | Advanced UX, edge-case automation |
| Safe Foundation | Architecture risk is high | Data model, interfaces, compatibility layer, contract tests | User-facing breadth |
| User-Visible Thin Slice | Product feedback is urgent | One end-to-end journey | Broad settings, admin tools, optimization |
| Migration Slice | Existing system must be replaced | Adapter, shadow mode, parity checks | Full cutover |

Missing scope discipline creates two failure modes: agents overbuild because they can, and humans approve vague work because it looks productive. Release targets exist to stop both.

## Design Principles

### 1. Intent Is A First-Class Artifact

Do not let product intent live only in meetings, chat, or a ticket title. Every serious project starts with a PRD that explains:

- The user or business problem.
- The outcome the team wants.
- The non-goals.
- The success metrics.
- The constraints.
- The acceptance criteria.

If the work cannot explain why it exists, agents will optimize for plausible code instead of useful code.

### 2. Plans Are Products

For non-trivial work, the plan is not a temporary prompt. It is a durable artifact that can be reviewed, improved, assigned, executed, and reconciled.

A good plan includes:

- Current-state evidence from the repo.
- Target behavior.
- Files or modules likely affected.
- Step-by-step implementation approach.
- Verification commands.
- Expected outputs or pass conditions.
- Stop conditions.
- Out-of-scope boundaries.

### 3. Small PRs Are The Unit Of Delivery

Large agent-generated diffs are difficult to review, debug, and trust. The preferred unit of delivery is a PR that one reviewer can understand in under 30 minutes.

Use stacked PRs when the system change is large. Use feature flags or compatibility layers when release risk is high.

### 4. Verification Must Be Machine-Checkable

Every task needs a way to prove it works. Prefer tests, typechecks, lint checks, migrations run in dry mode, screenshots, traces, or benchmark output over subjective statements.

"Looks good" is not a verification plan.

### 5. Debuggability Is Designed Before Implementation

Readable code is not enough. The system must explain itself at runtime.

Every meaningful feature should consider:

- Logs with stable event names.
- Metrics for important flows.
- Traces for cross-service operations.
- Clear error types.
- Admin/debug views where appropriate.
- Runbooks for operational procedures.

### 6. Agents Need Boundaries More Than Motivation

Agents perform best when they know exactly where to act and where not to act.

Every execution packet should include:

- Allowed files or modules when known.
- Explicit non-scope.
- Stop conditions.
- Required checks.
- How to report uncertainty.

### 7. Human Review Should Read Like A Story

A reviewer should be able to answer:

- Why is this change needed?
- What decision led to this design?
- What changed?
- How was it tested?
- What risks remain?
- How is it debugged in production?

The PR body, commits, tests, logs, and docs should tell that story without requiring the reviewer to reconstruct the whole agent session.

### 8. Security Claims Require Evidence

Security-sensitive work must not rely on assertions such as "secure by design" or "permissions checked." Every security claim needs evidence: tests, threat model coverage, access review, scan output, configuration proof, or adversarial review notes.

The minimum standard is:

- Identify who has access to what and why.
- Identify trust boundaries.
- Identify secrets, tokens, credentials, and sensitive data touched.
- Identify new or changed attack surfaces.
- Prove authorization and isolation behavior with tests.
- Prove secrets are not committed, logged, exposed, or returned to clients.
- Record residual risk accepted by a named owner.

## Roles

### Founder Or Product Lead

Owns:

- Problem clarity.
- Target users.
- Business constraints.
- Success metrics.
- Final product tradeoffs.

Primary artifact: PRD.

### Engineering Lead Or Architect

Owns:

- System boundaries.
- Technical strategy.
- ADR approval.
- Risk management.
- Review standards.

Primary artifacts: Execution Brief, Architecture Map, ADRs.

### Planning Agent

Owns:

- Repo reconnaissance.
- Finding affected areas.
- Drafting plans.
- Surfacing risks and open questions.

Use the strongest available reasoning model here.

### Execution Agent

Owns:

- Implementing one PR task packet.
- Running required checks.
- Updating the PR with evidence.
- Stopping when reality diverges from the plan.

Use a cheaper or faster model when the task packet is sufficiently precise.

### Review Agent

Owns:

- Diff review against the task packet.
- Scope compliance.
- Test and verification review.
- Security, performance, and maintainability concerns.

It should not be the same agent that wrote the code when quality matters.

### Human Reviewer

Owns:

- Product judgment.
- Architecture judgment.
- Risk acceptance.
- Merge approval.

Humans should review evidence and intent, not babysit every keystroke.

## Required Repository Artifacts

These files make the repo navigable for both humans and agents.

```text
agent-context-intake.md
process.config.json

docs/
  intake/
    initial-intake-packet.md
    ready-to-proceed-<initiative>.md
    process-exception-<initiative-or-pr>.md
    ai-execution-strategy.md
    dependency-register-<initiative>.md
    handoff/
      phase-handoff-<checkpoint>.md
  strategy/
    vision-strategy-methods-<area-or-initiative>.md
  product/
    prd-<initiative>.md
    release-target-<initiative>-<milestone>.md
    roadmap-<initiative>.md
  platform/
    technology-strategy-<initiative>.md
    approved-stack.md
  architecture/
    architecture-map.md
    adr/
      0001-<decision>.md
  execution/
    execution-brief-<initiative>.md
    task-graph-<initiative>.json
    exploration/
      exploration-packet-<question>.md
      exploration-decision-<question>.md
  runbooks/
    <feature-or-service>.md
  security/
    threat-model-<initiative>.md
    access-review-<initiative>.md
    security-test-plan-<initiative>.md
    adversarial-review-<initiative>.md
  testing/
    test-strategy.md
  memory/
    decision-log.md
    discarded-attempts.md
    agent-lessons.md
    integration-lessons.md
    testing-lessons.md
  evidence/
    <initiative-or-release>/
      README.md

AGENTS.md
README.md
CONTRIBUTING.md

knowledge/
  index.md
  log.md
  artifact-format-policy.md
  target-repo-installation.md
  brownfield-discovery-recipes.md
  human-response-defaults.md
  task-system-adapters.md
  orchestrator-executor.md
  checkpointing.md
  reconciliation-playbook.md

schema/
  ready-to-proceed.schema.json
  mini-pr-task-packet.schema.json
  pr-task-packet.schema.json
  task-graph.schema.json
  process-config.schema.json

examples/
  index.md
  log.md
  ready-to-proceed.lightweight.example.json
  mini-pr-task-packet.example.json
  pr-task-packet.standard.example.json
  task-graph.standard.example.json
  execution-brief.example.md
  architecture-map.example.md
  adr.example.md

process.config.example.json
```

Use tool-specific equivalents when needed, such as `CLAUDE.md`, `.clinerules/`, `.cursor/rules/`, or `.github/copilot-instructions.md`. Prefer `AGENTS.md` for cross-tool instructions when possible.


## Artifact Format Policy

Borrow the Open Knowledge Format shape for durable process knowledge: plain Markdown files with YAML frontmatter, normal Markdown links, optional `index.md` files for progressive disclosure, and optional `log.md` files for chronological history.

Use Markdown with frontmatter for PRDs, Execution Briefs, Architecture Maps, ADRs, runbooks, memory, process exceptions, and playbooks. Use JSON for Ready-To-Proceed Packets, Mini PR Task Packets, full PR Task Packets, and Task Graphs because these are execution contracts that should validate before handoff.

Markdown frontmatter should include at least:

```yaml
---
type: Execution Brief
title: Human-readable title
description: One sentence summary.
tags: [initiative, process]
timestamp: 2026-06-14T00:00:00Z
---
```

Validation is strict for JSON execution contracts. Knowledge consumption is permissive: agents should tolerate unknown frontmatter keys, unknown artifact types, missing optional metadata, and broken links while reporting them as repair opportunities. See `knowledge/artifact-format-policy.md`.

## Task System Adapters

The Task Graph is the canonical planning contract unless the human explicitly chooses an external tracker as the canonical source. External tools such as Linear, GitHub Issues, Jira, Markdown task lists, and other trackers are adapters.

During intake, ask which task system to use, whether the Task Graph or the external tracker is the source of truth, and which team, project, labels, milestones, cycles, or issue templates should be used. Store persistent preferences in `process.config.json`, using `process.config.example.json` and `schema/process-config.schema.json`.

When Linear is selected:

- Create one Linear issue per reviewable Task Graph task.
- Keep the Task Graph task ID in the Linear issue body or metadata.
- Link the Linear issue back to the Task Graph and source artifacts.
- Link the PR Task Packet and PR back to the Linear issue.
- Treat Linear labels, project, cycle, and assignee as execution metadata, not as replacements for scope, non-scope, verification, stop conditions, or budget.

If no tool is selected, use repo-native artifacts: Task Graph JSON, PR Task Packets, and evidence files.

## Orchestrator, Executor, And Checkpoints

The Orchestrator/Executor split is optional. Use it when a strong reasoning model should own intake, planning, task splitting, and handoff while a bounded Executor handles implementation.

The Orchestrator owns Ready-To-Proceed Packets, Task Graphs, PR Task Packets, human decisions, assumptions, and Executor handoff. The Executor receives one accepted PR Task Packet or one Task Graph task at a time and stops if scope, write boundaries, verification, or stop conditions are unclear.

When context or token budget is at risk, or when the human says "checkpoint", create `docs/intake/checkpoint-<date>.md` with frontmatter and enough state for the next Orchestrator to continue. See `knowledge/orchestrator-executor.md` and `knowledge/checkpointing.md`.

## Lifecycle

### Phase 0: Agent Context Intake

Purpose: turn a human's initial request into enough shared context to choose the right process path.

Inputs:

- Human request.
- Repository, docs, links, screenshots, issue trackers, or existing product context if available.
- Human collaboration preference.

Outputs:

- Ready-To-Proceed Packet.
- Work type classification.
- Scale mode.
- Recommended artifact set.
- Blocking decisions and assumptions.

Gate:

- The agent and human agree on what should be built or changed, which mode applies, which artifacts are needed, and what happens next.

Questions:

- How technical should this collaboration be?
- What outcome should exist when the work is done?
- Who is it for?
- What must not change or must not be built?
- What risk areas are touched?
- Which decisions need human approval before planning or coding?

### Phase 1: Vision, Strategy, And Methods

Purpose: define the strategic direction, operating methods, success measures, and decision boundaries for large initiatives before product planning begins.

Inputs:

- Company or org vision.
- Market or customer context.
- Business strategy.
- Organizational constraints.
- Budget and timeline.
- Known risks.

Outputs:

- Vision/Strategy/Methods document.
- Strategic measures.
- Non-negotiables.
- Anti-goals.
- Decision boundaries.

Gate:

- The strategy is specific enough to guide tradeoffs, constrain PRDs, and identify what should not be built.

Questions:

- What future state should exist if this work succeeds?
- What strategies will drive that future state?
- What methods will execute those strategies?
- What measures prove progress?
- What obstacles could invalidate the plan?
- What must not be compromised?

### Phase 2: Direction

Purpose: decide whether the work should exist.

Inputs:

- Company or product goal.
- User problem.
- Metric to move.
- Known constraints.

Outputs:

- Goal statement.
- Initiative proposal.
- Initial owner.

Gate:

- The team can explain what outcome will improve if this ships.

Questions:

- What user or business outcome does this serve?
- How will we know it worked?
- What happens if we do nothing?
- Why now?

### Phase 3: PRD

Purpose: define the why and what.

The PRD should be readable by a founder, PM, designer, engineer, support lead, and agent.

Template:

```md
# PRD: <Initiative>

## Strategic Linkage
- Vision/Strategy/Methods:
- Strategy advanced:
- Method implemented or supported:
- Measure moved:
- Non-negotiables:
- Anti-goals:
- Target milestone:

## Summary
One paragraph describing the problem, the desired outcome, and the user/business value.

## Goals
- Outcome 1
- Outcome 2

## Non-Goals
- Explicit thing we are not solving

## Users And Use Cases
- User type
- Current pain
- Desired behavior

## Requirements
- Functional requirement
- Non-functional requirement

## Acceptance Criteria
- Given/when/then or equivalent concrete criteria

## Metrics
- Primary metric
- Guardrail metrics

## Constraints
- Business, design, legal, security, platform, cost, or timing constraints

## Open Questions
- Question
- Owner
- Decision date
```

Gate:

- Product owner, engineering lead, and design/security stakeholders agree that the document is specific enough to plan from.
- For strategic initiatives, the PRD links to Vision/Strategy/Methods and names the strategy, method, measure, milestone, non-negotiables, and anti-goals it serves.

Anti-patterns:

- Requirements that say "improve" without a measurable target.
- Hidden non-goals.
- Acceptance criteria that cannot be tested.

### Phase 4: Release Target And Roadmap

Purpose: define the next shippable increment and what will be deferred.

Inputs:

- PRD.
- Constraints.
- Team capacity.
- Risk tolerance.
- Market or customer timing.

Outputs:

- Release Target.
- Roadmap.
- Deferral Contract.

Gate:

- The team can explain what ships now, what ships next, what ships later, and what is intentionally not planned.

Required negotiation:

- The agent surfaces release slicing options.
- The human decision-maker chooses or edits the release target.
- The final scope is recorded before the Execution Brief is written.

### Phase 5: Technology Strategy And Platform Constraints

Purpose: define the approved technology posture before agents make costly or uncomfortable implementation choices.

Inputs:

- PRD.
- Release Target.
- Roadmap.
- Existing contracts.
- Current stack.
- Team skills.
- Security and compliance constraints.
- Cost goals.

Outputs:

- Technology Strategy.
- Approved stack updates.
- ADR candidates for consequential technology choices.

Gate:

- Humans have approved the baseline language, tools, cloud, data stores, deployment model, observability, logging, monitoring, issue tracking, and vendor posture for the initiative.

Required negotiation:

- The agent surfaces options and tradeoffs.
- The human decision-maker approves the selected baseline.
- Any approval-required or forbidden choice is recorded before implementation planning.

### Phase 6: Execution Brief

Purpose: turn the PRD and Release Target into a first-pass how.

The Execution Brief is not the full implementation plan. It is the bridge between product intent, release scope, and architecture.

Template:

```md
# Execution Brief: <Initiative>

## Source
- PRD:
- Release Target:
- Roadmap:
- Technology Strategy:
- Goal:

## Release Scope
- In scope for this release:
- Deferred:
- Explicitly out of scope:

## Architecture Options
| Option | Summary | Security | Execution Time | Token/Cost | Operational Complexity | Rollback | Recommendation |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A |  |  |  |  |  |  |  |
| B |  |  |  |  |  |  |  |

## Technology Alignment
- Approved stack used:
- Existing contracts used:
- New tools/vendors proposed:
- Cost reduction opportunities:
- Approval-required choices:
- Choices intentionally avoided:

## Proposed System Shape
- Building block A
- Building block B
- Data flow
- External dependencies

## Major Workstreams
- Workstream 1
- Workstream 2

## Technical Risks
- Risk
- Impact
- Mitigation

## Cost And Budget Analysis
- Estimated implementation complexity:
- Estimated review complexity:
- Estimated agent token/cost range:
- Expected CI/runtime cost:
- Ongoing operational cost:
- Vendor or contract cost impact:
- Main cost driver:
- Cost reduction option:

## Non-Functional Budgets
- Latency:
- Throughput:
- Availability:
- Data retention:
- Security/privacy:
- Accessibility:
- Browser/device/platform support:

## Required Decisions
- Decision
- ADR required: yes/no
- Decision deadline:
- Decision owner:

## Verification Strategy
- Unit
- Integration
- E2E
- Performance
- Security
- Observability

## Rollout Strategy
- Feature flag
- Migration
- Backward compatibility
- Rollback

## Deferral Plan
- Deferred item:
- Why deferred:
- Revisit trigger:
- Required placeholder or extension point:
- Cleanup date if temporary:

## Human Review Strategy
- PR stack shape
- Review owners
- High-risk files
```

Gate:

- The team understands the major building blocks, risks, and likely PR sequence.
- Architecture options and release scope tradeoffs have been surfaced in plain language.

### Phase 7: Architecture Map

Purpose: make the system understandable before and after the work.

The Architecture Map is a living explanation of the relevant system area. It should be brief enough to read, but precise enough to orient a new engineer or agent.

Template:

```md
# Architecture Map: <System Or Initiative>

## Overview
What this system does and where it sits.

## Boundaries
- Owns:
- Does not own:

## Components
- Component
- Responsibility
- Key files

## Data Model
- Entities
- Ownership
- Persistence
- Migration notes

## Flows
- User flow
- System flow
- Failure flow

## Interfaces
- APIs
- Events
- Jobs
- External services

## Operational Model
- Logs
- Metrics
- Traces
- Alerts
- Runbooks
- Issue/project tracking
- Incident management
- On-call ownership

## Known Tradeoffs
- Tradeoff
- Link to ADR when applicable
```

Gate:

- An experienced engineer can understand the intended shape without reading the entire codebase.

### Phase 8: ADRs

Purpose: record important decisions and their consequences.

Write an ADR when a decision is hard to reverse, easy to misunderstand, likely to be revisited, security-sensitive, performance-sensitive, cost-sensitive, or cross-team.

Do not write ADRs for obvious implementation details.

Decision matrix:

| Question | If Yes |
| --- | --- |
| Does this change data ownership, schema, or migration behavior? | ADR required |
| Does this affect auth, permissions, privacy, billing, or security posture? | ADR required |
| Does this introduce a vendor, framework, protocol, queue, database, or service boundary? | ADR required |
| Does this introduce or replace a language, cloud service, deployment platform, observability/logging tool, issue tracker, or paid SaaS? | ADR required |
| Does this conflict with the approved Technology Strategy or existing contracts? | ADR required and explicit human approval |
| Would rollback require a migration, customer communication, or coordinated deploy? | ADR required |
| Is the choice mostly local code organization inside one module? | ADR usually not required |
| Can the decision be understood fully from the PR diff and tests? | ADR usually not required |

For important but small choices, use a "Decision Notes" section in the Execution Brief or PR instead of creating an ADR.

Template:

```md
# ADR-000X: <Decision>

## Status
Proposed | Accepted | Superseded

## Context
What forces made this decision necessary?

## Decision
What are we choosing?

## Alternatives Considered
- Option
- Pros
- Cons

## Consequences
- Benefits
- Costs
- New risks
- Migration or rollback implications

## Validation
How will we know this decision is working?

## Links
- PRD
- Execution Brief
- Related PRs
```

Gate:

- The ADR makes future debugging easier because it explains why the system is shaped this way.

### Phase 9: Forked Exploration And Early Dead-End Detection

When implementation uncertainty is high, do not pick one path and hope. Run bounded, parallel exploration before production implementation.

Use forked exploration when:

- The team is choosing between two or more plausible architectures.
- The tool, library, framework, cloud service, or integration may be a limitation.
- The task depends on unknown performance, security, migration, or compatibility behavior.
- The first agent attempt requires repeated workarounds.
- The implementation plan depends on assumptions that can be tested quickly.
- A wrong choice would create meaningful rework.

Do not use forked exploration when:

- The solution is obvious and low risk.
- The decision has already been made by ADR or Technology Strategy.
- The alternatives cannot be tested cheaply.
- The team is using exploration to avoid making a product decision.

### Exploration Packet

Before parallel work starts, create an Exploration Packet:

```md
# Exploration Packet: <Question>

## Decision To Make
What must be decided?

## Options
- Option A:
- Option B:
- Option C:

## Hypotheses
- If option A is viable, evidence should show:
- If option B is viable, evidence should show:

## Timebox
- Maximum clock time:
- Maximum agent/tool budget:
- Maximum files or modules to touch:

## Allowed Work
- Prototype only
- Tests or benchmarks
- Throwaway branch/worktree
- No production wiring unless explicitly allowed

## Comparison Rubric
- Correctness:
- Security:
- Performance:
- Operational complexity:
- Integration fit:
- Technology Strategy fit:
- Token/cost:
- Maintainability:
- Rollback:

## Kill Criteria
- Stop this option if:

## Evidence Required
- Test:
- Benchmark:
- Screenshot:
- Trace/log:
- Code sample:
- Risk note:
```

### Parallel Fork Rules

- Each option gets its own branch or worktree.
- Each option gets the same timebox and comparison rubric.
- Exploration branches must be labeled as spikes and must not be merged as production code.
- The agent may write prototype code, tests, benchmarks, or notes, but should avoid polishing.
- The exploration ends with a decision record, not a production PR.
- If no option satisfies the rubric, stop and reframe the problem.

Recommended branch naming:

```text
spike/<task-id>-option-a-<short-name>
spike/<task-id>-option-b-<short-name>
spike/<task-id>-option-c-<short-name>
```

### Early Dead-End Signals

Stop or fork when any of these appear:

- The agent edits outside expected boundaries to make the approach work.
- The implementation needs repeated exceptions to project rules.
- Tests become harder to write than the implementation.
- The tool requires unsupported behavior or hidden global state.
- Security controls become awkward or inconsistent.
- Performance depends on unproven assumptions.
- The code needs broad rewrites for a narrow outcome.
- Error handling or observability cannot be made clear.
- The approach conflicts with Technology Strategy or existing contracts.
- The agent keeps patching symptoms without a stable explanation.

### Decision Record

After exploration:

```md
# Exploration Decision: <Question>

## Options Tested
- Option:
- Branch/worktree:
- Agent/model:
- Time spent:

## Evidence
- Tests:
- Benchmarks:
- Logs/traces:
- Screenshots:
- Security notes:

## Comparison
| Option | Correctness | Security | Performance | Operability | Cost | Maintainability | Decision |
| --- | --- | --- | --- | --- | --- | --- | --- |
| A |  |  |  |  |  |  |  |
| B |  |  |  |  |  |  |  |

## Decision
- Select:
- Reject:
- Hybridize:
- Revisit trigger:

## Production Follow-Up
- ADR required:
- Task graph update:
- PR packet to create:
- Memory update:
```

Gate:

- The selected path has evidence, rejected paths have reasons, and production work does not begin until the decision is recorded.

### Phase 10: Task Graph

Purpose: break the work into dependency-aware execution units.

A task graph is not a backlog dump. It is a build order. Store it as JSON when it will drive agent execution, and validate it with `schema/task-graph.schema.json`. If a task system such as Linear, GitHub Issues, or Jira is configured, mirror each reviewable task into that system and preserve links both ways.

Each task should include:

- ID.
- Title.
- Goal.
- Work type.
- Dependencies.
- Scope.
- Non-scope.
- Affected areas.
- Definition of done.
- Verification commands.
- Stop conditions.
- Reviewer focus.
- Time, token/cost, and complexity budget.

Task size:

- Small: under 2 hours, one or two files, routine.
- Medium: 0.5-1 day, several files, clear pattern.
- Large: split it. If it cannot be reviewed comfortably, it is too large.

Gate:

- Every task has a clear owner, dependencies, proof of done, and a PR shape.

### Phase 11: PR Task Packet

Purpose: make the PR the execution contract.

Every non-trivial PR starts as a draft PR or issue-to-PR with a task packet before implementation begins. Use the mini packet for lightweight work and the full packet for standard, deep, enterprise, cross-module, or risky work. Do not fill irrelevant sections with noise just to satisfy a template.

Mini PR Task Packet:

```md
# <PR Title>

## Goal
- Specific outcome:

## Scope
- In scope:
- Out of scope:

## Files Or Areas
- Expected write areas:
- Sensitive areas to avoid:

## Definition Of Done
- Behavior:
- Tests/checks:
- Docs/notes if needed:

## Verification
- Command:
- Expected result:

## Stop Conditions
- Stop if:
```

Template:

```md
# <PR Title>

## Goal
The specific outcome this PR must achieve.

## Context
- PRD:
- Release Target:
- Roadmap:
- Technology Strategy:
- Execution Brief:
- Architecture Map:
- ADRs:
- Parent task:

## Release Scope
- In scope for this release:
- Deferred and not to implement in this PR:
- Explicitly out of scope:
- Revisit triggers:

## Work Type
- Type:
- Required extra evidence:
- Work-type-specific gates:

## Brownfield Context
- Current behavior:
- Existing consumers:
- Regression risks:
- Compatibility requirements:

## UX Evidence
- User journey:
- Design source:
- Interaction states:
- Accessibility requirements:
- Visual QA artifacts:

## Dependency Gates
- Dependency:
- Owner:
- Needed by:
- Status:
- Fallback:
- Verification when delivered:

## Integration Strategy
- Integration type: behind flag | additive API | replacement | migration | refactor-only
- Upstream dependencies:
- Downstream consumers:
- Compatibility requirements:
- Rollout sequence:

## Technology Constraints
- Approved language/framework:
- Approved tools/services:
- Approved cloud/account:
- Observability/logging requirements:
- Issue/project tracking requirements:
- New technology introduced: yes/no
- Human approval link if yes:

## Write Boundaries
Allowed:
- Files, directories, packages, services, or schemas this PR may edit

Read-only:
- Areas the agent may inspect but must not edit

Forbidden:
- Areas the agent must not read or edit unless explicitly approved

## Access And Security
- Data touched:
- Secrets/credentials touched:
- New or changed permissions:
- Roles allowed:
- Roles denied:
- Trust boundaries crossed:
- New attack surface:
- Security controls:
- Residual risk owner:

## Scope
- What this PR may change

## Out Of Scope
- What this PR must not change

## Definition Of Done
- [ ] Behavior implemented
- [ ] Tests added or updated
- [ ] Docs updated if needed
- [ ] Observability added if needed
- [ ] Integration behavior verified
- [ ] Rollback path documented
- [ ] No unrelated diff

## Verification Plan
Commands:
- `<command>`

Expected:
- `<expected result>`

Integration checks:
- `<check>`

E2E checks:
- `<check>`

Security checks:
- Secret scan:
- Dependency scan:
- SAST:
- Authz/authn tests:
- Input validation/fuzz tests:
- Tenant or role isolation tests:

Manual checks:
- `<check>`

## Rollback Plan
- Rollback type:
- Data rollback required:
- Flag/config to disable:
- Safe revert command or PR:
- Monitoring signal that triggers rollback:

## Git Hygiene
- Branch:
- Commit strategy:
- Expected PR size:
- Stacked PR dependencies:
- Rebase/merge policy:

## Stop Conditions
Stop and report if:
- Contract differs from implementation reality
- More than expected files/modules must change
- Required test setup is missing
- Security or data migration assumptions are false
- Write boundaries are insufficient
- Integration requires an undocumented consumer change

## Agent Implementation Notes
Plan:

Changes made:

Verification evidence:

Integration evidence:

Risks or follow-ups:

Memory updates:
- What worked:
- What did not work:
- What should future agents know:

## Reviewer Checklist
- [ ] Matches PRD and task scope
- [ ] Follows ADRs and architecture map
- [ ] Tests prove the critical behavior
- [ ] Failure modes are understandable
- [ ] Logs/errors/docs help future debugging
- [ ] Write boundaries were respected
- [ ] Integration strategy is valid
- [ ] Rollback plan is credible
- [ ] Memory updates are captured when the task produced learning
- [ ] Access model is explicit
- [ ] Security claims have evidence
- [ ] No secrets, credentials, or sensitive data are exposed
- [ ] Attack surface changes were reviewed
```

Gate:

- The agent can execute without needing unstated context.

### Phase 12: Implementation

Purpose: build the smallest reviewable change that satisfies the PR packet.

Execution rules:

- Work in a dedicated branch or worktree.
- Read the PR packet first.
- Re-read relevant code and docs.
- Write or update tests before or alongside implementation.
- Keep commits coherent.
- Update implementation notes as evidence accumulates.
- Stop on stop conditions.
- Do not edit outside the PR's write boundaries.
- Do not mix feature work, opportunistic refactors, dependency bumps, and formatting churn unless the PR packet explicitly allows it.
- If dead-end signals appear, stop production implementation and propose forked exploration or a revised task packet.

Agent mode:

- Use planning mode for unfamiliar, cross-cutting, or risky work.
- Use act mode for scoped execution.
- Use checkpoints before risky edits.
- Use separate agents for parallel independent tasks.
- Use subagents for read-heavy investigation, not uncontrolled mutation.

Code rules:

- Prefer existing patterns over new abstractions.
- Add abstractions only when they remove real complexity.
- Make behavior explicit at boundaries.
- Use typed contracts where possible.
- Keep errors actionable.
- Keep comments focused on why, not what.

Gate:

- The code compiles, tests pass, and the PR body contains evidence.

## Subagent Write Control

Subagents should be treated as scoped workers with explicit capability grants, not as trusted peers with full repository access.

Default policy:

- Research subagents are read-only.
- Review subagents are read-only.
- Execution subagents may write only inside the paths granted by the PR Task Packet.
- No subagent may edit migrations, generated files, security policy, dependency manifests, lockfiles, infrastructure, billing, auth, or production configuration unless those areas are explicitly listed as allowed.
- No subagent may create new external dependencies, network calls, secrets, environment variables, background jobs, queues, or data stores without an approved ADR or PR packet instruction.

Enforcement layers:

1. **Prompt contract:** the PR Task Packet defines allowed, read-only, and forbidden paths.
2. **Tool permissions:** configure agent tools so subagents only receive the tools required for their role.
3. **Filesystem sandbox:** run execution agents in a worktree or sandbox with write access limited to expected paths when the tool supports it.
4. **CODEOWNERS:** require human review for sensitive paths.
5. **CI boundary check:** fail the PR if changed files are outside the allowed write boundary.
6. **Diff review:** review agent checks scope before reading implementation details.
7. **Stop condition:** if the agent needs a forbidden file changed, it stops and requests a new or revised task packet.

Recommended boundary labels:

```text
allowed_write:
  - src/features/onboarding/**
  - tests/features/onboarding/**
read_only:
  - src/auth/**
  - docs/architecture/**
forbidden:
  - infra/**
  - migrations/**
  - package-lock.json
  - .github/workflows/**
```

Subagent failure modes to watch:

- Silent scope expansion.
- "Helpful" refactors.
- Lockfile changes from unnecessary installs.
- Test snapshot churn.
- Generated file edits.
- Security-sensitive changes hidden inside feature work.

## Git Hygiene

Git is the audit log of the project. It should show intention, sequence, and reversibility.

Branch rules:

- One branch per PR task packet.
- One worktree per active execution agent.
- Branch names should include the task ID and short goal, such as `task-042-oauth-callback-tests`.
- Parallel agents must not share a branch.

Commit rules:

- Commits should be coherent and reviewable.
- Do not commit broken intermediate states to the shared remote unless the PR is explicitly marked as checkpoint-only or exploratory.
- Separate generated changes, migrations, and mechanical formatting into their own commits when they are unavoidable.
- Do not combine unrelated cleanup with feature implementation.
- Use conventional commit prefixes when the repo already uses them.

Rebase and merge rules:

- Rebase or merge from the target branch before final verification if the branch drifted.
- Rerun required checks after conflict resolution.
- Prefer squash merge for noisy agent commits unless the commit sequence carries meaningful review value.
- Preserve separate commits for migrations, API compatibility layers, and large mechanical changes when rollback or auditability benefits.

Worktree rules:

- Each agent receives a clean worktree.
- The worktree starts from the commit recorded in the PR packet or task graph.
- Before editing, the agent records `git status` and the base commit.
- Before review, the agent records the changed file list and confirms no unrelated files changed.

Discard rules:

- Experimental branches are cheap. Bad code should be thrown away early.
- If the implementation drifts from the plan, restore to the last checkpoint or abandon the worktree.
- If more than 30% of the diff is unrelated to the task, split or discard.
- If verification cannot be made reliable, stop and re-plan.
- If the agent repeatedly patches symptoms, discard and return to architecture or task design.

### Phase 13: Verification

Purpose: prove the change works and is safe to review.

Verification layers:

- Static: formatting, lint, typecheck.
- Unit: local business logic and edge cases.
- Integration: API, database, service boundaries.
- E2E: critical user flows.
- Security: authz/authn, data exposure, injection, secrets.
- Performance: hot paths, query counts, bundle size, latency.
- Migration: forward, backward, rollback, idempotency.
- Observability: logs, metrics, traces, alerts.
- UI: screenshots across relevant viewports.

The PR must show:

- Commands run.
- Results.
- Any skipped checks and why.
- Screenshots or artifacts when visual behavior changed.

Gate:

- Verification evidence is sufficient for a reviewer to trust the result without rerunning every command.

## Integration Strategy

Integration should be planned before implementation and proven before merge.

Choose the safest integration pattern that fits the work:

| Pattern | Use When | Review Focus |
| --- | --- | --- |
| Additive | New code path does not replace old behavior | API compatibility, dead code plan |
| Feature flag | Behavior should roll out gradually | Flag default, kill switch, cleanup date |
| Adapter | New system must coexist with old interface | Contract tests, translation edge cases |
| Strangler | Replacing a legacy path over time | Routing, parity checks, rollback |
| Shadow mode | New logic can run without user-visible effect | Comparison metrics, logging, cost |
| Dual write | Data transition requires old and new stores | Consistency, replay, repair, rollback |
| Read switch | Reads move after writes are proven | Backfill, correctness checks |
| Big bang | Only acceptable for low-risk or unreleased systems | Full regression, rollback readiness |

Every integration plan should identify:

- Producers and consumers.
- API, event, schema, and job contracts.
- Backward and forward compatibility.
- Data migration and backfill sequence.
- Feature flag or routing strategy.
- Observability needed to compare old and new behavior.
- Cutover and rollback triggers.

Integration gate:

- Existing consumers keep working.
- New behavior is covered by contract or integration tests.
- Rollout can be paused or reversed.
- Monitoring can distinguish old path from new path.

## End-To-End Testing Options

Use the smallest E2E suite that proves the user or system journey. E2E tests are valuable but expensive; they should protect critical paths, not duplicate every unit test.

Options:

| Option | Best For | Notes |
| --- | --- | --- |
| Browser E2E | User-facing web flows | Use Playwright or equivalent; test happy path plus one critical failure path |
| API E2E | Service-to-service or public API behavior | Run against ephemeral environment or test containers |
| Contract tests | Producer/consumer integrations | Protect interfaces without full environment cost |
| Smoke tests | Release confidence | Small suite after deploy or preview build |
| Synthetic monitoring | Production journey checks | Runs continuously after release |
| Visual regression | UI layout and design-sensitive flows | Use screenshots for stable pages and components |
| Migration rehearsal | Data changes | Run forward and rollback paths on realistic copy or fixture |
| Shadow comparison | Replacements and rewrites | Compare old and new outputs before cutover |

E2E requirements:

- Identify the user or system journey.
- Define test data setup and teardown.
- Run in CI for critical paths or before release for expensive paths.
- Attach artifacts: screenshots, traces, logs, videos, or reports.
- Make failures diagnosable with stable selectors, clear assertions, and captured console/network output.

## Production Assurance And Adversarial Review

Production readiness requires an adversarial mindset. The system should be reviewed as if a motivated user, tenant, integration partner, insider, compromised account, or compromised dependency is trying to misuse it.

This is mandatory for Enterprise mode and for any PR that affects:

- Authentication.
- Authorization.
- Roles, permissions, or tenancy.
- Customer or regulated data.
- Secrets, tokens, credentials, keys, or sessions.
- Billing, money movement, quotas, or entitlement.
- Infrastructure, deployment, CI/CD, networking, storage, or logging.
- External integrations or webhooks.
- File upload, parsing, user-generated content, rich text, or code execution.
- Public APIs, admin APIs, background jobs, queues, or scheduled tasks.

### Threat Model

Threat model template:

```md
# Threat Model: <Initiative>

## Assets
- Data, account, credential, system, or business capability being protected

## Actors
- Legitimate user
- Admin
- Internal operator
- External integration
- Attacker
- Compromised dependency

## Trust Boundaries
- Client/server
- Service/service
- Tenant/tenant
- Admin/user
- Internal/external
- CI/runtime

## Entry Points
- API
- UI
- Webhook
- Queue
- File upload
- Scheduled job
- CLI/admin tool

## Abuse Cases
- Action the system must prevent

## Controls
- Authentication
- Authorization
- Validation
- Rate limit
- Encryption
- Audit log
- Monitoring
- Isolation

## Required Security Tests
- Test

## Residual Risks
- Risk
- Owner
- Expiration or revisit date
```

### Access Review

Access review answers who has access to what and why once the system is operating.

Required access review fields:

- Role or actor.
- Resource or action.
- Reason access is needed.
- Grant mechanism.
- Deny cases.
- Audit log behavior.
- Break-glass path if any.
- Owner of the permission model.
- Review cadence.

Access review questions:

- Can a user access another tenant's data?
- Can a lower-privilege role trigger a higher-privilege action?
- Can an internal operator access customer data without audit?
- Can an integration act after revocation?
- Can a stale session or token keep working?
- Can a background job bypass authorization assumptions?

### Security Testing

Security testing should be risk-based but explicit.

Required checks by category:

| Category | Checks |
| --- | --- |
| Secrets | Secret scanning, no credentials in code/logs/errors/build artifacts |
| Dependencies | Dependency vulnerability scan, license/policy check when relevant |
| Static analysis | SAST for injection, unsafe deserialization, path traversal, insecure crypto |
| Authn/Authz | Positive and negative permission tests, role/tenant isolation tests |
| Input handling | Validation, fuzz/property tests for parsers and public inputs |
| Data exposure | Response shape tests, logging redaction tests, export/download checks |
| Session/token | Expiry, revocation, rotation, replay, CSRF where applicable |
| Infrastructure | Least privilege IAM, network exposure, storage ACLs, CI secret scope |
| Integration | Webhook signature checks, replay protection, timeout/retry abuse |
| Observability | Security events logged without leaking sensitive data |

### Adversarial Review

Adversarial review is a separate review pass from implementation review.

The adversarial reviewer should ask:

- How would this be abused?
- What happens if the caller lies?
- What happens if the tenant ID, user ID, role, price, quota, or ownership field is changed client-side?
- What happens if the same request is replayed?
- What happens if a webhook is forged?
- What happens if a dependency returns hostile content?
- What happens if logs are read by someone who should not see secrets?
- What happens if an agent exposed a key in a test, fixture, screenshot, or PR body?
- What happens if this runs at 10x traffic?
- What is the safest way to disable this feature?

Adversarial review outputs:

- Findings with severity.
- Required fixes before merge.
- Accepted residual risks with owner.
- Follow-up hardening tasks.
- Test cases added from the review.

### Enterprise Release Gate

Enterprise-mode work cannot release until:

- Threat model is complete.
- Access review is complete.
- Required security tests pass.
- Secret scan passes.
- Dependency and static analysis findings are resolved or accepted by owner.
- Attack surface changes are documented.
- Audit/logging behavior is verified.
- Rollback or disable path is tested.
- Incident owner and escalation path are known.

Security signoff should be proportional to risk. Small low-risk changes may use automated checks and reviewer checklist only. High-risk changes need a named security reviewer or engineering lead signoff.

### Phase 14: Review

Purpose: evaluate the change against intent, not just syntax.

Review order:

1. Check scope.
2. Read the PR packet.
3. Read linked ADRs or architecture map.
4. Inspect tests first.
5. Inspect implementation.
6. Inspect errors, logs, docs, and runbooks.
7. Check verification evidence.
8. Check security and access evidence for sensitive changes.
9. Decide: approve, request changes, split, or reject.

Review agent checklist:

- Is the diff smaller than expected or larger than expected?
- Did it touch non-scope files?
- Are there hidden migrations?
- Are tests proving behavior or just implementation details?
- Are failure modes diagnosable?
- Are access controls explicit and tested?
- Are security claims backed by evidence?
- Are new attack surfaces documented?
- Would a new engineer understand this in six months?

Human reviewer checklist:

- Does this solve the product problem?
- Are the tradeoffs acceptable?
- Is the release risk acceptable?
- Is the operational burden acceptable?
- Is the residual security risk acceptable?

Gate:

- The reviewer can explain the change and its risks in plain language.

### Phase 15: Merge And Release

Purpose: ship safely.

Release requirements:

- PR approved.
- CI green.
- Security/adversarial gate complete when required.
- Rollout plan confirmed.
- Feature flag or rollback path exists for risky changes.
- Migration plan verified.
- Observability live before exposure.
- Support or customer-facing docs updated when relevant.

Gate:

- The team knows how to detect, debug, and reverse a bad release.

## Rollback Options

Rollback is a design requirement, not an incident-time improvisation.

Common options:

| Option | Use When | Requirements |
| --- | --- | --- |
| Git revert | Code-only change or simple behavior change | Revert PR is safe and checks pass |
| Feature flag off | New behavior is gated | Flag defaults, ownership, kill switch tested |
| Config rollback | Behavior controlled by config | Config history, safe propagation, audit |
| Blue/green rollback | Deployment can switch environments | Compatible schema and external dependencies |
| Canary halt | Gradual rollout detects early risk | Metrics, thresholds, automated or manual halt |
| Database rollback | Schema/data change must be reversed | Backward-compatible migration or restore plan |
| Forward fix | Revert is riskier than patch | Clear owner, narrow fix, expedited review |
| Disable integration | External dependency misbehaves | Circuit breaker, fallback behavior, alerting |

Rollback plan must state:

- What signal triggers rollback.
- Who can decide.
- Exact action to take.
- Expected time to restore.
- Data implications.
- Customer or support communication needs.
- How to verify rollback succeeded.

Migration-specific rollback:

- Prefer expand/contract migrations.
- Keep old readers working until new writers are proven.
- Avoid destructive migrations in the same PR as behavior changes.
- Make backfills idempotent.
- Record replay or repair procedure.

### Phase 16: Operate

Purpose: learn whether the shipped change works in reality.

Post-release checks:

- Are metrics moving?
- Are errors increasing?
- Are support tickets changing?
- Are users reaching the intended path?
- Are logs and traces sufficient?
- Did any assumptions in the ADR prove wrong?

Gate:

- The team has evidence that the system is healthy or knows what to fix.

### Phase 17: Reconcile

Purpose: keep the plan, code, docs, and reality aligned.

Run reconciliation after merge, release, incident closure, abandoned exploration, or at least weekly during active development.

Reconcile:

- Mark completed Task Graph tasks.
- Update drifted, blocked, or obsolete tasks.
- Link merged PRs and verification evidence.
- Supersede ADRs when decisions changed.
- Update Architecture Map when boundaries, dependencies, or flows changed.
- Update runbooks when operation or rollback changed.
- Add memory entries for repeated mistakes, useful commands, and discarded attempts.
- Create automation candidates for any repeated manual check.
- Update relevant `index.md` and `log.md` files so future agents can navigate the current state.

Record:

- What shipped.
- What changed from the plan.
- What remains open.
- What future agents should read first.

Stop reconciliation if shipped behavior is unknown, required evidence is missing, or a decision changed without approval.

Gate:

- Future agents and humans start from current truth, not stale plans.

## Throwaway Process

Throwing away failed work is a strength when the learning is preserved.

Discard an implementation when:

- It violates the PR task packet's scope or architecture.
- The diff becomes harder to review than a fresh implementation would be.
- The agent repeatedly fixes symptoms without explaining the root cause.
- Tests require excessive rewriting unrelated to the goal.
- The design requires an ADR that does not exist yet.
- Integration risk is higher than expected.
- The change cannot be rolled back safely.

Discard paths:

1. **Checkpoint restore:** restore to last known good state and retry with a narrower prompt.
2. **Worktree abandon:** stop the agent, preserve notes, delete the worktree or branch after review.
3. **PR close:** close the PR with a short failure summary and links to evidence.
4. **Plan revision:** update the PR packet, task graph, Execution Brief, or ADR before retrying.
5. **Spike extraction:** keep useful research as a spike note, not as production code.

Required discard record:

```md
# Discard Record: <Task or PR>

## Attempt
- Branch:
- Agent/model:
- Base commit:
- Time spent:

## What Worked
- Useful finding

## What Did Not Work
- Failed approach
- Error or evidence

## Why It Was Discarded
- Scope drift | bad architecture | failed tests | unsafe rollback | unclear requirement

## Reusable Learning
- Repo fact
- Better next approach
- New stop condition

## Next Action
- Retry with revised packet | write ADR | split task | abandon initiative
```

Never preserve failed production code just because effort was spent. Preserve the learning.

Exploration records should be stored as decision evidence, not as abandoned code. Close or delete spike branches after the useful notes, tests, benchmarks, or decision record have been preserved.

## Ralph Loop: Memory Of What Worked And What Did Not

The system needs a memory loop so every attempt improves future attempts. This loop is called the Ralph Loop.

Ralph Loop:

```text
Record -> Analyze -> Learn -> Prune -> Harden
```

### Record

At the end of every meaningful PR, discarded attempt, incident, or integration surprise, record:

- What was attempted.
- What worked.
- What did not work.
- What evidence supports the conclusion.
- What should change for future agents or humans.

### Analyze

During reconciliation, inspect the records for patterns:

- Repeated agent mistakes.
- Missing tests.
- Confusing architecture boundaries.
- Weak PR packets.
- Brittle integration points.
- Documentation gaps.
- Commands that fail or take too long.

### Learn

Convert learning into the smallest durable artifact:

- `AGENTS.md` rule for broad agent behavior.
- Scoped rule or skill for domain-specific behavior.
- ADR update for decision learning.
- Architecture Map update for boundary learning.
- Test Strategy update for verification learning.
- Runbook update for operational learning.
- Task Graph update for planning learning.

### Prune

Remove stale or harmful memory:

- Outdated agent rules.
- Superseded ADRs without links.
- Old workaround notes.
- Failed approaches that no longer apply.
- Long instructions that dilute important rules.

### Harden

Turn repeated lessons into automation:

- CI checks.
- Hooks.
- CODEOWNERS.
- Lints.
- Test fixtures.
- PR template requirements.
- Boundary checks.
- Dashboards and alerts.

Memory rule:

- If something failed once, record it.
- If it failed twice, add a rule or test.
- If it failed three times, automate prevention.

Recommended memory files:

```text
docs/memory/
  decision-log.md
  discarded-attempts.md
  agent-lessons.md
  integration-lessons.md
  testing-lessons.md
```

Memory entries should be short, dated, linked to evidence, and pruned during reconciliation.

## Checkpoints

Use these checkpoints to prevent drift.

| Checkpoint | Name | Required Evidence |
| --- | --- | --- |
| C0 | Context Ready | Human interaction level, work type, scale mode, artifact set, assumptions, risks, next step |
| C1 | Strategy Ready | Vision, strategies, methods, measures, anti-goals, decision boundaries |
| C2 | Direction Ready | Goal, metric, owner |
| C3 | PRD Ready | Strategic linkage when required, goals, non-goals, requirements, acceptance criteria |
| C4 | Release Scope Ready | In-scope, deferred, out-of-scope, assumptions, dependencies, kill criteria |
| C5 | Technology Strategy Ready | Approved stack, tools, vendors, cloud, observability, cost and contract posture |
| C6 | Execution Ready | Major blocks, risks, rollout, verification strategy |
| C7 | Architecture Ready | Boundaries, components, flows, interfaces |
| C8 | Decisions Ready | Required ADRs accepted or explicitly deferred |
| C9 | Exploration Ready | Forked exploration completed or explicitly skipped for high-uncertainty decisions |
| C10 | Task Graph Ready | Dependency-ordered tasks with DoD and checks |
| C11 | PR Packet Ready | Scope, non-scope, technology constraints, verification, stop conditions |
| C12 | Code Ready | Implementation complete, checks run |
| C13 | Review Ready | Evidence, docs, risks, reviewer checklist |
| C14 | Release Ready | CI, security/adversarial gates, rollout, rollback, observability |
| C15 | Released | Merged, deployed or queued, monitoring started |
| C16 | Operationally Assessed | Metrics, errors, user/support signals reviewed |
| C17 | Reconciled | Docs and task graph reflect shipped reality |

## Documentation Standards

The goal is not maximum documentation. The goal is minimum sufficient durable context.

Write documentation when it helps answer one of these questions:

- Why does this exist?
- Why is it built this way?
- How do I change it safely?
- How do I test it?
- How do I debug it?
- How do I operate it?
- What should I not do?

Avoid documentation that only restates obvious code.

## Evidence Retention

Verification evidence should be easy to find without turning the repo into an artifact dump.

Keep durable evidence when it affects review, release, auditability, security, rollback, or future debugging:

- Commands run and results.
- CI links or report paths.
- Screenshots, videos, traces, logs, benchmark summaries, migration rehearsals, or security scan summaries.
- Manual verification notes when automation is not available.
- Accepted residual risks and owners.

Retention rules:

- PR-local evidence can live in the PR body when it is useful only for review.
- Release, migration, security, incident, or rollback evidence should be linked from the relevant release record, runbook, threat model, ADR, or handoff.
- Do not commit bulky generated artifacts unless the repo already stores that kind of evidence.
- Do not paste secrets, credentials, customer data, regulated data, or sensitive logs into docs, screenshots, PR bodies, or memory files.
- Evidence should state enough for a future reviewer to know what was proven, when, by whom or what agent, and where the source artifact lives.

## Process Ownership And Health

The process itself needs an owner. Otherwise agents will keep adding rules and no one will remove the bad ones.

Recommended owners:

- Process owner: maintains this process and decides when to simplify it.
- Engineering owner: approves technical gates, architecture standards, and automation.
- Security or risk owner: approves security, privacy, access, and residual-risk practices.
- Operator owner: approves release, observability, rollback, and incident practices.

Review cadence:

- Lightweight team or solo project: monthly or after painful process friction.
- Active product team: every 2-4 weeks during major development.
- Enterprise or regulated system: at release milestones and after incidents.

Process health metrics:

- Cycle time from Ready-To-Proceed to merged PR.
- Review time and number of review rounds.
- Agent rework rate: abandoned attempts, repeated failures, or scope drift.
- Escaped defects, rollbacks, incidents, and support issues.
- Stale artifact count: docs or task graph entries known to be wrong.
- Verification reliability: checks skipped, flaky, or impossible to run.
- Human interruption rate: avoidable back-and-forth caused by missing context.
- Exception count and expired exception count.

Use these metrics to delete, merge, or automate process steps. A process step that creates no better decisions, safer execution, faster review, or better debugging should be removed.

### Documentation Pyramid

```text
Vision/Strategy/Methods: direction, strategy, operating method
PRD: why and what
Execution Brief: first-pass how and risk
Architecture Map: system shape
ADR: consequential decisions
Task Graph: build order
PR Packet: execution contract
Code: implementation
Tests: executable behavior
Runbook: production operation
```

## Debuggability Requirements

Every meaningful feature should define a debug path.

Minimum debug packet:

- Known entry points.
- Key files.
- Data ownership.
- Main logs and event names.
- Metrics to inspect.
- Common failure modes.
- How to reproduce locally.
- How to verify the fix.

For distributed systems, add:

- Trace span names.
- Correlation/request ID behavior.
- Retry and timeout policy.
- Queue/job visibility.
- Idempotency expectations.

For UI, add:

- State ownership.
- Loading, empty, error, and permission states.
- Screenshot expectations.
- Browser/device coverage.

## Automation

Automate the gates that should never depend on mood or memory.

Recommended automation:

- PR template requiring DoD, verification, stop conditions, and linked docs.
- CI for lint, typecheck, tests, build, security scan.
- Schema validation for Ready-To-Proceed Packets, Mini PR Task Packets, and PR Task Packets when stored as JSON.
- CODEOWNERS for high-risk areas.
- Danger or custom bot checks for missing PR fields.
- Checkpoint handoff template validation.
- Budget/time/token reporting at phase boundaries.
- Dependency, vendor, cloud service, and tooling checks against the approved Technology Strategy.
- ADR lint for required sections.
- Task graph validation.
- Release checklist.
- Post-merge reconciliation reminder.

Use hooks or agent rules for deterministic behavior:

- Block edits to generated or migration-sensitive files unless task allows it.
- Block new dependencies, package managers, cloud services, external APIs, telemetry SDKs, or paid tools unless approved in the PR packet or ADR.
- Run formatter after edits.
- Run targeted tests before ending a task.
- Require update to architecture docs when boundary files change.

## Project Memory

Agent memory should be concise, durable, and scoped.

Recommended `AGENTS.md` sections:

```md
# Agent Instructions

## Commands
- Install:
- Test:
- Typecheck:
- Lint:
- Build:

## Architecture Rules
- Boundary rule
- Data ownership rule
- Approved languages, frameworks, cloud, data stores, observability, logging, and deployment tools

## Code Style
- Project-specific convention

## Testing Rules
- What requires unit tests
- What requires integration tests
- What requires E2E tests

## Safety Rules
- Do not edit generated files
- Do not touch migrations unless task explicitly allows it
- Do not introduce new dependencies, vendors, services, telemetry, or cloud resources unless the task explicitly allows it
- Stop when secrets, credentials, or unexpected production data appear

## Review Expectations
- Keep PRs scoped
- Update PR evidence
- Link ADRs and docs
```

Keep this file short. Put domain-specific workflows in separate skills, rules, or method files that load only when relevant.

## Agent Operating Rules

Agents should follow these rules unless a human explicitly overrides them.

1. Read the PR packet before editing.
2. Confirm the current repo state matches the packet.
3. Prefer existing patterns.
4. Keep the diff scoped.
5. Write tests that prove behavior.
6. Run the required checks.
7. Update the PR body with evidence.
8. Stop when assumptions are false.
9. Never hide failing checks.
10. Never expand scope silently.


## Human Response Defaults

If the human does not answer, proceed only on reversible, low-risk technical assumptions. Record the assumption in the active packet. Pause on product behavior, budget, security, privacy, data, architecture, vendor, deadline, rollout, or irreversible implementation decisions.

When paused, create or update a process exception with the decision needed, why the agent cannot safely decide, the recommended default, risk of waiting, risk of proceeding, and the owner or next check-in time.

## Brownfield Discovery Recipes

Before editing brownfield code, map consumers and blast radius with executable checks. Start with:

```sh
git status --short
git ls-files
rg -n "symbol_or_route_or_table_name"
rg -n "import .*module_name|from .*module_name"
rg -n "endpoint|event_name|table_name|feature_flag"
find . -maxdepth 3 -iname '*test*' -o -iname '*spec*'
```

Record known consumers, inferred consumers, covering tests, missing tests, rollback path, and out-of-scope files. Use `knowledge/brownfield-discovery-recipes.md` for language-specific recipes.

## Anti-Patterns

Avoid:

- One giant "build the product" prompt.
- PRDs without acceptance criteria.
- ADRs for trivial choices.
- Task graphs with no dependencies.
- PRs without explicit non-scope.
- Agents that implement and review their own high-risk code.
- Verification described but not run.
- Docs generated after the fact that do not explain decisions.
- Logs that cannot be correlated to user or request flows.
- Refactors mixed into feature PRs without necessity.
- Stale architecture docs.

## Source Influences

The process above was distilled from the following current sources and patterns:

- BMAD Method: lifecycle planning, scale-adaptive workflows, specialized agents, PRD and architecture emphasis. <https://github.com/bmad-code-org/BMAD-METHOD>
- Cline: plan/act separation, checkpoints, rules, hooks, agent teams. <https://docs.cline.bot/core-workflows/plan-and-act>
- Cline checkpoints: rollbackable agent work. <https://docs.cline.bot/core-workflows/checkpoints>
- Cline rules: persistent, scoped project instructions. <https://docs.cline.bot/customization/cline-rules>
- shadcn/improve: strong-model planning, self-contained plans, verification gates, stop conditions, isolated execution, reconciliation. <https://github.com/shadcn/improve>
- Taskmaster/Hamster: direction-to-delivery chain, task dependencies, context continuity. <https://tryhamster.com/docs/concepts/delivery>
- Claude Code best practices: verification, explore-plan-code, project memory, subagents, parallel sessions, adversarial review. <https://code.claude.com/docs/en/best-practices>
