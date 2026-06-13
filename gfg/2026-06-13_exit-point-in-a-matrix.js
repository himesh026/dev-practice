// Problem   : Exit Point in a Matrix
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-06-13
// ───────────────────────────────────────────────────────
// Time complexity: O(rows * cols) in worst case, O(rows + cols) in best case (for sparse matrices)
// Space complexity: O(1)
const findExitPoint = (matrix) => {
    const rows = matrix.length;
    if (rows === 0) return [-1, -1]; // Handle empty matrix
    const cols = matrix[0].length;
    if (cols === 0) return [-1, -1]; // Handle empty rows

    let r = 0; // Current row
    let c = 0; // Current column
    let dir = 0; // Current direction: 0=right, 1=down, 2=left, 3=up

    // Direction vectors for right, down, left, up
    const dr = [0, 1, 0, -1];
    const dc = [1, 0, -1, 0];

    while (true) {
        // If current cell is 1, change direction
        if (matrix[r][c] === 1) {
            matrix[r][c] = 0; // Flip 1 to 0
            dir = (dir + 1) % 4; // Rotate clockwise: R -> D -> L -> U -> R
        }

        // Calculate next position
        const nextR = r + dr[dir];
        const nextC = c + dc[dir];

        // Check if next position is out of bounds
        if (nextR < 0 || nextR >= rows || nextC < 0 || nextC >= cols) {
            return [r, c]; // Current position is the exit point
        }

        // Move to the next position
        r = nextR;
        c = nextC;
    }
};

// Example Usage:
const matrix1 = [
    [0, 0, 1, 0],
    [0, 0, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 0]
];
console.log(`Exit point for matrix1: [${findExitPoint(matrix1)}]`); // Expected: [0, 3]

const matrix2 = [
    [0, 1],
    [1, 0]
];
console.log(`Exit point for matrix2: [${findExitPoint(matrix2)}]`); // Expected: [1, 0]

const matrix3 = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
];
console.log(`Exit point for matrix3: [${findExitPoint(matrix3)}]`); // Expected: [0, 2]

const matrix4 = [
    [1, 1],
    [1, 1]
];
console.log(`Exit point for matrix4: [${findExitPoint(matrix4)}]`); // Expected: [0, 0] (after first turn, it exits)

const matrix5 = [
    [0]
];
console.log(`Exit point for matrix5: [${findExitPoint(matrix5)}]`); // Expected: [0, 0]

const matrix6 = [];
console.log(`Exit point for matrix6: [${findExitPoint(matrix6)}]`); // Expected: [-1, -1]

const matrix7 = [
    []
];
console.log(`Exit point for matrix7: [${findExitPoint(matrix7)}]`); // Expected: [-1, -1]

const matrix8 = [
    [0, 1, 0, 0],
    [0, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 0, 0]
];
console.log(`Exit point for matrix8: [${findExitPoint(matrix8)}]`); // Expected: [3, 0]
