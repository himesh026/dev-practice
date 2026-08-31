// Type      : Backend Utility
// Date      : 2026-08-31
// ───────────────────────────────────────────────────────
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser'); // Assuming 'csv-parser' is installed via npm

/**
 * Validates a single row against a given schema.
 * @param {object} row
