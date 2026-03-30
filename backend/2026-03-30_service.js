// Type      : Backend Utility
// Date      : 2026-03-30
// ───────────────────────────────────────────────────────
const jwt = require('jsonwebtoken');

// Ensure JWT_SECRET is defined in the environment for production.
// A fallback is provided for development convenience, but MUST be overridden in production.
const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkey_
