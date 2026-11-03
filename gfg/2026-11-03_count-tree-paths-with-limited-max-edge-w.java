// Problem   : Count Tree Paths With Limited Max Edge Weight
// Difficulty: Hard
// Tags      : [object Object]
// Language  : Java
// Date      : 2026-11-03
// ───────────────────────────────────────────────────────
// Time complexity: O(N) where N is the number of nodes
// Space complexity: O(N) for adjacency list and visited array
import java.util.*;

class Solution {

    private List<List<Integer>> adj; // Adjacency list for filtered graph
