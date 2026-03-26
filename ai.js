/**
 * scripts/ai.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Core Gemini API integration layer.
 *
 * Responsibilities:
 *   • Build task-specific prompts (DSA / frontend / backend)
 *   • Call Gemini 2.0 Flash with retries + exponential backoff
 *   • Strip all markdown formatting from responses
 *   • Validate output looks like real code before returning
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use strict";

const https = require("https");

const MAX_RETRIES  = 3;
const BASE_DELAY   = 2000; // ms — doubles per retry

// ─── Language config ──────────────────────────────────────────────────────────

const GFG_LANGUAGES = {
  python: {
    name: "Python",
    ext: "py",
    hint: "Use clean Pythonic style. No classes unless needed.",
  },
  java: {
    name: "Java",
    ext: "java",
    hint: "Wrap logic in a Solution class with a main method for testing.",
  },
  javascript: {
    name: "JavaScript",
    ext: "js",
    hint: "Use modern ES2022+ syntax. Arrow functions where appropriate.",
  },
};

// ─── Prompt Builders ─────────────────────────────────────────────────────────

/**
 * Builds the prompt for GFG POTD solving.
 * @param {object} problem  - { title, statement, difficulty, tags, examples, constraints }
 * @param {string} langKey  - "python" | "java" | "javascript"
 */
function buildGFGPrompt(problem, langKey) {
  const lang = GFG_LANGUAGES[langKey];
  return `You are an expert competitive programmer. Solve this problem in ${lang.name}.

Problem: ${problem.title}
Difficulty: ${problem.difficulty || "Medium"}
Tags: ${problem.tags || "DSA"}

Description:
${problem.statement}

${problem.constraints ? `Constraints:\n${problem.constraints}` : ""}
${problem.examples    ? `\nExamples:\n${problem.examples}`    : ""}

STRICT RULES:
- Output ONLY raw ${lang.name} code. Zero markdown, zero backticks, zero explanations.
- Add concise inline comments explaining key decisions.
- First comment line: Time complexity, second: Space complexity.
- ${lang.hint}
- Code must be complete, correct, and under 80 lines.
- Begin immediately with the code — no preamble.`;
}

/**
 * Randomly picks one of many specific frontend component prompts.
 * Returns the prompt string.
 */
function buildFrontendPrompt() {
  const components = [
    {
      name: "animated toast notification system",
      details:
        "A React component that shows slide-in toast messages (success/error/info/warning). Supports auto-dismiss after 3s and manual close. Uses useState + useEffect. Clean minimal styling with CSS-in-JS or inline styles.",
    },
    {
      name: "dark/light theme toggle with persistence",
      details:
        "A React hook (useTheme) + toggle button component. Persists preference to localStorage. Applies theme via CSS variables on :root. Smooth transition animation on toggle.",
    },
    {
      name: "responsive navbar with mobile hamburger menu",
      details:
        "A React functional component. Collapses to hamburger on mobile. Smooth slide-down animation for mobile menu. Links array passed as props. Active link highlighting.",
    },
    {
      name: "infinite scroll list component",
      details:
        "A React component using IntersectionObserver for infinite scroll. Accepts a fetchMore function prop. Shows skeleton loaders while fetching. Handles errors gracefully.",
    },
    {
      name: "file drag-and-drop upload zone",
      details:
        "A React component with drag-over visual feedback. Accepts file type restrictions via props. Shows file preview for images. Displays file name + size for non-images.",
    },
    {
      name: "multi-step form wizard",
      details:
        "A React multi-step form with step indicators. Validates each step before allowing next. Stores partial data in state. Final step shows summary before submit.",
    },
    {
      name: "countdown timer component",
      details:
        "A React countdown timer that accepts a target date prop. Displays days, hours, minutes, seconds with flip-card animation. Calls an onExpire callback prop when done.",
    },
    {
      name: "star rating widget",
      details:
        "A React reusable rating component. Hover highlights stars. Supports half-star ratings. Controlled and uncontrolled modes via props. Accessible with ARIA labels.",
    },
    {
      name: "real-time search filter component",
      details:
        "A React component with debounced search input (300ms). Filters a list passed as prop. Highlights matching text in results. Shows 'No results' state.",
    },
    {
      name: "animated progress stepper",
      details:
        "A React step progress indicator. Animated connector line fills as steps complete. Each step has icon, title, optional description. Supports horizontal and vertical layout via prop.",
    },
    {
      name: "copy-to-clipboard button with feedback",
      details:
        "A React component wrapping any content. Clicking copies text to clipboard via navigator.clipboard. Shows a checkmark icon for 2s after copy. Resets back to copy icon.",
    },
    {
      name: "modal dialog with focus trap",
      details:
        "A React accessible modal. Traps keyboard focus inside modal. Closes on backdrop click or Escape key. Smooth fade+scale animation. Uses React Portal to append to body.",
    },
  ];

  const chosen = components[Math.floor(Math.random() * components.length)];

  return `You are a senior React developer. Create a production-ready React component: ${chosen.name}.

Component requirements:
${chosen.details}

STRICT RULES:
- Output ONLY raw React/JSX code. Zero markdown, zero backticks, zero explanations.
- Use functional components with hooks only.
- Modern React 18+ patterns.
- PropTypes or JSDoc comments for all props.
- Inline styles or a styled approach — no external CSS file imports.
- Named export AND default export at the bottom.
- Code must be complete, self-contained, and under 100 lines.
- Begin immediately with imports — no preamble, no file path comment.`;
}

