# Problem   : Longest Repeating Character Replacement
# Difficulty: Medium
# Tags      : [object Object]
# Language  : Python
# Date      : 2026-04-28
# ───────────────────────────────────────────────────────
import collections

def characterReplacement(s: str, k: int) -> int:
    # Time: O(N) where N is the length of the string s
    # Space: O(1) because the frequency map stores at most 26 characters (
