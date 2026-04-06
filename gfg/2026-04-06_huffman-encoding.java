// Problem   : Huffman Encoding
// Difficulty: Hard
// Tags      : [object Object]
// Language  : Java
// Date      : 2026-04-06
// ───────────────────────────────────────────────────────
// Time Complexity: O(N log N) where N is the number of unique characters
// Space Complexity: O(N)
import java.util.*;

public class Solution {

    // Node class for the Huffman tree
    static class HuffmanNode {
        char data;
        int frequency;
        HuffmanNode left, right;

        public HuffmanNode(char data, int frequency) {
            this.data = data;
            this.frequency = frequency;
            this.left = null;
            this.right = null;
        }

        public HuffmanNode(int frequency, HuffmanNode left, HuffmanNode right) {
            this.data = '\0'; // Internal node has no specific character
            this.frequency = frequency;
            this.left = left;
            this.right = right;
        }
    }

    // Comparator for the priority queue to order nodes by frequency
    static class HuffmanComparator implements Comparator<HuffmanNode> {
        public int compare(HuffmanNode n1, HuffmanNode n2) {
            return n1.frequency - n2.frequency;
        }
    }

    // Generates Huffman codes for a given frequency map
    public Map<Character, String> buildHuffmanCodes(Map<Character, Integer> frequencies) {
        // Use a priority queue to build the Huffman tree
        PriorityQueue<HuffmanNode> pq = new PriorityQueue<>(new HuffmanComparator());

        // Add all characters as leaf nodes to the priority queue
        for (Map.Entry<Character, Integer> entry : frequencies.entrySet()) {
            pq.add(new HuffmanNode(entry.getKey(), entry.getValue()));
        }

        // Handle edge case: empty input or single character
        if (pq.isEmpty()) return new HashMap<>();
        if (pq.size() == 1) {
            Map<Character, String> codes = new HashMap<>();
            codes.put(pq.poll().data, "0"); // Single character gets code "0"
            return codes;
        }

        // Build the Huffman tree
        while (pq.size() > 1) {
            HuffmanNode left = pq.poll();  // Extract two nodes with lowest frequency
            HuffmanNode right = pq.poll();

            int sumFreq = left.frequency + right.frequency;
            HuffmanNode newNode = new HuffmanNode(sumFreq, left, right); // Create new internal node
            pq.add(newNode); // Add new node back to priority queue
        }

        // The root of the Huffman tree is the last remaining node
        HuffmanNode root = pq.poll();
        Map<Character, String> huffmanCodes = new HashMap<>();
        generateCodes(root, "", huffmanCodes); // Traverse tree to generate codes
        return huffmanCodes;
    }

    // Recursive helper to traverse the Huffman tree and build codes
    private void generateCodes(HuffmanNode node, String currentCode, Map<Character, String> huffmanCodes) {
        if (node == null) return;

        if (node.left == null && node.right == null) { // Leaf node found
            huffmanCodes.put(node.data, currentCode); // Store the code for the character
        } else {
            generateCodes(node.left, currentCode + "0", huffmanCodes); // Go left, append "0"
            generateCodes(node.right, currentCode + "1", huffmanCodes); // Go right, append "1"
        }
    }

    public static void main(String[] args) {
        Solution solver = new Solution();

        // Example 1: Standard case
        Map<Character, Integer> frequencies1 = new HashMap<>();
        frequencies1.put('a', 5);
        frequencies1.put('b', 9);
        frequencies1.put('c', 12);
        frequencies1.put('d', 13);
        frequencies1.put('e', 16);
        frequencies1.put('f', 45);
        Map<Character, String> codes1 = solver.buildHuffmanCodes(frequencies1);
        System.out.println("Codes for Example 1: " + codes1); // Expected: {a=1100, b=1101, c=100, d=101, e=111, f=0}

        // Example 2: Single character
        Map<Character, Integer> frequencies2 = new HashMap<>();
        frequencies2.put('z', 100);
        Map<Character, String> codes2 = solver.buildHuffmanCodes(frequencies2);
        System.out.println("Codes for Example 2: " + codes2); // Expected: {z=0}

        // Example 3: Empty input
        Map<Character, Integer> frequencies3 = new HashMap<>();
        Map<Character, String> codes3 = solver.buildHuffmanCodes(frequencies3);
        System.out.println("Codes for Example 3: " + codes3); // Expected: {}
    }
}
