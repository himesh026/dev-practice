// Type      : Backend Utility
// Date      : 2026-09-13
// ───────────────────────────────────────────────────────
/**
 * @typedef {object} SchemaField
 * @property {string} type - The expected type of the field (e.g., 'string', 'number', 'boolean').
 * @property {boolean} [required=false] - Whether the field is mandatory.
 */

/**
 * @typedef {object.<string, SchemaField>} ValidationSchema
 * A schema object defining validation rules for request body fields.
 * Keys are field names, values are SchemaField objects.
 */

/**
 * Creates an Express middleware function that validates the request body against a provided schema.
 *
 * @param {ValidationSchema} schema - The schema object defining validation rules.
 * @returns {import('express').RequestHandler} An Express middleware function.
 */
function createValidator(schema) {
  return (req, res, next) => {
    const errors = {};
    const body = req.body;

    for (const fieldName in schema) {
      const fieldSchema = schema[fieldName];
      const fieldValue = body[fieldName];

      // Handle required fields
      if (fieldSchema.required && (fieldValue === undefined || fieldValue === null || (typeof fieldValue === 'string' && fieldValue.trim() === ''))) {
        errors[fieldName] = `${fieldName} is required.`;
        continue;
      }

      // If field is not required and not provided, skip type validation
      if (!fieldSchema.required && (fieldValue === undefined || fieldValue === null)) {
        continue;
      }

      // Handle type validation
      const expectedType = fieldSchema.type;
      let actualType = typeof fieldValue;

      // Special handling for array and null
      if (Array.isArray(fieldValue)) {
        actualType = 'array';
      } else if (fieldValue === null) {
        actualType = 'null';
      }

      if (expectedType === 'number' && isNaN(fieldValue)) {
          errors[fieldName] = `${fieldName} must be a number.`;
          continue;
      }

      if (expectedType === 'array' && !Array.isArray(fieldValue)) {
          errors[fieldName] = `${fieldName} must be an array.`;
          continue;
      }

      if (expectedType === 'object' && (actualType !== 'object' || Array.isArray(fieldValue) || fieldValue === null)) {
          errors[fieldName] = `${fieldName} must be an object.`;
          continue;
      }

      if (actualType !== expectedType && expectedType !== 'array' && expectedType !== 'object') {
        errors[fieldName] = `${fieldName} must be a ${expectedType}.`;
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
