// Type      : Backend Utility
// Date      : 2026-05-04
// ───────────────────────────────────────────────────────
const Redis = require('ioredis');

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 */

let _redisClient; // Internal
