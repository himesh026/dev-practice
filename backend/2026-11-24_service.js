// Type      : Backend Utility
// Date      : 2026-11-24
// ───────────────────────────────────────────────────────
const redis = require('redis');

// Global Redis client instance
let redisClient;

/**
 * Initializes the Redis client. This function should be called once at application startup.
 * @async
 * @param {object} [options] - Redis client options.
 *
