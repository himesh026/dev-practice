// Problem   : Equalize All Prefix Sums
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-06-19
// ───────────────────────────────────────────────────────
// Time complexity: O(N log N) due to sorting prefix sums. If using quickselect for median, O(N) on average.
// Space complexity: O(N) for storing prefix sums.

const equalizeAllPrefixSums = (nums) => {
    const
