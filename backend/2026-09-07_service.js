// Type      : Backend Utility
// Date      : 2026-09-07
// ───────────────────────────────────────────────────────
const jwt = require('jsonwebtoken');

/**
 * JWT authentication middleware for Express.
 * Verifies a Bearer token from the Authorization header, decodes the payload,
 * and attaches it to `req.user`. Supports optional role-based access control.
 *
 * @param
