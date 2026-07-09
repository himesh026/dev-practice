// Type      : Backend Utility
// Date      : 2026-07-09
// ───────────────────────────────────────────────────────
const fs = require('fs');
const readline = require('readline');
const path = require('path');

/**
 * @typedef {object} SchemaField
 * @property {string} name - The name of the field (maps to CSV header).
 * @property {'
