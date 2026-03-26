/**
 * scripts/ai.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Core Gemini API integration layer.
 *
 * FIX 3: Quota errors were caused by RPM (requests-per-minute) limits, not
 * daily quota exhaustion. Switching models instantly hits the same rate limiter.
 * Solution: wait 15 seconds between model switches + longer per-attempt delays.
 *
 * Model cascade 
 */

"use strict";

const https = require("https");

const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta/models";

// Model cascade — ordered by speed/availability on free tier.
// Updated 2026-03: gemini-1.5-* fully removed; gemini-2.5-flash is now stable.
// gemini-2.5-flash tried first: it's the most capable free-tier model and
// handles quota better than 2.0-flash-lite at low request volumes.
const MODELS = [
  "gemini-2.0-flash-lite", // cheapest, highest free-tier RPM
  "gemini-2.5-flash",
  "gemini-2.0-flash", // fast, good quality
  "gemini-2.0-flash-001", // most ca
];

const MAX_RETRIES_PER_MODEL = 2;
const RETRY_DELAY_MS        = 3000;  // wait between retries on same model
const MODEL_SWITCH_DELAY_MS = 15000; // FIX: wait before trying next model (RPM cooldown)

// ─── Language config ──────────────────────────────────────────────────────────

const GFG_LANGUAGES = {
  python: {
    name: "Python",
    ext:  "py",
    hint: "Use clean Pythonic style. No classes unless needed.",
  },
  java: {
    name: "Java",
    ext:  "java",
    hint: "Wrap logic in a Solution class with a main method for testing.",
  },
  javascript: {
    name: "JavaScript",
    ext:  "js",
    hint: "Use modern ES2022+ syntax. Arrow functions where appropriate.",
  },
};

// ─── Prompt builders ──────────────────────────────────────────────────────────

function buildGFGPrompt(problem, langKey) {
  const lang = GFG_LANGUAGES[langKey];
  const statementSection = problem.statement && problem.statement.length > 10
    ? `Description:\n${problem.statement}`
    : `(Full problem description unavailable — infer the standard algorithm for "${problem.title}" based on title and tags.)`;

  return `You are an expert competitive programmer. Solve this problem in ${lang.name}.

Problem: ${problem.title}
Difficulty: ${problem.difficulty || "Medium"}
Tags: ${problem.tags || "DSA"}

${statementSection}

${problem.constraints ? `Constraints:\n${problem.constraints}` : ""}
${problem.examples    ? `\nExamples:\n${problem.examples}`    : ""}

STRICT RULES:
- Output ONLY raw ${lang.name} code. Zero markdown, zero backticks, zero explanations.
- Add concise inline comments explaining key decisions.
- First comment line: Time complexity, second: Space complexity.
- ${lang.hint}
- Code must be complete, correct, and between 30–80 lines. DO NOT output fewer than 30 lines.
- Include the full working solution, helper functions, and at least one example usage at the bottom.
- Begin immediately with the code — no preamble.`;
}

