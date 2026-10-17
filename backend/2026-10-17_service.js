// Type      : Backend Utility
// Date      : 2026-10-17
// ───────────────────────────────────────────────────────
const requestCounts = new Map(); // Stores { count: number, firstRequestTime: number, timer: setTimeoutId }

/**
 * Creates an in-memory rate limiting middleware for Express.
 * This middleware tracks request counts per IP address within a sliding window.
 *
