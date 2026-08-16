// Type      : Backend Utility
// Date      : 2026-08-16
// ───────────────────────────────────────────────────────
const envSchema = [
    {
        key: 'NODE_ENV',
        type: 'string',
        enum: ['development', 'production', 'test'],
        defaultValue: 'development',
        description: 'The current Node.js environment.'
    },
