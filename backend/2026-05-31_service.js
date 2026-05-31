// Type      : Backend Utility
// Date      : 2026-05-31
// ───────────────────────────────────────────────────────
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

/**
 * Express middleware for JWT authentication and optional role-based access control.
 *
 * This middleware verifies a Bearer token from the Authorization header.
 * If
