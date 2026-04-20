// Problem   : Count Derangements
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-04-20
// ───────────────────────────────────────────────────────
// Time complexity: O(n)
// Space complexity: O(n)
const countDerangements = (n) => {
    // Input validation: n must be a non-negative integer.
    if (n < 0 || !Number.isInteger(
