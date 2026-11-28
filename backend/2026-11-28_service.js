// Type      : Backend Utility
// Date      : 2026-11-28
// ───────────────────────────────────────────────────────
/**
 * @typedef {object} PaginationOptions
 * @property {number} [page=1] The current page number. Must be a positive integer.
 * @property {number} [limit=10] The maximum number of items per page. Must be a positive integer.
 * @property {object} [sort={}] The sort criteria to apply to the query (e.g., `{ createdAt: -1 }`).
 */

/**
 * @typedef {object} PaginationResult
 * @property {Array<object>} data An array of documents for the current page.
 * @property {number} total The total number of documents matching the query.
 * @property {number} page The current page number.
 * @property {number} totalPages The total number of pages available.
 * @property {boolean} hasNext True if there is a next page, false otherwise.
 * @property {boolean} hasPrev True if there is a previous page, false otherwise.
 */

/**
 * Paginates a database query using a Mongoose-like model.
 *
 * @param {object} Model The database model (e.g., a Mongoose model) that has `find()` and `countDocuments()` methods.
 * @param {object} query The query criteria object to filter documents (e.g., `{ status: 'active' }`).
 * @param {PaginationOptions} options Pagination and sorting options.
 * @returns {Promise<PaginationResult>} A promise that resolves to an object containing paginated data and metadata.
 * @throws {TypeError} If Model is invalid or options.page/options.limit are not numbers.
 * @throws {RangeError} If options.page/options.limit are not positive integers.
 */
async function paginateQuery(Model, query = {}, options = {}) {
  if (!Model || typeof Model.find !== 'function' || typeof Model.countDocuments !== 'function') {
    throw new TypeError('Invalid Model provided. Model must have `find` and `countDocuments` methods.');
  }

  const page = parseInt(options.page, 10) || 1;
  const limit = parseInt(options.limit, 10) || 10;
  const sort = options.sort || {};

  if (isNaN(page) || page < 1) {
    throw new RangeError('Page must be
