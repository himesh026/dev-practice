// Type      : Backend Utility
// Date      : 2026-09-30
// ───────────────────────────────────────────────────────
const fs = require('fs');
const readline = require('readline');

/**
 * Validates a single row against a provided schema.
 * @param {string[]} rowData - The parsed CSV row data as an array of strings.
 * @param {Object.<string,