function buildFrontendPrompt() {
  const components = [
    {
      name: "animated toast notification system",
      details:
        "A React component that shows slide-in toast messages (success/error/info/warning). " +
        "Supports auto-dismiss after 3s and manual close. Uses useState + useEffect. " +
        "Clean minimal styling with inline styles.",
    },
    {
      name: "dark/light theme toggle with persistence",
      details:
        "A React hook (useTheme) + toggle button component. Persists preference to localStorage. " +
        "Applies theme via CSS variables on :root. Smooth transition animation on toggle.",
    },
    {
      name: "responsive navbar with mobile hamburger menu",
      details:
        "A React functional component. Collapses to hamburger on mobile. " +
        "Smooth slide-down animation for mobile menu. Links array passed as props. Active link highlighting.",
    },
    {
      name: "infinite scroll list component",
      details:
        "A React component using IntersectionObserver for infinite scroll. " +
        "Accepts a fetchMore function prop. Shows skeleton loaders while fetching.",
    },
    {
      name: "file drag-and-drop upload zone",
      details:
        "A React component with drag-over visual feedback. Accepts file type restrictions via props. " +
        "Shows file preview for images. Displays file name + size for non-images.",
    },
    {
      name: "multi-step form wizard",
      details:
        "A React multi-step form with step indicators. Validates each step before allowing next. " +
        "Stores partial data in state. Final step shows summary before submit.",
    },
    {
      name: "countdown timer component",
      details:
        "A React countdown timer that accepts a target date prop. Displays days, hours, minutes, seconds. " +
        "Calls an onExpire callback when done.",
    },
    {
      name: "real-time search filter component",
      details:
        "A React component with debounced search input (300ms). Filters a list passed as prop. " +
        "Highlights matching text in results. Shows 'No results' state.",
    },
    {
      name: "copy-to-clipboard button with feedback",
      details:
        "A React component that copies text to clipboard via navigator.clipboard. " +
        "Shows a checkmark icon for 2s after copy. Resets back to copy icon.",
    },
    {
      name: "modal dialog with focus trap",
      details:
        "A React accessible modal. Traps keyboard focus inside modal. " +
        "Closes on backdrop click or Escape key. Smooth fade+scale animation. Uses React Portal.",
    },
    {
      name: "star rating widget",
      details:
        "A React reusable rating component. Hover highlights stars. Supports half-star ratings. " +
        "Controlled and uncontrolled modes via props. Accessible with ARIA labels.",
    },
    {
      name: "animated progress stepper",
      details:
        "A React step progress indicator. Animated connector line fills as steps complete. " +
        "Each step has icon, title, optional description. Supports horizontal layout.",
    },
  ];

  const chosen = components[Math.floor(Math.random() * components.length)];
  return `You are a senior React developer. Create a production-ready React component: ${chosen.name}.

Component requirements:
${chosen.details}

STRICT RULES:
- Output ONLY raw React/JSX code. Zero markdown, zero backticks, zero explanations.
- Use functional components with hooks only (React 18+).
- PropTypes or JSDoc comments for all props.
- Inline styles — no external CSS file imports.
- Named export AND default export at the bottom.
- Code must be complete, self-contained, and between 50–100 lines. DO NOT output fewer than 50 lines.
- Begin immediately with imports — no preamble.`;
}

function buildBackendPrompt() {
  const utilities = [
    {
      name: "JWT authentication middleware for Express",
      details:
        "Verifies Bearer token from Authorization header. Decodes payload and attaches to req.user. " +
        "Returns 401 for missing/expired/invalid token. Supports optional role-based access.",
    },
    {
      name: "request rate limiter middleware",
      details:
        "An in-memory rate limiter for Express. Configurable: windowMs, maxRequests, message. " +
        "Uses a Map to track request counts per IP. Cleans up expired windows automatically.",
    },
    {
      name: "async error handler wrapper",
      details:
        "A higher-order function that wraps async Express route handlers. " +
        "Catches promise rejections and passes them to next(err). " +
        "Also includes a global Express error handler middleware with proper HTTP status codes.",
    },
    {
      name: "paginated query helper",
      details:
        "A utility function paginateQuery(Model, query, options). " +
        "Accepts page, limit, sort. Returns { data, total, page, totalPages, hasNext, hasPrev }.",
    },
    {
      name: "Redis-based cache middleware for Express",
      details:
        "Middleware factory cacheMiddleware(ttlSeconds). Checks Redis for cached response by URL key. " +
        "On miss, intercepts res.json to store response before sending. Includes cache invalidation helper.",
    },
    {
      name: "email service module using Nodemailer",
      details:
        "A clean EmailService class with sendWelcome, sendPasswordReset, sendNotification methods. " +
        "Uses template strings for HTML emails. Supports retry on transient failures.",
    },
    {
      name: "CSV parser and database import utility",
      details:
        "A Node.js utility that reads a CSV file, validates rows against a schema, " +
        "batches inserts, and reports success/failure counts. Uses streams for large files.",
    },
    {
      name: "API response formatter utility",
      details:
        "A utility module with success(res, data, message, statusCode) and " +
        "error(res, message, statusCode, errors) functions. " +
        "Enforces consistent API response shape across the entire app.",
    },
    {
      name: "environment config validator",
      details:
        "A startup module that validates all required env variables are present and correctly typed. " +
        "Throws descriptive errors on startup if any are missing. " +
        "Exports a typed config object for use throughout the app.",
    },
    {
      name: "WebSocket event handler with rooms support",
      details:
        "A Socket.io handler module. Manages join/leave room events. " +
        "Broadcasts messages to room members. Tracks online users per room in a Map. " +
        "Handles disconnect cleanup.",
    },
    {
      name: "input validation middleware using schema",
      details:
        "A factory function createValidator(schema) that returns Express middleware. " +
        "Validates req.body against a schema object with type + required rules. " +
        "Returns structured 400 error with field-level messages on failure.",
    },
    {
      name: "file upload handler with image resizing",
      details:
        "An Express route handler for image uploads using multer. " +
        "Validates file type and size. Renames file with UUID. Returns upload metadata.",
    },
  ];

  const chosen = utilities[Math.floor(Math.random() * utilities.length)];
  return `You are a senior Node.js backend engineer. Write a production-ready utility: ${chosen.name}.

Requirements:
${chosen.details}

STRICT RULES:
- Output ONLY raw Node.js/JavaScript code. Zero markdown, zero backticks, zero explanations.
- Production quality: proper error handling, edge cases covered.
- JSDoc comments on all exported functions/classes.
- Use modern ES2022+ syntax (async/await, optional chaining, etc.).
- CommonJS exports (module.exports).
- Code must be complete, between 50–100 lines. DO NOT output fewer than 50 lines.
- Begin immediately with requires/imports — no preamble.`;
}

