// Type      : Backend Utility
// Date      : 2026-05-22
// ───────────────────────────────────────────────────────
const jwt = require('jsonwebtoken');

// Ensure JWT_SECRET is loaded from environment variables for production.
// For demonstration, a placeholder is used. In a real application, use a robust
// configuration management system (e.g., dotenv, config, nconf) and
