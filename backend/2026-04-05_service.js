// Type      : Backend Utility
// Date      : 2026-04-05
// ───────────────────────────────────────────────────────
const redis = require('redis');

/**
 * @type {redis.RedisClientType | undefined}
 */
let redisClient;

/**
 * Initializes and connects the Redis client.
 * If Redis connection fails, the client will be undefined, and caching operations will be bypassed