// ─── HTTP helper ──────────────────────────────────────────────────────────────

function httpsPost(url, payload) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const req  = https.request(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type":   "application/json",
          "Content-Length": Buffer.byteLength(body),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(data) });
          } catch {
            reject(new Error(`Non-JSON response (${res.statusCode}): ${data.slice(0, 300)}`));
          }
        });
      }
    );
    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// ─── Code cleaning & validation ───────────────────────────────────────────────

function stripMarkdown(raw) {
  return raw
    .replace(/^```[\w+#]*\n?/gim, "")
    .replace(/\n?```$/gim, "")
    .trim();
}

function isValidCode(code, task) {
  if (!code || code.trim().length < 200) return false;  // raised from 80 — 9-line output was slipping through
  const lines = code.trim().split("\n").length;
  if (lines < 15) return false;  // enforce minimum line count regardless of char count
  const markers = {
    gfg_python:     /\bdef \w+|\bclass \w+|\bimport \b/,
    gfg_java:       /\bclass \b|\bpublic \b|\bvoid \b|\bint \b/,
    gfg_javascript: /\bfunction\b|\bconst\b|\blet\b|=>/,
    frontend:       /import|from\s+['"]react['"]|useState|useEffect|=>/i,
    backend:        /require\(|module\.exports|async\s+function|const\s+\w+\s*=/,
  };
  // Try exact task key first, then prefix match
  const pattern = markers[task] || Object.entries(markers).find(([k]) => task.startsWith(k.split("_")[0]))?.[1] || /\w/;
  return pattern.test(code);
}

// ─── FIX 3: Core API caller with model cascade + RPM-aware delays ────────────

/**
 * Calls Gemini API, trying each model in MODELS array.
 * On quota/rate-limit error, waits MODEL_SWITCH_DELAY_MS before switching.
 * This handles RPM limits (requests per minute), not just daily quota.
 *
 * @param {string} prompt
 * @param {string} apiKey
 * @param {string} validationTask
 * @returns {Promise<string>} clean code string
 */
async function callGemini(prompt, apiKey, validationTask = "backend") {
  const errors = [];

  for (let modelIdx = 0; modelIdx < MODELS.length; modelIdx++) {
    const model = MODELS[modelIdx];
    const url   = `${GEMINI_BASE}/${model}:generateContent?key=${apiKey}`;

    console.log(`[ai] 🚀 Trying model: ${model}`);

    for (let attempt = 1; attempt <= MAX_RETRIES_PER_MODEL; attempt++) {
      try {
        console.log(`[ai] ${model} attempt ${attempt}/${MAX_RETRIES_PER_MODEL}...`);

        const payload = {
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature:     0.45 + Math.random() * 0.3,
            maxOutputTokens: 1500,
            topP:            0.9,
          },
        };

        const { status, body } = await httpsPost(url, payload);

        // 429 = rate limited / quota exceeded
        if (status === 429) {
          const msg = body?.error?.message || "Rate limited";
          console.warn(`[ai] ⚠️  Quota/rate limit on ${model}: ${msg}`);
          // Don't retry same model — break to next model after cooldown
          errors.push(`${model}: quota/rate limit`);
          break;
        }

        if (status !== 200) {
          const msg = body?.error?.message || JSON.stringify(body).slice(0, 150);
          throw new Error(`HTTP ${status}: ${msg}`);
        }

        const raw = body?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!raw) throw new Error("Empty content in response");

        const code = stripMarkdown(raw);
        if (!isValidCode(code, validationTask)) {
          throw new Error(`Output doesn't look like valid ${validationTask} code (len=${code.length})`);
        }

        console.log(`[ai] ✓ ${model} succeeded — ${code.split("\n").length} lines`);
        return code;

      } catch (err) {
        // Don't retry if it was a quota issue (already broke out above)
        if (err.message?.includes("quota") || err.message?.includes("rate limit")) {
          errors.push(`${model}: ${err.message}`);
          break;
        }

        console.error(`[ai] ${model} attempt ${attempt} failed: ${err.message}`);
        errors.push(`${model} attempt ${attempt}: ${err.message}`);

        if (attempt < MAX_RETRIES_PER_MODEL) {
          console.log(`[ai] Retrying in ${RETRY_DELAY_MS}ms...`);
          await sleep(RETRY_DELAY_MS);
        }
      }
    }

    // Between model switches: wait for RPM window to partially reset
    if (modelIdx < MODELS.length - 1) {
      console.log(`[ai] Waiting ${MODEL_SWITCH_DELAY_MS / 1000}s before trying next model (RPM cooldown)...`);
      await sleep(MODEL_SWITCH_DELAY_MS);
    }
  }

  throw new Error(`All Gemini models failed:\n  ${errors.join("\n  ")}`);
}

