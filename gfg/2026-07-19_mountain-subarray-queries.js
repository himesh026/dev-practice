// Problem   : Mountain Subarray Queries
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-07-19
// ───────────────────────────────────────────────────────
// Time complexity: O(N) for preprocessing (building segment tree), O(Q log N) for queries.
// Space complexity: O(N) for segment tree.

class MountainSegmentTree {
    #arr;
    #tree;
    #n;
