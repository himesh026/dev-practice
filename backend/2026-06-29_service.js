// Type      : Backend Utility
// Date      : 2026-06-29
// ───────────────────────────────────────────────────────
/**
 * Higher-order function to wrap async Express route handlers.
 * Catches promise rejections and passes them to the Express error middleware.
 *
 * @param {function(import('express').Request, import('express').Response, import('express').NextFunction): Promise<
