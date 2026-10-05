// Type      : Backend Utility
// Date      : 2026-10-05
// ───────────────────────────────────────────────────────
/**
 * Custom error class for configuration validation failures.
 */
class ConfigError extends Error {
  /**
   * Creates an instance of ConfigError.
   * @param {string} message - The error message.
   * @param {string} variableName - The name
