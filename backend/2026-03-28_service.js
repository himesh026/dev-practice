// Type      : Backend Utility
// Date      : 2026-03-28
// ───────────────────────────────────────────────────────
/**
 * Custom error class for configuration validation failures.
 */
class ConfigError extends Error {
  /**
   * Creates an instance of ConfigError.
   * @param {string} message - The error message.
   */
  constructor(message) {
