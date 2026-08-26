# Problem   : Negative Weight Cycle
# Difficulty: Medium
# Tags      : [object Object]
# Language  : Python
# Date      : 2026-08-26
# ───────────────────────────────────────────────────────
# Time complexity: O(V * E)
# Space complexity: O(V)
def has_negative_weight_cycle(V, edges):
    """
    Detects if a graph contains a negative weight cycle using the Bellman-Ford algorithm.
