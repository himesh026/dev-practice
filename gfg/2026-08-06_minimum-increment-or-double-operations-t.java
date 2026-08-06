// Problem   : Minimum Increment or Double Operations to Convert
// Difficulty: Medium
// Tags      : [object Object]
// Language  : Java
// Date      : 2026-08-06
// ───────────────────────────────────────────────────────
// Time complexity: O(log N) where N is the target number. Each operation either halves N or decrements it by 1 (which will be followed by a halving if N > 1).
// Space complexity: O(1)
class Solution {

    /**
