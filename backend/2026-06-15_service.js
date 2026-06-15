// Type      : Backend Utility
// Date      : 2026-06-15
// ───────────────────────────────────────────────────────
const fs = require('fs');
const { parse } = require('csv-parse');

/**
 * Validates a single row against a given schema.
 * @param {object} row - The CSV row object.
 * @param {Array<object>} schema - An array
