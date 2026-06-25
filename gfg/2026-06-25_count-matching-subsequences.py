# Problem   : Count Matching Subsequences
# Difficulty: Medium
# Tags      : [object Object]
# Language  : Python
# Date      : 2026-06-25
# ───────────────────────────────────────────────────────
# Time complexity: O(|s| + |words| * max_len_word * log(|s|))
# Space complexity: O(|s| + |words|)
import collections
import bisect

def count_matching_subsequences(s: str, words:
