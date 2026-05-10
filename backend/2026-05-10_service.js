// Type      : Backend Utility
// Date      : 2026-05-10
// ───────────────────────────────────────────────────────
/**
 * Wraps an asynchronous Express route handler to catch promise rejections
 * and pass them to the Express error handling middleware. This prevents
 * the server from crashing on unhandled promise rejections in async routes.
 *
 * @param {function(import('express
