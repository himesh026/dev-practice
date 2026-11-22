// Type      : Backend Utility
// Date      : 2026-11-22
// ───────────────────────────────────────────────────────
const jwt = require('jsonwebtoken');

/**
 * Creates an Express middleware for JWT authentication.
 *
 * This middleware verifies a Bearer token from the Authorization header,
 * decodes its payload, and attaches it to `req.user`.
 * It handles missing, invalid
