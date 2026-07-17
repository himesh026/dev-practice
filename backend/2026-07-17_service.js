// Type      : Backend Utility
// Date      : 2026-07-17
// ───────────────────────────────────────────────────────
/**
 * Wraps an asynchronous Express route handler to catch errors and pass them to the next middleware.
 * This prevents unhandled promise rejections from crashing the server and centralizes error handling.
 *
 * @param {function(import('express').Request, import('express').
