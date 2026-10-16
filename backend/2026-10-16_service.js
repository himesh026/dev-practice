// Type      : Backend Utility
// Date      : 2026-10-16
// ───────────────────────────────────────────────────────
/**
 * @typedef {import('socket.io').Server} SocketIOServer
 * @typedef {import('socket.io').Socket} SocketIOSocket
 */

const onlineUsersPerRoom = new Map(); // Map<string, Set<string>> roomName -> Set<socket
