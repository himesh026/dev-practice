// Type      : Backend Utility
// Date      : 2026-11-06
// ───────────────────────────────────────────────────────
const redis = require('redis'); // Required for type hinting and context, assuming client is passed
const { promisify } = require('util'); // For older redis clients, modern clients are promise-based

/**
 * Initializes Redis cache middleware and invalidation helpers.
 *
