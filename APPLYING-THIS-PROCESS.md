# Applying This Process To Another Repository

## Install

Copy these files or their equivalents into the target repo:

- `AGENT-ENTRYPOINT.md`
- `agent-context-intake.md`
- `knowledge/`
- `schema/`
- `examples/`
- `process.config.example.json` if the repo needs persistent tool preferences.

Then create or update the target repo's agent instruction file:

- `AGENTS.md` for cross-agent repository rules.
- Tool-specific equivalents when needed, such as `CLAUDE.md`, `.cursor/rules/`, `.clinerules/`, or `.github/copilot-instructions.md`.

`AGENT-ENTRYPOINT.md` is the process entrypoint. `AGENTS.md` is the target repository's standing instruction file. In small repos, `AGENTS.md` may simply point agents to `AGENT-ENTRYPOINT.md`.

If the team uses Linear, GitHub Issues, Jira, or another tracker, copy `process.config.example.json` to `process.config.json` and set the task system preferences there.

For standard or larger work, create:

```text
docs/
  intake/
  product/
  architecture/adr/
  execution/
  evidence/
  memory/
```

## Validate

Run:

```sh
npm test
```

If the target repo cannot use Node, preserve the schemas and use any JSON Schema Draft 2020-12 compatible validator. The important contract is:

- Validate `examples/mini-pr-task-packet.example.json` against `schema/mini-pr-task-packet.schema.json`.
- Validate `examples/ready-to-proceed.lightweight.example.json` against `schema/ready-to-proceed.schema.json`.
- Validate full PR Task Packets against `schema/pr-task-packet.schema.json`.
- Validate Task Graphs against `schema/task-graph.schema.json`.
- Validate `process.config.json` against `schema/process-config.schema.json` when present.

Portable examples:

```sh
# Python environments
python -m pip install check-jsonschema
check-jsonschema --schemafile schema/task-graph.schema.json examples/task-graph.standard.example.json

# Any environment with a JSON Schema validator
jsonschema validate --schema schema/pr-task-packet.schema.json examples/pr-task-packet.standard.example.json
```

If no validator is available, agents must still inspect required fields, unknown top-level fields, and stop conditions before handoff.

## Store Artifacts

Use JSON for packets and task graphs. Use Markdown with YAML frontmatter for briefs, maps, ADRs, runbooks, and memory.
