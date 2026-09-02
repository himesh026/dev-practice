// Type      : Backend Utility
// Date      : 2026-09-02
// ───────────────────────────────────────────────────────
const process = require('process');

/**
 * @typedef {object} EnvVarSchema
 * @property {string} key - The environment variable key (e.g., 'PORT').
 * @property {'string' | 'number' | 'boolean'} type - The expected