// ─── Public task functions ────────────────────────────────────────────────────

/**
 * Generates a GFG POTD solution in a random language.
 */
async function generateGFGSolution(problem, apiKey) {
  const langKeys = Object.keys(GFG_LANGUAGES);
  const langKey  = langKeys[Math.floor(Math.random() * langKeys.length)];
  const lang     = GFG_LANGUAGES[langKey];
  const prompt   = buildGFGPrompt(problem, langKey);

  console.log(`[ai] Solving GFG POTD in ${lang.name}...`);
  const code = await callGemini(prompt, apiKey, `gfg_${langKey}`);
  return { code, langKey, ext: lang.ext, langName: lang.name };
}

/**
 * Generates a frontend React component.
 */
async function generateFrontendComponent(apiKey) {
  console.log("[ai] Generating frontend component...");
  return callGemini(buildFrontendPrompt(), apiKey, "frontend");
}

/**
 * Generates a backend utility/service.
 */
async function generateBackendUtility(apiKey) {
  console.log("[ai] Generating backend utility...");
  return callGemini(buildBackendPrompt(), apiKey, "backend");
}

/**
 * Generates a fallback AI-invented DSA problem + solution
 * (used when GFG fetch fails).
 */
async function generateFallbackDSA(apiKey) {
  const langKeys = Object.keys(GFG_LANGUAGES);
  const langKey  = langKeys[Math.floor(Math.random() * langKeys.length)];
  const lang     = GFG_LANGUAGES[langKey];

  const topics = [
    "sliding window maximum",
    "LRU cache implementation",
    "word break problem",
    "coin change with minimum coins",
    "number of islands using BFS",
    "longest palindromic substring",
    "trapping rain water",
    "find all permutations of a string",
    "trie implementation with insert and search",
    "maximum subarray sum using Kadane's algorithm",
    "binary search on rotated sorted array",
    "merge overlapping intervals",
  ];
  const topic = topics[Math.floor(Math.random() * topics.length)];

  const prompt = `You are an expert competitive programmer. Solve this DSA problem in ${lang.name}: ${topic}.

STRICT RULES:
- Output ONLY raw ${lang.name} code. Zero markdown, zero backticks, zero explanations.
- Add concise inline comments.
- First two comment lines: time complexity and space complexity.
- ${lang.hint}
- Between 30–80 lines. DO NOT output fewer than 30 lines.
- Include the full solution plus at least one example/test at the bottom.
- Begin immediately with the code.`;

  console.log(`[ai] Generating fallback DSA (${topic}) in ${lang.name}...`);
  const code = await callGemini(prompt, apiKey, `gfg_${langKey}`);

  return {
    code,
    langKey,
    ext:      lang.ext,
    langName: lang.name,
    title:    topic.replace(/\b\w/g, (c) => c.toUpperCase()),
  };
}

module.exports = {
  generateGFGSolution,
  generateFrontendComponent,
  generateBackendUtility,
  generateFallbackDSA,
  GFG_LANGUAGES,
};
