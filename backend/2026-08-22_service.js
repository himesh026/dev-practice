// Type      : Backend Utility
// Date      : 2026-08-22
// ───────────────────────────────────────────────────────
const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

/**
 * @typedef {Object} CSVImportReport
 * @property {number} totalRowsProcessed - Total number of rows read from the CSV.
