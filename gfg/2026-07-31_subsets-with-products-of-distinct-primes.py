# Problem   : Subsets with Products of Distinct Primes
# Difficulty: Hard
# Tags      : [object Object]
# Language  : Python
# Date      : 2026-07-31
# ───────────────────────────────────────────────────────
# O(N * S + M * S^2) where N is number of elements, S is number of small primes, M is number of large primes
# O(S) for basis storage and prime list
import math

def get_primes_up_to(limit):
