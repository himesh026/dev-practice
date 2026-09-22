// Type      : Backend Utility
// Date      : 2026-09-22
// ───────────────────────────────────────────────────────
/**
 * A utility function to paginate queries for Mongoose-like models.
 * This helper abstracts the common pattern of fetching a subset of data
 * along with total count and pagination metadata.
 *
 * @param {object} Model The Mongoose Model or any object
