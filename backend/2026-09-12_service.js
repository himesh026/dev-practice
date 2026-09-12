// Type      : Backend Utility
// Date      : 2026-09-12
// ───────────────────────────────────────────────────────
/**
 * @typedef {object} SchemaField
 * @property {string} type - The expected type of the field (e.g., 'string', 'number', 'boolean', 'array', 'object').
 * @property {boolean} [required=false] - Whether the field is required.
 */

/**
 * @typedef {object.<string, SchemaField>} ValidationSchema
 */

/**
 * @typedef {object} ValidationErrorDetail
 * @property {string} field - The name of the field that failed validation.
 * @property {string} message - A descriptive error message for the field.
 */

/**
 * @typedef {object} StructuredError
 * @property {number} status - The HTTP status code (always 400 for validation errors).
 * @property {string} message - A general error message.
 * @property {ValidationErrorDetail[]} errors - An array of detailed field errors.
 */

/**
 * Validates a value against a specified type.
 * @param {*} value - The value to validate.
 * @param {string} type - The expected type string.
 * @returns {boolean} True if the value matches the type, false otherwise.
 */
function isValidType(value, type) {
  if (value === null || value === undefined) {
    return false; // Null/undefined cannot match a specific type other than 'null' or 'undefined'
  }
  switch (type) {
    case 'string':
      return typeof value === 'string';
    case 'number':
      return typeof value === 'number' && !isNaN(value);
    case 'boolean':
      return typeof value === 'boolean';
    case 'array':
      return Array.isArray(value);
    case 'object':
      return typeof value === 'object' && !Array.isArray(value);
    default:
      return false; // Unknown type
  }
}

/**
 * Creates an Express middleware function that validates req.body against a provided schema.
 * @param {ValidationSchema} schema - The schema object defining validation rules for req.body.
 * @returns {import('express').RequestHandler} An Express middleware function.
 */
function createValidator(schema) {
  return (req, res, next) => {
    const errors = [];
    const body = req.body || {};

    for (const fieldName in schema) {
      if (!Object.prototype.hasOwnProperty.call(schema, fieldName)) {
        continue;
      }
      const fieldSchema = schema[fieldName];
      const value = body[fieldName];

      if (fieldSchema.required && (value === undefined || value === null)) {
        errors.push({
          field: fieldName,
          message: `${fieldName} is required.`
        });
        continue;
      }

      if (value !== undefined && value !== null && !isValidType(value, fieldSchema.type)) {
        errors.push({
          field: fieldName,
          message: `${fieldName} must be a ${fieldSchema.type}.`
        });
      }
    }

    if (errors.length > 0) {
      const structuredError = {
        status: 400,
        message: 'Validation failed.',
        errors: errors,
      };
      return res.status(400).json(structuredError);
    }

    next();
  };
}

module.exports = {
  createValidator,
};
