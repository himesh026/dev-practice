// Problem   : Buy Stock with Transaction Fee
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-03-31
// ───────────────────────────────────────────────────────
// O(N) time complexity, where N is the number of days (prices array length)
// O(1) space complexity
const maxProfit = (prices, fee) => {
  if (prices.length < 2) { // Not enough days to complete
