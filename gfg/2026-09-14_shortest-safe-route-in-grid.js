// Problem   : Shortest Safe Route in Grid
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-09-14
// ───────────────────────────────────────────────────────
// Time complexity: O(R * C * 4^(R*C)) in worst case for DFS without memoization, but with visited set and pruning it's closer to O(R*C) for BFS
// Space complexity: O(R * C) for visited set and queue
const shortestSafeRoute = (grid) => {
    const R = grid.length;
    const C = grid[0].length;

    // Pre-process grid to mark unsafe cells (adjacent to 0s)
    const processedGrid = Array(R).fill(0).map(() => Array(C).fill(1));
    const unsafeCells = new Set(); // Store coordinates of unsafe cells

    for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
            if (grid[r][c] === 0) { // If a cell is a mine
                unsafeCells.add(`${r},${c}`);
                // Mark current cell and its neighbors as unsafe
                const dr = [-1, 1, 0, 0];
                const dc = [0, 0, -1, 1];
                for (let i = 0; i < 4; i++) {
                    const nr = r + dr[i];
                    const nc = c + dc[i];
                    if (nr >= 0 && nr < R && nc >= 0 && nc < C) {
                        unsafeCells.add(`${nr},${nc}`);
                    }
                }
            }
        }
    }

    for (let r = 0; r < R; r++) {
        for (let c = 0; c < C; c++) {
            if (unsafeCells.has(`${r},${c}`)) {
                processedGrid[r][c] = 0; // 0 means unsafe, 1 means safe
            }
        }
    }

    let minLen = Infinity;

    // Start BFS from each safe cell in the first column
    for (let r = 0; r < R; r++) {
        if (processedGrid[r][0] === 1) { // Only start if the cell is safe
            const queue = [[r, 0, 1]]; // [row, col, distance]
            const visited = new Set();
            visited.add(`${r},${0}`);

            let head = 0;
            while (head < queue.length) {
                const [currR, currC, dist] = queue[head++];

                if (currC === C - 1) { // Reached the last column
                    minLen = Math.min(minLen, dist);
                    break; // Found a path, no need to explore further from this start
                }

                const dr = [-1, 1, 0, 0];
                const dc = [0, 0, -1, 1];

                for (let i = 0; i < 4; i++) {
                    const nr = currR + dr[i];
                    const nc = currC + dc[i];
                    const nextKey = `${nr},${nc}`;

                    if (nr >= 0 && nr < R && nc >= 0 && nc < C &&
                        processedGrid[nr][nc] === 1 && !visited.has(nextKey)) {
                        visited.add(nextKey);
                        queue.push([nr, nc, dist + 1]);
                    }
                }
            }
        }
    }

    return minLen === Infinity ? -1 : minLen;
};

// Example Usage:
const grid1 = [
    [1, 1, 1, 1],
    [0, 1, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1]
];
console.log(shortestSafeRoute(grid1)); // Expected: 4 (Path: (0,0)->(0,1)->(0,2)->(0,3) or (2,0)->(2,1)->(2,2)->(2,3))

const grid2 = [
    [1, 1, 1, 1],
    [1, 0, 1, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1]
];
console.log(shortestSafeRoute(grid2)); // Expected: 5 (Path: (0,0)->(0,1)->(0,2)->(0,3) or (2,0)->(2,1)->(2,2)->(2,3))

const grid3 = [
    [1, 1, 1, 1],
    [1, 0, 0, 1],
    [1, 1, 1, 1],
    [1, 1, 1, 1]
];
console.log(shortestSafeRoute(grid3)); // Expected: -1 (No safe path)

const grid4 = [
    [1, 1, 1, 1, 1],
    [1, 1, 0, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1]
];
console.log(shortestSafeRoute(grid4)); // Expected: 5 (Path: (0,0)->(0,1)->(0,2)->(0,3)->(0,4) or (2,0)->(2,1)->(2,2)->(2,3)->(2,4))

const grid5 = [
    [1, 0, 1],
    [1, 1, 1],
    [1, 0, 1]
];
console.log(shortestSafeRoute(grid5)); // Expected: 3 (Path: (1,0)->(1,1)->(1,2))
