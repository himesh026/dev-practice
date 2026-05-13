// Problem   : Mother Vertex
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-05-13
// ───────────────────────────────────────────────────────
// O(V + E)
// O(V + E)

function findMotherVertex(numVertices, adj) {
    // If no vertices, no mother vertex
    if (numVertices === 0) return -1;

    // visited array for the first
