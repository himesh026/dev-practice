// Problem   : Subsets with MEX in Range
// Difficulty: Hard
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-10-30
// ───────────────────────────────────────────────────────
// Time complexity: O(N + max(nums) + R) where N is nums.length, R is the upper bound of the MEX range.
// Space complexity: O(max(nums)) for the frequency array.

const solve = (nums, L, R) =>
