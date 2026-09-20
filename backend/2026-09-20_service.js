// Type      : Backend Utility
// Date      : 2026-09-20
// ───────────────────────────────────────────────────────
const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { Transform } = require('stream');
const { pipeline } = require('stream/promises');

/**
 * Validates a single row against a
