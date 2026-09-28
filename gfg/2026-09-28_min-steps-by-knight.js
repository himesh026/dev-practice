// Problem   : Min Steps by Knight
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-09-28
// ───────────────────────────────────────────────────────
/* Time Complexity: O(N^2) where N is the board size (max(rows, cols)) */
/* Space Complexity: O(N^2) for the queue and visited set */

const minStepsByKnight = (N, startPos, targetPos) => {
    // N is the size of the square board (N x N)
    // startPos and targetPos are arrays [row, col]
    const [startX, startY] = startPos;
    const [targetX, targetY] = targetPos;

    // If start and target are the same, 0 steps are needed.
    if (startX === targetX && startY === targetY) {
        return 0;
    }

    // Knight's possible moves (dx, dy)
    const moves = [
        [-2, -1], [-2, 1], [-1, -2], [-1, 2],
        [1, -2], [1, 2], [2, -1], [2, 1]
    ];

    // Queue for BFS: stores [x, y, steps]
    const queue = [[startX, startY, 0]];
    // Set to keep track of visited cells to avoid cycles and redundant computations
    const visited = new Set();
    visited.add(`${startX},${startY}`);

    let head = 0; // Manual queue pointer for performance

    while (head < queue.length) {
        const [currX, currY, steps] = queue[head++]; // Dequeue
        
        // Explore all possible knight moves from the current position
        for (const [dx, dy] of moves) {
            const nextX = currX + dx;
            const nextY = currY + dy;

            // Check if the next position is within board boundaries
            if (nextX >= 0 && nextX < N && nextY >= 0 && nextY < N) {
                const nextPosKey = `${nextX},${nextY}`;

                // If target is reached, return current steps + 1
                if (nextX === targetX && nextY === targetY) {
                    return steps + 1;
                }

                // If not visited, add to queue and mark as visited
                if (!visited.has(nextPosKey)) {
                    visited.add(nextPosKey);
                    queue.push([nextX, nextY, steps + 1]);
                }
            }
        }
    }

    // Should not be reached if target is reachable, but good practice for unreachable cases
    return -1; 
};

// Example Usage:
// Board size 8x8, knight at [0,0], target at [7,7]
// Expected output: 6
// Path: (0,0)->(2,1)->(4,2)->(6,3)->(7,5)->(5,6)->(7,7)
// Or: (0,0)->(1,2)->(3,3)->(5,4)->(7,5)->(6,7)->(7,7) (this is 5 steps, my bad. The other path is 6)
// Correct path for 5 steps: (0,0)->(1,2)->(3,3)->(5,4)->(7,5)->(7,7) (Wait, this is wrong. (7,5) to (7,7) is not a knight move.)
// Let's re-evaluate: (0,0) -> (1,2) -> (3,3) -> (5,4) -> (7,5) -> (6,7) -> (7,7) (6 steps)
// A known 6-step path: (0,0) -> (2,1) -> (4,2) -> (6,3) -> (7,5) -> (5,6) -> (7,7)
// Let's try a smaller one: 6x6 board, (0,0) to (4,5)
// Expected: 3 ((0,0)->(2,1)->(4,2)->(4,5) is not 3 steps. (0,0)->(1,2)->(3,3)->(4,5) is 3 steps)
console.log(`Min steps for 8x8 from [0,0] to [7,7]: ${minStepsByKnight(8, [0, 0], [7, 7])}`); // Expected: 6
console.log(`Min steps for 6x6 from [0,0] to [4,5]: ${minStepsByKnight(6, [0, 0], [4, 5])}`); // Expected: 3
console.log(`Min steps for 8x8 from [0,0] to [0,0]: ${minStepsByKnight(8, [0, 0], [0, 0])}`); // Expected: 0
console.log(`Min steps for 3x3 from [0,0] to [1,1]: ${minStepsByKnight(3, [0, 0], [1, 1])}`); // Expected: -1 (unreachable)
console.log(`Min steps for 8x8 from [3,3] to [4,4]: ${minStepsByKnight(8, [3, 3], [4, 4])}`); // Expected: 2
