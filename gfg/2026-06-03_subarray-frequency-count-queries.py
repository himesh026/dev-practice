# Problem   : Subarray Frequency Count Queries
# Difficulty: Medium
# Tags      : [object Object]
# Language  : Python
# Date      : 2026-06-03
# ───────────────────────────────────────────────────────
# O((N + Q) * sqrt(N))
# O(N + Q)

import math
from collections import defaultdict

def subarray_frequency_count_queries(arr, queries):
    """
    For each query (L, R, K),
