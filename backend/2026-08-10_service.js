// Type      : Backend Utility
// Date      : 2026-08-10
// ───────────────────────────────────────────────────────
const jwt = require('jsonwebtoken');

// For production, ensure process.env.JWT_SECRET is set to a strong, unique secret.
// A default fallback is provided for development convenience but is insecure for production.
const DEFAULT_JWT_SECRET = process.env.JWT_SECRET
