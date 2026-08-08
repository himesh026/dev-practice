// Problem   : Largest Zigzag Sequence
// Difficulty: Easy
// Tags      : [object Object]
// Language  : Java
// Date      : 2026-08-08
// ───────────────────────────────────────────────────────
// O(N)
// O(1)
class Solution {
    public int longestZigZag(int[] nums) {
        // Handle edge cases for empty or single-element arrays
        if (nums == null || nums.length == 0) {
