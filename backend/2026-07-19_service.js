// Type      : Backend Utility
// Date      : 2026-07-19
// ───────────────────────────────────────────────────────
const fs = require('fs');
const { parse } = require('csv-parse');

const mockDbClient = {
    /**
     * Simulates a batch insert operation into a database.
     * @param {string} tableName - The name of the table to insert
