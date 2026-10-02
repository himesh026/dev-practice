// Type      : Backend Utility
// Date      : 2026-10-02
// ───────────────────────────────────────────────────────
/**
 * Creates an in-memory rate limiting middleware for Express.
 *
 * This middleware tracks the number of requests per IP address within a specified time window.
 * If an IP exceeds the maximum allowed requests, it sends a 429 Too Many Requests response.
 *
