// Type      : Backend Utility
// Date      : 2026-10-22
// ───────────────────────────────────────────────────────
const fs = require('fs');
const { pipeline } = require('stream/promises');
const csvParser = require('csv-parser');
const { z } = require('zod');

/**
 * Parses a CSV file, validates rows against a Zod schema
