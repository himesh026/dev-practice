# Problem   : Longest Bitonic Subarray
# Difficulty: Medium
# Tags      : [object Object]
# Language  : Python
# Date      : 2026-07-14
# ───────────────────────────────────────────────────────
# O(N)
# O(N)
def longest_bitonic_subarray(arr: list[int]) -> int:
    n = len(arr)

    # Handle edge cases for empty or single-element arrays
    if n <= 1:
