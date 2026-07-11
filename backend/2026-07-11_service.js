// Type      : Backend Utility
// Date      : 2026-07-11
// ───────────────────────────────────────────────────────
const fs = require('fs');
const csv = require('csv-parser');

/**
 * Validates a single row against a provided schema, performing basic type conversions.
 * @param {Object} row The row object parsed from CSV.
 * @param {Array
