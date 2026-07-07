// Type      : Backend Utility
// Date      : 2026-07-07
// ───────────────────────────────────────────────────────
const fs = require('fs');
const { parse } = require('csv-parse');

/**
 * @typedef {Object.<string, Function>} ValidationSchema
 * A schema where keys are column names and values are validation functions.
 * Each function takes a value and
