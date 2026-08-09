// Problem   : High Effort vs Low Effort
// Difficulty: Easy
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-08-09
// ───────────────────────────────────────────────────────
// O(N log N) due to sorting, where N is the number of tasks
// O(N) for storing the tasks with their difference values
function solveHighLowEffort(tasks, budget) {
    // If no tasks or invalid budget, return 0
