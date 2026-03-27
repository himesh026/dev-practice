// Problem   : Articulation Point - II
// Difficulty: Hard
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-03-27
// ───────────────────────────────────────────────────────
// Time: O(V + E)
// Space: O(V + E)

const findArticulationPoints = (n, edges) => {
    const adj = Array.from({ length: n }, () => []);
    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    const visited = new Array(n).fill(false);
    const disc = new Array(n).fill(-1); // Discovery times
    const low = new Array(n).fill(-1);  // Lowest discovery time reachable
    const articulationPoints = new Set();
    let time = 0;

    const dfs = (u, parent) => {
        visited[u] = true;
        disc[u] = low[u] = time++;
        let children = 0; // Count of children in DFS tree

        for (const v of adj[u]) {
            if (v === parent) continue; // Skip parent in DFS tree

            if (visited[v]) {
                low[u] = Math.min(low[u], disc[v]); // Back-edge to an ancestor
            } else {
                children++;
                dfs(v, u); // Recurse for child v
                low[u] = Math.min(low[u], low[v]); // Update low[u] from child's low value

                // Check for articulation point conditions
                if (parent !== -1 && low[v] >= disc[u]) {
                    articulationPoints.add(u); // Case 1: Non-root 'u'
                }
            }
        }
        // Case 2: Root 'u' with at least two children
        if (parent === -1 && children > 1) {
            articulationPoints.add(u);
        }
    };

    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i, -1); // Start DFS from unvisited nodes, parent is -1 for root
        }
    }

    return Array.from(articulationPoints).sort((a, b) => a - b);
};

// Example Usage 1: Basic graph
const n1 = 5;
const edges1 = [[0, 1], [1, 2], [2, 0], [1, 3], [3, 4]];
console.log(`Articulation points for graph 1: ${findArticulationPoints(n1, edges1)}`); // Expected: [1, 3]

// Example Usage 2: Graph with no articulation points (cycle)
const n2 = 3;
const edges2 = [[0, 1], [1, 2], [2, 0]];
console.log(`Articulation points for graph 2: ${findArticulationPoints(n2, edges2)}`); // Expected: []

// Example Usage 3: Disconnected graph
const n3 = 7;
const edges3 = [[0, 1], [1, 2], [2, 0], [3, 4], [4, 5], [5, 6], [6, 3], [1, 3]];
console.log(`Articulation points for graph 3: ${findArticulationPoints(n3, edges3)}`); // Expected: [1, 3]

// Example Usage 4: Single edge
const n4 = 2;
const edges4 = [[0, 1]];
console.log(`Articulation points for graph 4: ${findArticulationPoints(n4, edges4)}`); // Expected: [0, 1]

// Example Usage 5: More complex graph
const n5 = 9;
const edges5 = [[0, 1], [1, 2], [2, 0], [1, 3], [3, 4], [4, 5], [5, 3], [5, 6], [6, 7], [7, 8], [8, 6]];
console.log(`Articulation points for graph 5: ${findArticulationPoints(n5, edges5)}`); // Expected: [1, 3, 5]
