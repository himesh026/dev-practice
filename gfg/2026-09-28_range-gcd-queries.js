// Problem   : Range GCD Queries
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-09-28
// ───────────────────────────────────────────────────────
// O(N) build, O(log N) query, O(log N) update
// O(N)
// Standard Euclidean algorithm for Greatest Common Divisor
const gcd = (a, b) => {
    while (b) {
        [a, b
