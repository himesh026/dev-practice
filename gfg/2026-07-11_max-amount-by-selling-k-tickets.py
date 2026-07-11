# Problem   : Max Amount by Selling K Tickets
# Difficulty: Medium
# Tags      : [object Object]
# Language  : Python
# Date      : 2026-07-11
# ───────────────────────────────────────────────────────
# Time complexity: O(N + k log N), where N is the number of initial ticket types.
# Space complexity: O(N) for the heap.
import heapq

def max_amount_by_selling_k_tickets(tickets: list[int],