/**
 * Randomly picks one of many specific backend utility prompts.
 * Returns the prompt string.
 */
function buildBackendPrompt() {
  const utilities = [
    {
      name: "JWT authentication middleware for Express",
      details:
        "Verifies Bearer token from Authorization header. Decodes payload and attaches to req.user. Returns 401 for missing/expired/invalid token. Supports optional role-based access via allowedRoles array param.",
    },
    {
      name: "request rate limiter middleware",
      details:
        "An in-memory rate limiter for Express. Configurable: windowMs, maxRequests, message. Uses a Map to track request counts per IP. Cleans up expired windows automatically.",
    },
    {
      name: "async error handler wrapper",
      details:
        "A higher-order function that wraps async Express route handlers. Catches promise rejections and passes them to next(err). Also includes a global Express error handler middleware with proper HTTP status codes.",
    },
    {
      name: "input validation middleware using Zod",
      details:
        "A factory function createValidator(schema) that returns Express middleware. Validates req.body against a Zod schema. Returns structured 400 error with field-level messages on failure.",
    },
    {
      name: "paginated query helper for MongoDB/Mongoose",
      details:
        "A utility function paginateQuery(Model, query, options). Accepts page, limit, sort, populate. Returns { data, total, page, totalPages, hasNext, hasPrev }.",
    },
    {
      name: "Redis-based cache middleware for Express",
      details:
        "Middleware factory cacheMiddleware(ttlSeconds). Checks Redis for cached response by URL key. On miss, intercepts res.json to store response before sending. Includes cache invalidation helper.",
    },
    {
      name: "file upload handler with Sharp image processing",
      details:
        "An Express route handler for image uploads using multer + sharp. Resizes to max 1200px width. Generates WebP thumbnail at 300px. Returns { original, thumbnail } URLs.",
    },
    {
      name: "email service module using Nodemailer",
      details:
        "A clean EmailService class with sendWelcome, sendPasswordReset, sendNotification methods. Uses template strings for HTML emails. Supports retry on transient failures. Environment-configured SMTP.",
    },
    {
      name: "CSV parser and database import utility",
      details:
        "A Node.js utility that reads a CSV file, validates rows against a schema, batches inserts into a database, and reports success/failure counts. Uses streams to handle large files without memory overflow.",
    },
    {
      name: "WebSocket event handler with rooms support",
      details:
        "A Socket.io handler module. Manages join/leave room events. Broadcasts messages to room members. Tracks online users per room in a Map. Handles disconnect cleanup.",
    },
    {
      name: "API response formatter utility",
      details:
        "A utility module with success(res, data, message, statusCode) and error(res, message, statusCode, errors) functions. Enforces consistent API response shape across the entire app.",
    },
    {
      name: "environment config validator",
      details:
        "A startup module that validates all required env variables are present and correctly typed. Throws descriptive errors on startup if any are missing. Exports a typed config object for use throughout the app.",
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
- Code must be complete and under 100 lines.
- Begin immediately with requires/imports — no preamble, no file path comment.`;
}

// ─── HTTP Utilities ───────────────────────────────────────────────────────────

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

// ─── Code Cleaning & Validation ──────────────────────────────────────────────

/**
 * Strips all markdown code fences and any leading/trailing blank lines.
 */
function stripMarkdown(raw) {
  return raw
    .replace(/^```[\w+#]*\n?/gim, "")
    .replace(/\n?```$/gim, "")
    .trim();
}

/**
 * Returns true if the string looks like real code (not an error message or prose).
 */
function isValidCode(code, task) {
  if (!code || code.trim().length < 80) return false;

  const markers = {
    gfg_python:     /\bdef \w+|\bclass \w+|\bimport \b/,
    gfg_java:       /\bclass \b|\bpublic \b|\bvoid \b|\bint \b/,
    gfg_javascript: /\bfunction\b|\bconst\b|\blet\b|\=>/,
    frontend:       /import React|from ['"]react['"]|=>|useState|useEffect/i,
    backend:        /require\(|module\.exports|async\s+function|const\s+\w+\s*=/,
  };

  const key = Object.keys(markers).find((k) => task.startsWith(k.split("_")[0]));
  const pattern = markers[task] || markers[key] || /\w/;
  return pattern.test(code);
}

// ─── Main API Call ────────────────────────────────────────────────────────────

/**
 * Calls Gemini API with the given prompt, retries on failure.
 *
 * @param {string} prompt
 * @param {string} apiKey
 * @param {string} validationTask - key for isValidCode check
 * @returns {Promise<string>} clean code string
 */
const MODELS = ["gemini-2.0-flash", "gemini-2.0-flash-001", "gemini-2.5-pro"];

async function callGemini(prompt, apiKey, validationTask = "backend") {
  for (const model of MODELS) {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

    console.log(`\n[ai] 🚀 Trying model: ${model}`);

    const payload = {
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.45 + Math.random() * 0.35,
        maxOutputTokens: 1500,
        topP: 0.9,
      },
    };

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`[ai] ${model} attempt ${attempt}/${MAX_RETRIES}...`);

        const { status, body } = await httpsPost(url, payload);

        if (status !== 200) {
          const errMsg =
            body?.error?.message || JSON.stringify(body).slice(0, 200);

          // 👉 If quota / 429 → skip to next model immediately
          if (status === 429) {
            console.log(`[ai] ⚠️ Quota hit for ${model}, switching model...`);
            break;
          }

          throw new Error(`API status ${status}: ${errMsg}`);
        }

        const raw = body?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!raw) throw new Error("Empty content in Gemini response");

        const code = stripMarkdown(raw);

        if (!isValidCode(code, validationTask)) {
          throw new Error(
            `Invalid ${validationTask} code (len=${code.length})`,
          );
        }

        console.log(
          `[ai] ✅ Success with ${model} (${code.split("\n").length} lines)`,
        );
        return code;
      } catch (err) {
        console.error(
          `[ai] ${model} attempt ${attempt} failed: ${err.message}`,
        );

        if (attempt < MAX_RETRIES) {
          const delay = BASE_DELAY * attempt;
          console.log(`[ai] Retrying in ${delay}ms...`);
          await sleep(delay);
        } else {
          console.log(`[ai] ❌ ${model} exhausted, trying next model...`);
        }
      }
    }
  }

  throw new Error("All Gemini models failed");
}

// ─── Public Task Functions ────────────────────────────────────────────────────

/**
 * Generates a GFG POTD solution in a random language.
 * @param {object} problem
 * @param {string} apiKey
 * @returns {Promise<{ code, langKey, ext, langName }>}
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
 * @param {string} apiKey
 * @returns {Promise<string>} JSX code
 */
async function generateFrontendComponent(apiKey) {
  console.log("[ai] Generating frontend component...");
  const prompt = buildFrontendPrompt();
  return callGemini(prompt, apiKey, "frontend");
}

/**
 * Generates a backend utility/service.
 * @param {string} apiKey
 * @returns {Promise<string>} JS code
 */
async function generateBackendUtility(apiKey) {
  console.log("[ai] Generating backend utility...");
  const prompt = buildBackendPrompt();
  return callGemini(prompt, apiKey, "backend");
}

/**
 * Generates a fallback AI-invented DSA problem + solution
 * (used when GFG fetch fails).
 * @param {string} apiKey
 * @returns {Promise<{ code, langKey, ext, langName, title }>}
 */
async function generateFallbackDSA(apiKey) {
  const langKeys = Object.keys(GFG_LANGUAGES);
  const langKey  = langKeys[Math.floor(Math.random() * langKeys.length)];
  const lang     = GFG_LANGUAGES[langKey];

  const topics = [
    "sliding window maximum", "LRU cache implementation", "word break problem",
    "coin change with minimum coins", "number of islands (BFS)", "longest palindromic substring",
    "trapping rain water", "serialize and deserialize binary tree",
    "find all permutations of a string", "trie implementation with insert and search",
  ];
  const topic = topics[Math.floor(Math.random() * topics.length)];

  const prompt = `You are an expert competitive programmer. Solve this DSA problem in ${lang.name}: ${topic}.

STRICT RULES:
- Output ONLY raw ${lang.name} code. Zero markdown, zero backticks, zero explanations.
- Add concise inline comments.
- First two comment lines: time complexity and space complexity.
- ${lang.hint}
- Under 80 lines. Begin immediately with the code.`;

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
