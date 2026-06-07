// Problem   : Finding Profession
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-06-07
// ───────────────────────────────────────────────────────
// Time complexity: O(level)
// Space complexity: O(1)
const findProfession = (level, pos) => {
    // The root (level 1, pos 1) is always an Engineer.
    // A left child (odd pos)
