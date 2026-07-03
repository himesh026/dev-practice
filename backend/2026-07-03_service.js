// Type      : Backend Utility
// Date      : 2026-07-03
// ───────────────────────────────────────────────────────
const { URL } = require('url');

/**
 * @typedef {object} EnvVarSchemaEntry
 * @property {string} type - The expected type of the environment variable ('string', 'number', 'boolean', 'url', 'json').
 * @property {boolean
