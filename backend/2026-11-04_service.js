// Type      : Backend Utility
// Date      : 2026-11-04
// ───────────────────────────────────────────────────────
const redis = require('redis'); // Assuming redis client library is installed

/**
 * Creates an Express middleware for caching responses in Redis.
 *
 * @param {object} redisClient - An initialized Redis client instance.
 * @param {number} ttlSeconds - Time-to
