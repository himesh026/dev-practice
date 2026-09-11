// Type      : Backend Utility
// Date      : 2026-09-11
// ───────────────────────────────────────────────────────
// src/middleware/validator.js

const {
  StatusCodes
} = require('http-status-codes');

/**
 * @typedef {object} SchemaField
 * @property {string} type - The expected data type ('string', 'number', 'boolean', 'object', 'array').
 * @property {boolean} [required=false] - Whether the field is required.
 */

/**
 * @typedef {object.<string, SchemaField>} ValidationSchema
 */

/**
 * Creates an Express middleware function for validating request bodies against a schema.
 *
 * The middleware checks `req.body` against the provided schema.
 * If validation fails, it sends a 400 Bad Request response with detailed field-level error messages.
 * If validation passes, it calls `next()`.
 *
 * @param {ValidationSchema} schema - The validation schema object.
 *   Each key is a field name, and its value is an object with `type` and `required` properties.
 * @returns {import('express').RequestHandler} An Express middleware function.
 */
function createValidator(schema) {
  return (req, res, next) => {
    const errors = {};
    const body = req.body || {};

    for (const fieldName in schema) {
      if (!Object.prototype.hasOwnProperty.call(schema, fieldName)) {
        continue;
      }

      const fieldSchema = schema[fieldName];
      const fieldValue = body[fieldName];
      const hasValue = Object.prototype.hasOwnProperty.call(body, fieldName);

      if (fieldSchema.required && !hasValue) {
        errors[fieldName] = `${fieldName} is required.`;
        continue;
      }

      if (hasValue && fieldValue === null && fieldSchema.required) {
        errors[fieldName] = `${fieldName} cannot be null.`;
        continue;
      }

      if (hasValue && fieldValue !== undefined && fieldValue !== null) {
        const actualType = Array.isArray(fieldValue) ? 'array' : typeof fieldValue;

        if (actualType !== fieldSchema.type) {
          errors[fieldName] = `${fieldName} must be a ${fieldSchema.type}. Received ${actualType}.`;
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Validation failed',
        errors: errors,
      });
    }

    next();
  };
}

module.exports = {
  createValidator,
};
