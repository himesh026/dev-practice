// Type      : Backend Utility
// Date      : 2026-06-11
// ───────────────────────────────────────────────────────
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Global Express error handling middleware.
 * Catches errors passed via next(err) and sends a
