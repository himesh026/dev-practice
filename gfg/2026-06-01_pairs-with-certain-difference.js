// Problem   : Pairs with certain difference
// Difficulty: Easy
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-06-01
// ───────────────────────────────────────────────────────
// Time complexity: O(N log N) due to sorting
// Space complexity: O(1) or O(N) depending on sort implementation (in-place vs. copy)

const findPairsWithCertainDifference = (arr, k) => {
    // Sort the array to enable two-pointer approach
    arr.sort((a, b) => a - b); // O(N log N)

    let count = 0;
    let left = 0;
    let right = 1; // Start right pointer one step ahead of left

    // Iterate through the array with two pointers
    while (right < arr.length) {
        const diff = arr[right] - arr[left];

        if (diff === k) {
            // Found a pair with the desired difference
            count++;
            left++; // Move both pointers to find distinct pairs
            right++;
        } else if (diff < k) {
            // Difference is too small, need a larger right element
            right++;
        } else { // diff > k
            // Difference is too large, need a larger left element
            left++;
            // Ensure right pointer is always ahead of left
            if (left === right) {
                right++;
            }
        }
    }

    return count;
};

// Example Usage:
// Example 1: Basic case
const arr1 = [1, 5, 3, 4, 2];
const k1 = 2;
// Pairs with difference 2: (1,3), (2,4), (3,5)
console.log(`Array: [${arr1}], k: ${k1}, Pairs: ${findPairsWithCertainDifference(arr1, k1)}`); // Expected: 3

// Example 2: No pairs
const arr2 = [1, 2, 3, 4, 5];
const k2 = 10;
console.log(`Array: [${arr2}], k: ${k2}, Pairs: ${findPairsWithCertainDifference(arr2, k2)}`); // Expected: 0

// Example 3: Duplicate numbers (should count distinct pairs)
const arr3 = [1, 1, 3, 3, 5, 5];
const k3 = 2;
// Pairs with difference 2: (1,3), (1,3), (3,5), (3,5)
// The problem usually implies counting (i,j) such that arr[j]-arr[i]=k and i!=j
// For this problem, we count unique pairs of values, not unique indices.
// If the problem meant unique (i,j) pairs where i!=j, the logic would be more complex.
// Standard interpretation for "pairs with certain difference" is value-based.
// Our current logic counts how many times the difference 'k' is found.
// If arr = [1,1,3], k=2. (1,3) is one pair. If we increment both pointers, we find it once.
// If arr = [1,3,3], k=2. (1,3) is one pair.
// If arr = [1,3,5], k=2. (1,3) and (3,5).
// The current logic counts (1,3) once, (3,5) once.
// If problem meant distinct value pairs, this is correct.
// If arr = [1,1,3,3,5,5], k=2.
// Sorted: [1,1,3,3,5,5]
// (1,3) -> count=1, left=1, right=2
// (1,3) -> count=2, left=2, right=3
// (3,5) -> count=3, left=3, right=4
// (3,5) -> count=4, left=4, right=5
// Expected for this problem usually: 2 (distinct pairs of values (1,3) and (3,5))
// If problem asks for count of (i,j) where arr[j]-arr[i]=k and i!=j:
// [1,1,3,3,5,5], k=2
// (arr[0],arr[2]), (arr[0],arr[3]), (arr[1],arr[2]), (arr[1],arr[3]) -> 4 pairs for (1,3)
// (arr[2],arr[4]), (arr[2],arr[5]), (arr[3],arr[4]), (arr[3],arr[5]) -> 4 pairs for (3,5)
// Total 8 pairs.
// The standard "Pairs with certain difference" often refers to distinct values.
// Let's assume the standard interpretation: count distinct pairs of values.
// The current code counts occurrences of (arr[right], arr[left]) pairs that satisfy diff = k.
// To count distinct value pairs (e.g., (1,3) only once even if multiple 1s and 3s exist):
// We need to skip duplicates after finding a match.

// Revised logic for counting distinct value pairs:
const findDistinctPairsWithCertainDifference = (arr, k) => {
    arr.sort((a, b) => a - b);

    let count = 0;
    let left = 0;
    let right = 1;

    while (right < arr.length) {
        // Skip duplicate elements for left pointer
        if (left > 0 && arr[left] === arr[left - 1]) {
            left++;
            if (left === right) right++; // Maintain right > left
            continue;
        }

        // Ensure right pointer is always ahead of left
        if (left === right) {
            right++;
            continue;
        }

        const diff = arr[right] - arr[left];

        if (diff === k) {
            count++;
            left++;
            right++;
            // Skip duplicate elements for right pointer after finding a pair
            while (right < arr.length && arr[right] === arr[right - 1]) {
                right++;
            }
        } else if (diff < k) {
            right++;
        } else { // diff > k
            left++;
        }
    }

    return count;
};

// Example 3: Duplicate numbers (counting distinct value pairs)
const arr3_distinct = [1, 1, 3, 3, 5, 5];
const k3_distinct = 2;
// Pairs with difference 2: (1,3), (3
