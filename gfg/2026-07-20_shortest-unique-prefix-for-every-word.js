// Problem   : Shortest Unique Prefix for Every Word
// Difficulty: Hard
// Tags      : [object Object]
// Language  : JavaScript
// Date      : 2026-07-20
// ───────────────────────────────────────────────────────
// Time: O(N * L) where N is number of words and L is average length of words
// Space: O(N * L) for Trie storage
class TrieNode {
  constructor() {
    this.children = new Map(); // Map character to TrieNode
    this.count = 0; // Number of words passing through this node
  }
}

function buildTrie(words) {
  const root = new TrieNode();
  for (const word of words) {
    let curr = root;
    for (const char of word) {
      if (!curr.children.has(char)) {
        curr.children.set(char, new TrieNode());
      }
      curr = curr.children.get(char);
      curr.count++; // Increment count for each node on the path
    }
  }
  return root;
}

function findShortestUniquePrefixes(words) {
  const root = buildTrie(words); // Build the Trie first
  const result = [];

  for (const word of words) {
    let curr = root;
    let prefix = '';
    for (const char of word) {
      prefix += char;
      curr = curr.children.get(char);
      if (curr.count === 1) { // This prefix is unique to the current word
        break;
      }
    }
    result.push(prefix);
  }
  return result;
}

// Example Usage:
const words1 = ["apple", "apricot", "banana", "bat"];
const prefixes1 = findShortestUniquePrefixes(words1);
// Expected: ["app", "apr", "b", "ba"]
// console.log(prefixes1);

const words2 = ["dog", "cat", "apple", "apricot", "zebra"];
const prefixes2 = findShortestUniquePrefixes(words2);
// Expected: ["d", "c", "app", "apr", "z"]
// console.log(prefixes2);

const words3 = ["a", "b", "c"];
const prefixes3 = findShortestUniquePrefixes(words3);
// Expected: ["a", "b", "c"]
// console.log(prefixes3);

const words4 = ["geeks", "geekforgeeks", "geeksquiz"];
const prefixes4 = findShortestUniquePrefixes(words4);
// Expected: ["geekf", "geeks", "geekq"]
// console.log(prefixes4);

const words5 = ["zebra", "dog", "duck", "dove"];
const prefixes5 = findShortestUniquePrefixes(words5);
// Expected: ["z", "dog", "duc", "dov"]
// console.log(prefixes5);

const words6 = ["hello", "hi", "hey"];
const prefixes6 = findShortestUniquePrefixes(words6);
// Expected: ["hel", "hi", "hey"]
// console.log(prefixes6);
