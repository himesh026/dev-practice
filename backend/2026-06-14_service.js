// Type      : Backend Utility
// Date      : 2026-06-14
// ───────────────────────────────────────────────────────
const http = require('http'); // Used for getting status messages, though we'll mostly use codes directly.

/**
 * Custom Error class for API errors with a specific HTTP status code.
 * This allows for creating errors that carry specific HTTP semantics.
 */
class ApiError
