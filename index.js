/**
 * scripts/index.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Main automation entry point.
 *
 * Execution flow:
 *   1. 30–40% chance to skip entirely (human-like gaps)
 *   2. Randomly pick ONE task: GFG POTD | Frontend | Backend
 *   3. Execute the task (fetch/generate via Gemini)
 *   4. Write the output file
 *   5. Update README.md
 *   6. Commit + push only if a new file was created
 * ─────────────────────────────────────────────────────────────────────────────
 */

// FIX 2: "use strict" must be the very first statement — not after requires.
// The original had `const fs = require("fs")` and `let fileCreated = false`
// before "use strict", which silently violated strict mode scoping.
"use strict";

const path = require("path");
const {
  generateGFGSolution,
  generateFrontendComponent,
  generateBackendUtility,
  generateFallbackDSA,
} = require("./ai");
const { fetchGFGPotd } = require("./gfg");
const {
  pickTask,
  writeGFGSolution,
  writeFrontendComponent,
  writeBackendUtility,
  updateReadme,
  todayDate,
} = require("./generator");
const { commitAndPush } = require("./commit");

// ─── Human-like skip ──────────────────────────────────────────────────────────

/**
 * Returns true with ~35% probability.
 * Creates natural gaps in the contribution graph.
 */
function shouldSkip() {
  return Math.random() < 0.35;
}

// ─── Task runners ─────────────────────────────────────────────────────────────

async function runGFGTask(apiKey) {
  let problem;
  let isFallback = false;

  try {
    problem = await fetchGFGPotd();
    console.log(`[main] GFG POTD: "${problem.title}" (${problem.difficulty})`);
  } catch (err) {
    console.warn(`[main] GFG fetch failed: ${err.message}`);
    console.log("[main] Using AI-generated fallback DSA problem...");
    isFallback = true;
  }

  let solution;
  if (isFallback) {
    solution = await generateFallbackDSA(apiKey);
    problem = {
      title:       solution.title,
      difficulty:  "Medium",
      tags:        "DSA, Algorithms",
      statement:   solution.title,
      constraints: "",
      examples:    "",
    };
  } else {
    solution = await generateGFGSolution(problem, apiKey);
  }

  const result = writeGFGSolution(
    problem,
    solution.code,
    solution.langKey,
    solution.langName,
    solution.ext
  );

  return { result, detail: problem.title };
}

async function runFrontendTask(apiKey) {
  const code   = await generateFrontendComponent(apiKey);
  const result = writeFrontendComponent(code);
  return { result, detail: "" };
}

async function runBackendTask(apiKey) {
  const code   = await generateBackendUtility(apiKey);
  const result = writeBackendUtility(code);
  return { result, detail: "" };
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  const date = todayDate();
  console.log(`\n${"═".repeat(58)}`);
  console.log(`  Dev Activity Automation — ${date}`);
  console.log(`${"═".repeat(58)}\n`);

  // ── Step 1: Human-like skip ──────────────────────────────────
  if (shouldSkip()) {
    console.log(
      "[main] 🎲 Skipping today's run (natural activity gap). Bye!\n",
    );
    process.exit(0);
  }

  // ── Step 2: Validate API key ─────────────────────────────────
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim().length < 10) {
    console.error("[main] ❌ GEMINI_API_KEY is missing or invalid.");
    process.exit(1);
  }

  // ── Step 3: Pick task ─────────────────────────────────────────
  const task = pickTask();


  console.log(`[main] 🎯 Selected task: ${task.toUpperCase()}\n`);

  // ── Step 4: Execute task ──────────────────────────────────────
  let result, detail;

  try {
    let outcome;
    if (task === "gfg") outcome = await runGFGTask(apiKey);
    else if (task === "frontend") outcome = await runFrontendTask(apiKey);
    else outcome = await runBackendTask(apiKey);

    result = outcome.result;
    detail = outcome.detail;
  } catch (err) {
    console.error(`[main] ❌ Task failed: ${err.message}`);
    console.log("[main] Exiting without commit (graceful failure).\n");
    process.exit(0);
  }

  // ── Step 5: Check if a new file was actually written ──────────
  if (!result?.written) {
    console.log("[main] ℹ️  No new file created — nothing to commit.");
    process.exit(0);
  }

  console.log(`\n[main] ✓ New file: ${result.relativePath}`);

  // ── Step 6: Update README ─────────────────────────────────────
  try {
    updateReadme();
  } catch (err) {
    console.warn(`[main] README update failed (non-fatal): ${err.message}`);
  }

  // ── Step 7: Commit + push ─────────────────────────────────────
  const filesToStage = [result.relativePath, "README.md"];

  try {
    const pushed = commitAndPush(filesToStage, task, detail);
    if (pushed) {
      console.log("\n[main] ✅ Done! Contribution recorded.\n");
    } else {
      console.log("\n[main] ⚠️  Files written but nothing was pushed.\n");
    }
  } catch (err) {
    console.error(`[main] ❌ Git push failed: ${err.message}`);
    process.exit(1);
  }
}

// FIX 2 (continued): The original had a rogue block AFTER main() that ran
// unconditionally at module load time:
//
//   if (!fileCreated) {
//     fs.writeFileSync(fname, ...)   ← always ran, even on skip/error
//   }
//
// This caused "Fallback file created" to print before GFG even responded,
// and committed a garbage file on every single run regardless of outcome.
// REMOVED entirely — the ai.js fallback DSA logic handles this correctly.

main().catch((err) => {
  console.error("[main] Fatal error:", err.message);
  process.exit(1);
});
