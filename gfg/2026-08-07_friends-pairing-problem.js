// Problem   : Friends Pairing Problem
// Difficulty: Medium
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-08-07
// ───────────────────────────────────────────────────────
// O(N)
// O(N)
const friendsPairing = (n) => {
  // Handle edge cases for invalid input or small number of friends.
  if (n < 0) {
    throw new Error("Number of friends cannot
