// Type      : Backend Utility
// Date      : 2026-06-21
// ───────────────────────────────────────────────────────
/**
 * Manages WebSocket events for Socket.io, providing room-based messaging and user tracking.
 * @module WebSocketRoomHandler
 */

/**
 * A Map to track online socket IDs per room.
 * Key: roomId (string)
 * Value: Set
