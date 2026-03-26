/**
 * scripts/gfg.js
 * ─────────────────────────────────────────────────────────────────────────────
 * GeeksForGeeks Problem of the Day (POTD) fetcher.
 *
 * Strategy:
 *   1. Try GFG public REST API (primary)
 *   2. Try GFG GraphQL endpoint (secondary)
 *   3. Throw — caller falls back to AI-generated DSA problem
 *
 * Returns a normalized problem object:
 *   { title, statement, difficulty, tags, examples, constraints }
 * ─────────────────────────────────────────────────────────────────────────────
 */

"use strict";

const https = require("https");

// ─── HTTP helper ─────────────────────────────────────────────────────────────

function request(url, options = {}) {
  return new Promise((resolve, reject) => {
    const req = https.request(
      url,
      {
        method:  options.method  || "GET",
        headers: {
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 " +
            "(KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
          Accept:           "application/json, text/plain, */*",
          "Accept-Language":"en-US,en;q=0.9",
          Referer:          "https://www.geeksforgeeks.org/",
          Origin:           "https://www.geeksforgeeks.org",
          ...(options.headers || {}),
        },
      },
      (res) => {
        let data = "";
        res.on("data", (c) => (data += c));
        res.on("end", () =>
          resolve({ status: res.statusCode, raw: data })
        );
      }
    );
    req.on("error", reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

/**
 * Strips HTML tags and decodes basic entities.
 * @param {string} str
 */
function stripHtml(str) {
  if (!str) return "";
  return str
    .replace(/<[^>]*>/g, " ")
    .replace(/&lt;/g,   "<")
    .replace(/&gt;/g,   ">")
    .replace(/&amp;/g,  "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g,  "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s{2,}/g, " ")
    .trim();
}

/**
 * Normalizes a raw GFG problem object into a consistent shape.
 */
function normalize(raw) {
  const title =
    raw.problem_name  ||
    raw.title         ||
    raw.problemName   ||
    raw.name          ||
    "Unknown Problem";

  const difficulty =
    raw.difficulty       ||
    raw.difficulty_level ||
    raw.level            ||
    "Medium";

  const tags = (() => {
    if (Array.isArray(raw.tags)) {
      return raw.tags.map((t) => (typeof t === "string" ? t : t.name || "")).join(", ");
    }
    return raw.topic_tags || raw.tags || "";
  })();

  const statement =
    raw.problem_statement ||
    raw.description       ||
    raw.body              ||
    raw.content           ||
    raw.statement         ||
    "";

  const constraints =
    raw.constraints       ||
    raw.constraint        ||
    "";

  // Examples / sample cases
  let examples = "";
  const rawEx =
    raw.examples     ||
    raw.sample_cases ||
    raw.sampleCases  ||
    raw.testcases    ||
    [];

  if (Array.isArray(rawEx) && rawEx.length > 0) {
    examples = rawEx
      .slice(0, 2)
      .map(
        (ex, i) =>
          `Example ${i + 1}:\n` +
          `Input: ${stripHtml(String(ex.input || ex.inputData || ex.in || ""))}\n` +
          `Output: ${stripHtml(String(ex.output || ex.outputData || ex.out || ""))}`
      )
      .join("\n\n");
  }

  return {
    title:       title.trim(),
    difficulty:  difficulty.toString().trim(),
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

  const json = JSON.parse(raw);
  const data = json?.problem_of_the_day || json?.data || json;

  if (!data || (!data.problem_name && !data.title)) {
    throw new Error("REST API: no problem data in response");
  }

  console.log("[gfg] ✓ REST API succeeded");
  return normalize(data);
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
      method:  "POST",
      headers: { "Content-Type": "application/json", "Content-Length": Buffer.byteLength(body) },
      body,
    }
  );

  if (status !== 200) throw new Error(`GraphQL returned ${status}`);

  const json   = JSON.parse(raw);
  const problem = json?.data?.potd?.problem;
  if (!problem) throw new Error("GraphQL: no potd.problem in response");

  console.log("[gfg] ✓ GraphQL succeeded");
  return normalize(problem);
}

// ─── Strategy 3: GFG public problem-list API ─────────────────────────────────

async function fetchViaPublicList() {
  console.log("[gfg] Trying public problem list API...");

  const { status, raw } = await request(
    "https://practiceapi.geeksforgeeks.org/api/v1/problems-of-day/today/"
  );
  if (status !== 200) throw new Error(`Public list API returned ${status}`);

  const json = JSON.parse(raw);
  const data = json?.problem || json?.data?.problem || json;
  if (!data?.title && !data?.problem_name) throw new Error("Public list API: no problem");

  console.log("[gfg] ✓ Public list API succeeded");
  return normalize(data);
}

// ─── Main export ─────────────────────────────────────────────────────────────

/**
 * Fetches GFG POTD using multiple strategies in sequence.
 * Throws if all strategies fail (caller should use AI fallback).
 *
 * @returns {Promise<{ title, statement, difficulty, tags, examples, constraints }>}
 */
async function fetchGFGPotd() {
  const strategies = [fetchViaRestAPI, fetchViaGraphQL, fetchViaPublicList];

  for (const strategy of strategies) {
    try {
      const problem = await strategy();

      // Minimal validation: must have title and some statement
      if (!problem.title || problem.statement.length < 20) {
        throw new Error("Problem data too sparse");
      }

      return problem;
    } catch (err) {
      console.warn(`[gfg] Strategy failed: ${err.message}`);
    }
  }

  throw new Error("All GFG fetch strategies failed");
}

module.exports = { fetchGFGPotd };
