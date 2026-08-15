// Type      : Backend Utility
// Date      : 2026-08-15
// ───────────────────────────────────────────────────────
const jwt = require('jsonwebtoken');

/**
 * Creates an Express middleware for JWT authentication.
 * Verifies a Bearer token from the Authorization header, decodes its payload,
 * and attaches it to `req.user`. Returns 401 for missing, expired, or invalid
