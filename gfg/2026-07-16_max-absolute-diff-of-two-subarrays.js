// Problem   : Max Absolute Diff of Two Subarrays
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-07-16
// ───────────────────────────────────────────────────────
// Time complexity: O(N)
// Space complexity: O(1)
const maxAbsoluteDiffOfTwoSubarrays = (nums) => {
  if (nums.length < 2) { // Edge case: need at least two elements for non-empty subarrays
    return 0; // Or throw an error, depending on problem constraints for empty/single-element arrays
  }

  // The problem "Max Absolute Diff of Two Subarrays" typically refers to finding
  // max | sum(subarray1) - sum(subarray2) | where subarray1 and subarray2
  // are non-overlapping.

  // This can be broken down into two cases:
  // 1. subarray1 is to the left of subarray2
  // 2. subarray2 is to the left of subarray1

  // For case 1: max | sum(left_subarray) - sum(right_subarray) |
  // This is equivalent to max(sum(left) - min_sum(right), max_sum(right) - min_sum(left))
  // We need to find the maximum possible sum and minimum possible sum of a subarray
  // for all prefixes and suffixes.

  // Kadane's algorithm variation:
  // max_so_far_L[i] = max sum of a subarray ending at i
  // min_so_far_L[i] = min sum of a subarray ending at i
  // max_so_far_R[i] = max sum of a subarray starting at i
  // min_so_far_R[i] = min sum of a subarray starting at i

  // Calculate maximum and minimum subarray sums for all prefixes (ending at i)
  const maxLeft = new Array(nums.length).fill(0);
  const minLeft = new Array(nums.length).fill(0);
  let currentMax = 0;
  let currentMin = 0;
  let overallMax = -Infinity;
  let overallMin = Infinity;

  for (let i = 0; i < nums.length; i++) {
    currentMax = Math.max(nums[i], currentMax + nums[i]); // Kadane's max sum
    overallMax = Math.max(overallMax, currentMax);
    maxLeft[i] = overallMax; // max subarray sum in nums[0...i]

    currentMin = Math.min(nums[i], currentMin + nums[i]); // Kadane's min sum
    overallMin = Math.min(overallMin, currentMin);
    minLeft[i] = overallMin; // min subarray sum in nums[0...i]
  }

  // Calculate maximum and minimum subarray sums for all suffixes (starting at i)
  const maxRight = new Array(nums.length).fill(0);
  const minRight = new Array(nums.length).fill(0);
  currentMax = 0;
  currentMin = 0;
  overallMax = -Infinity;
  overallMin = Infinity;

  for (let i = nums.length - 1; i >= 0; i--) {
    currentMax = Math.max(nums[i], currentMax + nums[i]);
    overallMax = Math.max(overallMax, currentMax);
    maxRight[i] = overallMax; // max subarray sum in nums[i...n-1]

    currentMin = Math.min(nums[i], currentMin + nums[i]);
    overallMin = Math.min(overallMin, currentMin);
    minRight[i] = overallMin; // min subarray sum in nums[i...n-1]
  }

  let maxDiff = 0;

  // Iterate through all possible split points (i)
  // Left subarray is nums[0...i], Right subarray is nums[i+1...n-1]
  for (let i = 0; i < nums.length - 1; i++) {
    // Case 1: Max sum on left, Min sum on right
    maxDiff = Math.max(maxDiff, Math.abs(maxLeft[i] - minRight[i + 1]));
    // Case 2: Min sum on left, Max sum on right
    maxDiff = Math.max(maxDiff, Math.abs(minLeft[i] - maxRight[i + 1]));
  }

  return maxDiff;
};

// Example Usage:
const nums1 = [1, -2, 1, -4, 5]; // Expected: |(1) - (-4)| = 5 or |(5) - (-2)| = 7 or |(5) - (1-2+1-4)| = |5 - (-4)| = 9
console.log(`[1, -2, 1, -4, 5]: ${maxAbsoluteDiffOfTwoSubarrays(nums1)}`); // Output: 9 (maxLeft[4]=5, minRight[0]=-4, maxDiff=|5-(-4)|=9)

const nums2 = [-5, -1, -3]; // Expected: |(-1) - (-5)| = 4 or |(-3) - (-5)| = 2
console.log(`[-5, -1, -3]: ${maxAbsoluteDiffOfTwoSubarrays(nums2)}`); // Output: 4

const nums3 = [1, 2, 3, 4, 5]; // Expected: |(5) - (1)| = 4
console.log(`[1, 2, 3, 4, 5]: ${maxAbsoluteDiffOfTwoSubarrays(nums3)}`); // Output: 4

const nums4 = [10, -10, 10, -10, 10]; // Expected: |(10) - (-10)| = 20
console.log(`[10, -10, 10, -10, 10]: ${maxAbsoluteDiffOfTwoSubarrays(nums4)}`); // Output: 20

const nums5 = [2, -3, 4, -1, 5, -2]; // Expected: |(2) - (-3)| = 5 or |(4-1+5) - (-3)| = |8 - (-3)| = 11
console.log(`[2, -3, 4, -1, 5, -2]: ${maxAbsoluteDiffOfTwoSubarrays(nums5)}`); // Output: 11
