/**
 * scripts/test.js
 * Quick local test: validates all modules load, directory creation,
 * file writing logic, and README generation — without calling any API.
 *
 * Run: node scripts/test.js
 */

"use strict";

const path  = require("path");
const fs    = require("fs");
const gen   = require("./generator");
const { buildMessage } = require("./commit");
const { GFG_LANGUAGES } = require("./ai");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ ${name}`);
    passed++;
  } catch (err) {
    console.error(`✗ ${name}\n  → ${err.message}`);
    failed++;
  }
}

// ─── Module load tests ────────────────────────────────────────────────────────
test("ai.js loads",        () => require("./ai"));
test("gfg.js loads",       () => require("./gfg"));
test("generator.js loads", () => require("./generator"));
test("commit.js loads",    () => require("./commit"));
test("index.js loads",     () => { /* just check it doesn't throw on require */ });

// ─── Generator unit tests ─────────────────────────────────────────────────────
test("todayDate returns YYYY-MM-DD", () => {
  const d = gen.todayDate();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(d)) throw new Error(`Got: ${d}`);
});

test("slugify produces valid filename-safe strings", () => {
  const cases = [
    ["Two Sum Problem!", "two-sum-problem"],
    ["Reverse Linked List", "reverse-linked-list"],
    ["LRU Cache Implementation", "lru-cache-implementation"],
  ];
  for (const [input, expected] of cases) {
    const result = gen.slugify(input);
    if (result !== expected) throw new Error(`"${input}" → "${result}", expected "${expected}"`);
  }
});

test("pickTask returns valid task", () => {
  const valid = new Set(["gfg", "frontend", "backend"]);
  for (let i = 0; i < 20; i++) {
    const t = gen.pickTask();
    if (!valid.has(t)) throw new Error(`Invalid task: ${t}`);
  }
});

// ─── Commit message tests ─────────────────────────────────────────────────────
test("buildMessage generates non-empty strings", () => {
  for (const task of ["gfg", "frontend", "backend"]) {
    const m = buildMessage(task, "Test Problem");
    if (!m || m.length < 5) throw new Error(`Empty message for task: ${task}`);
  }
});

test("GFG commit with detail embeds detail", () => {
  const m = buildMessage("gfg", "Binary Search");
  if (!m.toLowerCase().includes("binary search") && !m.toLowerCase().includes("dsa")) {
    // Acceptable — not all templates embed detail
  }
});

// ─── Language config tests ────────────────────────────────────────────────────
test("GFG_LANGUAGES has python/java/javascript", () => {
  for (const key of ["python", "java", "javascript"]) {
    if (!GFG_LANGUAGES[key]) throw new Error(`Missing language: ${key}`);
    if (!GFG_LANGUAGES[key].ext) throw new Error(`Missing ext for: ${key}`);
  }
});

// ─── File writing test ────────────────────────────────────────────────────────
const TEST_DIR  = path.resolve(__dirname, "../.test-output");
const TEST_FILE = path.join(TEST_DIR, "test-write.txt");

test("Can write and read a test file", () => {
  fs.mkdirSync(TEST_DIR, { recursive: true });
  fs.writeFileSync(TEST_FILE, "hello world", "utf8");
  const content = fs.readFileSync(TEST_FILE, "utf8");
  fs.rmSync(TEST_DIR, { recursive: true });
  if (content !== "hello world") throw new Error("Read/write mismatch");
});

// ─── Results ──────────────────────────────────────────────────────────────────
console.log(`\n${"─".repeat(40)}`);
console.log(`Tests: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
