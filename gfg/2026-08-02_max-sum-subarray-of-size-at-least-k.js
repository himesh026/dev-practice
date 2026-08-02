// Problem   : Max Sum Subarray of Size at least K
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-08-02
// ───────────────────────────────────────────────────────
// O(n) time complexity
// O(n) space complexity (for prefix sums, can be O(1) if modifying input or calculating on the fly)
const maxSumSubarrayAtLeastK = (nums, k) => {
    const n = nums.length
