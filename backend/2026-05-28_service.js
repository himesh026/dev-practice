// Type      : Backend Utility
// Date      : 2026-05-28
// ───────────────────────────────────────────────────────
const onlineUsers = new Map(); // Map<roomName: string, Set<socketId: string>>

/**
 * Initializes WebSocket event handlers for Socket.io, providing room management and message broadcasting.
 * Tracks online users per room and handles disconnect cleanup.
 * @param {
