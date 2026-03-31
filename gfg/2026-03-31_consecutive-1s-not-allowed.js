// Problem   : Consecutive 1's not allowed
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-03-31
// ───────────────────────────────────────────────────────
// O(n) time complexity
// O(1) space complexity
const countStringsNoConsecutiveOnes = n => {
    // Handle edge cases for n
    if (n < 0) {
        return 0; // No strings for negative length
