// Problem   : Check Level Anagrams in Binary Trees
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-09-21
// ───────────────────────────────────────────────────────
// Time complexity: O(N * L * log L) where N is number of nodes, L is max nodes at a level (for sorting strings). If strings are fixed size, O(N).
// Space complexity: O(N) for queue and strings at each level.

// Definition for a binary tree node.
class TreeNode {
  constructor(val = 0, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

/**
 * Checks if two binary trees are level anagrams.
 * This means that for each level, the multiset of node values in tree1
 * is an anagram of the multiset of node values in tree2.
 *
 * @param {TreeNode} root1 The root of the first binary tree.
 * @param {TreeNode} root2 The root of the second binary tree.
 * @returns {boolean} True if the trees are level anagrams, false otherwise.
 */
const areLevelAnagrams = (root1, root2) => {
  // If both roots are null, they are level anagrams (empty trees).
  if (!root1 && !root2) return true;
  // If one root is null and the other isn't, they cannot be level anagrams.
  if (!root1 || !root2) return false;

  const queue1 = [root1]; // Queue for BFS of tree1.
  const queue2 = [root2]; // Queue for BFS of tree2.

  while (queue1.length > 0 && queue2.length > 0) {
    const levelSize1 = queue1.length; // Number of nodes at current level in tree1.
    const levelSize2 = queue2.length; // Number of nodes at current level in tree2.

    // If level sizes differ, they can't be anagrams.
    if (levelSize1 !== levelSize2) return false;

    const currentLevelVals1 = []; // Values at current level for tree1.
    const currentLevelVals2 = []; // Values at current level for tree2.

    // Process all nodes at the current level for tree1.
    for (let i = 0; i < levelSize1; i++) {
      const node = queue1.shift(); // Dequeue node.
      currentLevelVals1.push(node.val); // Add value to list.
      if (node.left) queue1.push(node.left); // Enqueue left child.
      if (node.right) queue1.push(node.right); // Enqueue right child.
    }

    // Process all nodes at the current level for tree2.
    for (let i = 0; i < levelSize2; i++) {
      const node = queue2.shift(); // Dequeue node.
      currentLevelVals2.push(node.val); // Add value to list.
      if (node.left) queue2.push(node.left); // Enqueue left child.
      if (node.right) queue2.push(node.right); // Enqueue right child.
    }

    // Sort the value arrays to compare multisets (anagram check).
    currentLevelVals1.sort((a, b) => a - b);
    currentLevelVals2.sort((a, b) => a - b);

    // If sorted arrays are not identical, levels are not anagrams.
    if (currentLevelVals1.join(',') !== currentLevelVals2.join(',')) {
      return false;
    }
  }

  // If one queue still has nodes and the other doesn't, trees are not same shape/size.
  return queue1.length === 0 && queue2.length === 0;
};

// Example Usage:

// Tree 1:
//      1
//     / \
//    2   3
//   / \   \
//  4   5   6
const tree1 = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3, null, new TreeNode(6))
);

// Tree 2:
//      1
//     / \
//    3   2
//   /   / \
//  6   4   5
const tree2 = new TreeNode(1,
  new TreeNode(3, new TreeNode(6), null),
  new TreeNode(2, new TreeNode(4), new TreeNode(5))
);

// Tree 3 (not anagram with tree1/tree2 at level 2):
//      1
//     / \
//    2   3
//   / \   \
//  4   5   7 (different from 6)
const tree3 = new TreeNode(1,
  new TreeNode(2, new TreeNode(4), new TreeNode(5)),
  new TreeNode(3, null, new TreeNode(7))
);

// Tree 4 (different structure for testing final queue lengths):
//      1
//     /
//    2
const tree4 = new TreeNode(1, new TreeNode(2));

// Tree 5 (empty tree)
const tree5 = null;

// Tree 6 (empty tree)
const tree6 = null;

console.log("Tree1 vs Tree2 (Expected: true):", areLevelAnagrams(tree1, tree2));
console.log("Tree1 vs Tree3 (Expected: false):", areLevelAnagrams(tree1, tree3));
console.log("Tree1 vs Tree4 (Expected: false):", areLevelAnagrams(tree1, tree4));
console.log("Tree5 vs Tree6 (Expected: true):", areLevelAnagrams(tree5, tree6));
console.log("Tree1 vs Tree5 (Expected: false):", areLevelAnagrams(tree1, tree5));
console.log("Tree1 vs Tree1 (Expected: true):", areLevelAnagrams(tree1, tree1));
