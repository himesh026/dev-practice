// Problem   : Count Sorted Digit Groupings
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-05-29
// ───────────────────────────────────────────────────────
// O(N^3) time complexity, where N is the length of the digit string
// O(N^2) space complexity
function countSortedDigitGroupings(s) {
    const N = s.length;
    if (N === 0) return
