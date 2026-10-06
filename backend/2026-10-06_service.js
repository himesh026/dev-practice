// Type      : Backend Utility
// Date      : 2026-10-06
// ───────────────────────────────────────────────────────
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');

/**
 * Validates a single row against the provided schema, performing type conversion and basic checks.
 * @param {object} row - The row object
