// Problem   : Maximum Reachable Index Difference
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-07-21
// ───────────────────────────────────────────────────────
// O(N) time complexity
// O(N) space complexity
const maxReachableIndexDifference = (nums) => {
    const n = nums.length;
    if (n === 0) {
        return 0; // No elements, no
