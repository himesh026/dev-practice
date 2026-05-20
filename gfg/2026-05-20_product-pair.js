// Problem   : Product Pair
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-05-20
// ───────────────────────────────────────────────────────
// O(N log N)
// O(log N) or O(N) depending on sort implementation (auxiliary space)

const maxProductPair = (nums) => {
  // Handle edge case: array must contain at least two numbers to form a pair.
