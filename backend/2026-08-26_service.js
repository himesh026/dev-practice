// Type      : Backend Utility
// Date      : 2026-08-26
// ───────────────────────────────────────────────────────
const { createClient } = require('redis');
const util = require('util');

/**
 * Creates an Express.js middleware for Redis-based caching.
 * Caches successful GET responses by URL.
 *
 * @param {object} redisClient - An
