// Problem   : Non-Attacking Black and White Knights
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-06-06
// ───────────────────────────────────────────────────────
// O(N^2)
// O(1)
const countNonAttackingKnights = (n) => {
    // Validate input: N must be a positive integer.
    if (n <= 0 || !Number.isInteger(n)) {
