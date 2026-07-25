// Problem   : Max Sum Square Sub-Matrix of Size k
// Difficulty: Medium
// Tags      : [object Object]
// Language  : Java
// Date      : 2026-07-25
// ───────────────────────────────────────────────────────
// Time complexity: O(rows * cols)
// Space complexity: O(rows * cols)
class Solution {
    public int maxSumSquareSubmatrix(int[][] matrix, int k) {
        // Handle edge cases for empty or invalid matrix
        if (matrix == null
