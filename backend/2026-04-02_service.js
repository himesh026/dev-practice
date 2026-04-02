// Type      : Backend Utility
// Date      : 2026-04-02
// ───────────────────────────────────────────────────────
/**
 * Creates an in-memory rate limiting middleware for Express applications.
 * This middleware tracks request counts per IP address within a specified time window
 * and blocks requests that exceed the maximum allowed limit.
 *
 * @param {object} [options={}] - Configuration options
