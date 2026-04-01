// Type      : Backend Utility
// Date      : 2026-04-01
// ───────────────────────────────────────────────────────
/**
 * @typedef {object} RateLimiterOptions
 * @property {number} windowMs - The duration of the window in milliseconds.
 * @property {number} maxRequests - The maximum number of requests allowed within the window.
 * @property {string} [message="
