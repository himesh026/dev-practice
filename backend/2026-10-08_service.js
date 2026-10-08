// Type      : Backend Utility
// Date      : 2026-10-08
// ───────────────────────────────────────────────────────
const fs = require('fs');
const csv = require('csv-parser');

/**
 * @typedef {Object.<string, Function>} CsvSchema
 *   A schema object where keys are expected CSV column headers and values are validation functions.
 *   Each validation function
