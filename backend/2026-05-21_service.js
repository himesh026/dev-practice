// Type      : Backend Utility
// Date      : 2026-05-21
// ───────────────────────────────────────────────────────
const fs = require('fs');
const csv = require('csv-parser');

/**
 * Imports data from a CSV file into a database table, validating rows against a schema and using batch inserts.
 *
 * @param {string} filePath - The path to the CSV file
