// Type      : Backend Utility
// Date      : 2026-10-07
// ───────────────────────────────────────────────────────
const fs = require('fs');
const csv = require('csv-parser');

/**
 * Imports data from a CSV file into a database, validating rows against a schema and performing batched inserts.
 *
 * @param {string} filePath - The absolute path to the CSV file
