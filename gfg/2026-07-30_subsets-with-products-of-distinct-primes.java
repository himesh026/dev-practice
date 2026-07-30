// Problem   : Subsets with Products of Distinct Primes
// Difficulty: Hard
// Tags      : [object Object]
// Language  : Java
// Date      : 2026-07-30
// ───────────────────────────────────────────────────────
// O(N * (2^P + P^3)) where P is the number of distinct primes up to sqrt(MAX_VAL)
// O(P * 2^P) for DP table, or O(P^2) for Gaussian elimination (if
