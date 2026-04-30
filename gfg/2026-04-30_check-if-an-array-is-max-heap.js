// Problem   : Check if an Array is Max Heap
// Difficulty: Easy
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-04-30
// ───────────────────────────────────────────────────────
// Time Complexity: O(n)
// Space Complexity: O(1)
const isMaxHeap = (arr) => {
  const n = arr.length; // Get the number of elements in the array

  // An empty array or an array with one element is always a max heap
  if (n <= 1) {
    return true;
  }

  // Iterate from the first parent node down to the last parent node.
  // The last parent node is at index floor(n/2) - 1.
  // In a 0-indexed array, for a node at index i:
  // its left child is at 2*i + 1
  // its right child is at 2*i + 2
  // We only need to check nodes that have at least one child.
  // Nodes from floor(n/2) to n-1 are leaf nodes and don't need checking.
  for (let i = 0; i < Math.floor(n / 2); i++) {
    const parentValue = arr[i]; // Value of the current parent node

    const leftChildIdx = 2 * i + 1; // Index of the left child
    // Check if left child exists and violates the max-heap property
    if (leftChildIdx < n && parentValue < arr[leftChildIdx]) {
      return false; // Parent is smaller than its left child, not a max heap
    }

    const rightChildIdx = 2 * i + 2; // Index of the right child
    // Check if right child exists and violates the max-heap property
    if (rightChildIdx < n && parentValue < arr[rightChildIdx]) {
      return false; // Parent is smaller than its right child, not a max heap
    }
  }

  return true; // All parent nodes satisfy the max-heap property
};

// Example Usage:
console.log(`[90, 15, 10, 7, 12, 2] is a max heap: ${isMaxHeap([90, 15, 10, 7, 12, 2])}`); // Expected: true
console.log(`[90, 15, 10, 7, 12, 2, 5, 8, 3, 1] is a max heap: ${isMaxHeap([90, 15, 10, 7, 12, 2, 5, 8, 3, 1])}`); // Expected: true
console.log(`[10, 5, 20] is a max heap: ${isMaxHeap([10, 5, 20])}`); // Expected: false (20 > 10)
console.log(`[1, 2, 3] is a max heap: ${isMaxHeap([1, 2, 3])}`); // Expected: false (2 > 1)
console.log(`[5, 4, 3, 2, 1] is a max heap: ${isMaxHeap([5, 4, 3, 2, 1])}`); // Expected: true
console.log(`[10, 20, 5] is a max heap: ${isMaxHeap([10, 20, 5])}`); // Expected: false (20 > 10)
console.log(`[10, 5, 2] is a max heap: ${isMaxHeap([10, 5, 2])}`); // Expected: true
console.log(`[] is a max heap: ${isMaxHeap([])}`); // Expected: true
console.log(`[5] is a max heap: ${isMaxHeap([5])}`); // Expected: true
console.log(`[10, 15] is a max heap: ${isMaxHeap([10, 15])}`); // Expected: false (15 > 10)
console.log(`[15, 10] is a max heap: ${isMaxHeap([15, 10])}`); // Expected: true
console.log(`[100, 19, 36, 17, 3, 25, 1, 2, 7] is a max heap: ${isMaxHeap([100, 19, 36, 17, 3, 25, 1, 2, 7])}`); // Expected: true
console.log(`[100, 19, 36, 17, 3, 25, 1, 2, 10] is a max heap: ${isMaxHeap([100, 19, 36, 17, 3, 25, 1, 2, 10])}`); // Expected: false (10 > 7 for parent 19)
