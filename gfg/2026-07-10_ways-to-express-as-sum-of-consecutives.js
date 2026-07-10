// Problem   : Ways to Express as Sum of Consecutives
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-07-10
// ───────────────────────────────────────────────────────
// O(sqrt(n))
// O(1)
const consecutiveNumbersSum = n => {
    if (n <= 0) return 0; // Sum of positive integers must be positive.
    if (n === 1) return 1; //
