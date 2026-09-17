// Type      : Backend Utility
// Date      : 2026-09-17
// ───────────────────────────────────────────────────────
/**
 * Custom error class for operational errors.
 * These errors are expected and can be handled gracefully, often resulting in specific HTTP status codes.
 *
 * @extends Error
 */
class AppError extends Error {
  /**
   * Creates an instance of AppError.
