// Type      : Backend Utility
// Date      : 2026-05-12
// ───────────────────────────────────────────────────────
/**
 * Creates an in-memory rate limiting middleware for Express applications.
 *
 * This middleware limits the number of requests from a single IP address within a specified time window.
 * It uses an in-memory Map to store request counts per IP and automatically resets counts
 *
