// Type      : Backend Utility
// Date      : 2026-10-15
// ───────────────────────────────────────────────────────
/**
 * Custom error class for application-specific errors.
 * Provides a standardized way to define HTTP status codes and operational status.
 */
class AppError extends Error {
  /**
   * Creates an instance of AppError.
   * @param {string}
