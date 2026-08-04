// Problem   : Subarrays with Sum in Range
// Difficulty: Hard
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-08-04
// ───────────────────────────────────────────────────────
// Time complexity: O(N log N)
// Space complexity: O(N)

const countRangeSum = (nums, lower, upper) => {
    const n = nums.length;
    // Prefix sums array: P[i] = sum of nums[0
