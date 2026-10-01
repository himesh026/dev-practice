// Problem   : Lexicographically Smallest Rotation
// Difficulty: Hard
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-10-01
// ───────────────────────────────────────────────────────
// Time complexity: O(N)
// Space complexity: O(N)
const lexicographicallySmallestRotation = (s) => {
    const n = s.length;
    if (n === 0) {
        return 0; // An
