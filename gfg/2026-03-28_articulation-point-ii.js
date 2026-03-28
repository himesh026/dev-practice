// Problem   : Articulation Point - II
// Difficulty: Hard
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-03-28
// ───────────────────────────────────────────────────────
// Time complexity: O(V + E)
// Space complexity: O(V + E)

const findArticulationPoints = (n, adj) => {
    const visited = new Array(n).fill(false); // Track visited nodes
    const disc = new Array(n).fill(-1); // Discovery times
    const low = new Array(n).fill(-1); // Lowest discovery time reachable from subtree
    const parent = new Array(n).fill(-1); // Parent in DFS tree
    const articulationPoints = new Set(); // Store found articulation points
    let time = 0; // Global timer for discovery times

    const dfs = (u) => {
        visited[u] = true;
        disc[u] = low[u] = time++; // Set discovery time and low-link value
        let children = 0; // Count children in DFS tree for root check

        for (const v of adj[u]) {
            if (!visited[v]) {
                children++;
                parent[v] = u;
                dfs(v); // Recurse for child

                low[u] = Math.min(low[u], low[v]); // Update low-link value of u

                // u is an articulation point in two cases:
                // 1. If u is root of DFS tree and has more than one child.
                if (parent[u] === -1 && children > 1) {
                    articulationPoints.add(u);
                }
                // 2. If u is not root and low-link value of v is greater than or equal to discovery time of u.
                if (parent[u] !== -1 && low[v] >= disc[u]) {
                    articulationPoints.add(u);
                }
            } else if (v !== parent[u]) {
                // Back-edge: update low-link value of u
                low[u] = Math.min(low[u], disc[v]);
            }
        }
    };

    // Iterate over all nodes to handle disconnected graphs
    for (let i = 0; i < n; i++) {
        if (!visited[i]) {
            dfs(i);
        }
    }

    return Array.from(articulationPoints).sort((a, b) => a - b); // Return sorted array of articulation points
};

// Example Usage:
// Graph 1: 5 nodes, 5 edges (0-indexed)
// 0 -- 1
// |    |
// 4 -- 2 -- 3
const n1 = 5;
const adj1 = Array.from({ length: n1 }, () => []);
adj1[0].push(1, 4);
adj1[1].push(0, 2);
adj1[2].push(1, 3, 4);
adj1[3].push(2);
adj1[4].push(0, 2);
console.log(`Articulation points for graph 1: ${findArticulationPoints(n1, adj1)}`); // Expected: [2]

// Graph 2: 7 nodes, 7 edges (0-indexed)
// 0 -- 1 -- 2
//      |    |
//      3 -- 4 -- 5
//           |
//           6
const n2 = 7;
const adj2 = Array.from({ length: n2 }, () => []);
adj2[0].push(1);
adj2[1].push(0, 2, 3);
adj2[2].push(1, 4);
adj2[3].push(1, 4);
adj2[4].push(2, 3, 5, 6);
adj2[5].push(4);
adj2[6].push(4);
console.log(`Articulation points for graph 2: ${findArticulationPoints(n2, adj2)}`); // Expected: [1, 4]

// Graph 3: Disconnected graph
// 0 -- 1    2 -- 3
const n3 = 4;
const adj3 = Array.from({ length: n3 }, () => []);
adj3[0].push(1);
adj3[1].push(0);
adj3[2].push(3);
adj3[3].push(2);
console.log(`Articulation points for graph 3: ${findArticulationPoints(n3, adj3)}`); // Expected: []
