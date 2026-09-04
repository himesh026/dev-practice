// Problem   : Longest Subsequence with Adjacent Diff as 1
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-09-04
// ───────────────────────────────────────────────────────
// Time complexity: O(N^2) where N is the number of elements in the input array.
// Space complexity: O(N) for the DP array.
const longestSubsequenceWithAdjacentDiffAs1 = nums => {
  const n = nums.length;
