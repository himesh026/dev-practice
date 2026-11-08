// Type      : Backend Utility
// Date      : 2026-11-08
// ───────────────────────────────────────────────────────
const { request, response, next } = require('express');

/**
 * @typedef {object} FieldSchema
 * @property {string} type - The expected data type ('string', 'number', 'boolean', 'object', 'array').
 * @property {boolean}
