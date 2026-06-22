// Type      : Backend Utility
// Date      : 2026-06-22
// ───────────────────────────────────────────────────────
/**
 * @typedef {object} SchemaField
 * @property {string} type - The expected type of the field (e.g., 'string', 'number', 'boolean').
 * @property {boolean} [required=false] - Whether the field is required.
 */

/**
 * @typedef {object.<string, SchemaField>} ValidationSchema
 */

/**
 * Creates an Express middleware for validating request body against a schema.
 *
 * @param {ValidationSchema} schema - The validation schema object.
 * @returns {import('express').RequestHandler} An Express middleware function.
 */
function createValidator(schema) {
  return (req, res, next) => {
    const errors = {};
    const body = req.body || {};

    for (const fieldName in schema) {
      if (!schema.hasOwnProperty(fieldName)) {
        continue;
      }

      const fieldSchema = schema[fieldName];
      const fieldValue = body[fieldName];

      if (fieldSchema.required && (fieldValue === undefined || fieldValue === null || fieldValue === '')) {
        errors[fieldName] = `${fieldName} is required.`;
        continue;
      }

      if (fieldValue !== undefined && fieldValue !== null && fieldValue !== '') {
        const expectedType = fieldSchema.type;
        let actualType;

        if (Array.isArray(fieldValue)) {
          actualType = 'array';
        } else if (typeof fieldValue === 'object' && fieldValue !== null) {
          actualType = 'object';
        } else {
          actualType = typeof fieldValue;
        }

        if (expectedType === 'number' && actualType === 'string' && !isNaN(parseFloat(fieldValue)) && isFinite(fieldValue)) {
          // Allow string numbers to pass as numbers, Express body-parser might parse them as strings
          // but we want to treat them as valid numbers if they can be coerced.
          // For strict type checking, this can be removed.
        } else if (expectedType === 'string' && typeof fieldValue === 'number') {
          // Allow numbers to pass as strings, as they can be stringified.
        } else if (expectedType === 'boolean' && (fieldValue === 'true' || fieldValue === 'false')) {
          // Allow string booleans to pass as booleans
        } else if (actualType !== expectedType) {
          errors[fieldName] = `${fieldName} must be a ${expectedType}, but received ${actualType}.`;
        }
      }
    }

    if (Object.keys(errors).length > 0) {
      return res.status(400).json({
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
