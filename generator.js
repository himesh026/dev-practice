/**
 * scripts/generator.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Task orchestration, file writing, and README auto-update.
 *
 * Task weights (roughly matching a real full-stack developer):
 *   • GFG POTD   — 40%  (most frequent — DSA practice looks great on profile)
 *   • Frontend   — 30%
 *   • Backend    — 30%
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use strict";

const fs   = require("fs");
const path = require("path");

const REPO_ROOT = path.resolve(__dirname, "..");

const DIRS = {
  gfg:      path.join(REPO_ROOT, "gfg"),
  frontend: path.join(REPO_ROOT, "frontend"),
  backend:  path.join(REPO_ROOT, "backend"),
};

// ─── Utilities ────────────────────────────────────────────────────────────────

/** Returns today's date as YYYY-MM-DD (UTC). */
function todayDate() {
  return new Date().toISOString().slice(0, 10);
}

/**
 * Converts a problem title to a safe slug for filenames.
 * "Two Sum Problem!" → "two-sum-problem"
 */
function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 40)
    .replace(/^-|-$/g, "");
}

/** Ensures all required directories exist. */
function ensureDirs() {
  for (const dir of Object.values(DIRS)) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`[generator] Created: ${path.relative(REPO_ROOT, dir)}`);
    }
  }
}

/** Picks a task based on weighted probability. */
function pickTask() {
  const roll = Math.random();
  if (roll < 0.40) return "gfg";
  if (roll < 0.70) return "frontend";
  return "backend";
}

// ─── Header builders ─────────────────────────────────────────────────────────

function buildGFGHeader(problem, langName, date) {
  const c = langName === "Python" ? "#" : "//";
  return [
    `${c} Problem   : ${problem.title}`,
    `${c} Difficulty: ${problem.difficulty}`,
    `${c} Tags      : ${problem.tags}`,
    `${c} Language  : ${langName}`,
    `${c} Date      : ${date}`,
    `${c} ${"─".repeat(55)}`,
    "",
  ].join("\n");
}

function buildFrontendHeader(date) {
  return [
    `// Type      : React Component`,
    `// Date      : ${date}`,
    `// ${"─".repeat(55)}`,
    "",
  ].join("\n");
}

function buildBackendHeader(date) {
  return [
    `// Type      : Backend Utility`,
    `// Date      : ${date}`,
    `// ${"─".repeat(55)}`,
    "",
  ].join("\n");
}

// ─── File writers ─────────────────────────────────────────────────────────────

/**
 * Writes a GFG solution file.
 * @param {object} problem   - normalized problem object
 * @param {string} code      - generated code
 * @param {string} langKey   - "python" | "java" | "javascript"
 * @param {string} langName  - "Python" | "Java" | "JavaScript"
 * @param {string} ext       - file extension without dot
 * @returns {{ written, filePath, relativePath, label }}
 */
function writeGFGSolution(problem, code, langKey, langName, ext) {
  ensureDirs();
  const date  = todayDate();
  const slug  = slugify(problem.title) || "potd";
  const fname = `${date}_${slug}.${ext}`;
  const full  = path.join(DIRS.gfg, fname);
  const rel   = `gfg/${fname}`;

  if (fs.existsSync(full)) {
    console.log(`[generator] Already exists: ${rel}`);
    return { written: false, filePath: full, relativePath: rel };
  }

  const content = buildGFGHeader(problem, langName, date) + code.trim() + "\n";
  _safeWrite(full, content);

  return {
    written:      true,
    filePath:     full,
    relativePath: rel,
    label:        `GFG: ${problem.title} (${langName})`,
    task:         "gfg",
  };
}

/**
 * Writes a frontend component file.
 * @param {string} code
 * @returns {{ written, filePath, relativePath, label }}
 */
function writeFrontendComponent(code) {
  ensureDirs();
  const date  = todayDate();
  const fname = `${date}_component.jsx`;
  const full  = path.join(DIRS.frontend, fname);
  const rel   = `frontend/${fname}`;

  if (fs.existsSync(full)) {
    console.log(`[generator] Already exists: ${rel}`);
    return { written: false, filePath: full, relativePath: rel };
  }

  const content = buildFrontendHeader(date) + code.trim() + "\n";
  _safeWrite(full, content);

  return {
    written:      true,
    filePath:     full,
    relativePath: rel,
    label:        "Frontend: React Component",
    task:         "frontend",
  };
}

/**
 * Writes a backend utility file.
 * @param {string} code
 * @returns {{ written, filePath, relativePath, label }}
 */
