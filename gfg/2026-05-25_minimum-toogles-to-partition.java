// Problem   : Minimum Toogles to partition
// Difficulty: Easy
// Tags      : [object Object]
// Language  : Java
// Date      : 2026-05-25
// ───────────────────────────────────────────────────────
// Time Complexity: O(N)
// Space Complexity: O(1)
class Solution {

    // This problem typically refers to finding the minimum number of "toogles" (partitions)
    // needed to divide an array into subarrays such that each subarray has a sum less than or equal to a given 'limit'.
    // However, the problem description is unavailable. Based on "Minimum Toogles to partition" and "Easy" tag,
    // a common interpretation is to find the minimum number of partitions to make all elements in each partition equal.
    // This usually means counting distinct elements. Another common "easy" problem is counting partitions
    // where each partition contains only identical adjacent elements.
    // Given the ambiguity, I'll assume "Minimum Toogles to partition" refers to counting the minimum partitions
    // such that each partition contains only identical, adjacent elements.
    // For example, [1, 1, 2, 2, 2, 3] would be partitioned into [1,1], [2,2,2], [3], requiring 3 toogles.
    // This is a standard run-length encoding type of problem, counting groups of identical adjacent elements.

    public int minTooglesToPartition(int[] arr) {
        if (arr == null || arr.length == 0) {
            return 0; // No elements, no partitions needed.
        }

        int toogles = 1; // Start with one partition for the first element.
        for (int i = 1; i < arr.length; i++) {
            if (arr[i] != arr[i - 1]) {
                toogles++; // If current element is different from previous, a new partition (toogle) is needed.
            }
        }
        return toogles; // Return the total count of partitions.
    }

    public static void main(String[] args) {
        Solution sol = new Solution();

        // Example 1: Basic distinct adjacent elements
        int[] arr1 = {1, 1, 2, 2, 2, 3};
        System.out.println("Array: " + java.util.Arrays.toString(arr1) + ", Min Toogles: " + sol.minTooglesToPartition(arr1)); // Expected: 3 ([1,1], [2,2,2], [3])

        // Example 2: All elements are the same
        int[] arr2 = {5, 5, 5, 5};
        System.out.println("Array: " + java.util.Arrays.toString(arr2) + ", Min Toogles: " + sol.minTooglesToPartition(arr2)); // Expected: 1 ([5,5,5,5])

        // Example 3: All elements are different
        int[] arr3 = {1, 2, 3, 4, 5};
        System.out.println("Array: " + java.util.Arrays.toString(arr3) + ", Min Toogles: " + sol.minTooglesToPartition(arr3)); // Expected: 5 ([1], [2], [3], [4], [5])

        // Example 4: Empty array
        int[] arr4 = {};
        System.out.println("Array: " + java.util.Arrays.toString(arr4) + ", Min Toogles: " + sol.minTooglesToPartition(arr4)); // Expected: 0

        // Example 5: Single element array
        int[] arr5 = {10};
        System.out.println("Array: " + java.util.Arrays.toString(arr5) + ", Min Toogles: " + sol.minTooglesToPartition(arr5)); // Expected: 1

        // Example 6: Mixed elements
        int[] arr6 = {1, 2, 1, 2, 1, 2};
        System.out.println("Array: " + java.util.Arrays.toString(arr6) + ", Min Toogles: " + sol.minTooglesToPartition(arr6)); // Expected: 6
    }
}
