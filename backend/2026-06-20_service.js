// Type      : Backend Utility
// Date      : 2026-06-20
// ───────────────────────────────────────────────────────
const redis = require('redis');

/**
 * @type {redis.RedisClientType | null}
 */
let redisClient = null;

/**
 * Initializes and returns a singleton Redis client instance.
 * Handles connection and error logging.
 * @returns {
