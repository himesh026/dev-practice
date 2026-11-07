// Problem   : Minimum Time with 2 Scanners
// Difficulty: Easy
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-11-07
// ───────────────────────────────────────────────────────
// Time complexity: O(log(N * max(timeA, timeB)))
// Space complexity: O(1)
const minTimeWithTwoScanners = (N, timeA, timeB) => {
    // Convert inputs to BigInt for large number handling,
