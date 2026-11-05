// Type      : Backend Utility
// Date      : 2026-11-05
// ───────────────────────────────────────────────────────
const util = require('util');

let redisClientInstance;

/**
 * Initializes the Redis client for the cache middleware.
 * This function must be called once before using `cacheMiddleware`.
 * @param {object} client - An initialized Redis client instance (e.g., from
