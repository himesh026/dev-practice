# Problem   : Max Subarray Sum by Removing At Most One
# Difficulty: Medium
# Tags      : [object Object]
# Language  : Python
# Date      : 2026-07-01
# ───────────────────────────────────────────────────────
# Time complexity: O(N)
# Space complexity: O(N)
def max_subarray_sum_by_removing_at_most_one(arr):
    n = len(arr)
    if n == 0:
        return 0