function writeBackendUtility(code) {
  ensureDirs();
  const date  = todayDate();
  const fname = `${date}_service.js`;
  const full  = path.join(DIRS.backend, fname);
  const rel   = `backend/${fname}`;

  if (fs.existsSync(full)) {
    console.log(`[generator] Already exists: ${rel}`);
    return { written: false, filePath: full, relativePath: rel };
  }

  const content = buildBackendHeader(date) + code.trim() + "\n";
  _safeWrite(full, content);

  return {
    written:      true,
    filePath:     full,
    relativePath: rel,
    label:        "Backend: Utility Service",
    task:         "backend",
  };
}

/** Writes content to file, throwing if result is too short. */
function _safeWrite(fullPath, content) {
  if (content.trim().length < 100) {
    throw new Error(`Content too short (${content.length} chars) — refusing to write`);
  }
  fs.writeFileSync(fullPath, content, "utf8");
  console.log(`[generator] ✓ Written: ${path.relative(REPO_ROOT, fullPath)}`);
}

// ─── README updater ───────────────────────────────────────────────────────────

/** Scans all three output dirs and returns recent file metadata. */
function collectRecentFiles(limit = 10) {
  ensureDirs();

  const entries = [];

  const scanDir = (dir, taskKey, icon) => {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir)
      .filter((f) => /^\d{4}-\d{2}-\d{2}/.test(f) && !f.endsWith(".md"))
      .sort()
      .reverse()
      .forEach((f) => {
        // Extract date from filename
        const date = f.slice(0, 10);
        // Try to pull problem name from header comment in file
        let label = f;
        try {
          const firstLine = fs.readFileSync(path.join(dir, f), "utf8")
            .split("\n")
            .find((l) => /Problem\s*:|Type\s*:/i.test(l));
          if (firstLine) {
            const m = firstLine.match(/:\s*(.+)/);
            if (m) label = m[1].trim();
          }
        } catch {}

        entries.push({
          date,
          taskKey,
          icon,
          label,
          relativePath: `${taskKey}/${f}`,
        });
      });
  };

  scanDir(DIRS.gfg,      "gfg",      "🧩");
  scanDir(DIRS.frontend, "frontend", "🎨");
  scanDir(DIRS.backend,  "backend",  "⚙️");

  entries.sort((a, b) => (a.date < b.date ? 1 : -1));
  return entries.slice(0, limit);
}

/**
 * Regenerates the root README.md with a categorized activity table.
 */
function updateReadme() {
  const all      = collectRecentFiles(10);
  const readmePath = path.join(REPO_ROOT, "README.md");

  // Split by category
  const gfgRows      = all.filter((e) => e.taskKey === "gfg");
  const frontendRows = all.filter((e) => e.taskKey === "frontend");
  const backendRows  = all.filter((e) => e.taskKey === "backend");

  const mkTable = (rows) => {
    if (!rows.length) return "_Nothing yet._\n";
    const header = "| Date | File | Description |\n|------|------|-------------|\n";
    const body   = rows
      .map((r) => `| ${r.date} | [\`${r.relativePath}\`](./${r.relativePath}) | ${r.label} |`)
      .join("\n");
    return header + body + "\n";
  };

  const totalCommits = all.length;
  const lastDate     = all[0]?.date || "—";

  const content = [
    "# 👨‍💻 Dev Activity",
    "",
    "A portfolio of daily coding practice: DSA problem-solving, React component",
    "development, and backend utility engineering.",
    "",
    "![Activity](https://img.shields.io/badge/status-active-brightgreen)",
    `![Last Commit](https://img.shields.io/badge/last%20commit-${lastDate}-blue)`,
    `![Total Files](https://img.shields.io/badge/files-${totalCommits}-orange)`,
    "",
    "---",
    "",
    "## 🧩 GFG Problems (DSA Practice)",
    "",
    mkTable(gfgRows),
    "## 🎨 Frontend Components",
    "",
    mkTable(frontendRows),
    "## ⚙️ Backend Utilities",
    "",
    mkTable(backendRows),
    "---",
    "",
    "## 📁 Project Structure",
    "",
    "```",
    "├── gfg/         # GeeksForGeeks POTD solutions (Python / Java / JS)",
    "├── frontend/    # React components and UI utilities",
    "├── backend/     # Node.js services, middleware, and utilities",
    "└── scripts/     # Automation scripts (internal)",
    "```",
    "",
    "## 🔤 Languages & Tech",
    "",
    "| Area | Stack |",
    "|------|-------|",
    "| DSA | Python · Java · JavaScript |",
    "| Frontend | React 18 · Hooks · JSX |",
    "| Backend | Node.js · Express · ES2022+ |",
    "",
    "---",
    `*Auto-updated on ${new Date().toISOString().slice(0, 19).replace("T", " ")} UTC*`,
    "",
  ].join("\n");

  fs.writeFileSync(readmePath, content, "utf8");
  console.log("[generator] ✓ README.md updated");
}

module.exports = {
  pickTask,
  writeGFGSolution,
  writeFrontendComponent,
  writeBackendUtility,
  updateReadme,
  todayDate,
  slugify,
};
