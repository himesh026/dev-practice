// Problem   : Mother Vertex
// Difficulty: Medium
// Tags      : [object Object]
// Language  : Java
// Date      : 2026-05-13
// ───────────────────────────────────────────────────────
// Time Complexity: O(V + E)
// Space Complexity: O(V + E)

import java.util.*;

class Solution {
    private int lastFinishedVertex; // Stores the last vertex to finish in DFS1

    // DFS function for Phase 1:
