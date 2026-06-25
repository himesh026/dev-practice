// Type      : Backend Utility
// Date      : 2026-06-25
// ───────────────────────────────────────────────────────
const { createClient } = require('redis');

/**
 * Global Redis client instance.
 * @type {import('redis').RedisClientType | null}
 */
let redisClient = null;

/**
 * Initializes the Redis client for the cache middleware.
 * This
