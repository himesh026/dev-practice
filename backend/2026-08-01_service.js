// Type      : Backend Utility
// Date      : 2026-08-01
// ───────────────────────────────────────────────────────
/**
 * Custom error class for operational errors.
 * These errors are created by us and we know how to handle them (e.g., invalid input, resource not found).
 */
class AppError extends Error {
  /**
   * Creates an instance of AppError.
