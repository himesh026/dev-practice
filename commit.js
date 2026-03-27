/**
 * scripts/commit.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Git operations: configure identity, stage files, commit, and push.
 * Designed for GitHub Actions environment with GITHUB_TOKEN authentication.
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use strict";

const { execSync } = require("child_process");
const path         = require("path");

// Files live at repo root (not in a scripts/ subfolder), so __dirname IS the repo root.
const REPO_ROOT = path.resolve(__dirname);

// ─── Commit message pools per task ───────────────────────────────────────────

const MESSAGES = {
  gfg: [
    "feat: solve GFG problem of the day",
    "practice: add DSA solution",
    "solve: daily coding problem",
    "feat: add algorithm solution",
    "practice: GFG POTD solved",
    "add: daily DSA practice",
  ],
  frontend: [
    "feat: add frontend component",
    "ui: create new React component",
    "feat: implement UI widget",
    "add: reusable frontend component",
    "feat: build React utility component",
    "ui: add interactive component",
  ],
  backend: [
    "feat: implement backend utility",
    "feat: add service module",
    "add: backend helper function",
    "feat: create API utility",
    "backend: add new service",
    "feat: implement middleware utility",
  ],
  generic: [
    "refactor: improve logic",
    "chore: minor improvements",
    "chore: update project files",
    "refactor: clean up code",
    "chore: daily maintenance",
  ],
};

/**
 * Builds a realistic commit message for the given task type.
 * Appends a short variation suffix so consecutive identical messages
 * don't appear in git log.
 *
 * @param {string} task - "gfg" | "frontend" | "backend"
 * @param {string} [detail] - optional problem/component name to embed
 * @returns {string}
 */
function buildMessage(task, detail = "") {
  const pool = MESSAGES[task] || MESSAGES.generic;
  let msg    = pool[Math.floor(Math.random() * pool.length)];

  // Embed problem/component name for GFG commits
  if (task === "gfg" && detail) {
    const clean = detail.replace(/[^a-zA-Z0-9 \-]/g, "").trim().slice(0, 35);
    const gfgSpecific = [
      `feat: solve ${clean}`,
      `practice: ${clean} solution`,
      `add: ${clean} (DSA)`,
    ];
    msg = gfgSpecific[Math.floor(Math.random() * gfgSpecific.length)];
  }

  return msg;
}

// ─── Git helpers ──────────────────────────────────────────────────────────────

function run(cmd) {
  console.log(`[commit] $ ${cmd}`);
  try {
    const out = execSync(cmd, {
      cwd:      REPO_ROOT,
      encoding: "utf8",
      stdio:    ["pipe", "pipe", "pipe"],
    });
    if (out?.trim()) console.log(`[commit]   ${out.trim()}`);
    return out || "";
  } catch (err) {
    const stderr = err.stderr?.trim() || "";
    const stdout = err.stdout?.trim() || "";
    throw new Error(`Command failed: ${cmd}\n${stderr || stdout}`);
  }
}

/** Configures git identity for the Actions bot. */
function configureGit() {
  const name  = process.env.GIT_USER_NAME  || "github-actions[bot]";
  const email = process.env.GIT_USER_EMAIL ||
    "41898282+github-actions[bot]@users.noreply.github.com";
  run(`git config user.name  "${name}"`);
  run(`git config user.email "${email}"`);
}

/**
 * Stages, commits, and pushes the given files.
 *
 * @param {string[]} filePaths   - repo-relative paths to stage
 * @param {string}   task        - "gfg" | "frontend" | "backend"
 * @param {string}   [detail]    - optional detail for commit message
 * @returns {boolean} true if a commit was pushed
 */
function commitAndPush(filePaths, task, detail = "") {
  configureGit();

  // Stage each file
  for (const fp of filePaths) {
    // Accept both absolute and relative paths
    const rel = fp.startsWith(REPO_ROOT)
      ? path.relative(REPO_ROOT, fp)
      : fp;
    run(`git add "${rel}"`);
  }

  // Check if anything is staged
  const status = execSync("git status --porcelain", {
    cwd:      REPO_ROOT,
    encoding: "utf8",
  });

  if (!status.trim()) {
    console.log("[commit] Nothing staged — skipping commit.");
    return false;
  }

  const message = buildMessage(task, detail);
  run(`git commit -m "${message}"`);
  run("git push");

  console.log(`[commit] ✅ Pushed: "${message}"`);
  return true;
}

module.exports = { commitAndPush, buildMessage };
