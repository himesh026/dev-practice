// Type      : Backend Utility
// Date      : 2026-04-27
// ───────────────────────────────────────────────────────
/**
 * Higher-order function to wrap asynchronous Express route handlers.
 * Catches promise rejections from the handler and passes them to the Express `next` middleware,
 * preventing unhandled promise rejections from crashing the server.
 *
 * @param {Function} fn - The
