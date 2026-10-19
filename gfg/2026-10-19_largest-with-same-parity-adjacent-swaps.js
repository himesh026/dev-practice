// Problem   : Largest with Same Parity Adjacent Swaps
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-10-19
// ───────────────────────────────────────────────────────
// Time complexity: O(N log N)
// Space complexity: O(N)
const largestWithSameParityAdjacentSwaps = (nums) => {
    // Handle empty or single-element arrays directly
    if (nums.length <= 1) {
