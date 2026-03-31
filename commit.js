/**
 * commit.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Creates commits via GitHub REST API instead of git CLI.
 * API commits with your verified email count toward your contribution graph,
 * unlike git-based commits made inside GitHub Actions workflows.
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use strict";

const fs    = require("fs");
const path  = require("path");
const https = require("https");

const REPO_ROOT = path.resolve(__dirname);

// ─── Commit message pools ─────────────────────────────────────────────────────

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

// ─── GitHub API helper ────────────────────────────────────────────────────────

function apiRequest(method, path, body, token) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = https.request(
      {
        hostname: "api.github.com",
        path,
        method,
        headers: {
          "Authorization":  `Bearer ${token}`,
          "Accept":         "application/vnd.github+json",
          "User-Agent":     "dev-practice-automation",
          "Content-Type":   "application/json",
          "X-GitHub-Api-Version": "2022-11-28",
          ...(payload ? { "Content-Length": Buffer.byteLength(payload) } : {}),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try {
            const json = JSON.parse(data);
            if (res.statusCode >= 400) {
              reject(new Error(`GitHub API ${res.statusCode}: ${json.message || data}`));
            } else {
              resolve(json);
            }
          } catch {
            reject(new Error(`Non-JSON response (${res.statusCode}): ${data.slice(0, 200)}`));
          }
        });
      }
    );
    req.on("error", reject);
    if (payload) req.write(payload);
    req.end();
  });
}

// ─── Core API commit logic ────────────────────────────────────────────────────

/**
 * Creates a commit via GitHub API. This counts toward your contribution graph
 * because it uses your PAT + verified email, not the Actions bot identity.
 *
 * Flow:
 *   1. GET /repos/:owner/:repo/git/ref/heads/main  → get latest commit SHA
 *   2. GET /repos/:owner/:repo/git/commits/:sha    → get tree SHA
 *   3. For each file: PUT /repos/:owner/:repo/contents/:path (creates blob + tree entry)
 *      Actually we use the simpler Contents API which handles tree/blob internally.
 *   4. The Contents API PUT automatically creates a commit — we just need to
 *      call it for each file with the correct author identity.
 */
async function commitViaAPI(filePaths, message, token, owner, repo, authorName, authorEmail) {
  // We use the Contents API (PUT /repos/:owner/:repo/contents/:path)
  // for each file. It creates individual commits per file, but that's fine —
  // each one counts as a contribution.

  let lastSha = null;

  for (const filePath of filePaths) {
    const fullPath = path.isAbsolute(filePath)
      ? filePath
      : path.join(REPO_ROOT, filePath);

    if (!fs.existsSync(fullPath)) {
      console.log(`[commit] Skipping missing file: ${filePath}`);
      continue;
    }

    const relativePath = path.relative(REPO_ROOT, fullPath).replace(/\\/g, "/");
    const content      = fs.readFileSync(fullPath);
    const encoded      = content.toString("base64");

    // Get current file SHA if it exists (required for updates)
    let existingSha = null;
    try {
      const existing = await apiRequest(
        "GET",
        `/repos/${owner}/${repo}/contents/${relativePath}`,
        null,
        token
      );
      existingSha = existing.sha;
    } catch {
      // File doesn't exist yet — that's fine, it's a create
    }

    const body = {
      message,
      content: encoded,
      author: {
        name:  authorName,
        email: authorEmail,
        date:  new Date().toISOString(),
      },
      committer: {
        name:  authorName,
        email: authorEmail,
        date:  new Date().toISOString(),
      },
      ...(existingSha ? { sha: existingSha } : {}),
    };

    console.log(`[commit] API: uploading ${relativePath}...`);
    const result = await apiRequest(
      "PUT",
      `/repos/${owner}/${repo}/contents/${relativePath}`,
      body,
      token
    );
    lastSha = result?.commit?.sha;
    console.log(`[commit] ✓ ${relativePath} → commit ${lastSha?.slice(0, 7)}`);
  }

  return lastSha;
}

// ─── Main export ──────────────────────────────────────────────────────────────

async function commitAndPush(filePaths, task, detail = "") {
  const token       = process.env.PAT_TOKEN || process.env.GITHUB_TOKEN;
  const owner       = process.env.GITHUB_REPOSITORY_OWNER;
  const repo        = (process.env.GITHUB_REPOSITORY || "").split("/")[1];
  const authorName  = process.env.GIT_USER_NAME  || "himesh026";
  const authorEmail = process.env.GIT_USER_EMAIL || "himeshdhaka616@gmail.com";

  if (!token)  throw new Error("PAT_TOKEN secret is missing — add it in repo Settings → Secrets");
  if (!owner)  throw new Error("GITHUB_REPOSITORY_OWNER env var missing (set automatically in Actions)");
  if (!repo)   throw new Error("GITHUB_REPOSITORY env var missing (set automatically in Actions)");

  const message = buildMessage(task, detail);
  console.log(`[commit] Message: "${message}"`);
  console.log(`[commit] Author:  ${authorName} <${authorEmail}>`);

  const sha = await commitViaAPI(filePaths, message, token, owner, repo, authorName, authorEmail);

  if (sha) {
    console.log(`[commit] ✅ Pushed via API: "${message}"`);
    return true;
  }

  console.log("[commit] Nothing committed.");
  return false;
}

module.exports = { commitAndPush, buildMessage };
