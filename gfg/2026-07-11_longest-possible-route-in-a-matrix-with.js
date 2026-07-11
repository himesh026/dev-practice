// Problem   : Longest Possible Route in a Matrix with Hurdles
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-07-11
// ───────────────────────────────────────────────────────
// Time: O(R * C * 2^K) where K is the number of distinct items to collect (if any, otherwise O(R*C))
// Space: O(R * C)
const longestRoute = (matrix, startRow, startCol, endRow, endCol) => {
    const rows = matrix.length;
    const cols = matrix[0].length;
    // Visited array to prevent cycles and redundant computations for a given path length
    // Stores the maximum length found to reach a cell (row, col)
    const visited = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => -1)
    );

    // Directions for movement: right, down, left, up
    const dr = [0, 1, 0, -1];
    const dc = [1, 0, -1, 0];

    // DFS function to explore paths
    const dfs = (r, c, currentLength) => {
        // Base case: If current cell is the destination
        if (r === endRow && c === endCol) {
            return currentLength;
        }

        // Pruning: If we've already found a longer or equal path to this cell, no need to re-explore
        if (visited[r][c] >= currentLength) {
            return -1; // Indicates this path is not better
        }

        visited[r][c] = currentLength; // Mark current cell with the current path length

        let maxLength = -1; // Initialize max length for paths from this cell

        // Explore all 4 possible directions
        for (let i = 0; i < 4; i++) {
            const nr = r + dr[i];
            const nc = c + dc[i];

            // Check bounds, hurdles (matrix[nr][nc] === 0), and if already visited with a longer path
            if (
                nr >= 0 && nr < rows &&
                nc >= 0 && nc < cols &&
                matrix[nr][nc] === 1 // Assuming 1 is a valid path, 0 is a hurdle
            ) {
                // Recursively call DFS for the next cell
                const pathLength = dfs(nr, nc, currentLength + 1);
                maxLength = Math.max(maxLength, pathLength); // Update max length
            }
        }
        // Backtrack: Reset visited status for current cell to allow other paths to explore it
        // This is crucial for finding *all* possible paths and thus the longest one,
        // as a cell might be part of multiple paths.
        // However, if we're only looking for *a* path to a cell, and not necessarily the longest to that cell
        // from a specific starting point in a DAG-like structure, we might not reset.
        // For longest path in a general grid, we need to reset to allow other paths to potentially
        // pass through this cell later with a different overall path length.
        // The `visited[r][c] >= currentLength` check handles the pruning effectively.
        visited[r][c] = -1; // Reset for backtracking

        return maxLength; // Return the longest path found from this cell
    };

    // Start DFS from the given start coordinates with initial length 0
    return dfs(startRow, startCol, 0);
};

// Example Usage:
// Matrix: 1 = path, 0 = hurdle
const matrix1 = [
    [1, 1, 1, 1],
    [0, 1, 0, 1],
    [1, 1, 1, 1],
    [1, 0, 1, 1]
];
// Start (0,0), End (3,3)
// Expected longest path: 0,0 -> 0,1 -> 0,2 -> 0,3 -> 1,3 -> 2,3 -> 2,2 -> 2,1 -> 3,1 (hurdle) X
// 0,0 -> 0,1 -> 0,2 -> 0,3 -> 1,3 -> 2,3 -> 2,2 -> 2,1 -> 3,1 (hurdle) X
// 0,0 -> 0,1 -> 0,2 -> 0,3 -> 1,3 -> 2,3 -> 2,2 -> 2,1 -> 3,1 (hurdle) X
// Path: (0,0) -> (0,1) -> (0,2) -> (0,3) -> (1,3) -> (2,3) -> (2,2) -> (2,1) -> (3,1) (hurdle) X
// Path: (0,0) -> (0,1) -> (0,2) -> (0,3) -> (1,3) -> (2,3) -> (2,2) -> (3,2) -> (3,3) Length 8
// Path: (0,0) -> (1,0) (hurdle) X
// Path: (0,0) -> (0,1) -> (2,1) -> (2,2) -> (2,3) -> (1,3) -> (0,3) -> (3,3) (invalid path) X
// Path: (0,0) -> (0,1) -> (2,1) -> (2,2) -> (3,2) -> (3,3) Length 5
// Path: (0,0) -> (0,1) -> (0,2) -> (0,3) -> (1,3) -> (2,3) -> (2,2) -> (3,2) -> (3,3) Length 8
console.log("Matrix 1, Start (0,0), End (3,3):", longestRoute(matrix1, 0, 0, 3, 3)); // Expected: 8

const matrix2 = [
    [1, 1, 1],
    [1, 0, 1],
    [1, 1, 1]
];
// Start (0,0), End (2,2)
// Path: (0,0) -> (1,0) -> (2,0) -> (2,1) -> (2,2) Length 4
// Path: (0,0) -> (0,1) -> (0,2) -> (1,2) -> (2,2) Length 4
console.log("Matrix 2, Start (0,0), End
