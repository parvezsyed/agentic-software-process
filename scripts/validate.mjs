import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];

function readJson(file) {
  try {
    return JSON.parse(fs.readFileSync(path.join(root, file), "utf8"));
  } catch (error) {
    errors.push(`${file}: invalid JSON: ${error.message}`);
    return null;
  }
}

function typeOf(value) {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
}

function validateSchema(schema, value, label, pointer = "") {
  if (!schema) return;
  const here = pointer || "$";
  if (schema.type && typeOf(value) !== schema.type) {
    errors.push(`${label}: ${here} expected ${schema.type}, got ${typeOf(value)}`);
    return;
  }
  if (schema.enum && !schema.enum.includes(value)) {
    errors.push(`${label}: ${here} expected one of ${schema.enum.join(", ")}, got ${value}`);
  }
  if (schema.required && typeOf(value) === "object") {
    for (const key of schema.required) {
      if (!(key in value)) errors.push(`${label}: ${here} missing required key ${key}`);
    }
  }
  if (schema.additionalProperties === false && schema.properties && typeOf(value) === "object") {
    for (const key of Object.keys(value)) {
      if (!(key in schema.properties)) errors.push(`${label}: ${here} has unknown key ${key}`);
    }
  }
  if (schema.minItems !== undefined && Array.isArray(value) && value.length < schema.minItems) {
    errors.push(`${label}: ${here} needs at least ${schema.minItems} items`);
  }
  if (schema.minLength !== undefined && typeof value === "string" && value.length < schema.minLength) {
    errors.push(`${label}: ${here} needs length >= ${schema.minLength}`);
  }
  if (schema.properties && typeOf(value) === "object") {
    for (const [key, childSchema] of Object.entries(schema.properties)) {
      if (key in value) validateSchema(childSchema, value[key], label, `${here}.${key}`);
    }
  }
  if (schema.items && Array.isArray(value)) {
    value.forEach((item, index) => validateSchema(schema.items, item, label, `${here}[${index}]`));
  }
}

const schemaExamples = [
  ["schema/mini-pr-task-packet.schema.json", "examples/mini-pr-task-packet.example.json"],
  ["schema/ready-to-proceed.schema.json", "examples/ready-to-proceed.lightweight.example.json"],
  ["schema/pr-task-packet.schema.json", "examples/pr-task-packet.standard.example.json"],
  ["schema/task-graph.schema.json", "examples/task-graph.standard.example.json"],
  ["schema/process-config.schema.json", "process.config.example.json"]
];

for (const [schemaFile, exampleFile] of schemaExamples) {
  const schema = readJson(schemaFile);
  const example = readJson(exampleFile);
  validateSchema(schema, example, exampleFile);
  validatePacketQuality(example, exampleFile);
}

const processJson = readJson("agentic-software-delivery-process.json");
if (processJson) {
  if (!Array.isArray(processJson.lifecycle)) {
    errors.push("agentic-software-delivery-process.json: lifecycle must be an array");
  } else {
    const ids = processJson.lifecycle.map((phase) => phase.id);
    if (ids.length !== new Set(ids).size) errors.push("agentic-software-delivery-process.json: lifecycle ids must be unique");
    if (!ids.includes("phase_00_agent_context_intake")) errors.push("agentic-software-delivery-process.json: missing phase_00_agent_context_intake");
    if (!ids.includes("phase_17_reconcile")) errors.push("agentic-software-delivery-process.json: missing phase_17_reconcile");
  }
}

function walk(dir) {
  const absolute = path.join(root, dir);
  if (!fs.existsSync(absolute)) return [];
  return fs.readdirSync(absolute, { withFileTypes: true }).flatMap((entry) => {
    const rel = path.join(dir, entry.name);
    if (entry.isDirectory()) return walk(rel);
    return rel.endsWith(".md") ? [rel] : [];
  });
}

for (const file of [...walk("knowledge"), ...walk("examples")]) {
  const base = path.basename(file);
  if (base === "index.md" || base === "log.md") continue;
  const text = fs.readFileSync(path.join(root, file), "utf8");
  if (!text.startsWith("---\n")) {
    errors.push(`${file}: OKF-style markdown examples need YAML frontmatter`);
    continue;
  }
  const end = text.indexOf("\n---", 4);
  if (end === -1) {
    errors.push(`${file}: frontmatter block is not closed`);
    continue;
  }
  const frontmatter = text.slice(4, end).trim();
  if (!/^type:\s*\S/m.test(frontmatter)) errors.push(`${file}: frontmatter missing required type`);
}

const requiredKnowledge = [
  "knowledge/artifact-format-policy.md",
  "knowledge/brownfield-discovery-recipes.md",
  "knowledge/human-response-defaults.md",
  "knowledge/task-system-adapters.md",
  "knowledge/orchestrator-executor.md",
  "knowledge/checkpointing.md",
  "knowledge/reference-loading-policy.md",
  "knowledge/self-dogfooding.md"
];

for (const file of requiredKnowledge) {
  if (!fs.existsSync(path.join(root, file))) errors.push(`${file}: required knowledge file is missing`);
}

const brownfield = fs.existsSync(path.join(root, "knowledge/brownfield-discovery-recipes.md"))
  ? fs.readFileSync(path.join(root, "knowledge/brownfield-discovery-recipes.md"), "utf8")
  : "";
for (const heading of ["# JavaScript Or TypeScript", "# Python", "# Go", "# Java Or Kotlin", "# Rust"]) {
  if (!brownfield.includes(heading)) errors.push(`knowledge/brownfield-discovery-recipes.md: missing ${heading}`);
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log(`Validated ${schemaExamples.length} schema examples, lifecycle metadata, and OKF-style markdown examples.`);

function validatePacketQuality(example, label) {
  if (!example || typeOf(example) !== "object") return;
  const stopConditions = example.stop_conditions || example?.reconciliation?.update_after;
  if (Array.isArray(stopConditions)) {
    for (const [index, condition] of stopConditions.entries()) {
      if (typeof condition === "string" && condition.trim().length < 12) {
        errors.push(`${label}: stop/update condition ${index} is too terse to guide an agent`);
      }
    }
  }
  const commands = example?.verification?.commands || example?.verification_plan?.commands;
  if (Array.isArray(commands) && commands.some((command) => typeof command === "string" && command.trim() === "")) {
    errors.push(`${label}: verification commands must not be blank`);
  }
  if (Array.isArray(example.tasks)) {
    for (const task of example.tasks) {
      if (!Array.isArray(task.stop_conditions) || task.stop_conditions.length === 0) {
        errors.push(`${label}: task ${task.id || "<unknown>"} needs stop_conditions`);
      }
      if (!task.budget?.time || !task.budget?.token_or_cost) {
        errors.push(`${label}: task ${task.id || "<unknown>"} needs time and token/cost budget`);
      }
    }
  }
}
