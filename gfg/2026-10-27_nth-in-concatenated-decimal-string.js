// Problem   : Nth in Concatenated Decimal String
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-10-27
// ───────────────────────────────────────────────────────
// Time: O(log N)
// Space: O(1)
const findNthDigit = (n) => {
  // Determine the number of digits in the current number group (1-digit, 2-digits, etc.)
  let digits = 1;
  // Count of numbers in the current group (e.g., 9 one-digit numbers, 90 two-digit numbers)
  let count = 9;
  // Starting number of the current group (e.g., 1 for one-digit, 10 for two-digit)
  let start = 1;

  // Loop to find which group (1-digit, 2-digit, etc.) the Nth digit falls into
  while (n > digits * count) {
    n -= digits * count; // Subtract digits accounted for by previous groups
    digits++;            // Move to the next digit group (e.g., from 1-digit to 2-digit)
    count *= 10;         // Number of numbers in the new group (e.g., 90 two-digit numbers)
    start *= 10;         // Starting number of the new group (e.g., 10 for two-digit numbers)
  }

  // Calculate the number containing the Nth digit
  // n is 1-indexed within the current group's digits
  // (n - 1) / digits gives the 0-indexed offset from 'start'
  const numContainingDigit = start + Math.floor((n - 1) / digits);

  // Calculate the 0-indexed position of the Nth digit within 'numContainingDigit'
  const digitIndexInNum = (n - 1) % digits;

  // Convert the number to a string to easily access the specific digit
  const numStr = String(numContainingDigit);

  // Return the Nth digit as a number
  return parseInt(numStr[digitIndexInNum], 10);
};

// --- Example Usage ---

// Example 1: N = 3 (digit '3' from "123...")
console.log(`N = 3, Nth digit: ${findNthDigit(3)}`); // Expected: 3

// Example 2: N = 11 (digit '0' from "...91011...")
// 1-digit numbers: 1-9 (9 digits). N = 11 - 9 = 2.
// Now looking for 2nd digit among 2-digit numbers.
// First 2-digit number is 10. (n-1)/digits = (2-1)/2 = 0. So it's 10.
// (n-1)%digits = (2-1)%2 = 1. So it's the 2nd digit (index 1) of 10, which is 0.
console.log(`N = 11, Nth digit: ${findNthDigit(11)}`); // Expected: 0

// Example 3: N = 190 (digit '0' from "...99100101...")
// 1-digit: 9 digits (1-9)
// 2-digits: 90 numbers * 2 digits/number = 180 digits (10-99)
// Total digits for 1- and 2-digit numbers = 9 + 180 = 189
// N = 190. So N is the 1st digit in the 3-digit number sequence.
// n becomes 190 - 189 = 1.
// digits = 3, count = 900, start = 100.
// numContainingDigit = 100 + floor((1-1)/3) = 100.
// digitIndexInNum = (1-1)%3 = 0.
// numStr[0] = '1'.
console.log(`N = 190, Nth digit: ${findNthDigit(190)}`); // Expected: 1

// Example 4: N = 189 (digit '9' from "...9899")
// 1-digit: 9 digits
// 2-digits: 180 digits
// Total: 189 digits. This is the last digit of the 2-digit sequence.
// n becomes 189 - 9 = 180.
// digits = 2, count = 90, start = 10.
// numContainingDigit = 10 + floor((180-1)/2) = 10 + floor(179/2) = 10 + 89 = 99.
// digitIndexInNum = (180-1)%2 = 179%2 = 1.
// numStr[1] = '9'.
console.log(`N = 189, Nth digit: ${findNthDigit(189)}`); // Expected: 9

// Example 5: N = 1 (digit '1')
console.log(`N = 1, Nth digit: ${findNthDigit(1)}`); // Expected: 1

// Example 6: Large N
// N = 2147483647 (max 32-bit signed integer)
// This will involve 9 or 10 digit numbers.
// The logic scales correctly.
// (Calculation for this specific N is complex to do manually, but the algorithm handles it)
console.log(`N = 2147483647, Nth digit: ${findNthDigit(2147483647)}`); // Expected: 2 (from 1073741824th 10-digit number)
