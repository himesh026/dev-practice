// Type      : Backend Utility
// Date      : 2026-10-11
// ───────────────────────────────────────────────────────
const ipCounts = new Map();

/**
 * Creates an in-memory rate limiting middleware for Express.
 *
 * @param {object} options - Configuration options for the rate limiter.
 * @param {number} [options.windowMs=6000
