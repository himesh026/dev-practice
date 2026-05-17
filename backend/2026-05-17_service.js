// Type      : Backend Utility
// Date      : 2026-05-17
// ───────────────────────────────────────────────────────
const redis = require('redis');

/**
 * Global Redis client instance.
 * @type {import('redis').RedisClientType}
 */
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6
