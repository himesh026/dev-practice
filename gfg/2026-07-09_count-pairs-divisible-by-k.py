# Problem   : Count Pairs Divisible By K
# Difficulty: Medium
# Tags      : [object Object]
# Language  : Python
# Date      : 2026-07-09
# ───────────────────────────────────────────────────────
# O(N + K)
# O(K)
import collections

def count_pairs_divisible_by_k(nums: list[int], k: int) -> int:
    """
    Counts the number of pairs (i, j) such that
