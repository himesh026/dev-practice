// Problem   : Search for Subarray
// Difficulty: Hard
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-05-14
// ───────────────────────────────────────────────────────
// O(N) time complexity, where N is the length of the input array nums
// O(N) space complexity for prefix sums and deque
const shortestSubarray = (nums, k) => {
    const n = nums.length;
    // Calculate prefix
