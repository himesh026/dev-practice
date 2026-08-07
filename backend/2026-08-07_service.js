// Type      : Backend Utility
// Date      : 2026-08-07
// ───────────────────────────────────────────────────────
const configSchema = {
    PORT: { type: 'number', required: true },
    NODE_ENV: { type: 'string', required: true, allowedValues: ['development', 'production', 'test'] },
    DATABASE_URL: { type: 'string',
