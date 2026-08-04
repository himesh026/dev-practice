// Type      : Backend Utility
// Date      : 2026-08-04
// ───────────────────────────────────────────────────────
const fs = require('fs');
const { parse } = require('csv-parser');

/**
 * Validates a single row against a given schema.
 * @param {Object.<string, string>} row - The row data from the CSV.
 * @param {Object.<
