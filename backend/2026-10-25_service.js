// Type      : Backend Utility
// Date      : 2026-10-25
// ───────────────────────────────────────────────────────
const { Server } = require('socket.io');

/**
 * Manages WebSocket connections, rooms, and message broadcasting.
 * Tracks online users per room and handles disconnect cleanup.
 */
class WebSocketRoomHandler {
    /**
     * @private
     * @
