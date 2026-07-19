# Problem   : Mountain Subarray Queries
# Difficulty: Medium
# Tags      : [object Object]
# Language  : Python
# Date      : 2026-07-19
# ───────────────────────────────────────────────────────
# O(N log N + Q log N) time complexity for N elements and Q queries
# O(N) space complexity for segment tree

class Node:
    __slots__ = ['max_len', 'inc_prefix', 'dec_suffix', 'full_
