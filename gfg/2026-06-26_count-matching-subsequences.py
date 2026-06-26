# Problem   : Count Matching Subsequences
# Difficulty: Medium
# Tags      : [object Object]
# Language  : Python
# Date      : 2026-06-26
# ───────────────────────────────────────────────────────
# Time Complexity: O(|s| * alphabet_size + sum(|word| for word in words))
# Space Complexity: O(|s| * alphabet_size)

def countMatchingSubsequences(s: str, words: list[str]) -> int:
    """
