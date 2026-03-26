/**
 * scripts/gfg.js
 * ─────────────────────────────────────────────────────────────────────────────
 * GeeksForGeeks Problem of the Day (POTD) fetcher.
 *
 * Strategy:
 *   1. Try GFG public REST API  (primary)
 *   2. Try GFG GraphQL endpoint (secondary)
 *   3. Try GFG v1 API           (tertiary)
 *   4. Throw — caller falls back to AI-generated DSA problem
 *
 * Returns a normalized problem object:
 *   { title, statement, difficulty, tags, examples, constraints }
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use strict";

const https = require("https");

// ─── HTTP helper ──────────────────────────────────────────────────────────────

function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      {
        method: options.method || "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
            "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Accept: "application/json, text/plain, */*",
          "Accept-Language": "en-US,en;q=0.9",
          Referer: "https://www.geeksforgeeks.org/",
          Origin: "https://www.geeksforgeeks.org",
          ...(options.headers || {}),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () => resolve({ status: res.statusCode, raw: data }));
      }
    );
    req.on("error", reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

// ─── FIX 1: stripHtml always coerces input to string first ────────────────────
/**
 * Strips HTML tags and decodes basic entities.
 * BUGFIX: Coerces any non-string input (number, object, null) to string
 * before calling .replace() — previously threw "str.replace is not a function"
 * when the GFG API returned a numeric or object field.
 *
 * @param {*} val  - anything; will be safely coerced to string
 * @returns {string}
 */
function stripHtml(val) {
  // Safely convert anything to a plain string
  if (val === null || val === undefined) return "";
  const str = typeof val === "string" ? val : String(val);

  return str
    .replace(/<[^>]*>/g, " ")
    .replace(/&lt;/g,    "<")
    .replace(/&gt;/g,    ">")
    .replace(/&amp;/g,   "&")
    .replace(/&quot;/g,  '"')
    .replace(/&#39;/g,   "'")
    .replace(/&nbsp;/g,  " ")
    .replace(/\s{2,}/g,  " ")
    .trim();
}

// ─── Normalizer ───────────────────────────────────────────────────────────────

/**
 * Normalizes a raw GFG problem object into a consistent shape.
 * Every field is defensively coerced — no more "x.replace is not a function".
 */
function normalize(raw) {
  // Safely resolve a string field from multiple candidate keys
  const str = (...candidates) => {
    for (const v of candidates) {
      if (v !== null && v !== undefined && v !== "") return String(v);
    }
    return "";
  };

  const title = str(
    raw.problem_name,
    raw.title,
    raw.problemName,
    raw.name,
    "Unknown Problem"
  );

  const difficulty = str(
    raw.difficulty,
    raw.difficulty_level,
    raw.level,
    "Medium"
  );

  // Tags can be an array of strings, array of objects, or a plain string
  let tags = "";
  if (Array.isArray(raw.tags)) {
    tags = raw.tags
      .map((t) => (typeof t === "string" ? t : String(t?.name || "")))
      .filter(Boolean)
      .join(", ");
  } else {
    tags = str(raw.topic_tags, raw.tags);
  }

  const statement = str(
    raw.problem_statement,
    raw.description,
    raw.body,
    raw.content,
    raw.statement
  );

  const constraints = str(raw.constraints, raw.constraint);

  // Examples / sample cases
  let examples = "";
  const rawEx =
    raw.examples ||
    raw.sample_cases ||
    raw.sampleCases ||
    raw.testcases ||
    [];

  if (Array.isArray(rawEx) && rawEx.length > 0) {
    examples = rawEx
      .slice(0, 2)
      .map((ex, i) => {
        const inp = stripHtml(ex.input  ?? ex.inputData  ?? ex.in  ?? "");
        const out = stripHtml(ex.output ?? ex.outputData ?? ex.out ?? "");
        return `Example ${i + 1}:\nInput: ${inp}\nOutput: ${out}`;
      })
      .join("\n\n");
  }

  return {
    title:       stripHtml(title),
    difficulty:  stripHtml(difficulty),
    tags:        stripHtml(tags),
    statement:   stripHtml(statement),
    constraints: stripHtml(constraints),
    examples,
  };
}

// ─── Strategy 1: GFG REST API ─────────────────────────────────────────────────

async function fetchViaRestAPI() {
  console.log("[gfg] Trying REST API...");

  const { status, raw } = await request(
    "https://practiceapi.geeksforgeeks.org/api/vr/problems-of-day/problem/today/"
  );

  if (status !== 200) throw new Error(`REST API returned ${status}`);

  let json;
  try {
    json = JSON.parse(raw);
  } catch {
    throw new Error(`REST API: invalid JSON response`);
  }

  const data = json?.problem_of_the_day || json?.data || json;

  if (!data || typeof data !== "object") {
    throw new Error("REST API: response is not an object");
  }
  if (!data.problem_name && !data.title && !data.name) {
    throw new Error(`REST API: no problem name found. Keys: ${Object.keys(data).slice(0, 8).join(", ")}`);
  }

  const normalized = normalize(data);
  console.log("[gfg] ✓ REST API succeeded");
  return normalized;
}

// ─── Strategy 2: GFG GraphQL ─────────────────────────────────────────────────

async function fetchViaGraphQL() {
  console.log("[gfg] Trying GraphQL...");

  const today = new Date().toISOString().slice(0, 10);

  const gqlQuery = {
    query: `
      query potdQuery($date: String!) {
        potd(date: $date) {
          problem {
            title
            difficulty
            tags { name }
            body
            constraints
            examples { input output }
          }
        }
      }
    `,
    variables: { date: today },
  };

  const body = JSON.stringify(gqlQuery);
  const { status, raw } = await request(
    "https://practiceapi.geeksforgeeks.org/api/vr/graphql/",
    {
      method: "POST",
      headers: {
        "Content-Type":   "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
      body,
    }
  );

  if (status !== 200) throw new Error(`GraphQL returned ${status}`);

  let json;
  try {
    json = JSON.parse(raw);
  } catch {
    throw new Error("GraphQL: invalid JSON response");
  }

  const problem = json?.data?.potd?.problem;
  if (!problem) throw new Error("GraphQL: no potd.problem in response");

  console.log("[gfg] ✓ GraphQL succeeded");
  return normalize(problem);
}

// ─── Strategy 3: GFG v1 API ───────────────────────────────────────────────────

async function fetchViaV1API() {
  console.log("[gfg] Trying v1 API...");

  const { status, raw } = await request(
    "https://practiceapi.geeksforgeeks.org/api/v1/problems-of-day/today/"
  );
  if (status !== 200) throw new Error(`v1 API returned ${status}`);

  let json;
  try {
    json = JSON.parse(raw);
  } catch {
    throw new Error("v1 API: invalid JSON");
  }

  const data = json?.problem || json?.data?.problem || json;
  if (!data || typeof data !== "object") throw new Error("v1 API: no problem object");
  if (!data.title && !data.problem_name) throw new Error("v1 API: no problem name found");

  console.log("[gfg] ✓ v1 API succeeded");
  return normalize(data);
}

// ─── Main export ──────────────────────────────────────────────────────────────

/**
 * Fetches GFG POTD using multiple strategies in sequence.
 * Throws if all strategies fail (caller should use AI fallback).
 *
 * @returns {Promise<{ title, statement, difficulty, tags, examples, constraints }>}
 */
async function fetchGFGPotd() {
  const strategies = [fetchViaRestAPI, fetchViaGraphQL, fetchViaV1API];

  for (const strategy of strategies) {
    try {
      const problem = await strategy();

      // Minimal sanity check: need a title and at least a stub of statement
      if (!problem.title || problem.title === "Unknown Problem") {
        throw new Error("Problem title missing or generic");
      }
      if (problem.statement.length < 10) {
        throw new Error(`Statement too short: "${problem.statement}"`);
      }

      return problem;
    } catch (err) {
      console.warn(`[gfg] Strategy failed: ${err.message}`);
    }
  }

  throw new Error("All GFG fetch strategies failed");
}

module.exports = { fetchGFGPotd };
