# Problem   : Rat Maze With Multiple Jumps
# Difficulty: Medium
# Tags      : [object Object]
# Language  : Python
# Date      : 2026-06-24
# ───────────────────────────────────────────────────────
# Time complexity: O((N*N) * (N*4)^D) where D is the maximum path length (N*N), but effectively much lower due to pruning.
# In the worst case, it can be exponential, roughly O(N^(N*N)) or
