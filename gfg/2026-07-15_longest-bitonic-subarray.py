# Problem   : Longest Bitonic Subarray
# Difficulty: Medium
# Tags      : [object Object]
# Language  : Python
# Date      : 2026-07-15
# ───────────────────────────────────────────────────────
# O(N) time complexity
# O(N) space complexity
def longest_bitonic_subarray(arr):
    n = len(arr)
    if n == 0:
        return 0
    if n == 1:
        return
