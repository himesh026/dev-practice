// Type      : Backend Utility
// Date      : 2026-04-29
// ───────────────────────────────────────────────────────
const redis = require('redis');

/**
 * Redis client instance.
 * @type {import('redis').RedisClientType}
 */
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6
