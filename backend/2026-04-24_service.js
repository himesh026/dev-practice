// Type      : Backend Utility
// Date      : 2026-04-24
// ───────────────────────────────────────────────────────
const jwt = require('jsonwebtoken');

if (!process.env.JWT_SECRET) {
  console.error('CRITICAL ERROR: JWT_SECRET environment variable is not defined. JWT authentication will fail.');
  // In a production environment, you might want to throw an error here to
