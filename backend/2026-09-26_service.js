// Type      : Backend Utility
// Date      : 2026-09-26
// ───────────────────────────────────────────────────────
const fs = require('fs');
const readline = require('readline');

/**
 * Validates a single row against a given schema and applies type conversions.
 * @param {object} row - The parsed row object from CSV (string values).
 * @param {object} schema
