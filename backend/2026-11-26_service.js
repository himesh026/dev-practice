// Type      : Backend Utility
// Date      : 2026-11-26
// ───────────────────────────────────────────────────────
const util = require('util');

/**
 * A custom error class for structured HTTP errors.
 * Extends the native Error class to include an HTTP status code and an operational flag.
 *
 * @class HttpError
 * @extends Error
 */
class HttpError extends Error
