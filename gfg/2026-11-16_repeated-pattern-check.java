// Problem   : Repeated Pattern Check
// Difficulty: Easy
// Tags      : [object Object]
// Language  : Java
// Date      : 2026-11-16
// ───────────────────────────────────────────────────────
// Time complexity: O(N^2) in worst case due to String.contains() for naive implementation, or O(N) if KMP is used.
// Space complexity: O(N) for creating the doubled and sub strings.

class Solution {
    /**
