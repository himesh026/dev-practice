// Type      : Backend Utility
// Date      : 2026-05-03
// ───────────────────────────────────────────────────────
const jwt = require('jsonwebtoken');

/**
 * JWT authentication middleware for Express.
 * Verifies a Bearer token from the Authorization header, decodes its payload,
 * and attaches it to `req.user`. If the token is missing, invalid, or expired,
 * it
