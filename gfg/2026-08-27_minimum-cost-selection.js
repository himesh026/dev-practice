// Problem   : Minimum Cost Selection
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-08-27
// ───────────────────────────────────────────────────────
// Time: O(N * MaxValue) where N is number of items, MaxValue is sum of all item values.
// Space: O(MaxValue)
function minCostSelection(items, targetValue) {
    // Calculate the maximum possible total value. This determines
