// Problem   : Buy Stock with Transaction Fee
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-03-31
// ───────────────────────────────────────────────────────
// Time Complexity: O(n)
// Space Complexity: O(1)
const maxProfit = (prices, fee) => {
  if (!prices || prices.length < 2) {
    return 0; // No profit can be made with less than 2 prices
  }

  // max_profit_holding_stock: maximum profit if we currently hold a stock
  // max_profit_not_holding_stock: maximum profit if we currently don't hold a stock
  let max_profit_holding_stock = -prices[0]; // Buy on day 0, initial cost is negative of price
  let max_profit_not_holding_stock = 0; // No stock, no profit initially

  // Iterate through prices starting from the second day
  for (let i = 1; i < prices.length; i++) {
    // Calculate potential new max profit if we are holding a stock
    // Option 1: Continue holding the stock we already bought (previous holding state)
    // Option 2: Buy a stock today (previous not holding state minus current price)
    const prev_max_profit_holding_stock = max_profit_holding_stock; // Store current value for next calculation
    max_profit_holding_stock = Math.max(
      max_profit_holding_stock, // Keep holding
      max_profit_not_holding_stock - prices[i] // Buy today
    );

    // Calculate potential new max profit if we are not holding a stock
    // Option 1: Continue not holding a stock (previous not holding state)
    // Option 2: Sell the stock we were holding today (previous holding state plus current price minus fee)
    max_profit_not_holding_stock = Math.max(
      max_profit_not_holding_stock, // Keep not holding
      prev_max_profit_holding_stock + prices[i] - fee // Sell today
    );
  }

  // The maximum profit will be when we are not holding any stock at the end
  return max_profit_not_holding_stock;
};

// Example Usage:
const prices1 = [1, 3, 2, 8, 4, 9];
const fee1 = 2;
console.log(`Prices: [${prices1}], Fee: ${fee1}, Max Profit: ${maxProfit(prices1, fee1)}`); // Expected: 8

const prices2 = [1, 3, 7, 5, 10, 3];
const fee2 = 3;
console.log(`Prices: [${prices2}], Fee: ${fee2}, Max Profit: ${maxProfit(prices2, fee2)}`); // Expected: 6

const prices3 = [1, 2, 3, 4, 5];
const fee3 = 1;
console.log(`Prices: [${prices3}], Fee: ${fee3}, Max Profit: ${maxProfit(prices3, fee3)}`); // Expected: 3

const prices4 = [1, 2, 3, 4, 5];
const fee4 = 0;
console.log(`Prices: [${prices4}], Fee: ${fee4}, Max Profit: ${maxProfit(prices4, fee4)}`); // Expected: 4

const prices5 = [7, 1, 5, 3, 6, 4];
const fee5 = 2;
console.log(`Prices: [${prices5}], Fee: ${fee5}, Max Profit: ${maxProfit(prices5, fee5)}`); // Expected: 3

const prices6 = [1];
const fee6 = 1;
console.log(`Prices: [${prices6}], Fee: ${fee6}, Max Profit: ${maxProfit(prices6, fee6)}`); // Expected: 0

const prices7 = [];
const fee7 = 5;
console.log(`Prices: [${prices7}], Fee: ${fee7}, Max Profit: ${maxProfit(prices7, fee7)}`); // Expected: 0
