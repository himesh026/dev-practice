/**
 * commit.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Git operations: configure identity, stage files, commit, and push.
 * Designed for GitHub Actions environment with GITHUB_TOKEN authentication.
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use strict";

const { execSync } = require("child_process");
const path         = require("path");

// FIX: Files live at repo root, NOT in a scripts/ subfolder.
// __dirname is already the repo root — do NOT go up one level with "..".
const REPO_ROOT = path.resolve(__dirname);

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

function buildMessage(task, detail = "") {
  const pool = MESSAGES[task] || MESSAGES.generic;
  let msg    = pool[Math.floor(Math.random() * pool.length)];

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

function configureGit() {
  const name  = process.env.GIT_USER_NAME  || "github-actions[bot]";
  const email = process.env.GIT_USER_EMAIL ||
    "41898282+github-actions[bot]@users.noreply.github.com";
  run(`git config user.name  "${name}"`);
  run(`git config user.email "${email}"`);
}

function commitAndPush(filePaths, task, detail = "") {
  configureGit();

  for (const fp of filePaths) {
    const rel = fp.startsWith(REPO_ROOT)
      ? path.relative(REPO_ROOT, fp)
      : fp;
    run(`git add "${rel}"`);
  }

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

  // Push with one automatic retry on non-fast-forward rejection.
  try {
    run("git push");
  } catch (pushErr) {
    if (pushErr.message.includes("rejected") || pushErr.message.includes("non-fast-forward")) {
      console.log("[commit] Push rejected — pulling remote changes and retrying...");
      run("git pull --rebase --autostash origin main");
      run("git push");
    } else {
      throw pushErr;
    }
  }

  console.log(`[commit] ✅ Pushed: "${message}"`);
  return true;
}

module.exports = { commitAndPush, buildMessage };
