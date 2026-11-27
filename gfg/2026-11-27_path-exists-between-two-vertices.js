// Problem   : Path Exists Between Two Vertices
// Difficulty: Easy
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-11-27
// ───────────────────────────────────────────────────────
// Time: O(V + E), where V is the number of vertices and E is the number of edges.
// Space: O(V), for the recursion stack in DFS and the visited set.
function pathExists(graph, startNode, endNode) {
