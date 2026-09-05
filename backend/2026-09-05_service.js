// Type      : Backend Utility
// Date      : 2026-09-05
// ───────────────────────────────────────────────────────
const jwt = require('jsonwebtoken');

/**
 * Creates an Express middleware for JWT authentication and optional role-based access control.
 * Verifies a Bearer token from the Authorization header, decodes the payload,
 * and attaches it to `req.user`. Handles missing,
