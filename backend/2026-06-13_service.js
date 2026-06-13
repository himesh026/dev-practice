// Type      : Backend Utility
// Date      : 2026-06-13
// ───────────────────────────────────────────────────────
/**
 * @typedef {object} SchemaField
 * @property {string} type - The expected type of the field (e.g., 'string', 'number', 'boolean', 'object', 'array').
 * @property {boolean} [required=false] - Whether the field is required.
 * @property {Schema} [schema] - Nested schema for 'object' type fields.
 * @property {SchemaField} [items] - Schema for items in 'array' type fields.
 */

/**
 * @typedef {object.<string, SchemaField>} Schema
 */

/**
 * @typedef {object} ValidationError
 * @property {string} field - The name of the field that failed validation.
 * @property {string} message - A descriptive error message for the field.
 */

/**
 * Validates a single value against a schema field definition.
 * @param {*} value - The value to validate.
 * @param {SchemaField} fieldSchema - The schema definition for the field.
 * @param {string} fieldName - The name of the field being validated.
 * @returns {ValidationError[]} An array of validation errors, empty if valid.
 */
function validateField(value, fieldSchema, fieldName) {
  const errors = [];

  if (fieldSchema.required && (value === undefined || value === null || (typeof value === 'string' && value.trim() === ''))) {
    errors.push({ field: fieldName, message: `${fieldName} is required.` });
    return errors; // If required and missing, no further type checks make sense
  }

  if (value === undefined || value === null) {
    return errors; // Not required and missing, so it's valid
  }

  const actualType = Array.isArray(value) ? 'array' : typeof value;

  if (fieldSchema.type && actualType !== fieldSchema.type) {
    errors.push({ field: fieldName, message: `${fieldName} must be a ${fieldSchema.type}. Received ${actualType}.` });
  }

  if (fieldSchema.type === 'object' && actualType === 'object' && fieldSchema.schema) {
    const nestedErrors = validateObject(value, fieldSchema.schema);
    nestedErrors.forEach(err => errors.push({ field: `${fieldName}.${err.field}`, message: err.message }));
  }

  if (fieldSchema.type === 'array' && actualType === 'array' && fieldSchema.items) {
    value.forEach((item, index) => {
      const itemErrors = validateField(item, fieldSchema.items, `${fieldName}[${index}]`);
      itemErrors.forEach(err => errors.push(err));
    });
  }

  return errors;
}

/**
 * Validates an object against a schema.
 * @param {object} obj - The object to validate.
 * @param {Schema} schema - The schema definition for the object.
 * @returns {ValidationError[]} An array of validation errors, empty if valid.
 */
function validateObject(obj, schema) {
  let errors = [];
  for (const key in schema) {
    const fieldSchema = schema[key];
    const value = obj[key];
    errors = errors.concat(validateField(value, fieldSchema, key));
  }
  return errors;
}

/**
 * Creates an Express middleware function for validating request bodies against a schema.
 * @param {Schema} schema - The validation schema for req.body.
 * @returns {function(object, object, function): void} An Express middleware function.
 */
function createValidator(schema) {
  return (req, res, next) => {
    if (!req.body || typeof req.body !== 'object') {
      return res.status(400).json({
        errors: [{ field: 'body', message: 'Request body must be an object.' }]
      });
    }

    const errors = validateObject(req.body, schema);

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    next();
  };
}

module.exports = createValidator;
