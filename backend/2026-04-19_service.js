// Type      : Backend Utility
// Date      : 2026-04-19
// ───────────────────────────────────────────────────────
const onlineUsersPerRoom = new Map();

/**
 * Handles WebSocket events for a given socket, providing room management and message broadcasting.
 * @param {import('socket.io').Server} io - The Socket.io server instance.
 * @param {import('socket.
